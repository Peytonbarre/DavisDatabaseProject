package com.library.librarysystem2.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Book {

    @Id
    private int ISBN;
    private String Title;

    public int getISBN() {
        return ISBN;
    }

    public void setISBN(int ISBN) {
        this.ISBN = ISBN;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    //@OneToMany(mappedBy = "book")
   //private Set<Book_Author> book_authors = new HashSet<>();
}
