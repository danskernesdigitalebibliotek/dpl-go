import type { Meta, StoryObj } from "@storybook/react"

import { darkModeDecorator } from "@/.storybook/decorators"
import InfoBoxDetails from "@/components/shared/infoBox/InfoBoxDetails"
import manifestationMock from "@/lib/mocks/manifestation/infoBox.mock"
import workMock from "@/lib/mocks/work/infoBox.mock"
import { useSelectedManifestationStore } from "@/store/selectedManifestation.store"

const meta = {
  title: "components/InfoBoxDetails",
  component: InfoBoxDetails,
  parameters: {
    layout: "centered",
  },
  decorators: [
    Story => {
      // Set Zustand state before rendering the story
      const { setSelectedManifestation } = useSelectedManifestationStore.getState()
      setSelectedManifestation(manifestationMock)

      return (
        <div className="content-container my-grid-gap-2 flex-row flex-wrap lg:my-grid-gap-half">
          <Story />
        </div>
      )
    },
  ],
  argTypes: {
    work: {
      control: { type: "object" },
    },
  },
  args: {
    work: workMock,
  },
} satisfies Meta<typeof InfoBoxDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <InfoBoxDetails {...args} />,
}

export const DarkMode: Story = {
  decorators: [darkModeDecorator],
  render: args => <InfoBoxDetails {...args} />,
}
