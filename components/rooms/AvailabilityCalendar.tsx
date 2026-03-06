'use client'
import { DayPicker } from 'react-day-picker'
import { parseISO } from 'date-fns'

interface AvailabilityCalendarProps {
  bookedDates: string[]
}

export default function AvailabilityCalendar({ bookedDates }: AvailabilityCalendarProps) {
  const dates = bookedDates.map(d => parseISO(d))
  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-border-warm dark:border-dark-border inline-block">
      <DayPicker
        mode="multiple"
        selected={dates}
        modifiers={{ booked: dates }}
        modifiersClassNames={{ booked: 'bg-border-warm dark:bg-dark-border text-text-slate dark:text-dark-text-secondary line-through' }}
        className="dark:text-dark-text-primary"
      />
      <p className="mt-4 text-xs text-text-slate dark:text-dark-text-secondary italic">
        * Dates shown in gray are currently unavailable.
      </p>
    </div>
  )
}
