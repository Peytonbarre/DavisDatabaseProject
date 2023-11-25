package com.library.librarysystem2.author.repository;

import com.library.librarysystem2.author.model.Authors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Authors, Integer> {

    @Query(value = "select a.name from Authors as a where a.name like %:val%")
    public List<String> fetchAllByKeyName(@Param("val") String name);

    @Query(value="SELECT a.name FROM Authors as a WHERE a.name = :val", nativeQuery = true)
    public List<String> fetchExactMatch(@Param("val") String name);
    //Author findByName(String name);

    @Query(value = " SELECT B.ISBN, B.Title, A.name FROM Authors AS A JOIN Book_Authors AS BA ON A.authorID = BA.authorID JOIN Book AS B ON BA.ISBN = B.ISBN WHERE A.name like %:val% or B.Title like %:val%")
    public List<String> searchWithKeyQuery(@Param("val") String keyW);

}
