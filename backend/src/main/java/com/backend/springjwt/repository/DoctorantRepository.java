package com.backend.springjwt.repository;

import com.backend.springjwt.models.Doctorant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorantRepository extends JpaRepository<Doctorant,Long> {

}
