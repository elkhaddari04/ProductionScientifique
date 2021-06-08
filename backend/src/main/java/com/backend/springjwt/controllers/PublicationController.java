package com.backend.springjwt.controllers;


import com.backend.springjwt.exception.ResourceNotFoundException;
import com.backend.springjwt.models.Publication;
import com.backend.springjwt.repository.AuthorRepository;
import com.backend.springjwt.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
@RequestMapping(value = "/api/publication")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('MODERATOR')")
public class PublicationController {

    @Autowired
    PublicationRepository publicationRepository;

    @Autowired
    AuthorRepository authorRepository;

    @GetMapping(value = "/all")
    public List<Publication> getAll(){
        return (List<Publication>) publicationRepository.findAll();
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Publication> get(@PathVariable Long id) {
        try{

            Publication pub = publicationRepository.findById(id).get();
            return new ResponseEntity<Publication>(pub, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Publication>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping( value="/add")
    public ResponseEntity<Long> addPublication(@RequestBody Publication publication) {
        Long pub_id = publicationRepository.save(publication).getId();
        return new ResponseEntity<Long>(pub_id,HttpStatus.OK);
    }

    @PutMapping (value ="/update/{pubId}")
    public Publication updatePublication(@PathVariable Long pubId, @RequestBody Publication publication) {
        return publicationRepository.findById(pubId).map(pub -> {
            pub.setTitre(publication.getTitre());
            pub.setAnnee(publication.getAnnee());
            pub.setType_revu(publication.getType_revu());
            pub.setJournal(publication.getJournal());
            return publicationRepository.save(pub);
        }).orElseThrow(() -> new ResourceNotFoundException("PubId " + pubId + " not found"));
    }

}
