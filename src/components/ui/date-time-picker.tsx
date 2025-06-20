"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: {
    date?: Date;
    time?: { hour: number; minute: number; period: "AM" | "PM" };
  };
  onChange?: (value: { date?: Date; time?: { hour: number; minute: number; period: "AM" | "PM" } }) => void;
  className?: string;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function DateTimePicker({ value, onChange, className }: DateTimePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value?.date);
  const [time, setTime] = useState({
    hour: value?.time?.hour || 9,
    minute: value?.time?.minute || 32,
    period: value?.time?.period || ("AM" as "AM" | "PM"),
  });

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get previous month's last days
  const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  // Generate calendar days
  const calendarDays = [];

  // Previous month days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
    });
  }

  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const fullDate = new Date(currentYear, currentMonth, date);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday:
        fullDate.getDate() === today.getDate() &&
        fullDate.getMonth() === today.getMonth() &&
        fullDate.getFullYear() === today.getFullYear(),
      fullDate,
    });
  }

  // Next month days to fill the grid
  const remainingCells = 42 - calendarDays.length; // 6 rows × 7 days
  for (let date = 1; date <= remainingCells; date++) {
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(currentYear, currentMonth + 1, date),
    });
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (day: (typeof calendarDays)[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDate(day.fullDate);
    onChange?.({
      date: day.fullDate,
      time,
    });
  };

  const handleTimeChange = (newTime: Partial<typeof time>) => {
    const updatedTime = { ...time, ...newTime };
    setTime(updatedTime);
    onChange?.({
      date: selectedDate,
      time: updatedTime,
    });
  };

  const isDateSelected = (day: (typeof calendarDays)[0]) => {
    if (!selectedDate) return false;
    return (
      day.fullDate.getDate() === selectedDate.getDate() &&
      day.fullDate.getMonth() === selectedDate.getMonth() &&
      day.fullDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={cn(
        "inline-flex p-3 flex-col items-start gap-2 rounded-2xl bg-white shadow-lg border border-gray-100",
        className,
      )}
    >
      {/* Calendar Header */}
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-[#ea580c] text-center text-base font-medium">
            {MONTHS[currentMonth]} {currentYear}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateMonth("prev");
            }}
            className="flex w-[30px] p-2 justify-center items-center hover:bg-orange-50 rounded"
          >
            <ChevronLeft className="w-2 h-3.5 fill-[#ea580c] text-[#ea580c]" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateMonth("next");
            }}
            className="flex w-[30px] p-2 justify-center items-center hover:bg-orange-50 rounded"
          >
            <ChevronRight className="w-2 h-3.5 fill-[#ea580c] text-[#ea580c]" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="flex items-center gap-3">
        {DAYS.map((day) => (
          <div key={day} className="flex p-[2px] justify-center items-center">
            <span className="text-[#BCCAD9] text-center text-sm font-medium leading-4 w-8">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-col gap-0">
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <div key={weekIndex} className="flex py-2 items-start gap-3">
            {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={(e) => handleDateSelect(day, e)}
                className={cn(
                  "flex w-8 h-8 justify-center items-center rounded-full transition-colors",
                  !isDateSelected(day) && !day.isToday && "hover:bg-gray-100",
                  day.isToday && !isDateSelected(day) && "bg-orange-200 hover:bg-orange-200",
                  isDateSelected(day) && "bg-[#ea580c] hover:bg-[#ea580c]",
                )}
              >
                <span
                  className={cn(
                    "text-center text-base font-normal leading-normal",
                    !day.isCurrentMonth && "text-[#6989AA]",
                    day.isCurrentMonth && !day.isToday && !isDateSelected(day) && "text-[#294059]",
                    (day.isToday || isDateSelected(day)) && "text-white",
                  )}
                >
                  {day.date}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#F0F3F7]" />

      {/* Time Picker */}
      <div className="flex w-full py-3 justify-between items-center">
        <span className="text-[#213447] text-base font-medium leading-5">Time</span>
        <div className="flex items-center gap-3">
          {/* Time Input */}
          <div className="flex h-10 px-3 justify-center items-center gap-2 rounded-[8px] bg-[#F0F3F7]">
            <input
              type="number"
              min="1"
              max="12"
              value={time.hour.toString().padStart(2, "0")}
              onChange={(e) => handleTimeChange({ hour: parseInt(e.target.value) || 1 })}
              className="w-10 text-[#213447] text-base font-normal bg-transparent border-none outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[#213447] text-base font-normal">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={time.minute.toString().padStart(2, "0")}
              onChange={(e) => handleTimeChange({ minute: parseInt(e.target.value) || 0 })}
              className="w-10 text-[#213447] text-base font-normal bg-transparent border-none outline-none text-center mr-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* AM/PM Toggle */}
          <div className="flex w-[110px] h-10 p-1 items-center rounded-[10px] bg-[#F0F3F7]">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTimeChange({ period: "AM" });
              }}
              className={cn(
                "flex h-8 px-3 justify-center items-center flex-1 rounded-lg transition-all",
                time.period === "AM" && "border border-black/[0.04] bg-white shadow-sm",
              )}
            >
              <span className="text-[#213447] text-center text-sm font-normal leading-4">AM</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTimeChange({ period: "PM" });
              }}
              className={cn(
                "flex h-8 px-3 justify-center items-center flex-1 rounded-lg transition-all",
                time.period === "PM" && "border border-black/[0.04] bg-white shadow-sm",
              )}
            >
              <span className="text-[#213447] text-center text-sm font-normal leading-4">PM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
