package com.library.librarysystem2.author.service;

import com.library.librarysystem2.author.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;


    public List<String> fetchWithExactName(String auth) {

        List<String> authors = authorRepository.fetchExactMatch(auth);
        System.out.println("Search term exact: " + auth);
        System.out.println("Result of exact query: " + authors);
        return authors;

    }
}
