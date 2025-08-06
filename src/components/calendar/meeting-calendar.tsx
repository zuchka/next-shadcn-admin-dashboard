"use client";

import { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer, View, Event } from "react-big-calendar";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Event types for CRM activities
export type EventType = "important" | "work" | "fun" | "personal";

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

// Sample CRM events data
const sampleEvents: MeetingEvent[] = [
  {
    id: "1",
    title: "Discovery Call - TechCorp",
    start: moment("2024-03-01 10:00").toDate(),
    end: moment("2024-03-01 11:00").toDate(),
    type: "important",
  },
  {
    id: "2",
    title: "Sales Meeting - Acme Inc",
    start: moment("2024-03-03 14:00").toDate(),
    end: moment("2024-03-03 15:00").toDate(),
    type: "important",
  },
  {
    id: "3",
    title: "Client Lunch - StartupXYZ",
    start: moment("2024-03-05 12:00").toDate(),
    end: moment("2024-03-05 13:00").toDate(),
    type: "fun",
  },
  {
    id: "4",
    title: "Contract Negotiation - GlobalTech",
    start: moment("2024-03-07 10:00").toDate(),
    end: moment("2024-03-07 11:30").toDate(),
    type: "important",
  },
  {
    id: "5",
    title: "Product Demo - InnovateCorp",
    start: moment("2024-03-08 14:00").toDate(),
    end: moment("2024-03-08 15:00").toDate(),
    type: "important",
  },
  {
    id: "6",
    title: "Lead Follow-up Calls",
    start: moment("2024-03-08 16:00").toDate(),
    end: moment("2024-03-08 16:30").toDate(),
    type: "work",
  },
  {
    id: "7",
    title: "Team Building Event",
    start: moment("2024-03-12 19:00").toDate(),
    end: moment("2024-03-12 21:00").toDate(),
    type: "fun",
  },
  {
    id: "8",
    title: "Quarterly Sales Review",
    start: moment("2024-03-14 09:00").toDate(),
    end: moment("2024-03-14 10:00").toDate(),
    type: "important",
  },
  {
    id: "9",
    title: "Client Onboarding - MegaCorp",
    start: moment("2024-03-15 10:00").toDate(),
    end: moment("2024-03-15 10:30").toDate(),
    type: "work",
  },
  {
    id: "10",
    title: "Networking Event - TechConf",
    start: moment("2024-03-15 18:00").toDate(),
    end: moment("2024-03-15 20:00").toDate(),
    type: "fun",
  },
  {
    id: "11",
    title: "Industry Conference",
    start: moment("2024-03-17 12:00").toDate(),
    end: moment("2024-03-17 23:59").toDate(),
    type: "fun",
  },
  {
    id: "12",
    title: "Proposal Presentation - DataFlow",
    start: moment("2024-03-17 14:00").toDate(),
    end: moment("2024-03-17 15:00").toDate(),
    type: "important",
  },
  {
    id: "13",
    title: "Sales Training Day",
    start: moment("2024-03-18").toDate(),
    end: moment("2024-03-18 23:59").toDate(),
    type: "work",
  },
  {
    id: "14",
    title: "Client Dinner - RetailPlus",
    start: moment("2024-03-20 19:00").toDate(),
    end: moment("2024-03-20 22:00").toDate(),
    type: "fun",
  },
  {
    id: "15",
    title: "Board Meeting - Q1 Results",
    start: moment("2024-03-22 09:00").toDate(),
    end: moment("2024-03-22 11:00").toDate(),
    type: "important",
  },
  {
    id: "16",
    title: "Cold Outreach Session",
    start: moment("2024-03-22 15:00").toDate(),
    end: moment("2024-03-22 17:00").toDate(),
    type: "work",
  },
  {
    id: "17",
    title: "Trade Show - CloudExpo",
    start: moment("2024-03-25 06:00").toDate(),
    end: moment("2024-03-25 20:00").toDate(),
    type: "fun",
  },
  {
    id: "18",
    title: "Partner Meeting - ChannelCorp",
    start: moment("2024-03-26 14:00").toDate(),
    end: moment("2024-03-26 16:00").toDate(),
    type: "important",
  },
  {
    id: "19",
    title: "Architecture Review - CloudFirst",
    start: moment("2024-03-26 10:00").toDate(),
    end: moment("2024-03-26 11:30").toDate(),
    type: "important",
  },
  {
    id: "20",
    title: "Customer Success Check-in",
    start: moment("2024-03-26 19:00").toDate(),
    end: moment("2024-03-26 22:00").toDate(),
    type: "work",
  },
  {
    id: "21",
    title: "Executive Briefing - Enterprise Co",
    start: moment("2024-03-28 10:00").toDate(),
    end: moment("2024-03-28 11:00").toDate(),
    type: "important",
  },
  {
    id: "22",
    title: "Support Escalation Call",
    start: moment("2024-03-29 15:00").toDate(),
    end: moment("2024-03-29 16:00").toDate(),
    type: "work",
  },
  {
    id: "23",
    title: "Awards Ceremony - Sales Team",
    start: moment("2024-03-29 20:00").toDate(),
    end: moment("2024-03-29 23:00").toDate(),
    type: "fun",
  },
  {
    id: "24",
    title: "Sales Skills Workshop",
    start: moment("2024-03-31 09:00").toDate(),
    end: moment("2024-03-31 12:00").toDate(),
    type: "work",
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

export function MeetingCalendar({
  events = sampleEvents,
  onSelectEvent,
  onCreateEvent,
  onDateChange
}: MeetingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 15)); // March 15, 2024 - has events
  const [view, setView] = useState<View>("month");

  // Debug: Log events to console
  console.log("MeetingCalendar events:", events);
  console.log("Current date:", currentDate);
  console.log("View:", view);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    onDateChange?.(date);
  };

  const eventStyleGetter = useCallback(
    (event: MeetingEvent) => {
      const colorMap = {
        important: { bg: "#fecaca", color: "#7f1d1d" }, // Light red for important meetings
        work: { bg: "#fed7aa", color: "#7c2d12" }, // Light orange for work activities
        fun: { bg: "#bfdbfe", color: "#1e3a8a" }, // Light blue for networking/fun
        personal: { bg: "#e5e7eb", color: "#374151" }, // Light gray for personal
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
          margin: "1px 2px",
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
          border-radius: 4px;
          padding: 4px 6px;
          margin: 1px 2px;
          font-size: 11px;
          line-height: 1.3;
          font-weight: 500;
          font-family: var(--font-lato), 'Lato', -apple-system, Roboto, Helvetica, sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 18px;
          display: flex;
          align-items: center;
        }

        .meeting-calendar .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .meeting-calendar .rbc-event:focus {
          outline: none;
        }

        .meeting-calendar .rbc-event-content {
          font-size: 11px;
          line-height: 1.3;
          font-weight: 500;
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
          padding: 2px;
        }
        
        .meeting-calendar .rbc-addons-dnd .rbc-addons-dnd-drag-preview {
          display: none;
        }

        .meeting-calendar .rbc-month-view .rbc-row {
          min-height: 120px;
        }

        .meeting-calendar .rbc-date-cell a {
          text-decoration: none;
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
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: view === "month" ? 700 : view === "week" ? 500 : 400 }}
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
        onSelectSlot={(slot) => {
          handleDateChange(slot.start);
          onCreateEvent?.(slot);
        }}
        selectable
        popup={false}
        showMultiDayTimes={false}
        components={{
          toolbar: customToolbar,
        }}
        messages={{
          showMore: (total) => `+${total} more`,
        }}
      />
    </div>
  );
}
