package com.library.librarysystem2.fines.repository;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import com.library.librarysystem2.fines.model.Fines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FinesRepository extends JpaRepository<Fines, Integer> {

    @Query(value = "select f from Fines as f where f.Loan_id =:loan_id")
    public Fines getFinesByLoanID(@Param("loan_id") int Loan_id);

    @Query(value = "select f.Fine_amt from Fines as f where f.Loan_id =:loan_id")
    public double testingFineUpdate(@Param("loan_id") int Loan_id);

    @Query(value = "select f.Fine_amt from Fines as f where f.Loan_id =:loan_id")
    public double checkingPaidFully(@Param("loan_id") int Loan_id);

    @Query(value = "select f from Fines as f inner join Book_Loans as bl on bl.Loan_id = f.Loan_id where bl.Card_id =:card_id")
    public List<Fines> displayOfFinesFromCard_id(@Param("card_id") int Card_id);

    @Query(value = "select f from Fines as f inner join Book_Loans as bl on bl.Loan_id = f.Loan_id where bl.Card_id =:card_id and f.Paid = 0")
    public List<Fines> displayOfActiveFinesFromCard_id(@Param("card_id") int Card_id);

    @Query(value = "select f.Paid, f.Loan_id, f.Fine_amt, bl.Card_id from Fines as f inner join Book_Loans as bl on bl.Loan_id = f.Loan_id where f.Paid = 0", nativeQuery = true)
    public List<Object[]> allActiveFines();
}
