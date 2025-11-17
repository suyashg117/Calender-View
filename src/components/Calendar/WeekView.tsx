import type  { CalendarEvent } from './CalendarView.types';
import { getWeekDays, formatDate, timeSlots, getMinutesBetween } from '../../utils/date.utils';
import { getEventsForDay } from '../../utils/event.utils';
import { getEventColor } from '../../utils/event.utils';
import { cn } from '../../lib/utils';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  focusedDate: Date | null;
  focusedHour: number | null;
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
  onFocusTimeSlot: (date: Date, hour: number) => void;
  onKeyDown: (e: React.KeyboardEvent, date: Date, hour: number) => void;
}

export const WeekView = ({ currentDate, events, focusedDate, focusedHour, onTimeSlotClick, onEventClick, onFocusTimeSlot, onKeyDown }: WeekViewProps) => {
  const weekDays = getWeekDays(currentDate);

  const getEventPosition = (event: CalendarEvent, day: Date) => {
    const startHour = event.startDate.getHours();
    const startMinute = event.startDate.getMinutes();
    const duration = getMinutesBetween(event.startDate, event.endDate);
    
    const top = (startHour * 60 + startMinute) / 60;
    const height = Math.max(duration / 60, 0.5);
    
    return { top, height };
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-auto">
      {/* Day headers */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border bg-muted/50 sticky top-0 z-10">
        <div className="p-2"></div>
        {weekDays.map((day:any) => (
          <div key={day.toISOString()} className="p-2 text-center border-l border-border">
            <div className="text-sm font-medium">{formatDate(day, 'EEE')}</div>
            <div className="text-2xl font-semibold">{formatDate(day, 'd')}</div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="relative flex-1">
        <div className="grid grid-cols-[80px_repeat(7,1fr)]">
          {timeSlots.map((time:any, hourIndex:any) => (
            <div key={time} className="contents">
              <div className="p-2 text-xs text-muted-foreground text-right border-b border-border">
                {time}
              </div>
              {weekDays.map((day:any) => {
                const isFocused = focusedDate && focusedHour === hourIndex && 
                  formatDate(day, 'yyyy-MM-dd') === formatDate(focusedDate, 'yyyy-MM-dd');
                
                return (
                  <div
                    key={`${day.toISOString()}-${time}`}
                    className={cn(
                      'relative border-l border-b border-border min-h-[60px] hover:bg-[hsl(var(--calendar-hover))] cursor-pointer transition-colors outline-none',
                      'focus-visible:ring-2 focus-visible:ring-[hsl(var(--calendar-focus-ring))] focus-visible:ring-inset',
                      isFocused && 'ring-2 ring-[hsl(var(--calendar-focus-ring))] ring-inset'
                    )}
                    onClick={() => onTimeSlotClick(day, hourIndex)}
                    onFocus={() => onFocusTimeSlot(day, hourIndex)}
                    onKeyDown={(e) => onKeyDown(e, day, hourIndex)}
                    tabIndex={0}
                    role="gridcell"
                    aria-label={`${formatDate(day, 'EEEE, MMMM d')} at ${time}`}
                  >
                  {/* Events positioned absolutely within their time slots */}
                  {hourIndex === 0 && getEventsForDay(events, day).map((event) => {
                    const { top, height } = getEventPosition(event, day);
                    return (
                      <div
                        key={event.id}
                        className="absolute left-1 right-1 rounded p-1 text-xs overflow-hidden cursor-pointer transition-opacity hover:opacity-80 z-20"
                        style={{
                          top: `${top * 60}px`,
                          height: `${height * 60}px`,
                          backgroundColor: getEventColor(event.color),
                          color: 'white',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-[10px] opacity-90">
                          {formatDate(event.startDate, 'HH:mm')} - {formatDate(event.endDate, 'HH:mm')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
