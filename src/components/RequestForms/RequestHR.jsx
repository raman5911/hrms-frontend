import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ListItemSecondaryAction } from "@mui/material";

import { Box, List, Menu, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    // Apply styles to the Dialog's Paper component
    width: "800px", // Set your desired width
    height: "600px", // Set your desired height
    maxWidth: "none", // Override default maxWidth
  },
}));
const options = ["Assets will be displayed here", "Laptop", "Smartphone"];
function SimpleDialog({ open, onClose }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const openMenu = Boolean(anchorEl);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleApply = () => {
    setTitleError(!title);
    setDescriptionError(!description);

    if (title && description) {
      // Perform your apply action here
      onClose();
    }
  };
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">Request to HR</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
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
            id="outlined-search-reason"
            label="Title"
            type="search"
            fullWidth
            margin="normal"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            helperText={titleError ? "This field is required" : ""}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Request
          </Typography>
          <TextField
            id="outlined-search-reason"
            label="Describe"
            type="search"
            multiline
            minRows={6}
            fullWidth
            margin="normal"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError ? "This field is required" : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleApply}>
          Apply
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
function RequestHR({ open, handleClose }) {
  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default RequestHR;
