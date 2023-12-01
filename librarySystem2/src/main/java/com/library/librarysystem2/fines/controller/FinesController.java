package com.library.librarysystem2.fines.controller;

import com.library.librarysystem2.book_loans.repository.BookLoanRepository;
import com.library.librarysystem2.fines.model.Fines;
import com.library.librarysystem2.fines.service.FinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fines")
public class FinesController {

    @Autowired
    FinesService finesService;
    @Autowired
    BookLoanRepository bookLoanRepository;


        // front end can just use this request as a refresh button, maybe?
        // refreshes one time per loan id, since loan id of book_loan and loan id of fines is 1:1.
    @PutMapping("/updateFines/{Loan_id}")
    public ResponseEntity<String> updatingFines(@PathVariable int Loan_id) {
        if (bookLoanRepository.getBookLoanByLoanID(Loan_id) != null) {
            finesService.updateFineForToday(Loan_id);
            if (finesService.testUpdateFines(Loan_id) > 0) {
                String successMessage = "Fine has been updated!";
                return ResponseEntity.status(200).body(successMessage);
            }

        } else {
            String errorMessage = "Error updating fine, please make sure the provided Loan_id is correct.";
            return ResponseEntity.status(400).body(errorMessage);
        }
        return ResponseEntity.status(500).body("An unexpected error occurred during fine update.");
    }

    @GetMapping("/allFines/{Card_id}")
    public List<Fines> displayAllFinesForCard_id(@PathVariable int Card_id) {
        return finesService.displayOfFinesFromCardID(Card_id);
    }
    @GetMapping("/activeFines/{Card_id}")
    public List<Fines> displayActiveFinesForCard_id(@PathVariable int Card_id) {
        return finesService.displayOfActiveFinesFromCardID(Card_id);
    }

    @PutMapping("/payFines/{Loan_id}, {payment}")
    public ResponseEntity<String> payingFines(@PathVariable int Loan_id, @PathVariable int payment) {
        if (bookLoanRepository.getBookLoanByLoanID(Loan_id) != null) {
            finesService.updateFineForToday(Loan_id);
            finesService.updateFineByPayment(Loan_id, payment);
            if (!finesService.checkIfPaidFully(Loan_id)) {
                String errorMessage = "Error updating fine, please make sure you provide the full amount due, no more, no less." +
                        " You can simply enter the amount as a whole number, ex. if your fine = $1.25, please enter '125'.";
                return ResponseEntity.status(400).body(errorMessage);
            }
            if (finesService.testUpdateFines(Loan_id) == 0) {
                String successMessage = "Fine has been paid!";
                return ResponseEntity.status(200).body(successMessage);
            }
        } else {
            String errorMessage = "Error paying fine, please make sure the provided Loan_id is correct.";
            return ResponseEntity.status(400).body(errorMessage);
        }
        return ResponseEntity.status(500).body("An unexpected error occurred during fine update.");
    }

    @GetMapping("/activeFines")
    public List<Object[]> allActiveFines() {
        return finesService.displayAllActiveFines();
    }

}
