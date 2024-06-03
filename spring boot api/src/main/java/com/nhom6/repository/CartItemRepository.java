package com.nhom6.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nhom6.modal.Cart;
import com.nhom6.modal.CartItem;
import com.nhom6.modal.Product;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	@Query("SELECT ci From CartItem ci Where ci.cart=:cart And ci.product=:product And ci.size=:size And ci.userId=:userId")
	public CartItem isCartItemExist(@Param("cart")Cart cart,@Param("product")Product product,@Param("size")String size, @Param("userId")Long userId);

	@Modifying
	@Transactional
	@Query("delete from CartItem ci where ci.id in :ids")
	public void deleteAllById(@Param("ids") List<Long> ids);

}
