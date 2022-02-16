package jp.co.ysd.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.exceptions.JWTVerificationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.GenericFilterBean;

// @see https://qiita.com/rubytomato@github/items/eb595303430b35f4773d
@Configuration
public class YsdWebSecurityConfigurer extends WebSecurityConfigurerAdapter {

	@Autowired
	private YsdSecurityProperty property;

	@Autowired
	private YsdUserService userService;

	@Autowired
	private JwtManager jwtManager;

	private CorsConfigurationSource corsConfigurationSource() {
		var corsProperty = property.getCors();
		CorsConfiguration cfg = new CorsConfiguration();
		cfg.setAllowedOrigins(corsProperty.getOrigins());
		cfg.addAllowedMethod(corsProperty.getMethod());
		cfg.addAllowedHeader(AuthorizationBearerUtil.AUTHORIZATION_HEADER_KEY);
		cfg.addExposedHeader(AuthorizationBearerUtil.AUTHORIZATION_HEADER_KEY);
		var source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration(corsProperty.getMapping(), cfg);
		return source;
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService((loginId) -> {
			var user = userService.readByLoginId(loginId);
			if (user == null) {
				throw new UsernameNotFoundException(loginId);
			}
			return new YsdUserContext(user);
		}).passwordEncoder(PasswordEncoderFactories.createDelegatingPasswordEncoder());
	}

	private AuthenticationSuccessHandler authenticationSuccessHandler = (req, res, auth) -> {
		var ysdUser = ((YsdUserContext) auth.getPrincipal()).getUser();
		var token = jwtManager.issue(ysdUser.getLoginId(), ysdUser.getName());
		AuthorizationBearerUtil.setBarerToken(res, token);
		res.setStatus(HttpStatus.OK.value());
	};

	private class TokenFilter extends GenericFilterBean {

		@Override
		public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
				throws IOException, ServletException {
			var token = AuthorizationBearerUtil.getBarerToken((HttpServletRequest) req);
			if (!StringUtils.hasText(token)) {
				chain.doFilter(req, res);
				return;
			}
			try {
				var loginId = jwtManager.verify(token);
				var user = userService.readByLoginId(loginId);
				var ctx = new YsdUserContext(user);
				var auth = new UsernamePasswordAuthenticationToken(ctx, null, ctx.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(auth);
				chain.doFilter(req, res);
			} catch (JWTVerificationException | NullPointerException e) {
				SecurityContextHolder.clearContext();
				var status = HttpStatus.UNAUTHORIZED;
				((HttpServletResponse) res).sendError(status.value(), status.getReasonPhrase());
			}
		}

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf()//
				.disable();

		http.cors()//
				.configurationSource(corsConfigurationSource());

		http.sessionManagement()//
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		var loginProperty = property.getLogin();
		http.formLogin()//
				.loginProcessingUrl(loginProperty.getUrl())//
				.usernameParameter("loginId")//
				.passwordParameter("password")//
				.successHandler(authenticationSuccessHandler)//
				.failureHandler((req, res, e) -> res.setStatus(HttpStatus.UNAUTHORIZED.value()));

		http.addFilterBefore(new TokenFilter(), UsernamePasswordAuthenticationFilter.class);

		var openProperty = property.getOpen();
		http.authorizeRequests()//
				.antMatchers(openProperty.getUrls().toArray(new String[0])).permitAll()//
				.anyRequest().authenticated();

		var logoutProperty = property.getLogout();
		http.logout()//
				.logoutUrl(logoutProperty.getUrl())//
				.logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()));

		http.exceptionHandling()//
				.authenticationEntryPoint((req, res, e) -> res.setStatus(HttpStatus.UNAUTHORIZED.value()))
				.accessDeniedHandler((req, res, e) -> res.setStatus(HttpStatus.FORBIDDEN.value()));
	}

}
