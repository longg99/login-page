package com.project.loginpage.repo;

import com.project.loginpage.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    // find by user name
    User findByUsername(String username);
}
