import React from "react";
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

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

const CheckoutDetails = ({ open, handleClose, selectedBooks }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Checkout Details</DialogTitle>
      <DialogContent>
        {selectedBooks.map((book) => (
          <Grid container spacing={2} key={book._id}>
            <Grid item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.images[0]} // Displaying the first image, adjust as needed
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
                Checkout Date: {book.checkoutDetails.checkoutDate}
              </Typography>
              <Typography variant="body2">
                Return Date: {book.checkoutDetails.returnDate}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDetails;
