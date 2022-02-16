package jp.co.ysd.security;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jp.co.ysd.security.YsdSecurityProperty.JwtProperty;

@Component
public class JwtManager {

	private static final String LOGIN_ID_CLAIM_KEY = "X-LOGIN_ID";
	private static final String NAME_CLAIM_KEY = "X-NAME";

	private static Algorithm algorithm;

	@Autowired
	private JwtProperty jwtProperty;

	private Algorithm getAlgorithm() {
		if (algorithm == null) {
			algorithm = Algorithm.HMAC256(jwtProperty.getSecretKey());
		}
		return algorithm;
	}

	public String issue(String loginId, String name) {
		var issuedAt = new Date();
		return JWT.create()//
				.withJWTId(jwtProperty.getId()) //
				.withIssuer(jwtProperty.getIssuer()) //
				.withAudience(jwtProperty.getAudiences().toArray(new String[0])) //
				.withSubject(jwtProperty.getSubject())//
				.withIssuedAt(issuedAt) //
				.withNotBefore(new Date(issuedAt.getTime()))//
				.withExpiresAt(new Date(issuedAt.getTime() + jwtProperty.getExpirationTime() * 60 * 60 * 1000))//
				.withClaim(LOGIN_ID_CLAIM_KEY, loginId)//
				.withClaim(NAME_CLAIM_KEY, name)//
				.sign(getAlgorithm());
	}

	public String verify(String token) throws JWTVerificationException {
		return JWT.require(getAlgorithm()).build().verify(token).getClaim(LOGIN_ID_CLAIM_KEY).asString();
	}

}
