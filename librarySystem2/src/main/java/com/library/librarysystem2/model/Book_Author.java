package com.library.librarysystem2.model;

import jakarta.persistence.*;

@Entity
public class Book_Author {

    // still figuring out how to query using this table and the other 2 as well. say if you were to search "J.K. Rowling"
    // books, I am trying to get it to return each ISBN associated with that author's authorID and then in turn associate
    // that ID with that specific author you are searching. so ignore the popups in the terminal when running the program.

    @Id
    @ManyToOne
    private Author author;

    @Id
    @ManyToOne
    private Book book;


    /*
    @ManyToOne
    @JoinColumn(name = "Title")
    private Book book;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorID")
    private Author author;
*/

}
