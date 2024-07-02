import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import Stack from "@mui/joy/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Params = () => {
  const rows = [
    { parameter: "Bank" },
    { parameter: "Frequency" },
    { parameter: "License Type" },
    { parameter: "Notification Start" },
    { parameter: "Notification Type" },
    { parameter: "Grace Period" },
  ];

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
                      // onClick={() => setOpen(true)}
                      size="sm"
                      variant="solid"
                    >
                      <AddIcon />
                    </Button>
                  </td>
                  <td>
                    <Button
                      sx={{ backgroundColor: "#00357A", width: 30 }}
                      // onClick={() => setOpen(true)}
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
          <CardOverflow
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          />
        </Card>
      </Stack>
    </div>
  );
};

export default Params;
