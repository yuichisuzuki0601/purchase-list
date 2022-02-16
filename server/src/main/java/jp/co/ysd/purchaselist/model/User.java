package jp.co.ysd.purchaselist.model;

import jp.co.ysd.security.YsdUser;
import lombok.Data;

@Data
public class User implements YsdUser {

	private long id;
	private String email;
	private String password;
	private String name;

	@Override
	public String getLoginId() {
		return email;
	}

}
