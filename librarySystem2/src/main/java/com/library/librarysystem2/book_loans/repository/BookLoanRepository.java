package com.library.librarysystem2.book_loans.repository;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookLoanRepository extends JpaRepository<Book_Loans, Integer> {
    @Query(value = "select b.IsCheckedOut from Book as b where b.ISBN =:isbn")
    public Integer checkAvailability(@Param("isbn") String ISBN);

    @Query(value = "select COUNT(b.Card_id) from Book_Loans as b where b.Card_id =:card_id and b.Date_in = null")
    public Integer numOfLoanedBooks(@Param("card_id") int Card_id);

    @Query(value = "select b from Book_Loans as b where b.Loan_id =:loan_id")
    public Book_Loans getBookLoanByLoanID(@Param("loan_id") int Loan_id);
    @Query(value = "select b.Loan_id from Book_Loans as b where b.ISBN=:isbn and b.Card_id=:card_id")
    public Integer getLoanID(@Param("isbn") String ISBN, @Param("card_id") int Card_id);



}
