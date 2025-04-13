
import React from 'react';
import { Calendar } from './Calendar';
import { cn } from '@/lib/utils';

interface CalendarWrapperProps {
  events: any[];
  className?: string;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({ events, className }) => {
  return (
    <div className={cn("bg-card text-card-foreground rounded-lg shadow-sm border border-border p-4", className)}>
      <Calendar events={events} />
    </div>
  );
};

export default CalendarWrapper;
