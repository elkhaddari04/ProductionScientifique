package com.backend.springjwt.controllers;


import com.backend.springjwt.models.Doctorant;
import com.backend.springjwt.repository.DoctorantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
@RequestMapping(value = "/api/doctorant")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('MODERATOR')")
public class DoctorantController {
    @Autowired
    DoctorantRepository doctorantRepository;

    @GetMapping(value = "/all")
    public List<Doctorant> getAll(){
        return doctorantRepository.findAll();
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Doctorant> get(@PathVariable Long id) {
        try{
            Doctorant pub = doctorantRepository.findById(id).get();
            return new ResponseEntity<Doctorant>(pub, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Doctorant>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping( value="/add")
    public ResponseEntity<Long> addPublication(@RequestBody  Doctorant publication){
        Long pub = doctorantRepository.save(publication).getId();
        return new ResponseEntity<Long>(pub,HttpStatus.OK);
    }

    @PutMapping (value ="/update")
    public void updatePublication(@RequestBody Doctorant publication){
        doctorantRepository.save(publication);
    }

    @DeleteMapping (value = "/{id}")
    public ResponseEntity<Doctorant> deletePublication(@PathVariable Long id) {
        try{
            doctorantRepository.deleteById(id);
            return new ResponseEntity<Doctorant>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Doctorant>(HttpStatus.NOT_FOUND);
        }
    }
}
