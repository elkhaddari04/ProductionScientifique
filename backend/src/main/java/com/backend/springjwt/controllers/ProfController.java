package com.backend.springjwt.controllers;


import com.backend.springjwt.models.Prof;
import com.backend.springjwt.repository.ProfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
@RequestMapping(value = "/api/prof")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('MODERATOR')")
public class ProfController {

    @Autowired
    ProfRepository profRepository;

    @GetMapping(value = "/all")
    public List<Prof> getAll(){
        return profRepository.findAll();
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Prof> get(@PathVariable Long id) {
        try{
            Prof prof = profRepository.findById(id).get();
            return new ResponseEntity<Prof>(prof, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Prof>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping( value="/add")
    public ResponseEntity<Long> addPublication(@RequestBody  Prof publication){
        Long pub = profRepository.save(publication).getId();
        return new ResponseEntity<Long>(pub,HttpStatus.OK);
    }

    @PutMapping (value ="/update")
    public void updatePublication(@RequestBody Prof publication){
        profRepository.save(publication);
    }

    @DeleteMapping (value = "/{id}")
    public ResponseEntity<Prof> deletePublication(@PathVariable Long id) {
        try{
            profRepository.deleteById(id);
            return new ResponseEntity<Prof>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Prof>(HttpStatus.NOT_FOUND);
        }
    }

}
