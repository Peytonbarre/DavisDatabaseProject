package com.library.librarysystem2.book.controller;

import com.library.librarysystem2.book.service.BookServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookServiceImp bookServiceImp;

    // still working on this.
    @PutMapping("/updateStatus/{ISBN}/{IsCheckedOut}")
    public void updateBookStatus(@PathVariable String ISBN, @PathVariable int IsCheckedOut){
        bookServiceImp.updateBookStatus(ISBN, IsCheckedOut);
    }
    // checks if ISBN is in database, returns true if so, false if not.
    @GetMapping("/checkExists/{ISBN}")
    public boolean checkingBook(@PathVariable String ISBN) {
        return bookServiceImp.bookExists(ISBN);
    }

}
