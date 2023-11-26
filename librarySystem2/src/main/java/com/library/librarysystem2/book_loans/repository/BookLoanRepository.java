package com.library.librarysystem2.book_loans.repository;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Objects;

public interface BookLoanRepository extends JpaRepository<Book_Loans, Integer> {
    @Query(value = "select b.IsCheckedOut from Book as b where b.ISBN =:isbn")
    public Integer checkAvailability(@Param("isbn") String ISBN);

    @Query(value = "select COUNT(b.Card_id) from Book_Loans as b where b.Card_id =:card_id and b.Date_in = null")
    public Integer numOfLoanedBooks(@Param("card_id") int Card_id);

    @Query(value = "select b from Book_Loans as b where b.Loan_id =:loan_id")
    public Book_Loans getBookLoanByLoanID(@Param("loan_id") int Loan_id);

    @Query(value = "select b.Loan_id from Book_Loans as b where b.ISBN=:isbn and b.Card_id=:card_id")
    public Integer getLoanID(@Param("isbn") String ISBN, @Param("card_id") int Card_id);

    @Query(value = "select b from Book_Loans as b inner join Borrower as bo on b.Card_id = bo.Card_id where (b.ISBN =:isbn and b.Date_in = null) or (b.Card_id =:card_id and b.Date_in = null) or (bo.bname like %:bname% and b.Date_in = null)")
    public List<Book_Loans> activeBookLoans(@Param("isbn") String ISBN, @Param("card_id") int Card_id, @Param("bname") String bname);

/*    @Query(value = "SELECT b.ISBN, b.Title, a.name, bl.Date_out, bl.Due_date FROM Book_Loans bl INNER JOIN Book_Authors ba ON bl.ISBN = ba.ISBN INNER JOIN Authors a ON ba.AuthorID = a.AuthorID JOIN Book AS B ON BA.ISBN = B.ISBN  WHERE bl.Card_id = :card_id AND bl.Date_in IS NULL", nativeQuery = true)
    public List<Object[]> activeBookLoans(@Param("card_id") int Card_id);*/



}
