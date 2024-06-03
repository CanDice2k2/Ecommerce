package com.nhom6.service;

import java.util.List;

import com.nhom6.exception.UserException;
import com.nhom6.modal.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public List<User> findAllUsers();

}
