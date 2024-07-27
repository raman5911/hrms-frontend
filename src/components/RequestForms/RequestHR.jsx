import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Box, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { handlePostRequest } from "../../Utils";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "800px",
    height: "600px",
    maxWidth: "none",
  },
}));

function SimpleDialog({
  open,
  onClose,
  inputValue,
  handleOnChange,
  handleSubmit,
  clearState,
  anchorEl,
  handleMenuClose,
  handleBlur,
  touched,
}) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">Request to HR</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          onClose();
          clearState();
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6" sx={{ mt: 2 }}>
            Subject
          </Typography>
          <TextField
            id="outlined-search-title"
            name="title"
            label="Title"
            type="search"
            fullWidth
            margin="normal"
            required
            value={inputValue.title}
            onChange={handleOnChange}
            onBlur={handleBlur}
            error={touched.title && !inputValue.title}
            helperText={
              touched.title && !inputValue.title ? "This field is required" : ""
            }
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Request
          </Typography>
          <TextField
            id="outlined-search-description"
            name="description"
            label="Describe"
            type="search"
            multiline
            minRows={6}
            fullWidth
            margin="normal"
            required
            value={inputValue.description}
            onChange={handleOnChange}
            onBlur={handleBlur}
            error={touched.description && !inputValue.description}
            helperText={
              touched.description && !inputValue.description
                ? "This field is required"
                : ""
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSubmit}>
          Apply
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

function RequestHR({ open, handleClose }) {
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });

  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const clearState = () => {
    setInputValue({
      title: "",
      description: "",
    });
    setTouched({
      title: false,
      description: false,
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async () => {
    if (!inputValue.title || !inputValue.description) {
      setTouched({
        title: true,
        description: true,
      });
      return;
    }

    handlePostRequest(
      `${process.env.REACT_APP_REQUEST_URL}/templates/create`,
      inputValue,
      handleSuccess,
      handleError
    );
    handleClose();

    clearState();
  };

  return (
    <div>
      <SimpleDialog
        open={open}
        onClose={() => {
          handleClose();
          clearState();
        }}
        inputValue={inputValue}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        clearState={clearState}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleBlur={handleBlur}
        touched={touched}
      />
    </div>
  );
}

export default RequestHR;
