/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CreateIcon from "@mui/icons-material/Create";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Stack from "@mui/joy/Stack";

const rows = [
  {
    id: "001",
    bankName: "Standard Chartered Bank",
    status: "Active",
  },
  {
    id: "002",
    bankName: "Absa Bank",
    status: "Inactive",
  },
  {
    id: "003",
    bankName: "First National Bank",
    status: "Active",
  },
  {
    id: "004",
    bankName: "Nedbank",
    status: "Active",
  },
  {
    id: "005",
    bankName: "Ecobank",
    status: "Inactive",
  },
  {
    id: "006",
    bankName: "Access Bank",
    status: "Active",
  },
  {
    id: "007",
    bankName: "Zenith Bank",
    status: "Inactive",
  },
  {
    id: "008",
    bankName: "UBA",
    status: "Active",
  },
  {
    id: "009",
    bankName: "GTBank",
    status: "Active",
  },
  // {
  //   id: "010",
  //   bankName: "Stanbic IBTC Bank",
  //   status: "Inactive",
  // },
  // {
  //   id: "011",
  //   bankName: "Capitec Bank",
  //   status: "Active",
  // },
  // {
  //   id: "012",
  //   bankName: "Equity Bank",
  //   status: "Inactive",
  // },
  // {
  //   id: "013",
  //   bankName: "Diamond Bank",
  //   status: "Active",
  // },
  // {
  //   id: "014",
  //   bankName: "National Bank of Egypt",
  //   status: "Inactive",
  // },
  // {
  //   id: "015",
  //   bankName: "Commercial Bank of Ethiopia",
  //   status: "Active",
  // },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// function RowMenu() {
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
//       >
//         <MoreHorizRoundedIcon />
//       </MenuButton>
//       <Menu size="sm" sx={{ minWidth: 140 }}>
//         <MenuItem>Edit</MenuItem>
//         <MenuItem>Rename</MenuItem>
//         <MenuItem>Move</MenuItem>
//         <Divider />
//         <MenuItem color="danger">Delete</MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

export default function Amendment() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Bank Name</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="Bank of America">Bank of America</Option>
          <Option value="Chase Bank">Chase Bank</Option>
          <Option value="Wells Fargo">Wells Fargo</Option>
          <Option value="Citibank">Citibank</Option>
          <Option value="US Bank">US Bank</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for bank</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="BankTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
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
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                {/* <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                /> */}
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Bank No
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Bank Name</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Amend</th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  {/* <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  /> */}
                </td>
                <td className="font-semibold text-sm ">
                  <Typography level="body-sm">{row.id}</Typography>
                </td>
                <td className="font-semibold text-sm ">
                  <Typography level="body-sm">{row.bankName}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Active: <CheckRoundedIcon />,
                        Inactive: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Active: "success",
                        Inactive: "danger",
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button">
                      <Button
                        sx={{ backgroundColor: "#00357A", width: 35 }}
                        onClick={() => setOpen(true)}
                        size="sm"
                        variant="solid"
                      >
                        <CreateIcon />
                      </Button>
                    </Link>

                    {/* <RowMenu /> */}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // width: "10000px",
            }}
          >
            <Card>
              <Box
                sx={{
                  // mb: 1,
                  width: 700,
                  backgroundColor: "#00357A",
                  padding: 1,
                }}
              >
                <Typography sx={{ ml: 0.5, color: "white" }} level="title-lg">
                  Edit Bank Details
                </Typography>
                {/* <Typography level="body-sm">
                  Fill the form to generate encrypted key
                </Typography> */}
              </Box>
              <Divider />
              <Stack spacing={4}>
                <Stack spacing={1}>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      size="sm"
                      startDecorator={<AccountBalanceIcon />}
                      defaultValue="1"
                      placeholder="Select Bank"
                      disabled
                    >
                      <Option value="1">Standard Chartered Bank</Option>
                      <Option value="2">Rokel Commercial Bank</Option>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>License Type</FormLabel>
                    <Select
                      size="sm"
                      defaultValue="1"
                      placeholder="Select Type"
                    >
                      <Option value="1">One Time</Option>
                      <Option value="2">Subscription</Option>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      size="sm"
                      defaultValue="2"
                      placeholder="Select Frequency"
                    >
                      <Option value="1">Monthly</Option>
                      <Option value="2">Quarterly</Option>
                    </Select>
                  </FormControl>
                </Stack>

                {/* <Stack direction="row" spacing={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Previous Subscription Date</FormLabel>
                    <Input size="sm" type="date" disabled />
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Next Subscription Date</FormLabel>
                    <Input size="sm" type="date" disabled />
                  </FormControl>
                </Stack> */}

                <Stack direction="row" spacing={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Start Date</FormLabel>
                    <Input size="sm" type="date" />
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>End Date</FormLabel>
                    <Input size="sm" type="date" disabled />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Notification Start</FormLabel>
                    <Select
                      size="sm"
                      defaultValue="1"
                      placeholder="Select Notification"
                    >
                      <Option value="1">30 Days Before</Option>
                      <Option value="2">15 Days Before</Option>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }}>
                    <FormLabel>Notification Frequency</FormLabel>
                    <Select
                      size="sm"
                      defaultValue="1"
                      placeholder="Select Notification"
                    >
                      <Option value="1">Daily</Option>
                      <Option value="2">Weekly</Option>
                    </Select>
                  </FormControl>
                </Stack>

                <div>
                  <Stack direction="row" spacing={4}>
                    <FormControl sx={{ width: "100%" }}>
                      <FormLabel>Grace Period</FormLabel>
                      <Select
                        size="sm"
                        defaultValue="1"
                        placeholder="Select Grace Period"
                      >
                        <Option value="1">10 Days</Option>
                        <Option value="2">5 Days</Option>
                      </Select>
                    </FormControl>
                  </Stack>
                </div>
              </Stack>

              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  {/* <Button size="sm" variant="outlined" color="neutral">
                    Clear
                  </Button> */}
                  <Button
                    size="sm"
                    variant="solid"
                    sx={{ backgroundColor: "#00357A" }}
                    onClick={() => setOpen(true)}
                  >
                    Save
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </Modal>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
