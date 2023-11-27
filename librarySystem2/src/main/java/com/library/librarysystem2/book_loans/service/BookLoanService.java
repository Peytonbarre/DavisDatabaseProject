package com.library.librarysystem2.book_loans.service;

import com.library.librarysystem2.book.model.Book;
import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.book_loans.repository.BookLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

@Service
public class BookLoanService {

    @Autowired
    private BookLoanRepository bookLoanRepository;

    public boolean isBookAvailable(String ISBN) { return (bookLoanRepository.checkAvailability(ISBN) == 0);}

    public boolean lessThan3BooksCheckedOut(int Card_id) {
        return (bookLoanRepository.numOfLoanedBooks(Card_id)<3);
    }

    public int numBooksCheckedOut(int Card_id) {
        return bookLoanRepository.numOfLoanedBooks(Card_id);
    }

    public void createBookLoan(String ISBN, int Card_id) {

        Book_Loans book_loans = new Book_Loans();
        bookLoanRepository.getLoanID(ISBN, Card_id);
        book_loans.setISBN(ISBN);
        book_loans.setCard_id(Card_id);
        book_loans.setDate_out(Date.valueOf(LocalDate.now()));
        book_loans.setDue_date(Date.valueOf(LocalDate.now().plusDays(14)));
        book_loans.setDate_in(null);

        bookLoanRepository.save(book_loans);
    }

    public void updateBookLoan(int Loan_id) {
        // get Loan from Query using the Loan_id

        Book_Loans book_loans = bookLoanRepository.getBookLoanByLoanID(Loan_id);
        book_loans.setDate_in(Date.valueOf(LocalDate.now()));
        bookLoanRepository.save(book_loans);

    }

    public Integer loanIDofBL(String ISBN, int Card_id) {
        return bookLoanRepository.getLoanID(ISBN, Card_id);
    }


    public List<Book_Loans> activeBookLoans(int Card_id) {
        return bookLoanRepository.activeBookLoans(Card_id);
    }

    public List<Object[]> currentBookLoans(int Card_id) {
        return bookLoanRepository.currentBookLoans(Card_id);
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
