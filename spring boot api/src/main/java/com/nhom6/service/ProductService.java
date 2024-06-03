package com.nhom6.service;

import java.util.List;

import com.nhom6.request.UpdateProductRequest;
import org.springframework.data.domain.Page;

import com.nhom6.exception.ProductException;
import com.nhom6.modal.Product;
import com.nhom6.request.CreateProductRequest;

public interface ProductService {
	
	// only for admin
	public Product createProduct(CreateProductRequest req) throws ProductException;
	
	public String deleteProduct(Long productId) throws ProductException;
	
	public Product updateProduct(UpdateProductRequest product)throws ProductException;

	public List<Product> getAllProducts();
	
	// for user and admin both
	public Product findProductById(Long id) throws ProductException;
	
	public List<Product> findProductByCategory(String category);
	
	public List<Product> searchProduct(String query);
	
//	public List<Product> getAllProduct(List<String>colors,List<String>sizes,int minPrice, int maxPrice,int minDiscount, String category, String sort,int pageNumber, int pageSize);
	public Page<Product> getAllProduct(String category, List<String>colors, List<String> sizes, Integer minPrice, Integer maxPrice, Integer minDiscount,String sort, String stock, Integer pageNumber, Integer pageSize);
	
	public List<Product> recentlyAddedProduct();
	
	

}
