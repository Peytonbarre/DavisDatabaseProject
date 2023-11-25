package com.library.librarysystem2.fines.service;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.book_loans.repository.BookLoanRepository;
import com.library.librarysystem2.fines.model.Fines;
import com.library.librarysystem2.fines.repository.FinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinesService {
    @Autowired
    BookLoanRepository bookLoanRepository;

    @Autowired
    FinesRepository finesRepository;
    public void createFine(int Loan_id) {


        Fines fines = new Fines();
        fines.setLoan_id(Loan_id);
        System.out.println("it is using this loan ID: " + Loan_id);
        fines.setFine_amt(0);

        finesRepository.save(fines);

    }

    public void updateFineByCheckIN(int Loan_id, int payment) {
        Fines fines = finesRepository.getFinesByLoanID(Loan_id);

        if (fines.getFine_amt() != 0) {
            double fineAMT = fines.getFine_amt() - payment;
            fines.setFine_amt(fineAMT);
            fines.setPaid(1);
        }
                // still working on all this - Deryck
/*        if () {

        }*/

        finesRepository.save(fines);
    }

    public void updateFineForToday(int Loan_id) {
        Fines fines = finesRepository.getFinesByLoanID(Loan_id);

        // still working on this - Deryck

        // gotta do the math here for fines
        if (fines.getPaid() == 0) {
            // update fine since not paid, but only update if difference in days
        } else {
            // paid == 1 so do nothing since fine has been paid
        }


        finesRepository.save(fines);
    }

}
