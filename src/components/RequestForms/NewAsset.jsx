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
import { handleGetRequests, handlePostRequest } from "../../Utils";
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
import { toast } from "react-toastify";
import Shimmer from "../Shimmer";

const options = ["Assets will be displayed here", "Laptop", "Smartphone"];

handleGetRequests(
  `${process.env.REACT_APP_REQUEST_URL}/email_templates/fetch_list`
);

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
  handleBlur,
  touched,
  errors,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    handleOnChange({
      target: { name: "selectedAsset", value: options[index] },
    });
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
              <ListItemText primary={inputValue.selectedAsset} />
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
                selected={option === inputValue.selectedAsset}
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
            name="reason"
            label="Reason"
            type="search"
            multiline
            minRows={6}
            fullWidth
            margin="normal"
            required
            value={inputValue.reason}
            onChange={handleOnChange}
            onBlur={() => handleBlur("reason")}
            error={touched.reason && !!errors.reason}
            helperText={touched.reason && errors.reason}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleSubmit();
            clearState();
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

function NewAsset({ open, handleClose }) {
  const [inputValue, setInputValue] = useState({
    selectedAsset: options[1],
    reason: "",
  });

  const [touched, setTouched] = useState({
    reason: false,
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));

    validateField(field);
  };

  const validateField = (field) => {
    let fieldErrors = {};
    if (field === "reason" && !inputValue.reason) {
      fieldErrors.reason = "This field is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const clearState = () => {
    setInputValue({
      selectedAsset: options[1],
      reason: "",
    });

    setTouched({
      reason: false,
    });

    setErrors({});
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
    handlePostRequest(
      `templates/create`,
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
        handleBlur={handleBlur}
        touched={touched}
        errors={errors}
      />
    </div>
  );
}

export default NewAsset;
