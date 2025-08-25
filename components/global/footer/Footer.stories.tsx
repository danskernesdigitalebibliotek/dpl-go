import type { Meta, StoryObj } from "@storybook/react"

import { darkModeDecorator } from "@/.storybook/decorators"

import LinkToParentLibraryContent from "../header/LinkToParentLibraryContent"
import Footer from "./Footer"

const meta = {
  title: "components/Footer",
  component: Footer,
  parameters: { layout: "centered" },
  args: {
    libraryLink: (
      <LinkToParentLibraryContent parentLibraryUrl="https://www.detdigitalefolkebibliotek.dk" />
    ),
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

// TODO: add VideoBundle to the story when request mocking through fishery is implemented
export const Default: Story = {
  render: args => <Footer {...args} />,
}

export const DarkMode: Story = {
  decorators: [darkModeDecorator],
  render: args => <Footer {...args} />,
}
