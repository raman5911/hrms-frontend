import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// import date pickers
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

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

const Form = ({
  inputValue,
  handleOnChange,
  handleDateChange,
  // checkBalanceEnoughOrNot,
  touched,
  handleBlur,
  handleBlurForDate,
  errors,
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      style={{
        padding: " 1rem 1.5rem",
      }}
    >
      <div style={{ width: "500px" }}>
        <label id="date-picker">
          <p
            style={{
              marginBottom: "0.5rem",
              color: "grey",
            }}
          >
            Select Start Date and End Date{" "}
            <span
              style={{
                color: "red",
                position: "relative",
                bottom: "0.3rem",
              }}
            >
              *
            </span>{" "}
            {/* <Button
              onClick={addTableRow}
              startIcon={<AddIcon />}
              style={{ marginLeft: "1rem" }}
            >
              Add
            </Button> */}
          </p>
        </label>

        {/* {inputValue.leaves !== undefined &&
          inputValue.leaves.map((row, index) => (
            <React.Fragment key={row.id}>
              <Grid container>
                <Grid xs={6} item>
                  <DateRangePicker
                    id="date-picker"
                    value={[row.startDate, row.endDate]}
                    onChange={(dates) => handleDateChange(dates, row.id)}
                    showOneCalendar
                    format="dd-MM-yyyy"
                    placeholder="Select Start Date and End Date"
                    showHeader={false}
                    ranges={[]}
                    onBlur={() => handleBlurForDate("date")}
                    style={{
                      border: errors.date ? "1px solid red" : undefined,
                    }}
                  />
                  <Grid xs={6} item>
                    <Button
                      onClick={() => {
                        deleteTableRow(row.id);
                      }}
                      startIcon={<DeleteIcon />}
                      style={{ marginLeft: "1rem" }}
                      disabled={inputValue.leaves.length < 2}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          ))} */}

        <DateRangePicker
          id="date-picker"
          value={[inputValue.startDate, inputValue.endDate]}
          onChange={handleDateChange}
          showOneCalendar
          format="dd-MM-yyyy"
          placeholder="Select Start Date and End Date"
          showHeader={false}
          ranges={[]}
          onBlur={() => handleBlurForDate("date")}
          style={{
            border: errors.date ? "1px solid red" : undefined,
          }}
        />

        {errors.date && touched.date && (
          <div style={{ color: "red", marginTop: 8 }}>{errors.date}</div>
        )}
      </div>

      <br />

      <Grid item xs={12} sm={12} md={12}>
        <TextField
          id="reason"
          name="reason"
          label="Reason"
          multiline
          rows={2}
          maxRows={4}
          fullWidth
          sx={{ width: "500px" }}
          value={inputValue.reason}
          onChange={handleOnChange}
          required
          onBlur={handleBlur}
          error={touched.reason && inputValue.reason === ""}
        />

        {touched.reason && inputValue.reason === "" && (
          <p style={{ color: "red", marginTop: 8 }}>This field is required</p>
        )}
      </Grid>
    </Box>
  );
};

function SimpleDialog({
  open,
  onClose,
  inputValue,
  handleOnChange,
  handleDateChange,
  handleSubmit,
  clearState,
  touched,
  errors,
  handleBlur,
  handleBlurForDate,
  wfhBalance
}) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        Apply For Work From Home
      </DialogTitle>
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
        <Grid container>
          <Grid item xs={8} sm={8} md={8}>
            <Form
              inputValue={inputValue}
              handleOnChange={handleOnChange}
              handleDateChange={handleDateChange}
              // checkBalanceEnoughOrNot={checkBalanceEnoughOrNot}
              touched={touched}
              handleBlur={handleBlur}
              handleBlurForDate={handleBlurForDate}
              errors={errors}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            style={{
              padding: "auto 2rem",
              marginTop: "1rem",
              marginLeft: "-2rem",
            }}
          >
            <Typography variant="h6">
              Balance{" "}
              <AttachMoneyIcon
                sx={{
                  color: "#FFC300",
                  fontSize: "1.5rem",
                  position: "relative",
                  top: "0.25rem",
                }}
              />
            </Typography>
            <Typography>Days Left: {wfhBalance}</Typography>
          </Grid>
        </Grid>
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

function WorkFromHome({ open, handleClose }) {
  const [wfhBalance, setWfhBalance] = useState(5);

  const [inputValue, setInputValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
    numOfDays: 1,
    reason: "",
  });

  useEffect(() => {
    if(inputValue.numOfDays > wfhBalance) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "You cant select so many days.",
      }));
    }
  }, [inputValue.numOfDays]);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleDateChange = (dates) => {
    if (!dates) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        startDate: null,
        endDate: null,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "This field is required",
      }));

      return;
    }

    const [startDate, endDate] = dates;
    const totalDays = endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
      : 0;

      if(totalDays > WorkFromHome) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date: "This field is required",
        }));

        setTouched((prevTouched) => ({
          ...prevTouched,
          date: true,
        }));

        return;
      }

      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        numOfDays: totalDays,
        startDate: startDate,
        endDate: endDate
      }));

      setTouched((prevTouched) => ({
        ...prevTouched,
        date: true,
      }));
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: null,
      }));
  };

  const clearState = () => {
    setInputValue({
      startDate: new Date(),
      endDate: new Date(),
      reason: "",
    });

    setTouched({
      date: false,
      reason: false,
    });

    setErrors(false);
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_REQUEST_URL}/`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;

      const newTouched = {
        date: false,
        reason: false,
      };
      setTouched(newTouched);

      if (success) {
        handleSuccess(message);
        handleClose();
      } else {
        handleError(message);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }

    clearState();
  };

  // state for showing empty fields errors
  const [touched, setTouched] = useState({
    date: false,
    reason: false,
  });

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlurForDate = (field) => {};

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
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        clearState={clearState}
        touched={touched}
        handleBlur={handleBlur}
        handleBlurForDate={handleBlurForDate}
        errors={errors}
        wfhBalance={wfhBalance}
      />
    </div>
  );
}

export default WorkFromHome;
