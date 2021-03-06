import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import API from "../utils/API";

function Saved() {
  // Initialize books as an empty array
    const [books, setBooks] = useState([]);
//    const [formObject, setFormObject] =useState({
//      title:"",
//      author: "",
//      synopsis: ""
//    })
loadBooks()
  //  handleInputChange = (event) => {
  //    const {name,value}=event.target
  //    setFormObject(...formObject, {[name]:value}) //...formObject preserves the info so it doesn't get overwritten
  //  }

  // //  handleButtonClick = (event) => {
  // //   event.preventDefault();
  // //   if (formObject.title && formObject.author) {
  // //         API.deleteBook(id)
  //     .then(res => 
  //       loadBooks(res.data)
  //       )
  //     .catch(err => console.log(err));
  // }
  // //   }
  // //  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    //res is not defined... WHY???
    API.deleteBook(id)
      .then(res => 
        loadBooks(res.data)
        )
      .catch(err => console.log(err));
  }

    function loadBooks() {
      // Add code here to get all books from the database and store them using setBooks
    API.getBooks()
    .then(res =>
      setBooks(res.data)
      )
      .catch(err => console.log(err));
    };
    //console.log(books)
;
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => deleteBook(book)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            <br />
          </Col>
        </Row>
      </Container>
    );
  }

export default Saved;