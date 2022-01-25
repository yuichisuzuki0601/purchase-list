package jp.co.ysdev.purchaselist.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.co.ysdev.purchaselist.model.DummyModel;

@RestController
public class DummyController {

	private record Sample(long num, String type) {
	}

	@RequestMapping("hello")
	public List<DummyModel> hello() {
		var hoge = "hoge";
		System.out.println(hoge);

		var fuga = Map.of(new Sample(1, "piyo"), new Sample(2, "fuga"));
		System.out.println(fuga);

		return List.of(new DummyModel(1, "a"), new DummyModel(2, "b"), new DummyModel(3, "d"));
	}

}
