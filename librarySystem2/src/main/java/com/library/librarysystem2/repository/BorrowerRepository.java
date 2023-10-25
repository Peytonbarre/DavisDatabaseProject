package com.library.librarysystem2.repository;

import com.library.librarysystem2.model.Borrower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BorrowerRepository extends JpaRepository<Borrower, Integer> {

    @Query(value="SELECT b FROM Borrower as b")
    public List<Borrower> fetchAllFromCustom();

// not using borrowerID in addition to something else in query right now, since the ID can be subjective
// ex. If I add Joe Brown, he gets ID of 1001, but then I go into database myself and delete him from the table, and then
// add another borrower, their ID is now 1002 even though the IDs go from 999,1000,1002. 1001 won't get reused. I'm sure
// there's a way to hard code this in java, but using the AUTO_INCREMENT in SQL seems to work well enough right now.

    /*
    @Query(value="SELECT b FROM Borrower as b WHERE bname =:val and Card_id=:id")
    public Borrower fetchByName(@Param("val") String name, @Param("id") int borrowerID);
    */

    @Query(value="SELECT b FROM Borrower as b WHERE bname =:val")
    public Borrower fetchByName(@Param("val") String name);

    @Query(value="SELECT b FROM Borrower as b WHERE Card_id=:id")
    public Borrower fetchByID(@Param("id") int borrowerID);
}
