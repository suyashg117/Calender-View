import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';

const meta = {
  title: 'Components/Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialView: {
      control: 'select',
      options: ['month', 'week'],
    },
  },
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    startDate: new Date(2024, 0, 15, 10, 0),
    endDate: new Date(2024, 0, 15, 11, 0),
    color: 'blue',
    category: 'work',
  },
  {
    id: '2',
    title: 'Client Call',
    description: 'Discuss project requirements',
    startDate: new Date(2024, 0, 16, 14, 0),
    endDate: new Date(2024, 0, 16, 15, 30),
    color: 'green',
    category: 'work',
  },
  {
    id: '3',
    title: 'Lunch Break',
    description: 'Team lunch at the new restaurant',
    startDate: new Date(2024, 0, 17, 12, 0),
    endDate: new Date(2024, 0, 17, 13, 0),
    color: 'orange',
    category: 'personal',
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review PRs from the team',
    startDate: new Date(2024, 0, 18, 15, 0),
    endDate: new Date(2024, 0, 18, 16, 0),
    color: 'purple',
    category: 'work',
  },
  {
    id: '5',
    title: 'Gym Session',
    description: 'Evening workout',
    startDate: new Date(2024, 0, 19, 18, 0),
    endDate: new Date(2024, 0, 19, 19, 30),
    color: 'red',
    category: 'personal',
  },
];

export const MonthView: Story = {
  args: {
    events: sampleEvents,
    initialView: 'month',
    initialDate: new Date(2024, 0, 15),
  },
};

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    initialView: 'week',
    initialDate: new Date(2024, 0, 15),
  },
};

export const EmptyCalendar: Story = {
  args: {
    events: [],
    initialView: 'month',
  },
};

export const WithCallbacks: Story = {
  args: {
    events: sampleEvents,
    initialView: 'month',
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
  },
};
