package com.nhom6.service;

import com.nhom6.exception.ProductException;
import com.nhom6.modal.Cart;
import com.nhom6.modal.CartItem;
import com.nhom6.modal.User;
import com.nhom6.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public CartItem addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
