import  type { CalendarEvent } from './CalendarView.types';
import { getMonthDays, isSameMonthAs, isTodayDate, formatDate } from '../../utils/date.utils';
import { getEventsForDay } from '../../utils/event.utils';
import { CalendarCell } from './CalendarCell';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  focusedDate: Date | null;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onFocusDate: (date: Date) => void;
  onKeyDown: (e: React.KeyboardEvent, date: Date) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView = ({ currentDate, events, focusedDate, onDateClick, onEventClick, onFocusDate, onKeyDown }: MonthViewProps) => {
  const monthDays = getMonthDays(currentDate);

  return (
    <div className="flex flex-col h-full bg-background" role="grid" aria-label="Calendar month view">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
            role="columnheader"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr">
        {monthDays.map((date, index) => {
          const dayEvents = getEventsForDay(events, date);
          const isCurrentMonth = isSameMonthAs(date, currentDate);
          const isToday = isTodayDate(date);
          const isFocused = focusedDate ? formatDate(date, 'yyyy-MM-dd') === formatDate(focusedDate, 'yyyy-MM-dd') : false;

          return (
            <div key={index} onKeyDown={(e) => onKeyDown(e, date)}>
              <CalendarCell
                date={date}
                events={dayEvents}
                isCurrentMonth={isCurrentMonth}
                isToday={isToday}
                isFocused={isFocused}
                onDateClick={onDateClick}
                onEventClick={onEventClick}
                onFocus={onFocusDate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
