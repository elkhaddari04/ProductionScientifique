package com.backend.springjwt.repository;

import com.backend.springjwt.models.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicationRepository extends JpaRepository<Publication,Long> {

}
