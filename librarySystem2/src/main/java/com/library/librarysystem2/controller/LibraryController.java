package com.library.librarysystem2.controller;


import com.library.librarysystem2.borrower.model.Borrower;
import com.library.librarysystem2.author.repository.AuthorRepository;
import com.library.librarysystem2.book.repository.BookRepository;
import com.library.librarysystem2.borrower.repository.BorrowerRepository;
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

    @GetMapping("/customName/{authName}")
    public List<String> fetchKeyName(@PathVariable String authName){
        return libraryServiceImp.fetchWithKeyName(authName);
    }

    @GetMapping("/customExactName/{authName}")
    public List<String> fetchExactName(@PathVariable String authName){
        return libraryServiceImp.fetchWithExactName(authName);
    }

    @GetMapping("/customSearch/{keyword}")
    public List<String> searchWithKey(@PathVariable String keyword){
        return libraryServiceImp.bigKeySearch(keyword);
    }

    @GetMapping("/customID/{id}")
    public Borrower fetchID(@PathVariable int id){
        return libraryServiceImp.fetchWithID(id);
    }

    // still working on this for the landing page so ignore for now
    // feel free to delete if it interferes with anything
    @GetMapping("/")
    public Optional<Borrower> getBorrower() {
        return borrowerRepository.findById(15);
    }


}
