package com.backend.springjwt;

import com.backend.springjwt.models.ERole;
import com.backend.springjwt.models.Role;
import com.backend.springjwt.repository.RoleRepository;
import com.backend.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@EnableJpaRepositories(basePackages = "com.backend.springjwt.repository")
@SpringBootApplication
public class SpringBootSecurityJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run( SpringBootSecurityJwtApplication.class, args );
	}

}
@Component
class DemoCommandLineRunner implements CommandLineRunner {
		@Autowired
		private PasswordEncoder encoder;
		@Autowired
		private UserRepository userRepo;
		@Autowired
		private RoleRepository roleRepo;


		@Override
		public void run(String... args) throws Exception {
			if (!(roleRepo.existsById( 1 )|| roleRepo.existsById( 2 ) )) {
				Role role1 = new Role();
				role1.setName( ERole.ROLE_MODERATOR );
				roleRepo.save( role1 );
				Role role2 = new Role();
				role2.setName( ERole.ROLE_USER);
				roleRepo.save( role2 );
			}
		}


	}

