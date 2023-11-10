package com.library.librarysystem2.book.repository;

import com.library.librarysystem2.book.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {


   //public Book fetchAllInfo(@Param("val") String name);\
   //@Query("SELECT B.Title FROM Author AS A JOIN Book_Author AS BA ON A.authorID = BA.authorID JOIN Book AS B ON BA.title = B.Title WHERE A.name =: name")

   //List<Book> findBooksByAuthor(@Param("val") String name);
}
