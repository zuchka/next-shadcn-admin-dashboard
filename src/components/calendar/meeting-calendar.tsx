"use client";

import { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer, View, Event } from "react-big-calendar";
import moment from "moment";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
}

export function MeetingCalendar({ 
  events = sampleEvents, 
  onSelectEvent, 
  onCreateEvent 
}: MeetingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024 to match Figma
  const [view, setView] = useState<View>("month");

  const eventStyleGetter = useCallback(
    (event: MeetingEvent) => {
      const colors = eventTypeColors[event.type] || eventTypeColors.work;
      return {
        style: {
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "2px",
          color: "#000",
          fontSize: "8px",
          fontWeight: "400",
          padding: "2px 4px",
          fontFamily: "var(--font-lato), Lato, -apple-system, Roboto, Helvetica, sans-serif",
        },
        className: cn(colors.bg, colors.text),
      };
    },
    []
  );

  const formats = useMemo(
    () => ({
      monthHeaderFormat: "MMMM YYYY",
      dayHeaderFormat: "ddd",
      dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format("MMMM DD")} – ${moment(end).format("MMMM DD, YYYY")}`,
      agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
        `${moment(start).format("MMMM DD")} – ${moment(end).format("MMMM DD, YYYY")}`,
    }),
    []
  );

  const customToolbar = ({ label, onNavigate }: any) => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold text-[#252525]">
          {moment(currentDate).format("MMMM")} <span className="font-normal">{moment(currentDate).format("YYYY")}</span>
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const newDate = moment(currentDate).subtract(1, "month").toDate();
            setCurrentDate(newDate);
            onNavigate("PREV");
          }}
          className="h-6 w-6 p-0 hover:bg-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const newDate = moment(currentDate).add(1, "month").toDate();
            setCurrentDate(newDate);
            onNavigate("NEXT");
          }}
          className="h-6 w-6 p-0 hover:bg-gray-100"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="meeting-calendar bg-white rounded-lg border p-6">
      <style jsx global>{`
        .meeting-calendar .rbc-calendar {
          font-family: 'Lato', -apple-system, Roboto, Helvetica, sans-serif;
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
          background: transparent !important;
          border: none !important;
          border-radius: 2px;
          padding: 2px 4px;
          margin: 1px 2px;
          font-size: 8px;
          line-height: 1.25;
          font-weight: 400;
          font-family: 'Lato', -apple-system, Roboto, Helvetica, sans-serif;
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
          min-height: 90px;
        }
      `}</style>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={view}
        onView={setView}
        date={currentDate}
        onNavigate={setCurrentDate}
        eventPropGetter={eventStyleGetter}
        formats={formats}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onCreateEvent}
        selectable
        popup={false}
        showMultiDayTimes={false}
        components={{
          toolbar: customToolbar,
        }}
        messages={{
          showMore: (total) => `view more`,
        }}
      />
    </div>
  );
}
