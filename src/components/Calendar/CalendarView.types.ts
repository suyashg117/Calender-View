export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  category?: string;
}

export type ViewMode = 'month' | 'week';

export interface CalendarViewProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
  initialView?: ViewMode;
  initialDate?: Date;
}
