import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast } from "react-toastify";
import { post } from "../Rest";

const StyledCard = styled(Card)({
  display: "flex",
  marginBottom: "16px",
});

const StyledCardMedia = styled(CardMedia)({
  width: 200,
  minHeight: 300,
  objectFit: "cover",
});

const StyledCardContent = styled(CardContent)({
  flex: "1 0 auto",
});

const StyledGridItem = styled(Grid)({
  marginBottom: "16px",
});

const StyledDialogContent = styled(DialogContent)({
  paddingTop: "16px",
  paddingBottom: "16px",
});

const StyledDialogActions = styled(DialogActions)({
  paddingTop: "16px",
  paddingBottom: "16px",
});

const CheckoutSystem = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    days: 15,
    quantity: 1,
  });
  const [applyToAll, setApplyToAll] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await post("book/getallbooks"); // Replace with your actual API endpoint for fetching all books
      if (response.okk) {
        setBooks(response.data);
      } else {
        toast.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to fetch books");
    }
  };

  const handleOpenCheckoutDialog = () => {
    setOpenCheckoutDialog(true);
  };

  const handleCloseCheckoutDialog = () => {
    setOpenCheckoutDialog(false);
  };

  const handleCheckout = async () => {
    const checkoutData = selectedBooks.map((book) => ({
      isbn: book.isbn,
      returnDate: book.checkoutDetails.days,
      quantity: book.checkoutDetails.quantity,
    }));

    const res = await post("book/checkout", { books: checkoutData,alldetails:selectedBooks });

    if (res.okk) {
      toast.success("Books Checked Out Successfully!");
    } else {
      toast.error("Checkout Failed");
    }

    handleCloseCheckoutDialog();
  };

  const handleSelectBook = (isbn) => {
    const selectedBook = books.find((book) => book.isbn === isbn);
    setSelectedBooks((prevSelected) => [
      ...prevSelected,
      { ...selectedBook, checkoutDetails },
    ]);
    toast.info(`Selected ${selectedBook.title}`);
  };

  const handleRemoveBook = (isbn) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.filter((book) => book.isbn !== isbn)
    );
    toast.info(`Deselected Book`);
  };

  const handleChange = (e, isbn) => {
    const { name, value } = e.target;
    setSelectedBooks((prevSelected) =>
      prevSelected.map((book) =>
        book.isbn === isbn
          ? {
              ...book,
              checkoutDetails: { ...book.checkoutDetails, [name]: value },
            }
          : book
      )
    );
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setCheckoutDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (applyToAll) {
      setSelectedBooks((prevSelected) =>
        prevSelected.map((book) => ({
          ...book,
          checkoutDetails: { ...book.checkoutDetails, [name]: value },
        }))
      );
    }
  };

  const handleApplyToAllChange = (e) => {
    setApplyToAll(e.target.checked);
    if (e.target.checked) {
      setSelectedBooks((prevSelected) =>
        prevSelected.map((book) => ({
          ...book,
          checkoutDetails: {
            days: checkoutDetails.days,
            quantity: checkoutDetails.quantity,
          },
        }))
      );
    }
  };

  const isBookSelected = (isbn) => {
    return selectedBooks.some((selectedBook) => selectedBook.isbn === isbn);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleNextImage = (isbn) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [isbn]: (prevIndex[isbn] + 1) % books.find((book) => book.isbn === isbn).images.length,
    }));
  };

  const handlePrevImage = (isbn) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [isbn]: (prevIndex[isbn] - 1 + books.find((book) => book.isbn === isbn).images.length) % books.find((book) => book.isbn === isbn).images.length,
    }));
  };

  return (
    <div style={{ margin: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Checkout System
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <StyledGridItem item key={book.isbn} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledCardMedia
                image={book.images[currentImageIndex[book.isbn] || 0]} // Displaying the current image
                title={book.title}
              />
              <StyledCardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author} | {book.publisher} | {book.year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Genre: {book.genre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {book.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ISBN: {book.isbn}
                </Typography>
              </StyledCardContent>
              <CardActions>
                <IconButton
                  onClick={() => handlePrevImage(book.isbn)}
                  size="small"
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleNextImage(book.isbn)}
                  size="small"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
                {isBookSelected(book.isbn) ? (
                  <IconButton
                    onClick={() => handleRemoveBook(book.isbn)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleSelectBook(book.isbn)}
                    disabled={isBookSelected(book.isbn)}
                  >
                    Select
                  </Button>
                )}
              </CardActions>
            </StyledCard>
          </StyledGridItem>
        ))}
      </Grid>

      <Dialog
        open={openCheckoutDialog}
        onClose={handleCloseCheckoutDialog}
        fullWidth
      >
        <DialogTitle>Checkout Details</DialogTitle>
        <StyledDialogContent>
          {selectedBooks.map((book) => (
            <Grid container spacing={2} key={book.isbn} style={{ marginBottom: "16px" }}>
              <Grid item xs={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.images[currentImageIndex[book.isbn] || 0]} // Displaying the current image
                    alt={book.title}
                  />
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1">{book.author}</Typography>
                <Typography variant="body2">
                  Publisher: {book.publisher} | Year: {book.year}
                </Typography>
                <Typography variant="body2">Genre: {book.genre}</Typography>
                <Typography variant="body2">
                  Quantity: {book.quantity}
                </Typography>
                <Typography variant="body2">
                  ISBN: {book.isbn}
                </Typography>
                {!applyToAll ? (
                  <Grid container my={1} spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Days"
                          value={
                            book.checkoutDetails?.days || checkoutDetails.days
                          }
                          onChange={(e) => handleChange(e, book.isbn)}
                          name="days"
                          variant="outlined"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <TextField
                          label="Quantity"
                          value={
                            book.checkoutDetails?.quantity ||
                            checkoutDetails.quantity
                          }
                          onChange={(e) => handleChange(e, book.isbn)}
                          name="quantity"
                          variant="outlined"
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          ))}
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={applyToAll}
                    onChange={handleApplyToAllChange}
                  />
                }
                label="Apply to All Selected Books"
              />
            </Grid>
          </Grid>
          {applyToAll && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Days"
                    value={checkoutDetails.days}
                    onChange={handleGeneralChange}
                    name="days"
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Quantity"
                    value={checkoutDetails.quantity}
                    onChange={handleGeneralChange}
                    name="quantity"
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseCheckoutDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCheckout} color="primary">
            Checkout
          </Button>
        </StyledDialogActions>
      </Dialog>

      {selectedBooks.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCheckoutDialog}
          style={{ marginTop: "16px" }}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default CheckoutSystem;
