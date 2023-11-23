package com.library.librarysystem2.book_loans.service;

import com.library.librarysystem2.book_loans.repository.BookLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookLoanService {

    @Autowired
    private BookLoanRepository bookLoanRepository;

    public boolean isBookAvailable(String ISBN) {

        return (bookLoanRepository.checkAvailability(ISBN) == 0);
    }

    public String successMessage() {
        return ("Book has been checked out! Take a look at our other selections if you want to " +
                "borrower another. Please be aware we only allow 3 books to be checked out at a time per " +
                "customer, thank you for understanding.");
    }

    public String successMessage2() {
        return ("Book has been successfully checked in! Take a look at our other selections if you want to " +
                "borrower another. Please be aware we only allow 3 books to be checked out at a time per " +
                "customer, thank you for understanding.");
    }
}
