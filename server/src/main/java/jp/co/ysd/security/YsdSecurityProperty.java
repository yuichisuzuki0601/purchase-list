package jp.co.ysd.security;

import java.util.Collections;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "ysd.security")
@Data
public class YsdSecurityProperty {

	@Data
	public static class CorsProperty {
		private String mapping = "/**";
		private String method = "*";
		private List<String> origins = List.of("http://localhost:8080");
	}

	@Component
	@ConfigurationProperties(prefix = "ysd.security.jwt")
	@Data
	public static class JwtProperty {
		private String secretKey;
		private String id = "ysd";
		private String issuer = "https://ysd.com";
		private List<String> audiences = List.of("https://ysd.com");
		private String subject = "ysd-security";
		private int expirationTime = 24;
	}

	@Component
	@ConfigurationProperties(prefix = "ysd.security.login")
	@Data
	public static class LoginProperty {
		private String url = "/login";
	}

	@Component
	@ConfigurationProperties(prefix = "ysd.security.logout")
	@Data
	public static class LogoutProperty {
		private String url = "/logout";
	}

	@Component
	@ConfigurationProperties(prefix = "ysd.security.open")
	@Data
	public static class OpenProperty {
		private List<String> urls = Collections.emptyList();
	}

	private CorsProperty cors = new CorsProperty();
	private JwtProperty jwt = new JwtProperty();
	private LoginProperty login = new LoginProperty();
	private LogoutProperty logout = new LogoutProperty();
	private OpenProperty open = new OpenProperty();

}
