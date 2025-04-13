import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import CalendarDetailed from '@/components/CalendarDetailed';
import { getCalendarEvents } from '@/services/storageService';
import { CalendarEvent } from '@/types';
import { mockCalendarEvents } from '@/data/mockData';

const CalendarView = () => {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load events from localStorage
    const storedEvents = getCalendarEvents();
    
    if (storedEvents.length > 0) {
      setCalendarEvents(storedEvents);
    } else {
      // Use mock data for initial state
      setCalendarEvents(mockCalendarEvents);
    }
  }, []);

  const handleAddEvent = (event: CalendarEvent) => {
    setCalendarEvents([...calendarEvents, event]);
    
    toast({
      title: "Événement ajouté",
      description: `L'événement "${event.title}" a été ajouté au calendrier.`,
    });
  };
  
  const handleEditEvent = (event: CalendarEvent) => {
    const updatedEvents = calendarEvents.map(e => 
      e.id === event.id ? event : e
    );
    setCalendarEvents(updatedEvents);
    
    toast({
      title: "Événement modifié",
      description: `L'événement "${event.title}" a été mis à jour.`,
    });
  };
  
  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = calendarEvents.filter(e => e.id !== eventId);
    setCalendarEvents(updatedEvents);
    
    toast({
      title: "Événement supprimé",
      description: "L'événement a été supprimé du calendrier.",
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Calendrier</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Ajouter un événement
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90">
            Exporter
          </button>
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
        <CalendarDetailed events={calendarEvents} />
      </div>
    </Layout>
  );
};

export default CalendarView;
