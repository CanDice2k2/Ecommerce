package com.nhom6.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.nhom6.modal.*;
import com.nhom6.repository.*;
import org.springframework.stereotype.Service;

import com.nhom6.exception.OrderException;
import com.nhom6.user.domain.OrderStatus;

@Service
public class OrderServiceImplementation implements OrderService {
	
	private OrderRepository orderRepository;
	private CartService cartService;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemService orderItemService;
	private OrderItemRepository orderItemRepository;
	private CartItemRepository cartItemRepository;
	private CartItemService cartItemService;
	private ProductRepository productRepository;

	public OrderServiceImplementation(CartItemRepository cartItemRepository,OrderRepository orderRepository,CartService cartService,
			AddressRepository addressRepository,UserRepository userRepository,
			OrderItemService orderItemService,OrderItemRepository orderItemRepository, CartItemService cartItemService, ProductRepository productRepository) {
		this.cartItemRepository=cartItemRepository;
		this.orderRepository=orderRepository;
		this.cartService=cartService;
		this.addressRepository=addressRepository;
		this.userRepository=userRepository;
		this.orderItemService=orderItemService;
		this.orderItemRepository=orderItemRepository;
		this.cartItemService=cartItemService;
		this.productRepository=productRepository;
	}

	@Override
	public Order createOrder(User user, Address shippAddress) {
		System.out.println("Day la trang create order");
		shippAddress.setUser(user);
		Address address= addressRepository.save(shippAddress);
		user.getAddresses().add(address);
		userRepository.save(user);

		Cart cart=cartService.findUserCart(user.getId());

		Order createdOrder = new Order();
		createdOrder.setUser(user);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscounte(cart.getDiscounte());
		createdOrder.setTotalItem(cart.getTotalItem());

		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus(OrderStatus.PENDING);
		createdOrder.setCreatedAt(LocalDateTime.now());

		Order savedOrder=orderRepository.save(createdOrder);

		List<OrderItem> orderItems=new ArrayList<>();
		for(CartItem item: cart.getCartItems()) {
			OrderItem orderItem=new OrderItem();

			orderItem.setOrder(savedOrder);
			orderItem.setPrice(item.getPrice());
			orderItem.setProduct(item.getProduct());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setSize(item.getSize());
			orderItem.setUserId(item.getUserId());
			orderItem.setDiscountedPrice(item.getDiscountedPrice());
			orderItems.add(orderItem);
		}
		orderItemRepository.saveAll(orderItems);

		List<Long> ids=new ArrayList<>();
		System.out.println("start");
		for(CartItem item: cart.getCartItems()) {
			ids.add(item.getId());
		}
		cartItemRepository.deleteAllById(ids);

		System.out.println("ids "+ids);
		return savedOrder;
	}

	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.PLACED);
//		order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.CONFIRMED);
		
		
		return orderRepository.save(order);
	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.SHIPPED);
		return orderRepository.save(order);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.DELIVERED);
		order.setOrderDate(LocalDateTime.now());
		order.setDeliveryDate(LocalDateTime.now());
		List<OrderItem> orderItems=orderItemRepository.findByOrderId(orderId);
		for(OrderItem item: orderItems){
			Product product=item.getProduct();
			Set<Size> sizes=product.getSizes();
			for(Size size: sizes){
				if(size.getName().equals(item.getSize())){
					size.setQuantity(size.getQuantity()-item.getQuantity());
				}
			}
			product.setSizes(sizes);
			productRepository.save(product);
		}
		return orderRepository.save(order);
	}

	@Override
	public Order cancledOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.CANCELLED);
		return orderRepository.save(order);
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> opt=orderRepository.findById(orderId);
		//lay tat ca don hang thong qua id
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new OrderException("order not exist with id "+orderId);
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		List<Order> orders=orderRepository.getUsersOrders(userId);
		System.out.println("orders "+orders.size());
		return orders;
	}

	@Override
	public List<Order> getAllOrders() {
		
		return orderRepository.findAllByOrderByCreatedAtDesc();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order =findOrderById(orderId);
		
		orderRepository.deleteById(orderId);
	}

}
