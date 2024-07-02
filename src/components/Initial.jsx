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

  // const handleSave = async () => {
  //   const formData = {
  //     bank_id: selectedBank,
  //     license_type_id: selectedLicenseType,
  //     license_frequency_id: selectedFrequency,
  //     notification_frequency_id: selectedNotificationFreq,
  //     start_date: startDate,
  //     end_date: endDate,
  //     notification_start: notificationStart,
  //     grace_period: gracePeriod,
  //   };
  //   try {
  //     const response = await axios.post(
  //       `http://10.203.14.73:3000/v1/api/license/generate-license`,
  //       formData
  //     );
  //     console.log(formData);
  //     console.log("Response:", response.data);
  //     if (response.data.code === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: response.data.result,
  //         showConfirmButton: false,
  //         // timer: 1500,
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: response.data.result,
  //         showConfirmButton: false,
  //         // timer: 1500,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(formData);
  //     console.error("Error generating license:", error);
  //   }
  // };

  // const handleSave = async () => {
  //   const formData = {
  //     bank_id: selectedBank,
  //     license_type_id: selectedLicenseType,
  //     license_frequency_id: selectedFrequency,
  //     notification_frequency_id: selectedNotificationFreq,
  //     start_date: startDate,
  //     end_date: endDate,
  //     notification_start: notificationStart,
  //     grace_period: gracePeriod,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `http://10.203.14.73:3000/v1/api/license/generate-license`,
  //       formData
  //     );
  //     console.log("Form Data:", formData);
  //     console.log("Response:", response.data);

  //     // if (response.data.code === 200) {
  //     //   console.log("Showing success Swal");
  //     //   Swal.fire({
  //     //     icon: "success",
  //     //     title: response.data.result,
  //     //     showConfirmButton: false,
  //     //     // timer: 1500,
  //     //   });
  //     // } else {
  //     //   console.log("Showing error Swal");
  //     //   Swal.fire({
  //     //     icon: "success",
  //     //     title: response.data.result,
  //     //     showConfirmButton: true,
  //     //     // timer: 1500,
  //     //   });
  //     // }

  //     if (response.data.code === 200) {
  //       return (
  //         <Result
  //           status="success"
  //           title="Successfully Purchased Cloud Server ECS!"
  //           subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  //           extra={[
  //             <Button type="primary" key="console">
  //               Go Console
  //             </Button>,
  //             <Button key="buy">Buy Again</Button>,
  //           ]}
  //         />
  //       );
  //     } else {
  //       return (
  //         <Result
  //           status="success"
  //           title="Successfully Purchased Cloud Server ECS!"
  //           subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  //           extra={[
  //             <Button type="primary" key="console">
  //               Go Console
  //             </Button>,
  //             <Button key="buy">Buy Again</Button>,
  //           ]}
  //         />
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Form Data:", formData);
  //     console.error("Error generating license:", error);
  //     // Swal.fire({
  //     //   icon: "error",
  //     //   title: error.response.data.result,
  //     //   text: error.message,
  //     //   showConfirmButton: true,
  //     // });
  //     Alert.error({
  //       title: error.response.data.result,
  //       // subTitle: error.message,
  //     });
  //   }
  // };
  const handleClear = () => {
    // setSelectedBank([]);
    // setSelectedLicenseType("");
    // setSelectedFrequency("");
    // setSelectedNotificationFreq("");
    // setStartDate("");
    // setEndDate("");
    // setNotificationStart("");
    // setGracePeriod("");
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
    } catch (error) {
      console.error("Error generating license:", error);
      setError(error);
      setResponse(null);
    }
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
                    <Option key={freq.id} value={freq.id}>
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
                <Input
                  size="sm"
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
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
              {/* <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                This is the modal title
              </Typography> */}
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
