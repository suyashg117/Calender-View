import { CalendarView } from '../../components/Calendar/CalendarView';
import type { CalendarEvent } from '../../components/Calendar/CalendarView.types';
import { addDays } from "date-fns";

// Sample events for demonstration
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the development team',
    startDate: new Date(new Date().setHours(10, 0, 0, 0)),
    endDate: new Date(new Date().setHours(11, 0, 0, 0)),
    color: 'blue',
    category: 'Meeting',
  },
  {
    id: '2',
    title: 'Project Review',
    description: 'Q4 project review and planning',
    startDate: addDays(new Date(new Date().setHours(14, 0, 0, 0)), 2),
    endDate: addDays(new Date(new Date().setHours(15, 30, 0, 0)), 2),
    color: 'purple',
    category: 'Review',
  },
  {
    id: '3',
    title: 'Client Call',
    description: 'Discussion about new feature requirements',
    startDate: addDays(new Date(new Date().setHours(9, 0, 0, 0)), 3),
    endDate: addDays(new Date(new Date().setHours(10, 0, 0, 0)), 3),
    color: 'green',
    category: 'Client',
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review pull requests',
    startDate: addDays(new Date(new Date().setHours(15, 0, 0, 0)), 1),
    endDate: addDays(new Date(new Date().setHours(16, 0, 0, 0)), 1),
    color: 'orange',
    category: 'Development',
  },
  {
    id: '5',
    title: 'Sprint Planning',
    description: 'Plan next sprint tasks',
    startDate: addDays(new Date(new Date().setHours(11, 0, 0, 0)), 4),
    endDate: addDays(new Date(new Date().setHours(12, 30, 0, 0)), 4),
    color: 'red',
    category: 'Planning',
  },
];

const Index = () => {
  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>) => {
    console.log('Event added:', event);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    console.log('Event updated:', id, updates);
  };

  const handleEventDelete = (id: string) => {
    console.log('Event deleted:', id);
  };

  return (
    <div className="h-screen w-full">
      <CalendarView
        events={sampleEvents}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        initialView="month"
      />
    </div>
  );
};

export default Index;
