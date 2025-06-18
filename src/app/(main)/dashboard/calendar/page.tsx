"use client";

import { useState } from "react";
import { CalendarIcon, Clock, MapPin, Users, Plus } from "lucide-react";

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

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
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
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-1/2 max-md:w-full max-md:ml-0">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <div className="border rounded-md p-2">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date()}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 ml-5 max-md:w-full max-md:ml-0">
                <div className="space-y-2">
                  <Label>Time *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar Widget */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="size-5" />
              Calendar
            </CardTitle>
            <CardDescription>Select a date to view scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0 w-full"
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Events for{" "}
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
            <CardDescription>{mockEvents.length} events scheduled for this day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.length > 0 ? (
                mockEvents.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto size-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No events scheduled</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You don&apos;t have any events scheduled for this day.
                  </p>
                  <BookingDialog />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <CalendarIcon className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{mockEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Clock className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold">{mockEvents.reduce((sum, event) => sum + event.attendees, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <MapPin className="size-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Locations</p>
                <p className="text-2xl font-bold">{new Set(mockEvents.map((event) => event.location)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
