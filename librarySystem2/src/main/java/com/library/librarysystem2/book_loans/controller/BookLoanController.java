package com.library.librarysystem2.book_loans.controller;

import com.library.librarysystem2.book.service.BookServiceImp;
import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.book_loans.service.BookLoanService;
import com.library.librarysystem2.fines.service.FinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/book-loans")
public class BookLoanController {

    @Autowired
    private BookServiceImp bookServiceImp;
    @Autowired
    private BookLoanService bookLoanService;
    @Autowired
    private FinesService finesService;



    @GetMapping("/activeLoans/{Card_id}")
    public List<Book_Loans> activeBookLoans(@PathVariable int Card_id) {
        return bookLoanService.activeBookLoans(Card_id);
    }

    @PutMapping("/checkout/{ISBN},{Card_id}")
    public ResponseEntity<String> checkoutBook(@PathVariable String ISBN, @PathVariable int Card_id){
        if (bookServiceImp.bookExists(ISBN)) {
            if (bookLoanService.isBookAvailable(ISBN) && bookLoanService.lessThan3BooksCheckedOut(Card_id)) {
                bookServiceImp.updateBookStatus(ISBN, 1);
                bookLoanService.createBookLoan(ISBN, Card_id);
                finesService.createFine(bookLoanService.loanIDofBL(ISBN, Card_id));
                if(!bookLoanService.isBookAvailable(ISBN)) {
                    String successMessage = bookLoanService.successMessage();
                    return ResponseEntity.status(200).body(successMessage);
                }
            } else {
                if (!bookLoanService.lessThan3BooksCheckedOut(Card_id)) {
                    String errorMessage = "Error checking out book, please make sure that you do not already have 3 active book loans.";
                    return ResponseEntity.status(400).body(errorMessage);
                }
                if (!bookLoanService.isBookAvailable(ISBN)) {
                    String errorMessage = "Error checking out book, please make sure that the book is not already checked out.";
                    return ResponseEntity.status(400).body(errorMessage);
                }
            }
        } else {
            String errorMessage = "Error checking out book, please make sure the ISBN is correct.";
            return ResponseEntity.status(400).body(errorMessage);
        }
        return ResponseEntity.status(500).body("An unexpected error occurred during book checkout.");
    }

    @PutMapping("/checkInBook/{ISBN},{Loan_id},{payment}")
    public ResponseEntity<String> checkInBook(@PathVariable String ISBN,@PathVariable int Loan_id,@PathVariable int payment){
        if (bookServiceImp.bookExists(ISBN)) {
            if (!bookLoanService.isBookAvailable(ISBN)) {
                bookServiceImp.updateBookStatus(ISBN, 0);
                bookLoanService.updateBookLoan(Loan_id);
                finesService.updateFineByCheckIN(Loan_id, payment);
                if (bookLoanService.isBookAvailable(ISBN)) {
                    String successMessage2 = bookLoanService.successMessage2();
                    return ResponseEntity.status(200).body(successMessage2);
                }
            } else {
                String errorMessage = "Error checking in book, please make sure that the book is not already checked in.";
                return ResponseEntity.status(400).body(errorMessage);
            }
        } else {
            String errorMessage = "Error checking in book, please make sure the ISBN is correct.";
            return ResponseEntity.status(400).body(errorMessage);
        }
        return ResponseEntity.status(500).body("An unexpected error occurred during book check-in.");
    }

    @GetMapping("/isBookAvailable/{ISBN}")
    public boolean isBookAvailable(@PathVariable String ISBN){
        if (bookServiceImp.bookExists(ISBN)) {
            if(!bookLoanService.isBookAvailable(ISBN)) {
                return true;
            }
        }
        return false;
    }

    @GetMapping("/getNumLoans/{Card_id}")
    public int getNumLoans(@PathVariable int Card_id){
        return bookLoanService.numBooksCheckedOut(Card_id);
    }
}
