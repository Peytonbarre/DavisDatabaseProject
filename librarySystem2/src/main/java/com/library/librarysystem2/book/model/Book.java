package com.library.librarysystem2.book.model;
import com.library.librarysystem2.author.model.Authors;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "book")
public class Book {

    @Id
    private String ISBN;
    private String Title;
    @Column(name = "ischeckedout")
    private int IsCheckedOut;
}
