import {
  addDays,
  addWeeks,
  endOfDay,
  isWithinInterval,
  startOfDay,
  subDays,
  subWeeks,
} from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { useEventManager } from "../../hooks/useEventManager";
import { CalendarHeader } from "./CalendarHeader";
import type { CalendarEvent, CalendarViewProps } from "./CalendarView.types";
import { EventModal } from "./EventModal";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";

export const CalendarView = ({
  events: initialEvents = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = "month",
  initialDate,
}: CalendarViewProps) => {
  const calendar = useCalendar(initialDate, initialView);
  const eventManager = useEventManager(initialEvents);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>();
  const [modalInitialHour, setModalInitialHour] = useState<
    number | undefined
  >();
  const [focusedHour, setFocusedHour] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleDateClick = (date: Date) => {
    setSelectedEvent(null);
    setModalInitialDate(date);
    setModalInitialHour(9);
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalInitialDate(undefined);
    setModalInitialHour(undefined);
    setModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setSelectedEvent(null);
    setModalInitialDate(date);
    setModalInitialHour(hour);
    setModalOpen(true);
  };

  const handleSaveEvent = (event: Omit<CalendarEvent, "id">) => {
    eventManager.addEvent(event);
    onEventAdd?.(event);
  };

  const handleUpdateEvent = (id: string, updates: Partial<CalendarEvent>) => {
    eventManager.updateEvent(id, updates);
    onEventUpdate?.(id, updates);
  };

  const handleDeleteEvent = (id: string) => {
    eventManager.deleteEvent(id);
    onEventDelete?.(id);
  };

  const handleMonthKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDateClick(date);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newDate = subDays(date, 1);
        calendar.setFocusedDate(newDate);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newDate = addDays(date, 1);
        calendar.setFocusedDate(newDate);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newDate = subWeeks(date, 1);
        calendar.setFocusedDate(newDate);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const newDate = addWeeks(date, 1);
        calendar.setFocusedDate(newDate);
      }
    },
    [calendar]
  );

  const handleWeekKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date, hour: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTimeSlotClick(date, hour);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newDate = subDays(date, 1);
        calendar.setFocusedDate(newDate);
        setFocusedHour(hour);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newDate = addDays(date, 1);
        calendar.setFocusedDate(newDate);
        setFocusedHour(hour);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newHour = Math.max(0, hour - 1);
        setFocusedHour(newHour);
        calendar.setFocusedDate(date);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const newHour = Math.min(23, hour + 1);
        setFocusedHour(newHour);
        calendar.setFocusedDate(date);
      }
    },
    [calendar]
  );

  // Filter events based on search query and date range
  const filteredEvents = useMemo(() => {
    let filtered = eventManager.events;

    // Filter by search query (title or description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((event) => {
        const eventStart = startOfDay(event.startDate);
        const eventEnd = endOfDay(event.endDate);

        if (dateRange.from && dateRange.to) {
          // Both from and to dates are set
          return (
            isWithinInterval(eventStart, {
              start: startOfDay(dateRange.from),
              end: endOfDay(dateRange.to),
            }) ||
            isWithinInterval(eventEnd, {
              start: startOfDay(dateRange.from),
              end: endOfDay(dateRange.to),
            }) ||
            (eventStart < startOfDay(dateRange.from) &&
              eventEnd > endOfDay(dateRange.to))
          );
        } else if (dateRange.from) {
          // Only from date is set
          return eventEnd >= startOfDay(dateRange.from);
        } else if (dateRange.to) {
          // Only to date is set
          return eventStart <= endOfDay(dateRange.to);
        }
        return true;
      });
    }

    return filtered;
  }, [eventManager.events, searchQuery, dateRange]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <CalendarHeader
        currentDate={calendar.currentDate}
        viewMode={calendar.viewMode}
        onPrevious={calendar.goPrevious}
        onNext={calendar.goNext}
        onToday={calendar.goToToday}
        onViewModeChange={calendar.setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <div className="flex-1 overflow-hidden">
        {calendar.viewMode === "month" ? (
          <MonthView
            currentDate={calendar.currentDate}
            events={filteredEvents}
            focusedDate={calendar.focusedDate}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            onFocusDate={calendar.setFocusedDate}
            onKeyDown={handleMonthKeyDown}
          />
        ) : (
          <WeekView
            currentDate={calendar.currentDate}
            events={filteredEvents}
            focusedDate={calendar.focusedDate}
            focusedHour={focusedHour}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick}
            onFocusTimeSlot={(date, hour) => {
              calendar.setFocusedDate(date);
              setFocusedHour(hour);
            }}
            onKeyDown={handleWeekKeyDown}
          />
        )}
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
        initialDate={modalInitialDate}
        initialHour={modalInitialHour}
        onSave={handleSaveEvent}
        onUpdate={handleUpdateEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};
