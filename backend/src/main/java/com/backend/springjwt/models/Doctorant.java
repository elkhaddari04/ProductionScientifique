package com.backend.springjwt.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Doctorant {
    //    nom ,prenom, state (en_cours, sotonue,),intitule_de_la_these,co-dericture, cotutelle (prof)
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name="nom")
    private String nom;
    @Column(name="prenom")
    private String prenom;
    @Column(name="status")
    private String status;
    @Column(name="intitule_de_la_these")
    private String intitule_de_la_these;
    @Column(name="directeur")
    private String directeur;
    @Column(name="co_directeur")
    private String co_directeur;
    @Column(name="cotutelle")
    private String cotutelle;

    public Doctorant() {

    }

    public Doctorant( String nom, String prenom, String status, String intitule_de_la_these, String directeur, String co_directeur, String cotutelle) {
        this.nom = nom;
        this.prenom = prenom;
        this.status = status;
        this.intitule_de_la_these = intitule_de_la_these;
        this.directeur = directeur;
        this.co_directeur = co_directeur;
        this.cotutelle = cotutelle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIntitule_de_la_these() {
        return intitule_de_la_these;
    }

    public void setIntitule_de_la_these(String intitule_de_la_these) {
        this.intitule_de_la_these = intitule_de_la_these;
    }

    public String getDirecteur() {
        return directeur;
    }

    public void setDirecteur(String directeur) {
        this.directeur = directeur;
    }

    public String getCo_directeur() {
        return co_directeur;
    }

    public void setCo_directeur(String co_directeur) {
        this.co_directeur = co_directeur;
    }

    public String getCotutelle() {
        return cotutelle;
    }

    public void setCotutelle(String cotutelle) {
        this.cotutelle = cotutelle;
    }
}

