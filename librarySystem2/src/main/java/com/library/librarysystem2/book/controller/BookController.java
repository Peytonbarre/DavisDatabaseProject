package com.library.librarysystem2.book.controller;

import com.library.librarysystem2.book.repository.BookRepository;
import com.library.librarysystem2.book.service.BookServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookServiceImp bookServiceImp;


    @PutMapping("/updateStatus/{ISBN}/{IsCheckedOut}")
    public void updateBookStatus(@PathVariable Long ISBN, @PathVariable int IsCheckedOut){
        bookServiceImp.updateBookStatus(ISBN, IsCheckedOut);
    }

    @GetMapping("/checkExists/{ISBN}")
    public boolean checkingBook(@PathVariable Long ISBN) {
        return bookServiceImp.bookExists(ISBN);
    }

}
