package jp.co.ysd.security;

import java.util.Collections;

import org.springframework.security.core.context.SecurityContextHolder;

public final class YsdUserContext extends org.springframework.security.core.userdetails.User {

	private final YsdUser user;

	public static YsdUser getSessionUser() {
		return ((YsdUserContext) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
	}

	YsdUserContext(YsdUser user) {
		super(user.getLoginId(), user.getPassword(), Collections.emptyList());
		this.user = user;
	}

	public YsdUser getUser() {
		return user;
	}

}
