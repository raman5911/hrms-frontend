import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  ListItemSecondaryAction,
  Box,
  List,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
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
    width: "800px",
    height: "600px",
    maxWidth: "none",
  },
}));

const options = ["Assets will be displayed here", "Laptop", "Smartphone"];

function SimpleDialog({ open, onClose }) {
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const openMenu = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    setText(event.target.value);
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
      <DialogTitle id="customized-dialog-title">
        Apply For New Asset
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
      </DialogTitle>
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
            Choose Asset
          </Typography>
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "4px",
            }}
          >
            <ListItemButton
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText primary={options[selectedIndex]} />
              <ListItemSecondaryAction>
                <KeyboardArrowDown />
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
              sx: {
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Reason for Issue
          </Typography>
          <TextField
            id="outlined-search-reason"
            label="Reason"
            type="search"
            multiline
            minRows={6}
            fullWidth
            margin="normal"
            required
            value={text} // Bind the text field's value to the state
            onChange={handleChange} // Update the state when the text field changes
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          {" "}
          {/* Call onClose when the button is clicked */}
          Apply
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

function NewAsset({ open, handleClose }) {
  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default NewAsset;
