package com.library.librarysystem2.controller;


import com.library.librarysystem2.borrower.model.Borrower;
import com.library.librarysystem2.service.LibraryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
public class LibraryController {

    @Autowired
    private LibraryServiceImp libraryServiceImp;


    // feel free to change the "/..." to whatever the name of the page is
    // saves new borrower to the database.
    @PostMapping("/borrower-sign-up")
    public Borrower newBorrower(@RequestBody Borrower newBorrower) {

        return libraryServiceImp.saveDetails(newBorrower);
    }

    // simply returns true if ID is found in database, false if not.
    @GetMapping("/checkingID/{id}")
    public boolean fetchIDofBorrower(@PathVariable int id){
        return libraryServiceImp.fetchAuthorizedUser(id);
    }

    // checks if given {name}, the username, and {ssn}, the password, and returns the id of the borrower, only if the
    // borrower is found in the database, of course with a matching name and ssn. the hyphens ' - ' in the ssn need to
    // be there in order for the query to find the Card_id of the given borrower.
    @GetMapping("/borrowerLogin/{name},{ssn}")
    public Integer fetchIDofBorrower( @PathVariable String name,@PathVariable String ssn){
        return libraryServiceImp.loginBorrower(ssn, name);
    }

    // this is a query that returns every ISBN, Book Title, and Author Name, that includes the given {keyword} which
    // is not (not case sensitive).
    // so .../customSearch/rowling would return every book with the title that has 'rowling'
    // in it and also any authors with the name that has 'rowling' in it.
    @GetMapping("/customSearch/{keyword}")
    public List<String> searchWithKey(@PathVariable String keyword){
        return libraryServiceImp.bigKeySearch(keyword);
    }

}
