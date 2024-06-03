package com.nhom6.service;

import com.nhom6.exception.CartItemException;
import com.nhom6.exception.UserException;
import com.nhom6.modal.Cart;
import com.nhom6.modal.CartItem;
import com.nhom6.modal.Product;

public interface CartItemService {
	
	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId, Long id,CartItem cartItem) throws CartItemException, UserException;
	
	public CartItem isCartItemExist(Cart cart,Product product,String size, Long userId);
	
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException, UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
	
}
