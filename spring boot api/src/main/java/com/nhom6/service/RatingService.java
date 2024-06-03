package com.nhom6.service;

import java.util.List;

import com.nhom6.exception.ProductException;
import com.nhom6.modal.Rating;
import com.nhom6.modal.User;
import com.nhom6.request.RatingRequest;

public interface RatingService {
	
	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);

}
