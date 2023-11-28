import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { Card, Container, Spinner, Button, ToggleButton, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { CardIDPrompt } from '../components/CardIDPrompt';
import 'react-toastify/dist/ReactToastify.css';

interface SearchResult {
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
  available: boolean;
}

export function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [checkedOut, setCheckedOut] = useState<{ [isbn: string]: boolean }>({});
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isbnSearch, setIsbnSearch] = useState('');
  const [cardIDPopup, setCardIDPopup] = useState(false);
  const [triggerIDToast, setTriggerIDToast] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    if(triggerIDToast){
    }
    setTriggerIDToast(false);
  }, [triggerIDToast]);

  const triggerToast = () => {
    toast.success("Book loan created");
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/customSearch/${searchTerm}`);
      if (response.ok) {
        const data: string[] = await response.json();
        const books: Book[] = await Promise.all(
          data.map(async (bookInfo) => {
            const [isbn, title, author] = bookInfo.split(',');
            return { isbn, title, author, available: false };
          }),
        );
        const uniqueBooks = books.filter(
          (book, index, self) => index === self.findIndex((b) => b.isbn === book.isbn),
        );
        setSearchResults(uniqueBooks);
        await checkAvailabilitySpliced(uniqueBooks);
        setPageNumber(1);
      } else {
        const text = await response.text();
        console.error('Search failed ' + text);
      }
    } catch (error) {
      console.error('search error: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAvailabilitySpliced = async (splicedBooks: Book[]) => {
    const availabilityPromise = splicedBooks.map(async (book) => {
      const available = await isBookAvailable(book.isbn);
      return { ...book, available };
    });
    const booksWithAvailability = await Promise.all(availabilityPromise);

    setSearchResults((prevResults) => {
      return prevResults.map((prevBook) => {
        const updatedBook = booksWithAvailability.find((newBook) => newBook.isbn === prevBook.isbn);
        return updatedBook || prevBook;
      });
    });
  };

  const isBookAvailable = async (isbn: string): Promise<boolean> => {
    try {
      const response = await fetch(`/book-loans/isBookAvailable/${isbn}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Success!: ' + data);
        return data;
      } else {
        console.log('Possible error');
        return false;
      }
    } catch (error) {
      console.error('Book availability error: ' + error);
      return false;
    }
  };

  const setSearchTermWithEffect = (term: string) => {
    setSearchTerm(term);
  };

  const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSearch();
    }
  };

  const handleAddToCart = (isbn: string) => {
    setCheckedOut((prev) => ({ ...prev, [isbn]: !prev[isbn] }));
  };

  const handleNextPage = async () => {
    const totalPage = Math.ceil(searchResults.length / itemsPerPage);
    if (pageNumber < totalPage) {
      setPageNumber((prev) => prev + 1);
      const currentItems = searchResults.slice(indexOfLastItem, indexOfLastItem + itemsPerPage);
      console.log(currentItems);
      console.log(pageNumber);
      await checkAvailabilitySpliced(currentItems);
    }
  };

  const handlePreviousPage = async () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
      const currentItems = searchResults.slice(indexOfFirstItem - itemsPerPage, indexOfFirstItem);
      console.log(currentItems);
      console.log(pageNumber);
      await checkAvailabilitySpliced(currentItems);
    }
  };

  const handleCheckout = async () => {
    try {
      setCardIDPopup(true);
      const checkedOutBooks = Object.keys(checkedOut).filter((isbn) => checkedOut[isbn]);
      if (checkedOutBooks.length === 0) {
        toast.warning('No books selected');
        return;
      } else if ((await getNumCheckedOut()) + checkedOutBooks.length > 3) {
        toast.error('Too many books checked out');
        return;
      } else {
        await Promise.all(
          checkedOutBooks.map(async (isbn) => {
            const response = await fetch(
              `/book-loans/checkout/${isbn},${localStorage.getItem('key')}`,
              {
                method: 'PUT',
              },
            );

            if (response.ok) {
              console.log('Book checked out');
              setCheckedOut((prev) => ({ ...prev, [isbn]: false }));
            } else {
              console.error('Error checking out book');
            }
          }),
        );
        await handleSearch();
        await new Promise((resolve) => {
          toast.success('Books have been checked out', {
            onClose: resolve,
          });
        });
      }
    } catch (error) {
      console.error('Error checking out: ' + error);
    }
  };

  const handleIDPopup = async () => {
    setCardIDPopup(false);
  };

  // const handleCheckout = async () => {
  //   try {
  //     const checkedOutBooks = Object.keys(checkedOut).filter((isbn) => checkedOut[isbn]);
  //     if (checkedOutBooks.length === 0) {
  //       toast.warning('No books selected');
  //       return;
  //     } else if ((await getNumCheckedOut()) + checkedOutBooks.length > 3) {
  //       toast.error('Too many books checked out');
  //       return;
  //     } else {
  //       await Promise.all(
  //         checkedOutBooks.map(async (isbn) => {
  //           const response = await fetch(
  //             `/book-loans/checkout/${isbn},${localStorage.getItem('key')}`,
  //             {
  //               method: 'PUT',
  //             },
  //           );

  //           if (response.ok) {
  //             console.log('Book checked out');
  //             setCheckedOut((prev) => ({ ...prev, [isbn]: false }));
  //           } else {
  //             console.error('Error checking out book');
  //           }
  //         }),
  //       );
  //       await handleSearch();
  //       await new Promise((resolve) => {
  //         toast.success('Books have been checked out', {
  //           onClose: resolve,
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error checking out: ' + error);
  //   }
  // };

  const getNumCheckedOut = async () => {
    try {
      const response = await fetch(`/book-loans/getNumLoans/${localStorage.getItem('key')}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Books checked out: ' + data);
        return data;
      } else {
        console.error('Error getting num books checked out');
        return 4;
      }
    } catch (error) {
      console.log('Error getting num of books checked out ' + error);
      return 4;
    }
  };

  const handleCheckoutbyISBN = async () => {
    try {
      if ((await getNumCheckedOut()) > 2) {
        toast.error('Too many books checked out');
        return;
      } else {
        const response = await fetch(
          `/book-loans/checkout/${isbnSearch},${localStorage.getItem('key')}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.ok) {
          console.log('Book checked out');
          toast.success('Books have been checked out');
        } else {
          console.error('Error checking out book');
          toast.error('Book already checked out / not found');
        }
      }
    } catch (error) {
      console.error('Error checking out: ' + error);
    }
  };

  // const handleQuickCheckout = async (isbn: string) => {
  //   try{
  //     if(await getNumCheckedOut() > 2){
  //       toast.error("Too many books checked out")
  //     }else{
  //       const response = await fetch(
  //         `/book-loans/checkout/${isbn},${localStorage.getItem('key')}`,
  //         {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       if(response.ok){
  //         console.log('Book checked out');
  //         setCheckedOut((prev) => ({ ...prev, [isbn]: false }));
  //       }else{
  //         toast.error('Book already checked out / not found');
  //       }
  //       await handleSearch();
  //       await new Promise((resolve) => {
  //         toast.success('Book has been checked out', {
  //           onClose: resolve,
  //         });
  //       });
  //     }
  //   }catch{

  //   };
  // };

  const checkoutErrors = async (isbn: string) => {};

  const handleQuickCheckout = async () => {
    setCardIDPopup(true);
  };

  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer />
      {cardIDPopup && <CardIDPrompt onClickFunction={handleIDPopup} triggerToast={triggerToast}/>}
      <SearchBar
        onSearch={handleSearch}
        setSearchTerm={setSearchTermWithEffect}
        onKeyDown={handleOnKeyDown}
      />
      {isLoading && (
        <Spinner animation="border" role="status" className="mt-4">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Container className="mt-5">
        {currentItems.map((result, index) => (
          <Card key={index} className="p-3 my-4">
            <div className="d-flex align-items-start">
              <Card.Img
                src={`https://pictures.abebooks.com/isbn/${result.isbn}.jpg`}
                style={{
                  maxWidth: '150px',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  marginLeft: 16,
                }}
              ></Card.Img>
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: '2em',
                    fontWeight: '700',
                  }}
                >
                  {result.title}
                </Card.Title>
                <Card.Subtitle
                  style={{
                    fontSize: '1.5em',
                    fontWeight: '500',
                  }}
                >
                  {result.author}
                </Card.Subtitle>
                <Card.Text
                  className="mb-4"
                  style={{
                    fontSize: '1.25em',
                    fontWeight: '400',
                  }}
                >
                  {result.isbn}
                </Card.Text>
                {!result.available ? (
                  <>
                    <Button className="me-2" onClick={() => handleQuickCheckout()}>
                      Quick Checkout
                    </Button>
                    <ToggleButton
                      id={`toggle-check-${result.isbn}`}
                      type="checkbox"
                      variant="outline-success"
                      value={checkedOut[result.isbn] ? '1' : (undefined as unknown as string)}
                      checked={checkedOut[result.isbn]}
                      onChange={() => handleAddToCart(result.isbn)}
                    >
                      {checkedOut[result.isbn] ? 'Added to Cart' : 'Add to Cart'}
                    </ToggleButton>
                  </>
                ) : (
                  <h5 style={{ color: 'red' }}>Not available (Checked Out)</h5>
                )}
              </Card.Body>
            </div>
          </Card>
        ))}
        {!(searchResults.length === 0) ? (
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Button className="mx-3 mt-2 mb-4" onClick={handlePreviousPage}>
              Previous
            </Button>
            <Button className="mx-3 mt-2 mb-4" onClick={handleCheckout} variant="success">
              Checkout Cart
            </Button>
            <Button className="mx-3 mt-2 mb-4" onClick={handleNextPage}>
              Next
            </Button>
          </div>
        ) : (
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="ISBN"
                className="me-2 rounded-pill mt-2 mb-4"
                aria-label="Search"
                value={isbnSearch}
                onChange={(e) => setIsbnSearch(e.target.value)}
              />
              <Button
                className="mx-3 mt-2 mb-4 rounded-pill"
                onClick={handleCheckoutbyISBN}
                variant="success"
              >
                Checkout By ISBN
              </Button>
            </Form>
          </div>
        )}
      </Container>
    </>
  );
}
