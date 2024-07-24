import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const employeeData = {
    Employee_Id: "EMP001",
    Employee_details: {
      name: "John Doe",
      contact: "1234567890",
      email: "john.doe@techcorp.com",
      gender: "Male",
    },
    Personal_details: {
      name: "John Doe",
      city: "San Francisco",
      state: "California",
      date_of_birth: "1990-01-01",
      marital_status: "Single",
      blood_group: "O+",
    },
    Official_details: {
      designation: "Senior Software Engineer",
      employee_status: "Active",
      department: "Engineering",
      reporting_manager: "Jane Smith",
      joining_date: "2020-01-15",
      payroll_type: "Full-time",
    },
    Permanent_address: {
      address_line1: "123 Main St",
      address_line2: "Apt 4B",
      city: "San Francisco",
      state: "California",
      pin_code: "94105",
    },
    account_details: {
      bank_details: {
        account_name: "John Doe",
        account_number: "1234567890",
        Ifsc_code: "ABCD0001234",
      },
      esi_number: "1234567890",
      pf_number: "PF1234567890",
    },
    father_name: "Robert Doe",
    mother_name: "Mary Doe",
  };

  const leaveBalance = [
    { type: "Personal Leave", used: 25, total: 28 },
    { type: "Casual Leave", used: 0, total: 30 },
    { type: "Compensatory Off", used: 1, total: 1 },
    { type: "Leave Without Pay", used: 60, total: 60 },
    { type: "Holiday", used: 8, total: 16 },
    { type: "Work From Home", used: 2, total: 24 },
  ];

  const leaveHistory = [
    {
      type: "Sick Leave",
      duration: "02 Days",
      status: "Pending",
      period: "05 Oct 2021 - 07 Oct 2021",
    },
    {
      type: "Personal Leave",
      duration: "0.5 Day",
      status: "Pending",
      period: "01 Sep 2021 - 01 Sep 2021",
    },
    {
      type: "Sick Leave",
      duration: "01 Days",
      status: "Approved",
      period: "05 Aug 2021 - 06 Aug 2021",
    },
  ];
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome, {employeeData.Personal_details.name}
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Avatar
                src="/path-to-avatar-image.jpg"
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6">
                {employeeData.Employee_details.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {employeeData.Official_details.designation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Employee Id
                  </Typography>
                  <Typography variant="body1">
                    {employeeData.Employee_Id}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Contact
                  </Typography>
                  <Typography variant="body1">
                    {employeeData.Employee_details.contact}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Employee Status
                  </Typography>
                  <Chip
                    label={employeeData.Official_details.employee_status}
                    color="success"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="textSecondary">
                    Office Location
                  </Typography>
                  <Typography variant="body1">
                    {employeeData.Personal_details.city},{" "}
                    {employeeData.Personal_details.state}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="employee tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Employee Details" />
          <Tab label="Permanent Address" />
          <Tab label="Official Details" />
          <Tab label="Account Details" />
          <Tab label="Leaves" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Employee Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Full Name"
                  secondary={employeeData.Employee_details.name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={employeeData.Employee_details.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Phone"
                  secondary={employeeData.Employee_details.contact.$numberInt}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gender"
                  secondary={employeeData.Employee_details.gender}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Date of Birth"
                  secondary={employeeData.Personal_details.date_of_birth}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Marital Status"
                  secondary={employeeData.marital_status}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Blood Group"
                  secondary={employeeData.blood_group}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Father's Name"
                  secondary={employeeData.father_name}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Permanent Address
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Address Line 1"
              secondary={employeeData.Permanent_address.address_line1}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Address Line 2"
              secondary={employeeData.Permanent_address.address_line2}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="City"
              secondary={employeeData.Permanent_address.city}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="State"
              secondary={employeeData.Permanent_address.state}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Pin Code"
              secondary={employeeData.Permanent_address.pin_code.$numberInt}
            />
          </ListItem>
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Official Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Employee ID"
              secondary={employeeData.Employee_Id}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Designation"
              secondary={employeeData.Official_details.designation}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Department"
              secondary={employeeData.Official_details.department}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Reporting Manager"
              secondary={employeeData.Official_details.reporting_manager}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Joining Date"
              secondary={employeeData.Official_details.joining_date}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Employee Status"
              secondary={employeeData.Official_details.employee_status}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Payroll Type"
              secondary={employeeData.Official_details.payroll_type}
            />
          </ListItem>
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Account Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Account Name"
              secondary={employeeData.account_details.bank_details.account_name}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Account Number"
              secondary={
                employeeData.account_details.bank_details.account_number
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="IFSC Code"
              secondary={
                employeeData.account_details.bank_details.Ifsc_code.$numberInt
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="ESI Number"
              secondary={employeeData.account_details.esi_number.$numberInt}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="PF Number"
              secondary={employeeData.account_details.pf_number.$numberInt}
            />
          </ListItem>
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Leave Balance
          </Typography>
          <Grid container spacing={2}>
            {leaveBalance.map((leave) => (
              <Grid item xs={6} sm={4} md={2} key={leave.type}>
                <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6" color="primary">
                    {leave.used}/{leave.total}
                  </Typography>
                  <Typography variant="body2">{leave.type}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Leave History
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Period</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveHistory.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{leave.duration}</TableCell>
                    <TableCell>
                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved" ? "success" : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{leave.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default Profile;
