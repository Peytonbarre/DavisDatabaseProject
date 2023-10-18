f = open('booksOG.csv', 'r', encoding="utf-8")
f2 = open('insertSTMTS.txt', 'w', encoding="utf-8")

book_list = list(f)
authorid = 0
n = 0
author_array = []
author_dict = {}
for line in book_list[0:]:
    line = line.strip()
    book_array = line.split('\t')
    isbn = book_array[1]
    title = book_array[2]
    f2.write("INSERT INTO Book VALUES (\"" + isbn + "\" , \"" + title + "\");\n")  # write out to a file and then run the file in sql database
    authors = book_array[3].split(',')  # author
    for auth in authors:
        if auth in author_dict:
            author_id = author_dict[auth]
            #f2.write(str("INSERT INTO Authors VALUES (\"" + str(author_id) + "\" , \"" + auth + "\");"))
            #f2.write("\n")
            f2.write(str("INSERT INTO Book_Authors VALUES (\"" + str(author_id) + "\" , \"" + isbn + "\");"))
            f2.write("\n")
        else:
            author_id = authorid
            author_dict[auth] = authorid
            f2.write(str("INSERT INTO Authors VALUES (\"" + str(authorid) + "\" , \"" + auth + "\");"))
            f2.write("\n")
            f2.write(str("INSERT INTO Book_Authors VALUES (\"" + str(authorid) + "\" , \"" + isbn + "\");"))
            f2.write("\n")
            authorid += 1
        author_array.append((auth, author_id))
        #print(author_array)
    f2.write("-" * 80)
    f2.write("\n")

f.close()
f2.close()

