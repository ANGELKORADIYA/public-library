import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { post } from '../Rest';

const StyledCard = styled(Card)({
  marginBottom: '16px',
});

const CheckoutList = () => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const fetchCheckouts = async () => {
    try {
      const response = await post('book/checkouttt');   
      setCheckouts(response.data);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
      // Handle error, e.g., show error message using toast or similar
    }
  };

  return (
    <div style={{ margin: '16px' }}>
      <Typography variant="h5" gutterBottom>
        All Checkouts
      </Typography>
      <Grid container spacing={2}>
        {checkouts.map((checkout) => (
          <Grid item xs={12} key={checkout._id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6">Checkout ID: {checkout._id}</Typography>
                <Typography variant="body2">
                  User: {checkout.user} {/* Assuming user has a username */}
                </Typography>
                <Typography variant="body2">
                  Checkout Date: {new Date(checkout.items[0].checkoutDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">Items:</Typography>
                <ul>
                  {checkout.items.map((item) => (
                    <li key={item._id}>
                      {item.title} - ISBN: {item.isbn} | Return Date: {new Date(item.returnDate).toLocaleDateString()} | Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                {/* Add actions if needed, e.g., delete checkout */}
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CheckoutList;
