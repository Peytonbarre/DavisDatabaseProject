package com.library.librarysystem2.author.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Author")
public class Authors {

    @Id
    @Column(name = "authorid")
    private int authorID;
    private String name;

}
