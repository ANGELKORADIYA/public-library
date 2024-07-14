import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { post } from "../Rest"; // Assuming you have APIs for GET, PUT, and DELETE
import { toast } from "react-toastify";

const BookCard = styled(Card)({
  marginBottom: "16px",
});

const CardActions = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    genre: "",
    quantity: "",
    images: [],
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await post("book/getbooks"); // Replace with your actual API endpoint for fetching all books
      if (response.okk) {
        setBooks(response.data);
        console.log(books)
      } else {
        toast.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to fetch books");
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setFormData({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year: book.year,
      genre: book.genre,
      quantity: book.quantity,
      images: book.images,
    });
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setSelectedBook(null);
    setOpenEditDialog(false);
    setFormData({
      isbn: "",
      title: "",
      author: "",
      publisher: "",
      year: "",
      genre: "",
      quantity: "",
      images: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateBook = async () => {
    try {
      const response = await post(`book/updatebook`, formData); // Assuming 'put' is your API function for updating a book

      if (response.okk) {
        toast.success("📚 Book Details Updated Successfully!");
        setOpenEditDialog(false);
        fetchBooks(); // Refresh the list of books after update
      } else {
        toast.warn(response.message || "Failed to update book details");
      }
    } catch (error) {
      console.error("Updating book details failed:", error);
      toast.error("Failed to update book details");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await post(`book/deletebook`, {isbn: bookId}); // Assuming 'remove' is your API function for deleting a book

        if (response.okk) {
          toast.success("📚 Book Deleted Successfully!");
          fetchBooks(); // Refresh the list of books after deletion
        } else {
          toast.warn(response.message || "Failed to delete book");
        }
      } catch (error) {
        console.error("Deleting book failed:", error);
        toast.error("Failed to delete book");
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Books List
      </Typography>
      {books.map((book) => (
        <BookCard key={book._id}>
          <CardContent>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {book.author}
            </Typography>
            <Typography variant="body2">{book.publisher}</Typography>
            <Typography variant="body2">{book.year}</Typography>
            <CardActions>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => handleEditClick(book)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => handleDeleteBook(book.isbn)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </BookCard>
      ))}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Book Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ISBN"
                variant="outlined"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author"
                variant="outlined"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Publisher"
                variant="outlined"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Year"
                variant="outlined"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Genre"
                variant="outlined"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                variant="outlined"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button
            onClick={handleUpdateBook}
            variant="contained"
            color="primary"
          >
            Update Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BooksList;
