import React, { useState } from "react";
import {
  Typography,
  Grid,
  IconButton,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { post } from "../Rest";
import { toast } from "react-toastify";

const StyledForm = styled("form")({
  padding: "2rem",
  maxWidth: "600px",
  margin: "auto",
});

const StyledTextField = styled("div")({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
  width: "100%",
});

const StyledImagePreview = styled("img")({
  maxWidth: "200px",
  maxHeight: "200px",
  marginRight: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
});

const PreviewContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "16px",
});

const ThumbnailContainer = styled("div")({
  position: "relative",
  marginRight: "8px",
  marginBottom: "8px",
});

const RemoveButton = styled(IconButton)({
  position: "absolute",
  top: "-8px",
  right: "-8px",
  backgroundColor: "#ffffff",
  zIndex: 1,
});

const UploadContainer = styled("label")({
  display: "inline-block",
  marginTop: "16px",
  padding: "12px 20px",
  border: "2px dashed #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "border-color 0.3s ease-in-out",
  "&:hover": {
    borderColor: "#aaa",
  },
});

const InstructionText = styled("div")({
  fontSize: "14px",
  marginTop: "8px",
  color: "#666",
});

const BookDetailsForm = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [state, setState] = useState({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    genre: "",
    quantity: "",
    images: [],
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const imagesArray = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageDataUrl = reader.result;
          imagesArray.push(imageDataUrl);
          setImagePreviews((prevPreviews) => [...prevPreviews, imageDataUrl]);
          setState((prevState) => ({
            ...prevState,
            images: [...prevState.images, imageDataUrl],
          }));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setState((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageClick = (imageData) => {
    try {
      const byteCharacters = atob(imageData.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      const imageUrl = URL.createObjectURL(blob);
      window.open(imageUrl, "_blank");
    } catch (error) {
      console.error("Error opening image in new tab:", error.message);
      alert("Failed to open image. Please check your browser settings.");
    }
  };

  const handleSaveBook = async (evt) => {
    evt.preventDefault();
    document.body.style.cursor = "wait"; // Change cursor to wait for the entire body

    try {
      const response = await post("book/addbook", state);

      if (response.okk) {
        toast.success("📚 Book Details Saved Successfully!");
        // Optionally redirect or perform another action after saving
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error("Saving book details failed:", error);
    } finally {
      document.body.style.cursor = "default"; // Reset cursor to default after processing
    }
  };

  return (
    <StyledForm onSubmit={handleSaveBook}>
      <Typography variant="h5" gutterBottom>
        Add Book Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ISBN"
            variant="outlined"
            value={state.isbn}
            onChange={(e) => setState({ ...state, isbn: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            variant="outlined"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Author"
            variant="outlined"
            value={state.author}
            onChange={(e) => setState({ ...state, author: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Publisher"
            variant="outlined"
            value={state.publisher}
            onChange={(e) => setState({ ...state, publisher: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Year"
            variant="outlined"
            value={state.year}
            onChange={(e) => setState({ ...state, year: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Genre"
            variant="outlined"
            value={state.genre}
            onChange={(e) => setState({ ...state, genre: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            variant="outlined"
            value={state.quantity}
            onChange={(e) => setState({ ...state, quantity: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <UploadContainer htmlFor="upload-image">
            <input
              accept="image/*"
              id="upload-image"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <Typography variant="body1" color="primary">
              Click here to add images
            </Typography>
          </UploadContainer>
          <InstructionText>
            (You can select multiple images. Supported formats: jpg, png, gif)
          </InstructionText>
        </Grid>
        <Grid item xs={12}>
          {imagePreviews.length > 0 && (
            <PreviewContainer>
              {imagePreviews.map((preview, index) => (
                <ThumbnailContainer key={index}>
                  <StyledImagePreview
                    src={preview}
                    alt={`Preview ${index}`}
                    onClick={() => handleImageClick(preview)}
                  />
                  <RemoveButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </RemoveButton>
                </ThumbnailContainer>
              ))}
            </PreviewContainer>
          )}
        </Grid>
        <Grid item xs={12}>
          <StyledButton type="submit" variant="contained" color="primary">
            Add Book
          </StyledButton>
        </Grid>
      </Grid>
    </StyledForm>
  );
};

export default BookDetailsForm;
