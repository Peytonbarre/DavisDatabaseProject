package com.library.librarysystem2.book.model;
import com.library.librarysystem2.author.model.Authors;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Book {

    @Id
    private String ISBN;
    private String Title;

}
