import { useState, useCallback } from 'react';
import  type { ViewMode } from '../components/Calendar/CalendarView.types';
import { goToNextMonth, goToPreviousMonth, goToNextWeek, goToPreviousWeek } from '../utils/date.utils';

interface CalendarState {
  currentDate: Date;
  viewMode: ViewMode;
  selectedDate: Date | null;
  focusedDate: Date | null;
}

export const useCalendar = (initialDate?: Date, initialView?: ViewMode) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate || new Date(),
    viewMode: initialView || 'month',
    selectedDate: null,
    focusedDate: null,
  });

  const setViewMode = useCallback((mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  const setSelectedDate = useCallback((date: Date | null) => {
    setState(prev => ({ ...prev, selectedDate: date }));
  }, []);

  const goNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: prev.viewMode === 'month' 
        ? goToNextMonth(prev.currentDate)
        : goToNextWeek(prev.currentDate),
    }));
  }, []);

  const goPrevious = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: prev.viewMode === 'month'
        ? goToPreviousMonth(prev.currentDate)
        : goToPreviousWeek(prev.currentDate),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({ ...prev, currentDate: new Date(), focusedDate: new Date() }));
  }, []);

  const setFocusedDate = useCallback((date: Date | null) => {
    setState(prev => ({ ...prev, focusedDate: date }));
  }, []);

  return {
    ...state,
    setViewMode,
    setSelectedDate,
    goNext,
    goPrevious,
    goToToday,
    setFocusedDate,
  };
};
