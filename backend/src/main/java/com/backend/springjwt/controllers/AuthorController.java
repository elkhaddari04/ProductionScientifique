package com.backend.springjwt.controllers;

import com.backend.springjwt.models.Authors;
import com.backend.springjwt.models.Publication;
import com.backend.springjwt.repository.AuthorRepository;
import com.backend.springjwt.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
@RequestMapping(value = "/api/author")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorController {

    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    PublicationRepository publicationRepository;


    @GetMapping(value = "/all")
    public List<Authors> getAll(){
        return (List<Authors>) authorRepository.findAll();
    }

    @GetMapping(value="/{pubId}")
    public List<Authors> get(@PathVariable(value = "pubId") Long id) {
        return (List<Authors>) authorRepository.findByPublicationId(id);
    }

    @PostMapping( value="/add/{pubId}")
    public ResponseEntity<Integer> addPublication(@PathVariable (value = "pubId") Long pubId, @RequestBody  List<Authors> authors){
        Publication pub = publicationRepository.findById(pubId).get();
        Integer total = 0;
        for (int i = 0; i < authors.size(); i++) {
            authors.get(i).setPublication(pub);
            authorRepository.save(authors.get(i));
            total ++;
        }
        return new ResponseEntity<Integer>(total, HttpStatus.OK);
    }

    @PutMapping (value ="/update")
    public void updatePublication(@RequestBody Authors publication){
        authorRepository.save(publication);
    }

    @DeleteMapping (value = "/{id}")
    public ResponseEntity<Authors> deletePublication(@PathVariable Long id) {
        try{
            authorRepository.deleteById(id);
            return new ResponseEntity<Authors>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Authors>(HttpStatus.NOT_FOUND);
        }
    }
}
