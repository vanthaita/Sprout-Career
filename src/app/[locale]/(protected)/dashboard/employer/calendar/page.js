'use client'
import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, MoreVertical, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const CalendarPage = () => {
  const primaryColor = '#3A6B4C';
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Interview with Alex",
      date: new Date(new Date().setHours(10, 0, 0, 0)),
      duration: 60,
      color: "#3A6B4C"
    },
    {
      id: 2,
      title: "Team Meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      duration: 90,
      color: "#2563EB"
    }
  ]);

  const addNewEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      date: new Date(),
      duration: 60,
      color: "#7C3AED"
    };
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const addToGoogleCalendar = (event) => {
    const startTime = event.date.toISOString().replace(/-|:|\.\d+/g, '');
    const endTime = new Date(event.date.getTime() + event.duration * 60000)
      .toISOString()
      .replace(/-|:|\.\d+/g, '');

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startTime}/${endTime}&details=&location=&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
  };

  const renderMonthView = () => {
    const currentDate = new Date(date);
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    return Array.from({ length: 35 }).map((_, i) => {
      const day = i - firstDay + 1;
      const cellDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === cellDate.getDate() &&
          event.date.getMonth() === cellDate.getMonth() &&
          event.date.getFullYear() === cellDate.getFullYear()
      );

      return (
        <div
          key={i}
          className={`p-2 border min-h-24 ${
            day < 1 || day > daysInMonth
              ? "bg-gray-50 text-gray-400"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="text-right mb-1">
            {day > 0 && day <= daysInMonth ? day : ""}
          </div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="text-xs p-1 rounded truncate text-white"
                style={{ backgroundColor: event.color }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  // Render tuần
  const renderWeekView = () => {
    const currentDate = new Date(date);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === day.getDate() &&
          event.date.getMonth() === day.getMonth() &&
          event.date.getFullYear() === day.getFullYear()
      );

      return (
        <div key={i} className="border-r last:border-r-0">
          <div className="p-2 border-b text-center font-medium bg-gray-50">
            {day.toLocaleDateString('en-US', { weekday: 'short' })}
            <div className="text-sm font-normal">
              {day.getDate()}
            </div>
          </div>
          <div className="p-2 space-y-2">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="text-xs p-2 rounded text-white"
                style={{ backgroundColor: event.color }}
              >
                <div className="font-medium">{event.title}</div>
                <div>
                  {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  // Render ngày
  const renderDayView = () => {
    return Array.from({ length: 24 }).map((_, hour) => {
      const hourEvents = events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear() &&
          event.date.getHours() === hour
      );

      return (
        <div key={hour} className="flex min-h-16">
          <div className="w-16 p-2 text-xs text-gray-500 border-r">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
          <div className="flex-1 p-1 relative">
            {hourEvents.map((event) => (
              <div
                key={event.id}
                className="absolute left-0 right-0 mx-1 p-2 rounded text-white text-sm"
                style={{ 
                  backgroundColor: event.color,
                  top: `${(event.date.getMinutes() / 60) * 100}%`,
                  height: `${(event.duration / 60) * 100}%`
                }}
              >
                <div className="font-medium">{event.title}</div>
                <div>
                  {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                  {new Date(event.date.getTime() + event.duration * 60000)
                    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-1 right-1 h-6 w-6 text-white/80 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => addToGoogleCalendar(event)}>
                      Add to Google Calendar
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => deleteEvent(event.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              const newDate = new Date(date);
              newDate.setMonth(newDate.getMonth() - 1);
              setDate(newDate);
            }}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" onClick={() => {
              const newDate = new Date(date);
              newDate.setMonth(newDate.getMonth() + 1);
              setDate(newDate);
            }}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView("day")}
            className={view === "day" ? "bg-gray-100" : ""}
          >
            Day
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView("week")}
            className={view === "week" ? "bg-gray-100" : ""}
          >
            Week
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setView("month")}
            className={view === "month" ? "bg-gray-100" : ""}
          >
            Month
          </Button>
          <Button 
            size="sm" 
            className="gap-2"
            style={{ backgroundColor: primaryColor }}
            onClick={addNewEvent}
          >
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 rounded-lg border overflow-hidden">
        {view === "month" && (
          <div className="grid grid-cols-7 h-full">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 border-b text-center font-medium bg-gray-50">
                {day}
              </div>
            ))}
            {/* Calendar cells */}
            {renderMonthView()}
          </div>
        )}

        {view === "week" && (
          <div className="grid grid-cols-7 h-full">
            {renderWeekView()}
          </div>
        )}

        {view === "day" && (
          <div className="h-full overflow-y-auto">
            <div className="border-b p-2 font-medium text-center bg-gray-50">
              {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="divide-y">
              {renderDayView()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;