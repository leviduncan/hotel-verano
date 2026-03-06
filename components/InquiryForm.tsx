'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar as CalendarIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
  checkIn: z.date(),
  checkOut: z.date(),
}).refine((data) => isBefore(data.checkIn, data.checkOut), {
  message: "Check-out must be after check-in",
  path: ["checkOut"],
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function InquiryForm({ roomName }: { roomName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      checkIn: addDays(new Date(), 1),
      checkOut: addDays(new Date(), 3),
    }
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Inquiry submitted:', { ...data, roomName });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center space-y-4 bg-white dark:bg-dark-surface rounded-2xl border border-border-warm dark:border-dark-border"
      >
        <div className="flex justify-center">
          <CheckCircle size={48} className="text-success-forest" />
        </div>
        <h3 className="font-serif text-2xl text-primary-ink dark:text-dark-text-primary">Inquiry Sent!</h3>
        <p className="text-text-slate dark:text-dark-text-secondary">
          Thank you for your interest in the {roomName}. We've received your inquiry and will be in touch within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-secondary-sand font-semibold hover:underline"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="glass p-6 lg:p-8 rounded-2xl border border-border-warm dark:border-dark-border">
      <h2 className="font-serif text-2xl mb-6 text-primary-ink dark:text-dark-text-primary">Send a Booking Inquiry</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Check-in */}
          <div className="relative">
            <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
              Check-In Date
            </label>
            <button
              type="button"
              onClick={() => setShowCheckIn(!showCheckIn)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand"
            >
              <span>{checkIn ? format(checkIn, 'PPP') : 'Select date'}</span>
              <CalendarIcon size={16} className="text-secondary-sand" />
            </button>
            <AnimatePresence>
              {showCheckIn && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 mt-2 p-4 bg-white dark:bg-dark-surface-elevated shadow-2xl rounded-xl border border-border-warm dark:border-dark-border"
                >
                  <DayPicker
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      if (date) setValue('checkIn', date);
                      setShowCheckIn(false);
                    }}
                    disabled={{ before: startOfToday() }}
                    className="dark:text-dark-text-primary"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {errors.checkIn && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.checkIn.message}</p>}
          </div>

          {/* Check-out */}
          <div className="relative">
            <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
              Check-Out Date
            </label>
            <button
              type="button"
              onClick={() => setShowCheckOut(!showCheckOut)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand"
            >
              <span>{checkOut ? format(checkOut, 'PPP') : 'Select date'}</span>
              <CalendarIcon size={16} className="text-secondary-sand" />
            </button>
            <AnimatePresence>
              {showCheckOut && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 mt-2 p-4 bg-white dark:bg-dark-surface-elevated shadow-2xl rounded-xl border border-border-warm dark:border-dark-border"
                >
                  <DayPicker
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      if (date) setValue('checkOut', date);
                      setShowCheckOut(false);
                    }}
                    disabled={{ before: checkIn || startOfToday() }}
                    className="dark:text-dark-text-primary"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {errors.checkOut && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.checkOut.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
            Full Name
          </label>
          <input
            {...register('fullName')}
            placeholder="Jane Smith"
            className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand"
          />
          {errors.fullName && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="jane@example.com"
            className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand"
          />
          {errors.email && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
            Message (Optional)
          </label>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Let us know about any special requests..."
            className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending Inquiry...
            </>
          ) : (
            'Send Inquiry'
          )}
        </button>
      </form>
    </div>
  );
}
