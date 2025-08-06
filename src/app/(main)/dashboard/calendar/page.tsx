"use client";

import { useState } from "react";
import { CalendarIcon, Clock, MapPin, Users, Plus, Calendar as CalendarLucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MeetingCalendar, type MeetingEvent } from "@/components/calendar/meeting-calendar";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Team Standup",
    time: "9:00 AM",
    duration: "30 min",
    type: "meeting",
    attendees: 5,
    location: "Conference Room A",
  },
  {
    id: 2,
    title: "Project Review",
    time: "2:00 PM",
    duration: "1 hour",
    type: "review",
    attendees: 8,
    location: "Main Hall",
  },
  {
    id: 3,
    title: "Client Call",
    time: "4:00 PM",
    duration: "45 min",
    type: "call",
    attendees: 3,
    location: "Virtual",
  },
];

const durations = ["15 minutes", "30 minutes", "45 minutes", "1 hour", "1.5 hours", "2 hours"];

const EventCard = ({ event }: { event: (typeof mockEvents)[0] }) => {
  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-100";
      case "review":
        return "bg-green-100 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-100";
      case "call":
        return "bg-purple-100 border-purple-200 text-purple-800 dark:bg-purple-900 dark:border-purple-800 dark:text-purple-100";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100";
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${getEventColor(event.type)}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{event.title}</h4>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-3" />
                <span>{event.attendees}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm opacity-80">
              <MapPin className="size-3" />
              <span>{event.location}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {event.duration}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Dynamic event card for calendar events
const CalendarEventCard = ({ event }: { event: { id: string; title: string; start: Date; end: Date; type: string } }) => {
  const getEventColor = (type: string) => {
    switch (type) {
      case "personal":
        return "bg-orange-100 border-orange-200 text-orange-800";
      case "important":
        return "bg-red-100 border-red-200 text-red-800";
      case "fun":
        return "bg-blue-100 border-blue-200 text-blue-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const duration = Math.round((event.end.getTime() - event.start.getTime()) / (1000 * 60));
  const durationText = duration >= 60 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : `${duration}m`;

  return (
    <Card className={`transition-all hover:shadow-md ${getEventColor(event.type)}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{event.title}</h4>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {durationText}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const BookingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    dateTime: undefined as { date?: Date; time?: { hour: number; minute: number; period: "AM" | "PM" } } | undefined,
    duration: "",
    location: "",
    attendees: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking meeting:", formData);
    // Here you would typically send the data to your backend
    setIsOpen(false);
    // Reset form
    setFormData({
      title: "",
      dateTime: undefined,
      duration: "",
      location: "",
      attendees: "",
      description: "",
    });
  };

  const isFormValid = formData.title && formData.dateTime?.date && formData.dateTime?.time && formData.duration;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Book a Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book a Meeting</DialogTitle>
          <DialogDescription>Schedule a new meeting by filling out the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title *</Label>
              <Input
                id="title"
                placeholder="Enter meeting title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendees">Attendees (Email)</Label>
              <Input
                id="attendees"
                placeholder="Enter email addresses"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Date & Time *</Label>
              <div className="flex justify-center">
              </div>
            </div>
            <div className="space-y-2">
              <Label>Duration *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Conference room, virtual link, etc."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Meeting agenda, notes, etc."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Book Meeting
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<MeetingEvent | null>(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2024, 2, 15)); // Track calendar's current date

  const handleSelectEvent = (event: MeetingEvent) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };

  const handleCreateEvent = (slot: { start: Date; end: Date }) => {
    console.log("Create event for slot:", slot);
    // You can implement event creation logic here
    // For now, this could trigger the booking dialog with pre-filled times
  };

  const handleDateChange = (date: Date) => {
    setCalendarDate(date);
  };

  // Get events for the selected calendar date
  const getEventsForDate = (date: Date) => {
    const sampleEvents = [
      {
        id: "1",
        title: "Groomers appt.",
        start: new Date(2024, 2, 1, 10, 0),
        end: new Date(2024, 2, 1, 11, 0),
        type: "personal" as const,
      },
      {
        id: "2",
        title: "Meeting w/ Chris",
        start: new Date(2024, 2, 3, 14, 0),
        end: new Date(2024, 2, 3, 15, 0),
        type: "important" as const,
      },
      {
        id: "15",
        title: "Vaccine appt.",
        start: new Date(2024, 2, 15, 10, 0),
        end: new Date(2024, 2, 15, 10, 30),
        type: "personal" as const,
      },
      {
        id: "16",
        title: "Take Jake to dinner",
        start: new Date(2024, 2, 15, 18, 0),
        end: new Date(2024, 2, 15, 20, 0),
        type: "fun" as const,
      },
    ];

    return sampleEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const selectedDateEvents = getEventsForDate(calendarDate);
  const isToday = calendarDate.toDateString() === new Date().toDateString();
  const dateLabel = isToday ? "Today's Events" : `Events for ${calendarDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and book meetings with your team.</p>
        </div>
        <BookingDialog />
      </div>

      {/* Calendar */}
      <MeetingCalendar
        onSelectEvent={handleSelectEvent}
        onCreateEvent={handleCreateEvent}
        onDateChange={handleDateChange}
      />

      {/* Dynamic Events Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{dateLabel}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => (
              <CalendarEventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No events scheduled for this day</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {selectedEvent.start.toLocaleDateString()} at {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>
                  {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                  {selectedEvent.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="size-4" />
                  <span>{selectedEvent.attendees.length} attendees</span>
                </div>
              )}
              <Badge variant="secondary" className="w-fit">
                {selectedEvent.type}
              </Badge>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEventDetailOpen(false)}>
                Close
              </Button>
              <Button type="button">
                Edit Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
