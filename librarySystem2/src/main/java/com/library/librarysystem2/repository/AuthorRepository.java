package com.library.librarysystem2.repository;

import com.library.librarysystem2.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
    //Author findByName(String name);
}
