import React, { useState } from "react";
import { Alert } from "antd"; // Import Alert from antd
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import Stack from "@mui/joy/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import CardActions from "@mui/joy/CardActions";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Card from "@mui/joy/Card";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import { Result } from "antd";

const Params = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({
    CodeType: "",
    CodeDesc: "",
    Status: "Active",
  });
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [success, setSuccess] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        `http://10.203.14.73:3000/v1/api/license/add-param`,
        {
          code_type: formValues.CodeType,
          code_desc: formValues.CodeDesc,
          status: formValues.Status,
        }
      );
      console.log("Response:", response.data);

      setSuccessModal(true);
      setSuccess(response.data);
      // alert("Success:", success);s
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const rows = [
    { parameter: "Bank", fields: ["Bank Name", "Code Type", "Status"] },
    { parameter: "Frequency", fields: ["Frequency", "Code Type", "Status"] },
    { parameter: "License Type", fields: ["License", "Code Type", "Status"] },
    {
      parameter: "Notification Frequency",
      fields: ["Notification Frequency", "Code Type", "Status"],
    },
  ];

  const codeTypeMapping = {
    Bank: "Bank",
    Frequency: "LicenseFrequency",
    "License Type": "LicenseType",
    "Notification Frequency": "NotificationFrequency",
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setFormValues({
      CodeType: codeTypeMapping[row.parameter],
      CodeDesc: "",
      Status: "Active",
    });
    setOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
      ...(field === selectedRow?.fields[0] && { CodeDesc: value }),
    }));
  };

  const handleSave = () => {
    if (!formValues.CodeDesc) {
      setShowAlert(true); // Show alert if CodeDesc is empty
      return;
    }

    setShowAlert(false); // Hide alert if validation passes
    console.log("Form Values:", formValues);
    handlePost();
    setOpen(false);
    setFormValues({
      CodeType: "",
      CodeDesc: "",
      Status: "Active",
    });
  };

  return (
    <div>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "600px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md"></Typography>
            <Typography level="body-sm">
              Manage parameters for licenses
            </Typography>
          </Box>
          <Divider />
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground":
                "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground":
                "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "60%", padding: "12px 6px" }}>Parameter</th>
                <th style={{ width: "20%", padding: "12px 6px" }}>Add</th>
                <th style={{ width: "20%", padding: "12px 6px" }}>View</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Typography level="title-md">{row.parameter}</Typography>
                  </td>
                  <td>
                    <Button
                      sx={{ backgroundColor: "#00357A", width: 30 }}
                      onClick={() => handleOpen(row)}
                      size="sm"
                      variant="solid"
                    >
                      <AddIcon />
                    </Button>
                  </td>
                  <td>
                    <Button
                      sx={{ backgroundColor: "#00357A", width: 30 }}
                      size="sm"
                      variant="solid"
                    >
                      <RemoveRedEyeIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => {
              setOpen(false);
              setShowAlert(false);
            }}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "none",
                },
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
                width: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              {selectedRow && (
                <Typography id="modal-desc" textColor="text.tertiary">
                  <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">
                      Add {selectedRow.parameter} Parameter
                    </Typography>
                  </Box>
                  <Divider sx={{ marginBottom: 2 }} />
                  {showAlert && ( // Conditionally render Alert component
                    <Alert
                      // message="Error"
                      description={`Please enter ${selectedRow?.fields[0]}`}
                      type="error"
                      showIcon
                      style={{ marginBottom: 16 }}
                      closable={true}
                      onClose={() => setShowAlert(false)} // Reset alert state on close
                    />
                  )}
                  <Stack spacing={2}>
                    {selectedRow.fields.map((field, idx) => (
                      <Stack spacing={1} key={idx}>
                        <FormLabel>{field}</FormLabel>
                        <FormControl sx={{ width: "100%" }}>
                          {field === "Code Type" ? (
                            <Input
                              size="sm"
                              value={formValues.CodeType}
                              disabled
                            />
                          ) : field === "Status" ? (
                            <Select
                              placeholder="Select Status"
                              value={formValues.Status}
                              onChange={(e) =>
                                handleInputChange("Status", e.target.value)
                              }
                            >
                              <Option value="Active">Active</Option>
                              <Option value="Inactive">Inactive</Option>
                            </Select>
                          ) : (
                            <Input
                              size="sm"
                              placeholder={`Enter ${field}`}
                              value={formValues[field]}
                              onChange={(e) =>
                                handleInputChange(field, e.target.value)
                              }
                            />
                          )}
                        </FormControl>
                      </Stack>
                    ))}
                  </Stack>
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button
                      size="sm"
                      variant="solid"
                      sx={{ backgroundColor: "#00357A" }}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </CardActions>
                </Typography>
              )}
            </Sheet>
          </Modal>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={successModal}
            onClose={() => setSuccessModal(false)}
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
                {success && success.code === "200" ? (
                  <Result
                    status="success"
                    title={success.result}
                    subTitle="Parameter added successfully"
                  />
                ) : null}
              </Typography>
            </Sheet>
          </Modal>
        </Card>
      </Stack>
    </div>
  );
};

export default Params;
