package com.library.librarysystem2.controller;


import com.library.librarysystem2.model.Book;
import com.library.librarysystem2.model.Borrower;
import com.library.librarysystem2.repository.AuthorRepository;
import com.library.librarysystem2.repository.BookRepository;
import com.library.librarysystem2.repository.BorrowerRepository;
import com.library.librarysystem2.service.LibraryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class LibraryController {

    @Autowired
    private BorrowerRepository borrowerRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LibraryServiceImp libraryServiceImp;


    // feel free to change the "/..." to whatever the name of the page is
    @PostMapping("/borrower-sign-up")
    public Borrower newBorrower(@RequestBody Borrower newBorrower) {

        return libraryServiceImp.saveDetails(newBorrower);
    }

    @GetMapping("/customfetch")
    public List<Borrower> fetchController(){
        return libraryServiceImp.fetchAll();
    }

    @GetMapping("/customName")
    public Borrower fetchName(){
        return libraryServiceImp.fetchWithName();
    }

    @GetMapping("/customID/{id}")
    public Borrower fetchID(@PathVariable int id){
        return libraryServiceImp.fetchWithID(id);
    }

    // still working on this for the landing page so ignore for now
    @GetMapping("/")
    public Optional<Borrower> getBorrower() {
        return borrowerRepository.findById(15);
    }

/*
    // trying to get something started for the search function
    @GetMapping("/{name}/books")
    public List<Book> getBooksByAuthor(@PathVariable String name){
        return libraryServiceImp.getBooksByAuthorName(name);
    }
*/

}
