package jp.co.ysd.purchaselist.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import jp.co.ysd.purchaselist.model.User;
import jp.co.ysd.security.YsdUserService;

@Service
public class UserService implements YsdUserService {

	private static final Map<String, User> TABLE = new HashMap<>();
	static {
		var email1 = "a";
		var user1 = new User();
		user1.setId(1);
		user1.setEmail(email1);
		user1.setPassword("{noop}a");
		user1.setName("テストユーザーA");
		TABLE.put(email1, user1);

		var email2 = "b";
		var user2 = new User();
		user2.setId(2);
		user2.setEmail(email2);
		user2.setPassword("{noop}b");
		user2.setName("テストユーザーB");
		TABLE.put(email2, user2);

		var email3 = "c";
		var user3 = new User();
		user3.setId(3);
		user3.setEmail(email3);
		user3.setPassword("{noop}c");
		user3.setName("テストユーザーC");
		TABLE.put(email3, user3);
	}

	@Override
	public User readByLoginId(String loginId) {
		return readByEmail(loginId);
	}

	public User readByEmail(String email) {
		return TABLE.get(email);
	}

}
