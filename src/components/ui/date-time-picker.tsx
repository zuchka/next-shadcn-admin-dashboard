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
      className={cn(
        "inline-flex p-3 flex-col items-start gap-2 rounded-2xl bg-white shadow-lg border border-gray-100",
        className,
      )}
    >
      {/* Calendar Header */}
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-[#4C56BB] text-center text-base font-medium">
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
            className="flex w-[30px] p-2 justify-center items-center hover:bg-gray-50 rounded"
          >
            <ChevronLeft className="w-2 h-3.5 fill-[#4C56BB] text-[#4C56BB]" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigateMonth("next");
            }}
            className="flex w-[30px] p-2 justify-center items-center hover:bg-gray-50 rounded"
          >
            <ChevronRight className="w-2 h-3.5 fill-[#4C56BB] text-[#4C56BB]" />
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
                onClick={() => handleDateSelect(day)}
                className={cn(
                  "flex w-8 h-8 justify-center items-center",
                  day.isToday && !isDateSelected(day) && "rounded-full bg-[#BCCAD9]",
                  isDateSelected(day) && "rounded-full bg-[#4C56BB]",
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
      <div className="flex w-full py-2 justify-between items-center">
        <span className="text-[#213447] text-base font-medium leading-5">Time</span>
        <div className="flex items-start gap-2">
          {/* Time Input */}
          <div className="flex h-8 px-2 justify-center items-center gap-1 rounded-[5px] bg-[#F0F3F7]">
            <input
              type="number"
              min="1"
              max="12"
              value={time.hour.toString().padStart(2, "0")}
              onChange={(e) => handleTimeChange({ hour: parseInt(e.target.value) || 1 })}
              className="w-6 text-[#213447] text-base font-normal bg-transparent border-none outline-none text-center"
            />
            <span className="text-[#213447] text-base font-normal">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={time.minute.toString().padStart(2, "0")}
              onChange={(e) => handleTimeChange({ minute: parseInt(e.target.value) || 0 })}
              className="w-6 text-[#213447] text-base font-normal bg-transparent border-none outline-none text-center"
            />
          </div>

          {/* AM/PM Toggle */}
          <div className="flex w-[101px] h-8 p-[2px] items-center rounded-[10px] bg-[#F0F3F7]">
            <button
              onClick={() => handleTimeChange({ period: "AM" })}
              className={cn(
                "flex h-7 px-2 justify-center items-center flex-1 rounded-lg",
                time.period === "AM" && "border border-black/[0.04] bg-white shadow-sm",
              )}
            >
              <span className="text-[#213447] text-center text-sm font-normal leading-4">AM</span>
            </button>
            <button
              onClick={() => handleTimeChange({ period: "PM" })}
              className={cn(
                "flex h-7 px-2 justify-center items-center flex-1 rounded-lg",
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
