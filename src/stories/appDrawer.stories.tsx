import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import AppDrawer from "../components/AppDrawer";

// Define props interface for stories if it's different from the component's own props
interface AppDrawerProps {
  window?: () => Window;
  children: React.ReactElement;
}

// Define the default export to configure your stories
const meta: Meta<AppDrawerProps> = {
  title: "Components/AppDrawer",
  component: AppDrawer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Story />
      </Box>
    ),
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};
export default meta;

// Story to display the default state of the drawer
export const Closed: StoryObj<AppDrawerProps> = {
  args: {
    children: <Typography variant="h4">Main Content Here</Typography>,
  },
  storyName: "Default Closed",
};

// Story to display the drawer in the open state
export const Open: StoryObj<AppDrawerProps> = {
  args: {
    children: <Typography variant="h4">Main Content Here</Typography>,
  },
  storyName: "Open Drawer",
  play: async ({ canvasElement }) => {
    // Use within to get methods scoped to the canvas element
    const canvas = within(canvasElement);
    const openButton = await canvas.findByLabelText("open drawer");
    await userEvent.click(openButton); // Use userEvent to simulate the click
  },
};
