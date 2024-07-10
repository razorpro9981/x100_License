import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import Swal from "sweetalert2";
import { Alert, Result } from "antd";
import dayjs from "dayjs"; // Import dayjs for date manipulation

const Initial = () => {
  const [open, setOpen] = useState(false);
  const [bankNames, setBankNames] = useState([]);
  const [licenseType, setLicenseType] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [notificationFreq, setNotificationFreq] = useState([]);

  const [selectedBank, setSelectedBank] = useState("");
  const [selectedLicenseType, setSelectedLicenseType] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedNotificationFreq, setSelectedNotificationFreq] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notificationStart, setNotificationStart] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankNames = async () => {
      try {
        const response = await axios.get(
          `http://10.203.14.73:3000/v1/api/license/get-license-parameters`
        );
        setBankNames(response.data.bankParams);
        setLicenseType(response.data.licenseTypeParams);
        setFrequency(response.data.licenseFrequencyParams);
        setNotificationFreq(response.data.notificationFrequencyParams);
        console.log("Bank names:", response.data);
      } catch (error) {
        console.error("Error fetching bank names:", error);
      }
    };

    fetchBankNames();
  }, []);

  useEffect(() => {
    if (startDate && selectedFrequency) {
      setEndDate(calculateEndDate(startDate, selectedFrequency));
    }
  }, [startDate, selectedFrequency]);

  const handleConsole = () => {
    console.log("Selected Bank:", selectedBank);
    console.log("Selected License Type:", selectedLicenseType);
    console.log("Selected Frequency:", selectedFrequency);
    console.log("Selected Notification Frequency:", selectedNotificationFreq);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Notification Start:", notificationStart);
    console.log("Grace Period:", gracePeriod);
  };

  const handleClear = () => {
    setSelectedBank("");
    setSelectedLicenseType("");
    setSelectedFrequency("");
    setSelectedNotificationFreq("");
    setStartDate("");
    setEndDate("");
    setNotificationStart("");
    setGracePeriod("");
  };

  const handleSave = async () => {
    const formData = {
      bank_id: selectedBank,
      license_type_id: selectedLicenseType,
      license_frequency_id: selectedFrequency,
      notification_frequency_id: selectedNotificationFreq,
      start_date: startDate,
      end_date: endDate,
      notification_start: notificationStart,
      grace_period: gracePeriod,
    };

    try {
      const response = await axios.post(
        `http://10.203.14.73:3000/v1/api/license/generate-license`,
        formData
      );
      console.log("Form Data:", formData);
      console.log("Response:", response.data);
      setResponse(response.data);
      setError(null);

      // Download the response
      const blob = new Blob([JSON.stringify(response.data.data, null, 2)], {
        type: "text/plain",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "response.txt";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating license:", error);
      setError(error);
      setResponse(null);
    }
  };

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
            <Typography level="title-md">Initial License Request</Typography>
            <Typography level="body-sm">
              Fill the form to generate encrypted key
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={4}>
            <Stack spacing={1}>
              <FormLabel required>Bank Name</FormLabel>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  size="sm"
                  startDecorator={<AccountBalanceIcon />}
                  defaultValue="0"
                  placeholder="Select Bank"
                  onChange={(e, newValue) => setSelectedBank(newValue)}
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
                <FormLabel required>License Type</FormLabel>
                <Select
                  size="sm"
                  defaultValue="0"
                  placeholder="Select Type"
                  onChange={(e, newValue) => setSelectedLicenseType(newValue)}
                >
                  {licenseType.map((license) => (
                    <Option key={license.id} value={license.id}>
                      {license.code_desc}
                    </Option>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel required>Frequency</FormLabel>
                <Select
                  size="sm"
                  defaultValue="0"
                  placeholder="Select Frequency"
                  onChange={(e, newValue) => setSelectedFrequency(newValue)}
                >
                  {frequency.map((freq) => (
                    <Option key={freq.id} value={freq.code_desc}>
                      {freq.code_desc}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel required>Start Date</FormLabel>
                <Input
                  size="sm"
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel required>End Date</FormLabel>
                <Input size="sm" type="date" value={endDate} readOnly />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={4}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel required>Notification Start</FormLabel>
                <Input
                  size="sm"
                  placeholder="Select Notification"
                  onChange={(e) => setNotificationStart(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel required>Notification Frequency</FormLabel>
                <Select
                  size="sm"
                  placeholder="Select Notification"
                  onChange={(e, newValue) =>
                    setSelectedNotificationFreq(newValue)
                  }
                >
                  {notificationFreq.map((notification) => (
                    <Option key={notification.id} value={notification.id}>
                      {notification.code_desc}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <div>
              <Stack direction="row" spacing={4}>
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel>Grace Period</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Select Grace Period"
                    onChange={(e) => setGracePeriod(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </div>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => handleClear()}
              >
                Clear
              </Button>
              <Button
                size="sm"
                variant="solid"
                sx={{ backgroundColor: "#00357A" }}
                onClick={() => {
                  setOpen(true);
                  handleSave();
                }}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "none",
                }, // Example backdrop styling
              },
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "15%",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography id="modal-desc" textColor="text.tertiary">
                {response && response.code === "200" && (
                  <Result
                    status="success"
                    title={response.result}
                    subTitle="Your license has been successfully generated."
                    extra={[
                      <Button type="primary" key="console">
                        Send Mail
                      </Button>,
                      <Button key="buy">Generate Another License</Button>,
                    ]}
                  />
                )}

                {error && (
                  <Result
                    status="error"
                    title={error.response.data.result}
                    subTitle="Please check and modify the following information before resubmitting."
                  />
                )}
              </Typography>
            </Sheet>
          </Modal>
        </Card>
      </Stack>
    </div>
  );
};

export default Initial;
