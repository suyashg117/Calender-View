import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, format, addMonths, subMonths, addWeeks, subWeeks, startOfDay, endOfDay, differenceInMinutes } from 'date-fns';

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  return eachDayOfInterval({ start, end });
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
};

export const isSameMonthAs = (date: Date, compareDate: Date): boolean => {
  return isSameMonth(date, compareDate);
};

export const isSameDayAs = (date: Date, compareDate: Date): boolean => {
  return isSameDay(date, compareDate);
};

export const isTodayDate = (date: Date): boolean => {
  return isToday(date);
};

export const formatDate = (date: Date, formatStr: string): string => {
  return format(date, formatStr);
};

export const goToNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const goToPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

export const goToNextWeek = (date: Date): Date => {
  return addWeeks(date, 1);
};

export const goToPreviousWeek = (date: Date): Date => {
  return subWeeks(date, 1);
};

export const getStartOfDay = (date: Date): Date => {
  return startOfDay(date);
};

export const getEndOfDay = (date: Date): Date => {
  return endOfDay(date);
};

export const getMinutesBetween = (start: Date, end: Date): number => {
  return differenceInMinutes(end, start);
};

export const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});
