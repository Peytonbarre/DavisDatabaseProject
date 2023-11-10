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

    @GetMapping(value = {"/getAuthors", "/{authNAME}"})
    public List<String> getAuthor(@PathVariable(required = false) String authNAME) {
        return authorRepository.fetchAllByKeyName(authNAME);
    }

    @GetMapping(value = {"/getExactAuthor", "/{authNAME}"})
    public List<String> getExactAuthor(@PathVariable(required = false) String authNAME) {
        return authorService.fetchWithExactName(authNAME);
    }

}
