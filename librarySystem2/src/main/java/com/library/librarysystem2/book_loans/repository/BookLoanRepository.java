package com.library.librarysystem2.book_loans.repository;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookLoanRepository extends JpaRepository<Book_Loans, Integer> {
    @Query(value = "select b.IsCheckedOut from Book as b where b.ISBN =:isbn")
    public Integer checkAvailability(@Param("isbn") String ISBN);

}
