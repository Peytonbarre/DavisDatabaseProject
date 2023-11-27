package com.library.librarysystem2.fines.service;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.book_loans.repository.BookLoanRepository;
import com.library.librarysystem2.fines.model.Fines;
import com.library.librarysystem2.fines.repository.FinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

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


    // this will return a simple message to the user stating what went wrong, you can remove the ResponseEntity
    // initialization and make the method void if you want to perform error handling before calling this method.

    public void updateFineByCheckIN(int Loan_id, int payment) {
        Fines fines = finesRepository.getFinesByLoanID(Loan_id);

        if (fines.getFine_amt() != 0) {
            double paymentD = payment/100.0;
            if (paymentD != fines.getFine_amt()) {
                finesRepository.save(fines);
            } else {
                double fineAMT = fines.getFine_amt() - paymentD;
                fines.setFine_amt(fineAMT);
                finesRepository.save(fines);
            }
        } else {                // Fine_amt must be zero so when user checks in book and fine amount is zero, then simply
                                // make fine shown as paid and no longer track charges.
            finesRepository.save(fines);
        }
    }

    public void updateFineForToday(int Loan_id) {
        Fines fines = finesRepository.getFinesByLoanID(Loan_id);
        Book_Loans book_loans = bookLoanRepository.getBookLoanByLoanID(Loan_id);

        // converting java.sql.Date to java.time.LocalDate
        // Instant instant = Instant.ofEpochMilli(book_loans.getDue_date().getTime());
        LocalDate dueDate = book_loans.getDue_date().toLocalDate();

        // still working on this - Deryck

        if (fines.getPaid() == 0) {
            // if book is overdue
            if (book_loans.getDue_date() != null && Date.valueOf(LocalDate.now()).compareTo(book_loans.getDue_date()) > 0 ) {
                long daysOverdue = LocalDate.now().toEpochDay() - dueDate.toEpochDay();
                BigDecimal fineRate = new BigDecimal("0.25"); // 0.25 cents per day
                BigDecimal fineAmount = BigDecimal.valueOf(daysOverdue).multiply(fineRate);

                double currentFineAmt = fines.getFine_amt();
                System.out.println("Old fine amount: " + currentFineAmt);
                if (currentFineAmt == fineAmount.doubleValue()) {
                    fines.setFine_amt(currentFineAmt);
                } else {
                    double updatedFineAmt = currentFineAmt + fineAmount.doubleValue();
                    System.out.println("New fine amount: " + updatedFineAmt);
                    fines.setFine_amt(updatedFineAmt);
                }

            }
        }
        finesRepository.save(fines);
    }

    public double testUpdateFines(int Loan_id) {
        return finesRepository.testingFineUpdate(Loan_id);
    }

    public boolean checkIfPaidFully(int Loan_id) {
        Fines fines = finesRepository.getFinesByLoanID(Loan_id);
        if (finesRepository.checkingPaidFully(Loan_id) == 0) {
            fines.setPaid(1);
        }
        return finesRepository.checkingPaidFully(Loan_id) == 0;
    }

    public List<Fines> displayOfFinesFromCardID(int Card_id) {
        return finesRepository.displayOfFinesFromCard_id(Card_id);
    }
    public List<Fines> displayOfActiveFinesFromCardID(int Card_id) {
        return finesRepository.displayOfActiveFinesFromCard_id(Card_id);
    }


}
