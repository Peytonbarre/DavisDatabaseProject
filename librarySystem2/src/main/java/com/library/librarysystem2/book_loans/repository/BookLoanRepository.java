package com.library.librarysystem2.book_loans.repository;

import com.library.librarysystem2.book_loans.model.Book_Loans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
import java.util.Objects;

public interface BookLoanRepository extends JpaRepository<Book_Loans, Integer> {
    @Query(value = "select b.IsCheckedOut from Book as b where b.ISBN =:isbn")
    public Integer checkAvailability(@Param("isbn") String ISBN);

    @Query(value = "select COUNT(b.Card_id) from Book_Loans as b where b.Card_id =:card_id and b.Date_in = null")
    public Integer numOfLoanedBooks(@Param("card_id") int Card_id);

    @Query(value = "select b from Book_Loans as b where b.Loan_id =:loan_id")
    public Book_Loans getBookLoanByLoanID(@Param("loan_id") int Loan_id);

    @Query(value = "select b.Loan_id from Book_Loans as b where b.ISBN=:isbn and b.Card_id=:card_id and b.Date_in IS NULL")
    public Integer getLoanID(@Param("isbn") String ISBN, @Param("card_id") int Card_id);

    @Query(value = "select b.Loan_id from Book_Loans as b where b.ISBN=:isbn and b.Date_in IS NULL")
    public Integer getLoanIDAll(@Param("isbn") String ISBN);

    // @Query(value = "select b.Loan_id from Book_Loans as b where b.ISBN=:isbn and b.Card_id=:card_id")
    // public Integer getLoanIDUnique(String iSBN, int card_id, String author);

    @Query(value = "select b from Book_Loans as b inner join Borrower as bo on b.Card_id = bo.Card_id where (b.ISBN =:isbn and b.Date_in = null) or (b.Card_id =:card_id and b.Date_in = null) or (bo.bname like %:bname% and b.Date_in = null)")
    public List<Book_Loans> activeBookLoans(@Param("isbn") String ISBN, @Param("card_id") int Card_id, @Param("bname") String bname);

    @Query(value = "SELECT b.ISBN, b.Title, a.name, bl.Date_out, bl.Due_date FROM Book_Loans bl INNER JOIN Book_Authors ba ON bl.ISBN = ba.ISBN INNER JOIN author a ON ba.AuthorID = a.AuthorID JOIN Book AS B ON BA.ISBN = B.ISBN  WHERE bl.Card_id = :card_id AND bl.Date_in IS NULL", nativeQuery = true)
    public List<Object[]> currentBookLoans(@Param("card_id") int Card_id);

    @Query(value = "SELECT b.ISBN, b.Title, a.name, bl.Date_out, bl.Due_date FROM Book_Loans bl INNER JOIN Book_Authors ba ON bl.ISBN = ba.ISBN INNER JOIN author a ON ba.AuthorID = a.AuthorID JOIN Book AS B ON BA.ISBN = B.ISBN  WHERE bl.Date_in IS NULL", nativeQuery = true)
    public List<Object[]> allActiveBookLoans();

    @Query(value = "SELECT book.title, book_loans.Due_date, fines.Fine_amt FROM fines JOIN book_loans ON fines.Loan_id = book_loans.Loan_id JOIN book ON book_loans.ISBN = book.ISBN WHERE book_loans.Loan_id = :loan_id", nativeQuery = true)
    public List<Object[]> getBookData(@Param("loan_id") int Loan_id);

    // @Query(value = "select b.Loan_id from Book_Loans as b where b.ISBN=:isbn and b.Card_id=:card_id group by b.isbn")
    // public Integer getLoanIDException(@Param("isbn") String ISBN, @Param("card_id") int Card_id);

    @Query(value = "select bl.Date_in from Book_Loans as bl where bl.Loan_id =:loan_id")
    public Date checkingBookLoan(@Param("loan_id") int Loan_id);

}
