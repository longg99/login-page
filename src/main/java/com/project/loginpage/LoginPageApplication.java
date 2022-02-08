package com.project.loginpage;

import com.project.loginpage.domain.Role;
import com.project.loginpage.domain.User;
import com.project.loginpage.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class LoginPageApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginPageApplication.class, args);
	}

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		// encode the password when the app runs
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			// create some sample data in our db
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));

			userService.saveUser(
					new User(null, "Duy", "Nen", "duynen", "1234", "duynen123@gmail.com", new ArrayList<>()));
			userService.saveUser(
					new User(null, "Duy", "HNP", "duyhnp", "1234", "duyhnp123@gmail.com", new ArrayList<>()));
			userService.saveUser(
					new User(null, "John", "Dang", "johnadmin", "1234", "john1234@gmail.com", new ArrayList<>()));

			userService.addRoleToUser("duynen", "ROLE_USER");
			userService.addRoleToUser("duyhnp", "ROLE_USER");
			userService.addRoleToUser("johnadmin", "ROLE_ADMIN");
			userService.addRoleToUser("johnadmin", "ROLE_USER");

		};
	}
}
