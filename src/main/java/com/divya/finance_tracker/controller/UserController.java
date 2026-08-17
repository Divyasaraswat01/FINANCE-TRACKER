
package com.divya.finance_tracker.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.divya.finance_tracker.entity.User;
import com.divya.finance_tracker.entity.UserResponse;
import com.divya.finance_tracker.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User loggedInUser =
                userService.loginUser(
                        user.getEmail(),
                        user.getPassword()
                );

        if (loggedInUser == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(
                new UserResponse(
                        loggedInUser.getId(),
                        loggedInUser.getName(),
                        loggedInUser.getEmail()
                )
        );
    }
}