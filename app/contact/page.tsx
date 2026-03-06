'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Contact form submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <main className="pt-20 lg:pt-24 pb-24">
      {/* Header */}
      <header className="bg-accent-champagne dark:bg-dark-surface py-12 lg:py-20 px-6 lg:px-12 border-b border-border-warm dark:border-dark-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl lg:text-6xl text-primary-ink dark:text-dark-text-primary mb-4">Contact Us</h1>
          <p className="text-text-slate dark:text-dark-text-secondary max-w-xl">
            Have a question or special request? Our team is here to assist you with anything you need.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info & Form */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="font-serif text-3xl text-primary-ink dark:text-dark-text-primary">Get in Touch</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-champagne dark:bg-dark-surface flex items-center justify-center text-secondary-sand shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-1">Phone</p>
                    <p className="text-primary-ink dark:text-dark-text-primary font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-champagne dark:bg-dark-surface flex items-center justify-center text-secondary-sand shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-1">Email</p>
                    <p className="text-primary-ink dark:text-dark-text-primary font-medium">hello@grandverano.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:col-span-2">
                  <div className="w-10 h-10 rounded-full bg-accent-champagne dark:bg-dark-surface flex items-center justify-center text-secondary-sand shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-1">Location</p>
                    <p className="text-primary-ink dark:text-dark-text-primary font-medium">123 Via della Cultura, Grand City, 00000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl border border-border-warm dark:border-dark-border">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="flex justify-center">
                    <CheckCircle size={48} className="text-success-forest" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary-ink dark:text-dark-text-primary">Message Sent!</h3>
                  <p className="text-text-slate dark:text-dark-text-secondary">
                    Thank you for reaching out. We've received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-secondary-sand font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
                        Your Name
                      </label>
                      <input
                        {...register('name')}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand"
                      />
                      {errors.name && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name.message}</p>}
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
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
                      Subject
                    </label>
                    <input
                      {...register('subject')}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand"
                    />
                    {errors.subject && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      placeholder="Tell us more about your request..."
                      className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-border-warm dark:border-dark-border rounded-sm text-sm focus:outline-none focus:border-secondary-sand resize-none"
                    />
                    {errors.message && <p className="text-xs text-error-terracotta mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-primary-ink dark:text-dark-text-primary">Our Location</h2>
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[calc(100%-4rem)] rounded-2xl overflow-hidden border border-border-warm dark:border-dark-border shadow-lg">
              {/* Using a Google Maps Embed iframe for a "real" map integration */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019297160747!2d-122.4013751!3d37.7873589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808bc7624383%3A0x7659451347638c07!2sSFMOMA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Grand Verano Hotel Location"
                className="grayscale dark:invert dark:hue-rotate-180 contrast-125 transition-all"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-xl border border-border-warm dark:border-dark-border shadow-xl">
                <p className="text-xs uppercase tracking-widest font-bold text-secondary-sand mb-1">Visit Us</p>
                <p className="text-sm text-primary-ink dark:text-dark-text-primary font-medium">
                  We are located in the heart of the cultural district, just a short walk from the main square.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
