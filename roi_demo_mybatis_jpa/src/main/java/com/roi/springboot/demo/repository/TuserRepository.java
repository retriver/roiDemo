package com.roi.springboot.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roi.springboot.demo.domain.TuserDomain;


@Repository
public interface TuserRepository extends JpaRepository<TuserDomain, Integer>{  

}
