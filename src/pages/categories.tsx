import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Initial from "../components/Initial";
import Renewal from "../components/Renewal";
import Amendment from "../components/Amendment";

export default function Categories() {
  return (
    <Box sx={{ backgroundColor: "#F8F9FF", flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Typography
          level="h2"
          component="h1"
          sx={{ color: "#00357A", ml: 6, mt: 3, mb: 2 }}
        >
          License Portal
        </Typography>
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
          }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab
              sx={{ borderRadius: "6px 6px 0 0" }}
              indicatorInset
              value={0}
              // onClick={<Initial />}
            >
              Initial Request
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              License Renewal
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={2}>
              License Amendment
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <Initial />
          </TabPanel>
          <TabPanel value={1}>
            <Renewal />
          </TabPanel>
          <TabPanel value={2}>
            <Amendment />
          </TabPanel>
        </Tabs>
        {/* <Divider /> */}
      </Box>
      {/* <Stack
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
            <Typography level="title-md">Bank Info</Typography>
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
                >
                  <Option value="1">Sierra Leone Commercial Bank</Option>
                  <Option value="2">Rokel Commercial Bank</Option>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Frequency</FormLabel>
                <Select
                  size="sm"
                  defaultValue="0"
                  placeholder="Select Frequency"
                >
                  <Option value="1">Monthly</Option>
                  <Option value="2">Quarterly</Option>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>License Type</FormLabel>
                <Select size="sm" defaultValue="0" placeholder="Select Type">
                  <Option value="1">One Time</Option>
                  <Option value="2">Subscription</Option>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Previous Subscription Date</FormLabel>
                <Input size="sm" type="date" disabled />
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel>Next Subscription Date</FormLabel>
                <Input size="sm" type="date" disabled />
              </FormControl>
            </Stack>

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
                  defaultValue="0"
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
                  defaultValue="0"
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
                    defaultValue="0"
                    placeholder="Select Grace Period"
                  >
                    <Option value="1">10 Days</Option>
                    <Option value="2">5 Days</Option>
                  </Select>
                </FormControl>
              </Stack>
            </div>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Clear
              </Button>
              <Button
                size="sm"
                variant="solid"
                sx={{ backgroundColor: "#00357A" }}
              >
                Generate Key
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack> */}
    </Box>
  );
}
