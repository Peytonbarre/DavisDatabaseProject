package com.library.librarysystem2.book.service;

import com.library.librarysystem2.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class BookServiceImp {

    @Autowired
    private BookRepository bookRepository;


    public void updateBookStatus(Long ISBN, int IsCheckedOut) {
        //Book book = bookRepository.getByID(ISBN);

        // Update the IsCheckedOut attribute
        //book.setIsCheckedOut(IsCheckedOut);

        // Save the updated book
        //bookRepository.save(book);
    }

    public boolean bookExists(Long ISBN) {
        String isbn = bookRepository.getByID(ISBN);

        return Objects.equals(isbn, ISBN.toString());
    }
}