package com.library.librarysystem2.service;


import com.library.librarysystem2.model.Author;
import com.library.librarysystem2.model.Book;
import com.library.librarysystem2.model.Borrower;
import com.library.librarysystem2.repository.AuthorRepository;
import com.library.librarysystem2.repository.BookRepository;
import com.library.librarysystem2.repository.BorrowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class LibraryServiceImp {

    @Autowired
    private BorrowerRepository borrowerRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;


/*
    public List<Book> getBooksByAuthorName(String authorName) {
        Author author = authorRepository.findByName(authorName);
        if (author != null) {
            return bookRepository.findBooksByAuthor(String.valueOf(author));
        } else {
            // Handle the case where the author does not exist
            return Collections.emptyList();
        }
    }
*/


    public Borrower saveDetails(Borrower borrower) {
        return borrowerRepository.save(borrower);
    }

    public List<Borrower> fetchAll(){
        return borrowerRepository.fetchAllFromCustom();
    }


    /*
    this only works if you POST this info as a JSON in Postman, that's what i did:
    {
    "ssn" : "821-32-1223",
    "bname" : "Joe Brown",
    "address" : "2002 duhlhjlhje dr",
    "phone" : "(770) 777 6792"
    }




     */
    public Borrower fetchWithName(){
        return borrowerRepository.fetchByName("Joe Brown");
    }

    public Borrower fetchWithID(int id){
        return borrowerRepository.fetchByID(id);
    }




}
