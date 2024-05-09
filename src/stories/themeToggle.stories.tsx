// stories/NightModeToggle.stories.tsx
import React from "react";
import { Meta, Story } from "@storybook/react";
import NightModeToggle from "../components/NightModeToggle";
import { ThemeContextProvider } from "../contexts/ThemeContextProvider";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

interface StoryArgs {
  initialMode: "light" | "dark";
}

const ThemeDecorator = (
  StoryComponent: unknown,
  { initialMode }: StoryArgs
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoryComponent />
      </ThemeProvider>
    </ThemeContextProvider>
  );
};

const meta: Meta<StoryArgs> = {
  title: "Components/NightModeToggle",
  component: NightModeToggle,
  decorators: [
    (StoryComponent, context) => ThemeDecorator(StoryComponent, context),
  ],
  argTypes: {
    initialMode: {
      control: { type: "radio", options: ["light", "dark"] },
    },
  },
};

export default meta;

const Template: Story<StoryArgs> = () => <NightModeToggle />;

export const Default = Template.bind({});
Default.args = {
  initialMode: "light",
};
