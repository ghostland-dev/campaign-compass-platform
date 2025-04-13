
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarWrapperProps {
  events: any[];
  className?: string;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({ events, className }) => {
  // Initialize with current date
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Filter events for the selected date if needed
  const eventsForSelectedDate = date ? events.filter(event => 
    event.date === format(date, 'yyyy-MM-dd')
  ) : [];
  
  return (
    <div className={cn("bg-card text-card-foreground rounded-lg shadow-sm border border-border p-4", className)}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={fr}
        className="w-full"
      />
      
      {eventsForSelectedDate.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">Événements du {date && format(date, 'dd MMMM yyyy', { locale: fr })}</h3>
          <div className="space-y-1">
            {eventsForSelectedDate.map((event) => (
              <div key={event.id} className="text-xs p-2 bg-secondary/20 rounded-md">
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWrapper;
