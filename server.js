/**
* A simple API hosted under localhost:8080/books
*/
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bookId = 100;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function findBook(id) {
   for(var i =0; i<books.length; i++){
       if(books[i].id === id){
           return books[i];
       }
   }
   return null;

}

function removeBook(id) {
   var bookIndex = 0;
   for(var i=0; i<books.length; i++){
       if(books[i].id === id){
           bookIndex = i;
       }
   }
   books.splice(bookIndex, 1);
}
   

var  books = [
{id: 98, author: 'Stephen King', title: 'The Shining', year: 1977},
{id: 99, author: 'George Orwell', title: 1949}];
/**
* HTTP GET /books
* Should return a list of books
*/
app.get('/books', function (request, response) {
    
   response.header('Access-Control-Allow-Origin', '*');
   console.log('In GET function ');
   response.json(books);

});
/**
* HTTP GET /books/:id
* id is the unique identifier of the book you want to retrieve
* Should return the task with the specified id, or else 404
*/
app.get('/books/:id', function (request, response) {
  response.header('Access-Control-Allow-Origin', '*');
  console.log('Getting a  book with id ' + request.params.id);
  var  book = findBook(parseInt(request.params.id,10));
  if(book === null){
       response.sendStatus(404);
  }
  else{
       response.json(book);
  }
    
});
/**
* HTTP POST /books/
* The body of this request contains the book you are creating.
* Returns 200 on success
*/
app.post('/books/', function (request, response) {
   response.header('Access-Control-Allow-Origin', '*');
   debugger;
   console.log("***request");
   console.log(request.body);
   var  book = request.body;
   console.log('Saving book with the following structure ' + JSON.stringify(book));
   book.id = bookId++;
   books.push(book);
   // response.sendStatus(book);
   response.send(book);

});
/**
* HTTP PUT /books/
* The id is the unique identifier of the book you wish to update.
* Returns 404 if the book with this id doesn't exist.
*/
app.put('/books/:id', function (request, response) {
   response.header('Access-Control-Allow-Origin', '*');
   console.log("***request");
   console.log(request);
   var  book = request.body;
   console.log('Updating  Book ' + JSON.stringify(book));
   var currentBook = findBook(parseInt(request.params.id,10));
   if(currentBook === null){
       response.send(404);
   }
   else{
       //save the book locally
       currentBook.title = book.title;
       currentBook.year = book.year;
       currentBook.author = book.author;

       response.send(book);
   }
});
/**
* HTTP DELETE /books/
* The id is the unique identifier of the book you wish to delete.
* Returns 404 if the book with this id doesn't exist.
*/
app.delete('/books/:id', function (request, response) {
  console.log('calling delete');
  response.header('Access-Control-Allow-Origin', '*');
  var  book = findBook(parseInt(request.params.id,10));
  if(book === null){
      console.log('Could not find book');
     response.sendStatus(404);
  }
  else
  {
    console.log('Deleting ' + request.params.id);
    removeBook(parseInt(request.params.id, 10));
    response.sendStatus(200);
  }
  response.sendStatus(200);
    
});

//additional setup to allow CORS requests
var  allowCrossDomain = function(req, response, next) {
   response.header('Access-Control-Allow-Origin', "http://127.0.0.1:5500");
   response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
   response.header('Access-Control-Allow-Headers', 'Content-Type');

   if ('OPTIONS' == req.method) {
     response.sendStatus(200);
   }
   else {
     next();
   }
};

//start up the app on port 8080
app.listen(8080);
app.use(allowCrossDomain);
//Parses the JSON object given in the body request
// app.use(express.bodyParser());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(bodyParser.json());