import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import axios from "axios";
import Input from "@mui/joy/Input";
import dayjs from "dayjs";

const Renewal = () => {
  const [bankNames, setBankNames] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankId, setBankId] = useState("");
  const [details, setDetails] = useState({});
  const [endDate, setEndDate] = useState("");

  function frontendDate(dateString) {
    const originalDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = ("0" + (originalDate.getMonth() + 1))?.slice(-2); // Adding leading zero if needed
    const year = originalDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate.toUpperCase();
  }

  useEffect(() => {
    const fetchBankNames = async () => {
      try {
        const response = await axios.get(
          `http://10.203.14.73:3000/v1/api/license/get-license-parameters`
        );
        setBankNames(response.data.bankParams);
        console.log("Bank names:", response.data);
      } catch (error) {
        console.error("Error fetching bank names:", error);
      }
    };

    fetchBankNames();
  }, []);

  const handleBankChange = (event, newValue) => {
    setSelectedBank(newValue);
    const selectedBankName = bankNames.find((bank) => bank.id === newValue)?.id;
    setBankId(selectedBankName);
    console.log("Selected bank name:", selectedBankName);
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.post(
        "http://10.203.14.73:3000/v1/api/license/get-bank-details",
        {
          bank_id: bankId,
        }
      );
      console.log("Response:", response.data);
      setDetails(response.data.message[0]);
      setEndDate(
        calculateEndDate(
          response.data.message[0].end_date,
          response.data.message[0].license_frequency
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [bankId]);

  const calculateEndDate = (startDate, frequency) => {
    const start = dayjs(startDate);
    let end;
    switch (frequency) {
      case "Monthly":
        end = start.add(1, "month");
        break;
      case "Quarterly":
        end = start.add(3, "month");
        break;
      case "Semiannually":
        end = start.add(6, "month");
        break;
      case "Annually":
        end = start.add(1, "year");
        break;
      default:
        end = start;
    }
    return end.format("YYYY-MM-DD");
  };

  return (
    <div>
      <div>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">License Renewal</Typography>
              <Typography level="body-sm">
                Fill the form to generate encrypted key
              </Typography>
            </Box>
            <Divider />
            <Stack spacing={4}>
              <Stack spacing={1}>
                <FormLabel>Bank Name</FormLabel>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    size="sm"
                    startDecorator={<AccountBalanceIcon />}
                    defaultValue="0"
                    placeholder="Select Bank"
                    onChange={handleBankChange}
                  >
                    {bankNames.map((bank) => (
                      <Option key={bank.id} value={bank.id}>
                        {" " + bank.code_desc}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4}>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>License Type</FormLabel>
                  <Select size="sm" defaultValue="1" disabled>
                    <Option value="1">{details.license_type}</Option>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Frequency</FormLabel>
                  <Select disabled size="sm" defaultValue="1">
                    <Option value="1">{details.license_frequency}</Option>
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4}>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Previous Subscription Date</FormLabel>
                  <Input
                    size="sm"
                    type="date"
                    disabled
                    value={frontendDate(details.end_date)}
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Next Subscription Date</FormLabel>
                  <Input size="sm" type="date" disabled value={endDate} />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4}>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    disabled
                    size="sm"
                    type="date"
                    value={frontendDate(details.end_date)}
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>End Date</FormLabel>
                  <Input size="sm" type="date" disabled value={endDate} />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={4}>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Notification Start</FormLabel>
                  <Input
                    size="sm"
                    disabled
                    value={details.notification_start}
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Notification Frequency</FormLabel>
                  <Input
                    size="sm"
                    disabled
                    value={details.notification_frequency}
                  />
                </FormControl>
              </Stack>

              <div>
                <Stack direction="row" spacing={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Grace Period</FormLabel>
                    <Input size="sm" disabled value={details.grace_period} />
                  </FormControl>
                </Stack>
              </div>
            </Stack>

            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  sx={{ backgroundColor: "#00357A" }}
                >
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>
        </Stack>
      </div>
    </div>
  );
};

export default Renewal;
