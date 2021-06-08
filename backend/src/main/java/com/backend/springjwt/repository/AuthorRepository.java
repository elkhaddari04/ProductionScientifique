package com.backend.springjwt.repository;

import com.backend.springjwt.models.Authors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Authors,Long> {
    List<Authors> findByPublicationId(Long publication_id);
    Optional<Authors> findByIdAndPublicationId(Long id, Long publicationId);
}
