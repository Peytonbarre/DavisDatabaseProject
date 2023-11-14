package com.library.librarysystem2.book.repository;

import com.library.librarysystem2.book.model.Book;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select B.ISBN from Book as B where B.ISBN =:val", nativeQuery = true)
    public String getByID(@Param("val") Long ISBN);
}
