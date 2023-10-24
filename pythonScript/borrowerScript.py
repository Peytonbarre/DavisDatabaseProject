f = open('borrowers.csv', 'r', encoding="utf-8")
f2 = open('insertBorrowers.txt', 'w', encoding="utf-8")

borrower_list = list(f)
for line in borrower_list[0:]:
    line = line.strip()
    borrowerATTR_array = line.split(',')
    removeID = 'ID'
    borrowerID = borrowerATTR_array[0].replace(removeID, '')
    borrowerSSN = borrowerATTR_array[1]
    borrowerNAME = borrowerATTR_array[2] + " " + borrowerATTR_array[3]
    borrowerADDR = borrowerATTR_array[5]
    borrowerPHNU = borrowerATTR_array[8]

    f2.write("INSERT INTO Borrower VALUES (\"" + borrowerID + "\" , \"" + borrowerSSN +
             "\" , \"" + borrowerNAME + "\" , \"" + borrowerADDR + "\" , \"" + borrowerPHNU +
             "\");\n")
    f2.write("-" * 80)
    f2.write("\n")

f.close()
f2.close()

