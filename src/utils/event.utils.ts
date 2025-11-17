import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

export const getEventsForDay = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  return events.filter((event) => {
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    return (
      isWithinInterval(event.startDate, { start: dayStart, end: dayEnd }) ||
      isWithinInterval(event.endDate, { start: dayStart, end: dayEnd }) ||
      (event.startDate <= dayStart && event.endDate >= dayEnd)
    );
  });
};

export const sortEventsByStart = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
};

export const generateEventId = (): string => {
  return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getEventColor = (color?: string): string => {
  const colorMap: Record<string, string> = {
    blue: "hsl(var(--event-blue))",
    green: "hsl(var(--event-green))",
    purple: "hsl(var(--event-purple))",
    orange: "hsl(var(--event-orange))",
    red: "hsl(var(--event-red))",
  };

  return colorMap[color || "blue"] || colorMap.blue;
};
