package com.library.librarysystem2.fines.repository;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.fines.model.Fines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FinesRepository extends JpaRepository<Fines, Integer> {

    @Query(value = "select b from Fines as b where b.Loan_id =:loan_id")
    public Fines getFinesByLoanID(@Param("loan_id") int Loan_id);

}
