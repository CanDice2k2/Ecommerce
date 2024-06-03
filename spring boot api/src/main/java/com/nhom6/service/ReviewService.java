package com.nhom6.service;

import java.util.List;

import com.nhom6.exception.ProductException;
import com.nhom6.modal.Review;
import com.nhom6.modal.User;
import com.nhom6.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req,User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
	
	
}
