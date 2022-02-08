package com.project.loginpage.service;

import com.project.loginpage.domain.Role;
import com.project.loginpage.domain.User;
import com.project.loginpage.repo.RoleRepo;
import com.project.loginpage.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;

    // encrypt the password before saving it to the db
    private final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        log.info("saving user with the name of {} {}", user.getFirstName(), user.getLastName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("saving role with the name of {}", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("saving role {} to user with the useranme of {}", roleName, username);
        // get the user from the db
        User user = userRepo.findByUsername(username);
        // get the role from the db
        Role role = roleRepo.findByName(roleName);
        // add role
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String username) {
        log.info("getting user with the username of {}", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("getting all users");
        return userRepo.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            log.info("user with the username of {} not found", username);
            throw new UsernameNotFoundException("user not found!");
        }
        else log.info("user found!");
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        // for each role of the user add to the authorities list
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        // check when the user login with the following credentials
        // username + password + roles
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
