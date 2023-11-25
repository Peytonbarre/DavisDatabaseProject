package com.library.librarysystem2.fines.service;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.book_loans.repository.BookLoanRepository;
import com.library.librarysystem2.fines.model.Fines;
import com.library.librarysystem2.fines.repository.FinesRepository;
import org.springframework.stereotype.Service;

@Service
public class FinesService {

    BookLoanRepository bookLoanRepository;
    FinesRepository finesRepository;
    public void createFine(String ISBN, int Card_id) {


        Fines fines = finesRepository.getFinesByLoanID(bookLoanRepository.getLoanID(ISBN, Card_id));
        fines.setFine_amt(0);

        finesRepository.save(fines);

    }

    public void updateFine(int Loan_id) {
        Fines fines = finesRepository.getFinesByLoanID(Loan_id);

        // gotta do the math here for fines

        finesRepository.save(fines);
    }



}
