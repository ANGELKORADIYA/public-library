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
  Select,
  MenuItem,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { post } from "../Rest";
import { toast } from "react-toastify";

const BookCard = styled(Card)({
  marginBottom: "16px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [imageIndex, setImageIndex] = useState(0); // Track current image index for hover navigation

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await post("book/getbooks", {
        searchTerm,
        author: selectedAuthor,
        genre: selectedGenre,
      });

      if (response.okk) {
        setBooks(response.data);
        const uniqueAuthors = [
          ...new Set(response.data.map((book) => book.author)),
        ];
        const uniqueGenres = [
          ...new Set(response.data.map((book) => book.genre)),
        ];
        setAuthors(uniqueAuthors);
        setGenres(uniqueGenres);
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
      const response = await post(`book/updatebook`, {
        book: formData,
        id: selectedBook.isbn,
      });

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
        const response = await post(`book/deletebook`, { id: bookId });

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

  const filterBooks = (book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAuthor =
      selectedAuthor === "" || book.author === selectedAuthor;
    const matchesGenre = selectedGenre === "" || book.genre === selectedGenre;

    return matchesSearch && matchesAuthor && matchesGenre;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleMouseEnter = () => {
    // Increment image index when hovering over the card media
    if (formData.images.length > 1) {
      setImageIndex((prevIndex) =>
        prevIndex === formData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleMouseLeave = () => {
    // Reset image index when mouse leaves the card media
    setImageIndex(0);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Books List
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            value={selectedAuthor}
            onChange={handleAuthorChange}
            variant="outlined"
            fullWidth
            displayEmpty
          >
            <MenuItem value="">All Authors</MenuItem>
            {authors.map((author) => (
              <MenuItem key={author} value={author}>
                {author}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            value={selectedGenre}
            onChange={handleGenreChange}
            variant="outlined"
            fullWidth
            displayEmpty
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {books
          .filter(filterBooks)
          .map((book) => (
            <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}>
              <BookCard>
                <CardMedia
                  component="img"
                  image={book.images.length > 0 ? book.images[imageIndex] : ""}
                  alt={book.title}
                  height={200}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
                <CardContent>
                  <Typography variant="h5">{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2">{book.publisher}</Typography>
                  <Typography variant="body2">{book.year}</Typography>
                </CardContent>
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
              </BookCard>
            </Grid>
          ))}
      </Grid>

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
