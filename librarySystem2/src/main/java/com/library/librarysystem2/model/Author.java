package com.library.librarysystem2.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Author {

    @Id
    private int authorID;
    private String name;

    public int getAuthorID() {
        return authorID;
    }

    public void setAuthorID(int authorID) {
        this.authorID = authorID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //@OneToOne(mappedBy = "authors", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private Book_Author book_author;

}
