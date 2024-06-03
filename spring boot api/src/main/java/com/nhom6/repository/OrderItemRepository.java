package com.nhom6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhom6.modal.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderId(Long orderId);
}
