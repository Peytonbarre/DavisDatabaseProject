package com.library.librarysystem2.borrower.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Borrower {

    @Id
    private int Card_id;
    private String ssn;
    private String bname;
    private String address;
    private String phone;

    public int getId() {
        return Card_id;
    }

    public void setId(int Card_id) {
        this.Card_id = Card_id;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
