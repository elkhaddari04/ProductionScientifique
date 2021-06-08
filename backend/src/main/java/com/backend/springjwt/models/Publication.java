package com.backend.springjwt.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "publications")
public class Publication implements Serializable {

    //  titre, auteurs (prof ,doctorant, intern ou externe order Important),annee du pub
    //     pub revue internationnale indexe : nom complet du jornal
    //    pub revue commite de leccture : nom complet du jornal
    //    pub revue sans cmmite de lecture : nom complet du jornal

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="titre",unique = true)
    private String titre;
    @Column(name = "annee")
    private String annee;
    @Column(name = "type_revu")
    private String type_revu;
    @Column (name = "journal")
    private String journal;


    public Publication(String titre, String annee, String type_revu, String journal) {
        this.titre = titre;
        this.annee = annee;
        this.type_revu = type_revu;
        this.journal = journal;
    }

    public Publication(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public String getType_revu() {
        return type_revu;
    }

    public void setType_revu(String type_revu) {
        this.type_revu = type_revu;
    }

    public String getJournal() {
        return journal;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }
}
