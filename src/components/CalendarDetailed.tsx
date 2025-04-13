import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarEvent, Campaign } from '@/types';
import { useNavigate } from 'react-router-dom';

interface CalendarDetailedProps {
  events: CalendarEvent[];
  campaigns: Campaign[];
}

const CalendarDetailed: React.FC<CalendarDetailedProps> = ({ events, campaigns }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);
  
  const getStatusColor = (status: string) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
      'draft': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700',
      'paused': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700';
  };
  
  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'email':
        return '📧';
      case 'social':
        return '📱';
      case 'blog':
        return '📝';
      case 'ads':
        return '🎯';
      default:
        return '📊';
    }
  };
  
  const goToPrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  const getEventsForDay = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    return events.filter(event => event.date === formattedDate);
  };
  
  const handleEventClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Calendrier des campagnes</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {format(currentMonth, 'MMMM yyyy', { locale: fr })}
          </span>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 p-1"></div>
        ))}
        
        {monthDays.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday = format(new Date(), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          
          return (
            <div
              key={day.toString()}
              className={`h-24 p-1 border rounded-md ${
                isToday 
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
              }`}
            >
              <div className="text-right mb-1">
                <span className={`text-xs font-medium ${isToday ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-400'}`}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="space-y-1 overflow-y-auto h-[calc(100%-20px)]">
                {dayEvents.map((event) => {
                  const campaign = campaigns.find(c => c.id === event.campaignId);
                  return (
                    <div
                      key={event.id}
                      className={`px-1 py-0.5 text-xs rounded border cursor-pointer ${getStatusColor(event.status)}`}
                      onClick={() => handleEventClick(event.campaignId)}
                    >
                      <div className="flex items-center">
                        <span className="mr-1">{getChannelIcon(event.channel)}</span>
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDetailed;
