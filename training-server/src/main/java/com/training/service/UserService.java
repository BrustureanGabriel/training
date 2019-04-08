package com.training.service;

import com.training.model.User;
import com.training.controller.UserController;
import java.util.List;

public interface UserService {

    User create(User user);

    User delete(int id);

    List<User> findAll();

    User findById(int id);

    User update(User user);


}
