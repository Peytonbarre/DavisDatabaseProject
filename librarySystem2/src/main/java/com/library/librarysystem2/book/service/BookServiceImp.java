package com.library.librarysystem2.book.service;

import com.library.librarysystem2.book.model.Book;
import com.library.librarysystem2.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class BookServiceImp {

    @Autowired
    private BookRepository bookRepository;


    public void updateBookStatus(String ISBN, int IsCheckedOut) {
        Book book = bookRepository.getByID(ISBN);

        book.setIsCheckedOut(IsCheckedOut);

        bookRepository.save(book);
    }

    public boolean bookExists(String ISBN) {
        String isbn = bookRepository.getISBN(ISBN);

        return Objects.equals(isbn, ISBN);
    }
}