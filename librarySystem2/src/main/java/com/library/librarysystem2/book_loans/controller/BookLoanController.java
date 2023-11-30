package com.library.librarysystem2.book_loans.controller;

import com.library.librarysystem2.book.service.BookServiceImp;
import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.book_loans.service.BookLoanService;
import com.library.librarysystem2.fines.service.FinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
    // made it be able to search active book loans when given isbn, card_id, or any substring of the borrower's name.
    // only thing is, you have to pass all three variables in the path request, buuuut you can just use placeholders
    // for the variables you don't use. ex. using 0000000000000 for ISBN, 0000 for Card_id, and abcdef for bname, and
    // of course just replace the placeholder with the variable you want to use.
    @GetMapping("/activeLoans/{ISBN},{Card_id},{bname}")
    public List<Book_Loans> activeBookLoans(@PathVariable String ISBN, @PathVariable int Card_id, @PathVariable String bname) {
        return bookLoanService.activeBookLoans(ISBN, Card_id, bname);
    }

    @GetMapping("/getLoanId/{ISBN},{Card_id}")
    public Integer getLoanId(@PathVariable String ISBN, @PathVariable int Card_id) {
        return bookLoanService.loanIDofBL(ISBN, Card_id);
    }

    @GetMapping("/getLoanIdAll/{ISBN}")
    public Integer getLoanId(@PathVariable String ISBN) {
        return bookLoanService.loanIDofBLAll(ISBN);
    }

    // @GetMapping("/getLoanIdUnique/{ISBN},{Card_id},{author}")
    // public Integer getLoanIdUnique(@PathVariable String ISBN, @PathVariable int Card_id, @PathVariable String author) {
    //     return bookLoanService.loanIDofBLUnique(ISBN, Card_id, author);
    // }

    @GetMapping("/getBookData/{Loan_id}")
    public List<Object[]> getBookData(@PathVariable int Loan_id){
        return bookLoanService.getBookData(Loan_id);
    }

    @GetMapping("/currentLoans/{Card_id}")
    public List<Object[]> currentBookLoans(@PathVariable int Card_id){
        return bookLoanService.currentBookLoans(Card_id);
    }

    @GetMapping("/allActiveBookLoans")
    public List<Object[]> allActiveBookLoans() { return bookLoanService.everyActiveBookLoan(); }

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

    @PutMapping("/checkInBook/{ISBN},{Loan_id}")
    public ResponseEntity<String> checkInBook(@PathVariable String ISBN,@PathVariable int Loan_id){
        if (bookServiceImp.bookExists(ISBN)) {
            if (!bookLoanService.isBookAvailable(ISBN)) {
                finesService.updateFineForToday(Loan_id);
                bookServiceImp.updateBookStatus(ISBN, 0);
                bookLoanService.updateBookLoan(Loan_id);
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
            if(bookLoanService.isBookAvailable(ISBN)) {
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
