package jp.co.ysd.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class AuthorizationBearerUtil {

	public static final String AUTHORIZATION_HEADER_KEY = "Authorization";
	private static final String BEARER_PREFIX = "Bearer ";

	public static String getBarerToken(HttpServletRequest req) {
		var token = ((HttpServletRequest) req).getHeader(AUTHORIZATION_HEADER_KEY);
		if (token != null && token.startsWith(BEARER_PREFIX)) {
			token = token.substring(BEARER_PREFIX.length());
		}
		return token;
	}

	public static void setBarerToken(HttpServletResponse res, String token) {
		res.setHeader(AUTHORIZATION_HEADER_KEY, String.format(BEARER_PREFIX + "%s", token));
	}

}
