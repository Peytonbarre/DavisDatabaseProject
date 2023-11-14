package com.library.librarysystem2.service;


import com.library.librarysystem2.borrower.model.Borrower;
import com.library.librarysystem2.author.repository.AuthorRepository;
import com.library.librarysystem2.book.repository.BookRepository;
import com.library.librarysystem2.borrower.repository.BorrowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibraryServiceImp {

    @Autowired
    private BorrowerRepository borrowerRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;



    public Borrower saveDetails(Borrower borrower) {
        return borrowerRepository.save(borrower);
    }

    public List<Borrower> fetchAll(){
        return borrowerRepository.fetchAllFromCustom();
    }


    /*
    this only works if you POST this info as a JSON in Postman, that's what i did:
    {
    "ssn" : "821-32-1223",
    "bname" : "Joe Brown",
    "address" : "2002 duhlhjlhje dr",
    "phone" : "(770) 777 6792"
    }
     */

    public Borrower fetchWithName(){
        return borrowerRepository.fetchByName("Joe Brown");
    }

    public Borrower fetchWithID(int id){
        return borrowerRepository.fetchByID(id);
    }

    public boolean fetchAuthorizedUser(int borrID) {
        List<Integer> idOfBorr = borrowerRepository.fetchID(borrID);
        System.out.println("Search term: " + borrID);
        System.out.println("Result of query: " + idOfBorr);
        if (!idOfBorr.isEmpty()) {
            System.out.println("Card_id of Borrower exists and is in the database. ");
            return !idOfBorr.isEmpty();
        } else {
            System.out.println("Card_id was not found in database. ");
            return !idOfBorr.isEmpty();
        }
    }

    public Integer loginBorrower(int borrID, String fullName) {
        Integer idOfBorrower = borrowerRepository.loginWithIDandNAME(borrID, fullName);
        System.out.println("Search term - Username: " + fullName + ", Password: " + borrID);
        System.out.println("Result of query (should be the Card_id): " + idOfBorrower);
        if (idOfBorrower != null) {
            System.out.println("Borrower exists and is in the database.");
            return idOfBorrower;
        } else {
            System.out.println("Card_id was not found in database.");
            return 0;
        }
    }

    public List<String> fetchWithKeyName(String auth) {

        List<String> authors = authorRepository.fetchAllByKeyName(auth);
        System.out.println("Search term by name: " + auth);
        System.out.println("Result of query by name: " + authors);
        return authors;

    }

    public List<String> fetchWithExactName(String auth) {

        List<String> authors = authorRepository.fetchExactMatch(auth);
        System.out.println("Search term exact: " + auth);
        System.out.println("Result of exact query: " + authors);
        return authors;

    }

    public List<String> bigKeySearch(String keyWord) {

        List<String> searchResults = authorRepository.searchWithKeyQuery(keyWord);
        System.out.println("Search term: " + keyWord);
        System.out.println("Result of query: " + searchResults);
        return searchResults;

    }
}
