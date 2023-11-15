package com.library.librarysystem2.book_loans.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
public class Book_Loans {

    @Id
    private int Loan_id;
    private String ISBN;
    private int Card_id;
    private Date Date_out;
    private Date Due_date;
    private Date Date_in;

}
