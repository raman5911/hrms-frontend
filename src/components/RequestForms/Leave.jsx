import React, { useState, useEffect } from "react";
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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";

// import date pickers
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
  onClickCheckbox,
  handleDateChange,
  checkBalanceEnoughOrNot,
  halfDay,
  touched,
  handleBlur,
  handleBlurForDate,
  errors,
  addTableRow,
  deleteTableRow,
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
            <Button
              onClick={addTableRow}
              startIcon={<AddIcon />}
              style={{ marginLeft: "1rem" }}
            >
              Add
            </Button>
          </p>
        </label>

        {inputValue.leaves !== undefined &&
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
          ))}

        {/* <DateRangePicker
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
        /> */}

        {/* <Button onClick={addTableRow} startIcon={<AddIcon />}>
          Add
        </Button> */}

        {errors.date && touched.date && (
          <div style={{ color: "red", marginTop: 8 }}>{errors.date}</div>
        )}
      </div>

      <Grid item xs={12} sm={12} md={12} style={{ marginTop: "1.5rem" }}>
        <InputLabel id="leaveType">
          Leave Type{" "}
          <span
            style={{
              color: "red",
              position: "relative",
              bottom: "0.3rem",
            }}
          >
            *
          </span>{" "}
        </InputLabel>

        <FormControl
          variant="outlined"
          fullWidth
          required
          margin="normal"
          error={touched.leaveType && inputValue.leaveType === ""}
        >
          <Select
            name="leaveType"
            id="leaveType"
            value={inputValue.leaveType}
            onChange={handleOnChange}
            fullWidth
            displayEmpty
            renderValue={(value) => (value ? value : "Choose an option")}
            required
            onBlur={handleBlur}
          >
            <MenuItem value="sick" disabled={checkBalanceEnoughOrNot("sick")}>
              Sick Leave
            </MenuItem>
            <MenuItem
              value="casual"
              disabled={checkBalanceEnoughOrNot("casual")}
            >
              Casual Leave
            </MenuItem>
            <MenuItem
              value="earned"
              disabled={checkBalanceEnoughOrNot("earned")}
            >
              Earned Leave
            </MenuItem>
            <MenuItem
              value="compensatory"
              disabled={checkBalanceEnoughOrNot("compensatory")}
            >
              Compensatory Leave
            </MenuItem>
            <MenuItem value="Leave on Pay">Leave on Pay</MenuItem>
          </Select>

          {touched.leaveType && inputValue.leaveType === "" && (
            <p style={{ color: "red", marginTop: 8 }}>This field is required</p>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <FormControlLabel
          control={
            <Checkbox
              {...{ inputProps: { "aria-label": "Half Day" } }}
              onClick={onClickCheckbox}
              checked={halfDay}
              disabled={inputValue.leaves.length > 1 || inputValue.numOfDays > 1}
            />
          }
          label="Half Day"
        />
      </Grid>

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
  onClickCheckbox,
  handleOnChange,
  handleDateChange,
  handleSubmit,
  clearState,
  checkBalanceEnoughOrNot,
  leaveBalance,
  halfDay,
  touched,
  handleBlur,
  handleBlurForDate,
  errors,
  addTableRow,
  deleteTableRow,
}) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={
        {
          // zIndex: 10000
        }
      }
    >
      <DialogTitle id="customized-dialog-title">Apply For Leave</DialogTitle>
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
              onClickCheckbox={onClickCheckbox}
              handleDateChange={handleDateChange}
              checkBalanceEnoughOrNot={checkBalanceEnoughOrNot}
              halfDay={halfDay}
              touched={touched}
              handleBlur={handleBlur}
              handleBlurForDate={handleBlurForDate}
              errors={errors}
              addTableRow={addTableRow}
              deleteTableRow={deleteTableRow}
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
              Leave Balance{" "}
              <AttachMoneyIcon
                sx={{
                  color: "#FFC300",
                  fontSize: "1.5rem",
                  position: "relative",
                  top: "0.25rem",
                }}
              />
            </Typography>
            <Typography>Sick: {leaveBalance.sick}</Typography>
            <Typography>Casual: {leaveBalance.casual}</Typography>
            <Typography>Earned: {leaveBalance.earned}</Typography>
            <Typography>Compensatory: {leaveBalance.compensatory}</Typography>
            <Typography>Sandwhich: {leaveBalance.sandwhich}</Typography>
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

function Leave({ open, handleClose }) {
  const [leaveBalance, setLeaveBalance] = useState({
    sick: 2,
    casual: 0,
    earned: 1,
    compensatory: 0,
    sandwhich: 0,
  });

  const [inputValue, setInputValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
    numOfDays: 0.5,
    leaveType: "",
    reason: "",
    leaves: [
      {
        id: Date.now(),
        startDate: new Date(),
        endDate: new Date(),
        calculatedDays: 1,
      },
    ],
  });

  const [halfDay, setHalfDay] = useState(true);

  const onClickCheckbox = (event) => {
    const isChecked = event.target.checked;
    setHalfDay(isChecked);

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      numOfDays: isChecked ? 0.5 : 1,
    }));
  };

  useEffect(() => {
    if (inputValue.leaves.length > 1 || inputValue.leaves[0].startDate && inputValue.leaves[0].endDate) {
      const start = dayjs(inputValue.leaves[0].startDate);
      const end = dayjs(inputValue.leaves[0].endDate);
      const diff = end.diff(start, "day");

      console.log(diff);

      const daysCalculated = halfDay ? 0.5 : diff + 1;

      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        numOfDays: daysCalculated, // Including the start day in the count
      }));

      if (diff >= 1 || inputValue.leaves.length > 1) {
        setHalfDay(false);
      } else if (diff === 0) {
        setHalfDay(true);
      }
    } else {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        numOfDays: 0,
      }));
    }
  }, [inputValue.leaves, inputValue.numOfDays, halfDay, inputValue.leaves.length]);

  const checkBalanceEnoughOrNot = (type) => {
    if (type === "sick") {
      return inputValue.numOfDays > leaveBalance.sick;
    } else if (type === "casual") {
      return inputValue.numOfDays > leaveBalance.casual;
    } else if (type === "earned") {
      return inputValue.numOfDays > leaveBalance.earned;
    } else if (type === "compensatory") {
      return inputValue.numOfDays > leaveBalance.compensatory;
    }
  };

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

  const handleDateChange = (dates, leaveId) => {
    if (inputValue.leaves.length === 0 || !dates) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        leaves: prevInputValue.leaves.map((leave) =>
          leave.id === leaveId
            ? { ...leave, startDate: null, endDate: null, calculatedDays: 0 }
            : leave
        ),
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "This field is required",
      }));

      return;
    }

    const [startDate, endDate] = dates;
    const numOfDays = endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
      : 0;

    const updatedLeaves = inputValue.leaves.map((leave) => ({
      ...leave,
      startDate: leave.id === leaveId ? startDate : leave.startDate,
      endDate: leave.id === leaveId ? endDate : leave.endDate,
      calculatedDays: leave.id === leaveId ? numOfDays : leave.calculatedDays,
    }));

    const totalDays = updatedLeaves.reduce((sum, current) => {
      return sum + current.calculatedDays;
    }, 0);

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      numOfDays: totalDays,
      leaves: updatedLeaves,
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
      leaveType: "",
      reason: "",
      leaves: [
        {
          id: Date.now(),
          startDate: new Date(),
          endDate: new Date(),
          calculatedDays: 1,
        },
      ],
    });

    setTouched({
      date: false,
      leaveType: false,
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
        leaveType: false,
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
    leaveType: false,
    reason: false,
  });

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlurForDate = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (!inputValue.startDate || !inputValue.endDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "This field is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: null,
      }));
    }
  };

  // add rows
  const addTableRow = () => {
    setInputValue((prevState) => ({
      ...prevState,
      leaves: [
        ...prevState.leaves,
        { id: Date.now(), startDate: new Date(), endDate: new Date() },
      ],
    }));
  };

  // delete rows
  const deleteTableRow = (id) => {
    setInputValue((prevState) => ({
      ...prevState,
      leaves: prevState.leaves.filter((row) => row.id !== id),
    }));
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
        onClickCheckbox={onClickCheckbox}
        handleOnChange={handleOnChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        clearState={clearState}
        checkBalanceEnoughOrNot={checkBalanceEnoughOrNot}
        leaveBalance={leaveBalance}
        halfDay={halfDay}
        touched={touched}
        handleBlur={handleBlur}
        handleBlurForDate={handleBlurForDate}
        errors={errors}
        addTableRow={addTableRow}
        deleteTableRow={deleteTableRow}
      />
    </div>
  );
}

export default Leave;
