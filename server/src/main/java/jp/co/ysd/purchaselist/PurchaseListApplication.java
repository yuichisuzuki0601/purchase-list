package jp.co.ysd.purchaselist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication // (exclude = SecurityAutoConfiguration.class)
@ComponentScan({ "jp.co.ysd.security", "jp.co.ysd.purchaselist" })
@ImportResource("classpath*:application-context.xml")
public class PurchaseListApplication {

	public static void main(String[] args) {
		SpringApplication.run(PurchaseListApplication.class, args);
	}

}