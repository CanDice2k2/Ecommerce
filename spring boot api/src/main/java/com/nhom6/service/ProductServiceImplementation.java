package com.nhom6.service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.nhom6.modal.Size;
import com.nhom6.request.UpdateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.nhom6.exception.ProductException;
import com.nhom6.modal.Category;
import com.nhom6.modal.Product;
import com.nhom6.repository.CategoryRepository;
import com.nhom6.repository.ProductRepository;
import com.nhom6.request.CreateProductRequest;

@Service
public class ProductServiceImplementation implements ProductService {
	
	private ProductRepository productRepository;
	private UserService userService;
	private CategoryRepository categoryRepository;
	
	public ProductServiceImplementation(ProductRepository productRepository,UserService userService,CategoryRepository categoryRepository) {
		this.productRepository=productRepository;
		this.userService=userService;
		this.categoryRepository=categoryRepository;
	}
	

	@Override
	public Product createProduct(CreateProductRequest req) {
		
		Category topLevel = categoryRepository.findByName(req.getTopLavelCategory());

		if(topLevel==null) {
			Category topLavelCategory=new Category();
			topLavelCategory.setName(req.getTopLavelCategory());
			topLavelCategory.setLevel(1);
			
			topLevel= categoryRepository.save(topLavelCategory);
		}
		System.out.println("top level - "+topLevel);
		Category secondLevel = categoryRepository.findByNameAndParantId(req.getSecondLavelCategory(),topLevel.getId());
		if(secondLevel==null) {
			Category secondLavelCategory=new Category();
			secondLavelCategory.setName(req.getSecondLavelCategory());
			secondLavelCategory.setParentCategory(topLevel);
			secondLavelCategory.setLevel(2);
			
			secondLevel= categoryRepository.save(secondLavelCategory);
		}
		System.out.println("second level - "+secondLevel);
		Category thirdLevel = categoryRepository.findByNameAndParantId(req.getThirdLavelCategory(),secondLevel.getId());
		if(thirdLevel==null) {
			Category thirdLavelCategory=new Category();
			thirdLavelCategory.setName(req.getThirdLavelCategory());
			thirdLavelCategory.setParentCategory(secondLevel);
			thirdLavelCategory.setLevel(3);
			
			thirdLevel=categoryRepository.save(thirdLavelCategory);
		}
		System.out.println("third level - "+thirdLevel);

		Product product=new Product();
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setDescription(req.getDescription());
		product.setDiscountedPrice(req.getDiscountedPrice());
		product.setDiscountPersent(req.getDiscountPersent());
		product.setImageUrl(req.getImageUrl());
		product.setBrand(req.getBrand());
		product.setPrice(req.getPrice());
		product.setSizes(req.getSize());
		product.setQuantity(req.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatedAt(LocalDateTime.now());
		
		Product savedProduct= productRepository.save(product);
		
		System.out.println("products - "+product);
		
		return savedProduct;
	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		
		Product product=findProductById(productId);
		System.out.println("product - "+product);
		System.out.println("delete product "+product.getId()+" - "+productId);
		product.getSizes().clear();
//		productRepository.save(product);
//		product.getCategory().
		productRepository.delete(product);
		
		return "Product deleted Successfully";
	}

	@Override
	public Product updateProduct(UpdateProductRequest req) throws ProductException {
		try {
		Product product=findProductById(req.getId());
		System.out.println("product da tim duoc - "+product);
		System.out.println("request - "+req);
		if(req.getQuantity()!=0) {
			product.setQuantity(req.getQuantity());
		}
		if(req.getDescription()!=null) {
			product.setDescription(req.getDescription());
		}
		if(req.getDiscountedPrice()!=0) {
			product.setDiscountedPrice(req.getDiscountedPrice());
		}
		if(req.getDiscountPersent()!=0) {
			product.setDiscountPersent(req.getDiscountPersent());
		}
		if(req.getImageUrl()!=null) {
			product.setImageUrl(req.getImageUrl());
		}
		if(req.getBrand()!=null) {
			product.setBrand(req.getBrand());
		}
		if(req.getPrice()!=0) {
			product.setPrice(req.getPrice());
		}
		if(req.getColor()!=null) {
			product.setColor(req.getColor());
		}
		if(req.getTitle()!=null) {
			product.setTitle(req.getTitle());
		}
		if(req.getSizes()!=null) {
			product.setSizes(req.getSizes());
		}
		if(req.getTopLavelCategory()!=null && req.getSecondLavelCategory()!=null && req.getThirdLavelCategory()!=null) {
			Category topLevel = categoryRepository.findByName(req.getTopLavelCategory());
			Category secondLevel = categoryRepository.findByNameAndParantId(req.getSecondLavelCategory(), topLevel.getId());
			Category thirdLevel = categoryRepository.findByNameAndParantId(req.getThirdLavelCategory(), secondLevel.getId());
			product.setCategory(thirdLevel);
		}
			return productRepository.save(product);

		}
		catch (Exception e) {
			System.out.println("error - "+e);
		}
		return null;
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product findProductById(Long id) throws ProductException {
		Optional<Product> opt=productRepository.findById(id);

		if(opt.isPresent()) {
			return opt.get();
		}
		throw new ProductException("product not found with id "+id);
	}

	@Override
	public List<Product> findProductByCategory(String category) {
		System.out.println("category --- "+category);
//		Category topLevel = categoryRepository.findByName(req.getTopLavelCategory());
//		Category secondLevel = categoryRepository.findByNameAndParantId(req.getSecondLavelCategory(),topLevel.getId());
//		Category thirdLevel = categoryRepository.findByNameAndParantId(req.getThirdLavelCategory(),secondLevel.getId());
//		System.out.println("category --- "+category);
		
		List<Product> products = productRepository.findByCategory(category);
		
		return products;
	}

	@Override
	public List<Product> searchProduct(String query) {
		List<Product> products=productRepository.searchProduct(query);
		return products;
	}



	
	
	@Override
	public Page<Product> getAllProduct(String category, List<String>colors,
			List<String> sizes, Integer minPrice, Integer maxPrice,
			Integer minDiscount,String sort, String stock, Integer pageNumber, Integer pageSize ) {

		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		List<Product> products = null;

		if(category != null && category != "") {
			System.out.println("category - "+category.split("/").length);
			// dung cho admin
			if(category.split("/").length == 1) {
				products = productRepository.filterProducts3(category, minPrice, maxPrice, minDiscount, sort);
			}
			else {
			try {
				String lavelOne = category.split("/")[0];
				String lavelTwo = category.split("/")[1];
				String lavelThree = category.split("/")[2];

				Category topLevel = categoryRepository.findByName(lavelOne);
				Category secondLevel = categoryRepository.findByNameAndParantId(lavelTwo, topLevel.getId());
				Category thirdLevel = categoryRepository.findByNameAndParantId(lavelThree, secondLevel.getId());

				//System.out.println("top level - "+topLevel);
				//System.out.println("second level - "+secondLevel);
				System.out.println("third level - "+thirdLevel);
				System.out.println(thirdLevel.getId() + "  " +  minPrice + "  " + maxPrice + "  " + minDiscount + "  " + sort);
				products = productRepository.filterProducts(thirdLevel.getId(), minPrice, maxPrice, minDiscount, sort);
			}
			catch (Exception e) {
				System.out.println("error - "+e);
				System.out.println("loi roi em oi");
			}
			}

		}
		else{
			products = productRepository.filterProducts2( minPrice, maxPrice, minDiscount, sort);
		}

		if (!colors.isEmpty()) {
			products = products.stream()
			        .filter(p -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor())))
			        .collect(Collectors.toList());


		}

		if(stock!=null) {

			if(stock.equals("in_stock")) {
				products=products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
			}// neu stock = in_stock thi lay nhung san pham co so luong >0
			else if (stock.equals("out_of_stock")) {
				products=products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());
			}// neu stock = out_of_stock thi lay nhung san pham co so luong <1


		}
		int startIndex = (int) pageable.getOffset();
		int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());

		List<Product> pageContent = products.subList(startIndex, endIndex);
		Page<Product> filteredProducts = new PageImpl<>(pageContent, pageable, products.size());
	    return filteredProducts; // If color list is empty, do nothing and return all products


	}


	@Override
	public List<Product> recentlyAddedProduct() {
		
		return productRepository.findTop10ByOrderByCreatedAtDesc();
	}

}
