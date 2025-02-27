package com.turksat.musteritakip.controller;

import com.turksat.musteritakip.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final InMemoryUserDetailsManager userDetailsManager;

    public AuthController(InMemoryUserDetailsManager userDetailsManager) {
        this.userDetailsManager = userDetailsManager; }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody UserDto dto) {
        UserDetails user = org.springframework.security.core.userdetails.User.withDefaultPasswordEncoder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .roles("USER")
                .build();

        userDetailsManager.deleteUser(dto.getUsername());
        userDetailsManager.createUser(user);
        return "Password updated successfully!";
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, authenticated user!";
    }

}
