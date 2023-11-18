package com.library.librarysystem2.author.controller;


import com.library.librarysystem2.author.repository.AuthorRepository;
import com.library.librarysystem2.author.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/author")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private AuthorService authorService;

    // returns List of all Authors with the keyword {authNAME}. could be used as a solo search for just authors?
    @GetMapping(value = {"/getAuthors/{authNAME}"})
    public List<String> getAuthor(@PathVariable(required = false) String authNAME) {
        return authorRepository.fetchAllByKeyName(authNAME);
    }

    // only returns full name of author if given in {authNAME}, could be used as a way to check if searched author
    // exists? not sure, if needed.
    @GetMapping(value = {"/getExactAuthor/{authNAME}"})
    public List<String> getExactAuthor(@PathVariable(required = false) String authNAME) {
        return authorService.fetchWithExactName(authNAME);
    }

}
