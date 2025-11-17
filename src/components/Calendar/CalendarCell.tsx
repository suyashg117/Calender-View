import type { CalendarEvent } from './CalendarView.types';
import { formatDate } from '../../utils/date.utils';
import { getEventColor } from '../../utils/event.utils';
import { cn } from '../../lib/utils';

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isFocused: boolean;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onFocus: (date: Date) => void;
}

export const CalendarCell = ({
  date,
  events,
  isCurrentMonth,
  isToday,
  isFocused,
  onDateClick,
  onEventClick,
  onFocus,
}: CalendarCellProps) => {
  const displayedEvents = events.slice(0, 3);
  const extraCount = events.length - 3;

  return (
    <div
      className={cn(
        'min-h-[120px] border-r border-b border-border p-2 transition-colors cursor-pointer outline-none',
        'hover:bg-[hsl(var(--calendar-hover))]',
        'focus-visible:ring-2 focus-visible:ring-[hsl(var(--calendar-focus-ring))] focus-visible:ring-inset',
        !isCurrentMonth && 'bg-muted/30',
        isFocused && 'ring-2 ring-[hsl(var(--calendar-focus-ring))] ring-inset'
      )}
      onClick={() => onDateClick(date)}
      onFocus={() => onFocus(date)}
      tabIndex={0}
      role="gridcell"
      aria-label={`${formatDate(date, 'MMMM d, yyyy')}${events.length > 0 ? `, ${events.length} event${events.length > 1 ? 's' : ''}` : ''}`}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            'text-sm font-medium',
            !isCurrentMonth && 'text-[hsl(var(--calendar-other-month))]',
            isToday && 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center'
          )}
        >
          {formatDate(date, 'd')}
        </span>
      </div>

      <div className="space-y-1">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            className="text-xs p-1 rounded truncate cursor-pointer transition-opacity hover:opacity-80"
            style={{
              backgroundColor: getEventColor(event.color),
              color: 'white',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            {formatDate(event.startDate, 'HH:mm')} {event.title}
          </div>
        ))}
        
        {extraCount > 0 && (
          <div className="text-xs text-muted-foreground pl-1">
            +{extraCount} more
          </div>
        )}
      </div>
    </div>
  );
};
