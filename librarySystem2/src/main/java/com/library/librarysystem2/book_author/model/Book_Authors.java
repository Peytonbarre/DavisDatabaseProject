package com.library.librarysystem2.book_author.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;

@Entity
public class Book_Authors {

    @Id
    private String ISBN;
    private int authorID;

}
