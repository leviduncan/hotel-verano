'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('theme') === 'dark';
    });
    const pathname = usePathname();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        if (nextDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'Service Rates', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    const isTransparent = pathname === '/' && !isScrolled;

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 lg:h-20 flex items-center px-6 lg:px-12',
                isTransparent ? 'bg-transparent' : 'bg-bg-ivory dark:bg-dark-bg border-b border-border-warm dark:border-dark-border shadow-sm'
            )}
        >
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hotel-icon lucide-hotel"><path d="M10 22v-6.57" /><path d="M12 11h.01" /><path d="M12 7h.01" /><path d="M14 15.43V22" /><path d="M15 16a5 5 0 0 0-6 0" /><path d="M16 11h.01" /><path d="M16 7h.01" /><path d="M8 11h.01" /><path d="M8 7h.01" /><rect x="4" y="2" width="16" height="20" rx="2" /></svg>
                    <span className={cn(
                        "font-serif text-xl lg:text-2xl tracking-tight",
                        isTransparent ? "text-white" : "text-primary-ink dark:text-dark-text-primary"
                    )}>
                        THE GRAND VERANO
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={cn(
                                "text-sm font-medium uppercase tracking-widest transition-colors relative group",
                                isTransparent ? "text-white/90 hover:text-white" : "text-primary-ink/80 dark:text-dark-text-secondary hover:text-primary-ink dark:hover:text-dark-text-primary"
                            )}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary-sand transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            isTransparent ? "text-white hover:bg-white/10" : "text-primary-ink hover:bg-black/5 dark:text-dark-text-primary dark:hover:bg-white/5"
                        )}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link
                        href="/rooms"
                        className={cn(
                            "btn-outline py-2 px-5 text-sm",
                            isTransparent && "border-white text-white hover:bg-white hover:text-primary-ink"
                        )}
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "p-2 rounded-full",
                            isTransparent ? "text-white" : "text-primary-ink dark:text-dark-text-primary"
                        )}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "p-2",
                            isTransparent ? "text-white" : "text-primary-ink dark:text-dark-text-primary"
                        )}
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-bg-ivory dark:bg-dark-bg lg:hidden"
                    >
                        <div className="flex flex-col h-full p-8">
                            <div className="flex justify-between items-center mb-12">
                                <span className="font-serif text-xl text-primary-ink dark:text-dark-text-primary">THE GRAND VERANO</span>
                                <button onClick={() => setIsOpen(false)} className="p-2 text-primary-ink dark:text-dark-text-primary">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-serif text-primary-ink dark:text-dark-text-primary border-b border-border-warm dark:border-dark-border pb-4"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-auto">
                                <Link
                                    href="/rooms"
                                    onClick={() => setIsOpen(false)}
                                    className="btn-primary w-full text-center block"
                                >
                                    Book Your Stay
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default NavBar