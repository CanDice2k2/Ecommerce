package com.nhom6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhom6.modal.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
