package com.nhom6.controller;

import com.nhom6.modal.Cart;
import com.nhom6.repository.CartItemRepository;
import com.nhom6.repository.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom6.exception.OrderException;
import com.nhom6.exception.UserException;
import com.nhom6.modal.Order;
import com.nhom6.repository.OrderRepository;
import com.nhom6.response.PaymentLinkResponse;
import com.nhom6.service.OrderService;
import com.nhom6.service.UserService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymentController {

//	@Value("${razorpay.api.key}")
//	private String apiKey;
//
//	@Value("${razorpay.api.secret}")
//	private String apiSecret;

    private OrderService orderService;
    private UserService userService;
    private OrderRepository orderRepository;
    private CartRepository cartRepository;
    private CartItemRepository cartItemRepository;

    public PaymentController(OrderService orderService, UserService userService, OrderRepository orderRepository, CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.orderService = orderService;
        this.userService = userService;
        this.orderRepository = orderRepository;
		this.cartRepository = cartRepository;
		this.cartItemRepository = cartItemRepository;
    }

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws RazorpayException, UserException, OrderException {
        Order order = orderService.findOrderById(orderId);
		System.out.println("order id --- "+order.getId());
        PaymentLinkResponse res = new PaymentLinkResponse("123", orderId.toString());

        orderRepository.save(order);
        return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.ACCEPTED);


    }


}
