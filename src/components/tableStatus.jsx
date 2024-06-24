import * as React from "react";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import { CssBaseline, Box } from "@mui/material";
import Chip from "@mui/joy/Chip";

function createData(index, bankNo, bankName, status, gracePeriod) {
  return { index, bankNo, bankName, status, gracePeriod };
}

const rows = [
  createData(1, "501", "Sierra Leone Commercial Bank", "Active", "3 days"),
  createData(2, "832", "Rokel Commercial Bank", "Pending", "4 days"),
  createData(3, "303", "UT Bank", "Expired", "6 days"),
];

export default function TableHover() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Pending":
        return "primary";
      case "Expired":
        return "danger";
      default:
        return "default";
    }
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ width: "100%", overflow: "auto" }}>
        <Table hoverRow sx={{ width: "100%", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Index</th>
              <th style={{ width: "15%" }}>Bank No.</th>
              <th style={{ width: "30%" }}>Bank Name</th>
              <th style={{ width: "15%" }}>Status</th>
              <th style={{ width: "20%" }}>Grace Period</th>
              <th style={{ width: "10%", textAlign: "center" }}> Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.index}>
                <td>{row.index}</td>
                <td className="  text-sm font-medium text-gray-700">
                  {row.bankNo}
                </td>
                <td>{row.bankName}</td>
                <td>
                  {" "}
                  <Chip
                    color={getStatusColor(row.status)}
                    onClick={() => console.log(`Status clicked: ${row.status}`)}
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>{row.gracePeriod}</td>
                <td>
                  <Button
                    sx={{ backgroundColor: "#00357A", width: 75 }}
                    onClick={() => console.log(`Checking ${row.bankName}`)}
                    size="sm"
                    variant="solid"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
}
