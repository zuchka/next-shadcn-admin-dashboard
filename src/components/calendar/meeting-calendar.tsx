"use client";

import { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer, View, Event } from "react-big-calendar";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Event types matching the Figma design color scheme
export type EventType = "personal" | "important" | "fun" | "work";

export interface MeetingEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  description?: string;
  location?: string;
  attendees?: string[];
}

// Sample events data based on the Figma design
const sampleEvents: MeetingEvent[] = [
  {
    id: "1",
    title: "Groomers appt.",
    start: moment("2024-03-01 10:00").toDate(),
    end: moment("2024-03-01 11:00").toDate(),
    type: "personal",
  },
  {
    id: "2",
    title: "Meeting w/ Chris",
    start: moment("2024-03-03 14:00").toDate(),
    end: moment("2024-03-03 15:00").toDate(),
    type: "important",
  },
  {
    id: "3",
    title: "Lunch w/ Mom",
    start: moment("2024-03-05 12:00").toDate(),
    end: moment("2024-03-05 13:00").toDate(),
    type: "fun",
  },
  {
    id: "4",
    title: "Financial Advisor Meeting",
    start: moment("2024-03-07 10:00").toDate(),
    end: moment("2024-03-07 11:30").toDate(),
    type: "important",
  },
  {
    id: "5",
    title: "Interview w/ Figma",
    start: moment("2024-03-08 14:00").toDate(),
    end: moment("2024-03-08 15:00").toDate(),
    type: "important",
  },
  {
    id: "6",
    title: "Send follow-up email!",
    start: moment("2024-03-08 16:00").toDate(),
    end: moment("2024-03-08 16:30").toDate(),
    type: "personal",
  },
  {
    id: "7",
    title: "Ashley's Choir Recital",
    start: moment("2024-03-12 19:00").toDate(),
    end: moment("2024-03-12 21:00").toDate(),
    type: "fun",
  },
  {
    id: "8",
    title: "Budget for next month",
    start: moment("2024-03-14 09:00").toDate(),
    end: moment("2024-03-14 10:00").toDate(),
    type: "important",
  },
  {
    id: "9",
    title: "Vaccine appt.",
    start: moment("2024-03-15 10:00").toDate(),
    end: moment("2024-03-15 10:30").toDate(),
    type: "personal",
  },
  {
    id: "10",
    title: "Take Jake to dinner",
    start: moment("2024-03-15 18:00").toDate(),
    end: moment("2024-03-15 20:00").toDate(),
    type: "fun",
  },
  {
    id: "11",
    title: "St. Patrick's Day!",
    start: moment("2024-03-17 12:00").toDate(),
    end: moment("2024-03-17 23:59").toDate(),
    type: "fun",
  },
  {
    id: "12",
    title: "DMV appointment",
    start: moment("2024-03-17 14:00").toDate(),
    end: moment("2024-03-17 15:00").toDate(),
    type: "important",
  },
  {
    id: "13",
    title: "PTO day",
    start: moment("2024-03-18").toDate(),
    end: moment("2024-03-18 23:59").toDate(),
    type: "personal",
  },
  {
    id: "14",
    title: "Dinner with Kate and Dan",
    start: moment("2024-03-20 19:00").toDate(),
    end: moment("2024-03-20 22:00").toDate(),
    type: "fun",
  },
  {
    id: "15",
    title: "Important work meeting",
    start: moment("2024-03-22 09:00").toDate(),
    end: moment("2024-03-22 11:00").toDate(),
    type: "important",
  },
  {
    id: "16",
    title: "Costco trip",
    start: moment("2024-03-22 15:00").toDate(),
    end: moment("2024-03-22 17:00").toDate(),
    type: "personal",
  },
  {
    id: "17",
    title: "Fly to Japan",
    start: moment("2024-03-25 06:00").toDate(),
    end: moment("2024-03-25 20:00").toDate(),
    type: "fun",
  },
  {
    id: "18",
    title: "Hot dog eating contest",
    start: moment("2024-03-26 14:00").toDate(),
    end: moment("2024-03-26 16:00").toDate(),
    type: "fun",
  },
  {
    id: "19",
    title: "Meeting w/ architect",
    start: moment("2024-03-26 10:00").toDate(),
    end: moment("2024-03-26 11:30").toDate(),
    type: "important",
  },
  {
    id: "20",
    title: "Movie date night",
    start: moment("2024-03-26 19:00").toDate(),
    end: moment("2024-03-26 22:00").toDate(),
    type: "fun",
  },
  {
    id: "21",
    title: "Meeting w/ Mac",
    start: moment("2024-03-28 10:00").toDate(),
    end: moment("2024-03-28 11:00").toDate(),
    type: "important",
  },
  {
    id: "22",
    title: "Pick up Jerry from doc appt.",
    start: moment("2024-03-29 15:00").toDate(),
    end: moment("2024-03-29 16:00").toDate(),
    type: "personal",
  },
  {
    id: "23",
    title: "Radiohead concert",
    start: moment("2024-03-29 20:00").toDate(),
    end: moment("2024-03-29 23:00").toDate(),
    type: "fun",
  },
  {
    id: "24",
    title: "Learn something new",
    start: moment("2024-03-31 09:00").toDate(),
    end: moment("2024-03-31 12:00").toDate(),
    type: "personal",
  },
];

const eventTypeColors: Record<EventType, { bg: string; text: string }> = {
  personal: { bg: "bg-[#FEE6C9]", text: "text-black" },
  important: { bg: "bg-[#FFD9D9]", text: "text-black" },
  fun: { bg: "bg-[#D2F0FF]", text: "text-black" },
  work: { bg: "bg-muted", text: "text-foreground" },
};

interface MeetingCalendarProps {
  events?: MeetingEvent[];
  onSelectEvent?: (event: MeetingEvent) => void;
  onCreateEvent?: (slot: { start: Date; end: Date }) => void;
  onDateChange?: (date: Date) => void;
}

// Custom month date cell component that shows event indicators
const MonthDateCell = ({
  date,
  events,
  onDayClick
}: {
  date: Date;
  events: MeetingEvent[];
  onDayClick?: (date: Date, events: MeetingEvent[]) => void;
}) => {
  const dayEvents = events.filter(event =>
    moment(event.start).isSame(date, 'day')
  );

  const eventColors = {
    personal: "#F97316", // Bright orange
    important: "#EF4444", // Bright red
    fun: "#3B82F6", // Bright blue
    work: "#6B7280" // Gray
  };

  const isToday = moment(date).isSame(new Date(), 'day');

  return (
    <div
      className={`h-full w-full relative flex flex-col items-center justify-start pt-1 cursor-pointer hover:bg-gray-50 ${
        dayEvents.length > 0 ? 'hover:bg-blue-50' : ''
      }`}
      onClick={() => onDayClick?.(date, dayEvents)}
    >
      <div className={`text-xs font-normal mb-1 ${
        isToday ? 'bg-[#252525] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]' : ''
      }`}>
        {moment(date).format('D')}
      </div>
      {dayEvents.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center max-w-full">
          {dayEvents.slice(0, 3).map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: eventColors[event.type] || eventColors.work }}
              title={event.title}
            />
          ))}
          {dayEvents.length > 3 && (
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: "#9CA3AF" }}
              title={`+${dayEvents.length - 3} more events`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export function MeetingCalendar({
  events = sampleEvents,
  onSelectEvent,
  onCreateEvent,
  onDateChange
}: MeetingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 15)); // March 15, 2024 - has events
  const [view, setView] = useState<View>("month");

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    onDateChange?.(date);
  };

  const handleDayClick = (date: Date, dayEvents: MeetingEvent[]) => {
    handleDateChange(date);
    // Don't automatically switch views - let users use the view tabs
    // Just update the selected date and events will show below
  };

  const eventStyleGetter = useCallback(
    (event: MeetingEvent) => {
      const colorMap = {
        personal: { bg: "#FEE6C9", color: "#000" },
        important: { bg: "#FFD9D9", color: "#000" },
        fun: { bg: "#D2F0FF", color: "#000" },
        work: { bg: "#f3f4f6", color: "#000" },
      };

      const colors = colorMap[event.type] || colorMap.work;

      return {
        style: {
          backgroundColor: colors.bg,
          border: "none",
          borderRadius: "2px",
          color: colors.color,
          fontSize: "8px",
          fontWeight: "400",
          padding: "2px 4px",
          fontFamily: "var(--font-lato), Lato, -apple-system, Roboto, Helvetica, sans-serif",
          cursor: "pointer",
          transition: "all 0.2s ease",
        },
      };
    },
    []
  );

  const formats = useMemo(
    () => ({
      monthHeaderFormat: "MMMM YYYY",
      dayHeaderFormat: "ddd",
      weekdayFormat: "ddd M/D",
      timeGutterFormat: "h A",
      eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format("h:mm A")} - ${moment(end).format("h:mm A")}`,
      dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format("MMMM DD")} – ${moment(end).format("MMMM DD, YYYY")}`,
      agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format("MMMM DD")} – ${moment(end).format("MMMM DD, YYYY")}`,
    }),
    []
  );

  const customToolbar = ({ label, onNavigate }: any) => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3 bg-white p-3 rounded">
        <h2 className="text-[28px] leading-[35px] text-[#252525] font-[var(--font-lato)]">
          <span className="font-black">{moment(currentDate).format("MMMM")}</span>
          <span className="ml-3 font-normal">{moment(currentDate).format("YYYY")}</span>
        </h2>
      </div>
      <div className="flex items-center gap-3">
        {/* View Selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={view === "month" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("month")}
            className="h-8 px-3 text-xs"
          >
            Month
          </Button>
          <Button
            variant={view === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("week")}
            className="h-8 px-3 text-xs"
          >
            Week
          </Button>
          <Button
            variant={view === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("day")}
            className="h-8 px-3 text-xs"
          >
            Day
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              handleDateChange(today);
              onNavigate("TODAY");
            }}
            className="h-8 px-3 text-xs"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newDate = moment(currentDate).subtract(1, view === "month" ? "month" : view === "week" ? "week" : "day").toDate();
              handleDateChange(newDate);
              onNavigate("PREV");
            }}
            className="h-8 w-8 p-0 hover:bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newDate = moment(currentDate).add(1, view === "month" ? "month" : view === "week" ? "week" : "day").toDate();
              handleDateChange(newDate);
              onNavigate("NEXT");
            }}
            className="h-8 w-8 p-0 hover:bg-gray-100 flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="meeting-calendar bg-white rounded-lg border p-6 w-full">
      <style jsx global>{`
        .meeting-calendar .rbc-calendar {
          font-family: var(--font-lato), 'Lato', -apple-system, Roboto, Helvetica, sans-serif;
          background: white;
        }
        
        .meeting-calendar .rbc-toolbar {
          display: none;
        }
        
        .meeting-calendar .rbc-month-view {
          border: none;
        }
        
        .meeting-calendar .rbc-header {
          background: white;
          border-bottom: 1px solid #f0f0f0;
          padding: 8px 0;
          font-size: 12px;
          font-weight: 400;
          color: #252525;
          opacity: 0.5;
          text-align: center;
        }
        
        .meeting-calendar .rbc-month-row {
          border: none;
        }
        
        .meeting-calendar .rbc-date-cell {
          text-align: center;
          padding: 5px 0;
          font-size: 10px;
          font-weight: 400;
          color: #252525;
        }
        
        .meeting-calendar .rbc-date-cell.rbc-off-range {
          opacity: 0.5;
        }
        
        .meeting-calendar .rbc-today {
          background: #252525;
          color: white;
          border-radius: 9px;
          width: 18px;
          height: 18px;
          margin: 3px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .meeting-calendar .rbc-day-bg {
          border: none;
          border-right: 1px solid #f5f5f5;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .meeting-calendar .rbc-day-bg:last-child {
          border-right: none;
        }
        
        .meeting-calendar .rbc-month-row:last-child .rbc-day-bg {
          border-bottom: none;
        }
        
        .meeting-calendar .rbc-event {
          border: none !important;
          border-radius: 2px;
          padding: 2px 4px;
          margin: 1px 2px;
          font-size: 8px;
          line-height: 1.25;
          font-weight: 400;
          font-family: var(--font-lato), 'Lato', -apple-system, Roboto, Helvetica, sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .meeting-calendar .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .meeting-calendar .rbc-event:focus {
          outline: none;
        }
        
        .meeting-calendar .rbc-event-content {
          font-size: 8px;
          line-height: 1.25;
        }
        
        .meeting-calendar .rbc-show-more {
          color: #015DE7;
          font-size: 8px;
          font-weight: 400;
          text-decoration: none;
          padding: 2px 4px;
          text-align: right;
        }
        
        .meeting-calendar .rbc-show-more:hover {
          text-decoration: underline;
        }
        
        .meeting-calendar .rbc-row-content {
          z-index: 1;
        }
        
        .meeting-calendar .rbc-addons-dnd .rbc-addons-dnd-drag-preview {
          display: none;
        }

        .meeting-calendar .rbc-month-view .rbc-row {
          min-height: 85px;
        }

        .meeting-calendar .rbc-row-content {
          padding: 2px;
        }

        .meeting-calendar .rbc-date-cell a {
          text-decoration: none;
        }

        /* Month view with event indicators */
        .meeting-calendar .rbc-month-view .rbc-date-cell {
          padding: 0;
          height: 100%;
        }

        .meeting-calendar .rbc-month-view .rbc-row-content {
          z-index: 1;
          position: relative;
        }

        .meeting-calendar .rbc-month-view .rbc-date-cell > a {
          display: none; /* Hide default date display since we're using custom component */
        }

        /* Day and Week view improvements */
        .meeting-calendar .rbc-time-view .rbc-header {
          border-bottom: 1px solid #e5e7eb;
          padding: 8px;
          font-weight: 500;
        }

        .meeting-calendar .rbc-time-content {
          border-top: none;
        }

        .meeting-calendar .rbc-time-slot {
          border-top: 1px solid #f3f4f6;
        }

        .meeting-calendar .rbc-time-slot:first-child {
          border-top: none;
        }

        .meeting-calendar .rbc-day-slot .rbc-time-slot {
          height: 40px;
        }

        .meeting-calendar .rbc-time-header-content {
          border-left: 1px solid #e5e7eb;
        }

        .meeting-calendar .rbc-time-header-content:first-child {
          border-left: none;
        }

        .meeting-calendar .rbc-day-bg + .rbc-day-bg {
          border-left: 1px solid #e5e7eb;
        }

        /* Week view specific */
        .meeting-calendar .rbc-time-view .rbc-allday-cell {
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Current time indicator */
        .meeting-calendar .rbc-current-time-indicator {
          background-color: #ef4444;
          height: 2px;
          z-index: 3;
        }

        /* Event improvements for time views */
        .meeting-calendar .rbc-time-view .rbc-event {
          font-size: 11px;
          padding: 4px 6px;
          border-left: 3px solid rgba(0,0,0,0.2);
        }

        .meeting-calendar .rbc-time-view .rbc-event-content {
          font-size: 11px;
          font-weight: 500;
        }
      `}</style>
      
      <Calendar
        localizer={localizer}
        events={view === "month" ? [] : events} // Hide events in month view, show indicators instead
        startAccessor="start"
        endAccessor="end"
        style={{ height: view === "month" ? 600 : view === "week" ? 500 : 400 }}
        view={view}
        onView={setView}
        date={currentDate}
        onNavigate={(date, view, action) => {
          handleDateChange(date);
        }}
        min={view === "day" ? moment().hour(6).minute(0).second(0).toDate() : undefined}
        max={view === "day" ? moment().hour(22).minute(0).second(0).toDate() : undefined}
        eventPropGetter={eventStyleGetter}
        formats={formats}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onCreateEvent}
        selectable
        popup={false}
        showMultiDayTimes={false}
        components={{
          toolbar: customToolbar,
          month: {
            dateHeader: ({ date, label }: { date: Date; label: string }) => (
              <MonthDateCell
                date={date}
                events={events}
                onDayClick={handleDayClick}
              />
            ),
          },
        }}
        messages={{
          showMore: (total) => `view more`,
        }}
      />
    </div>
  );
}
