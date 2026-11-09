import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ApartmentsShowcase } from './components/ApartmentsShowcase';
import { FeaturesSection } from './components/FeaturesSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { ApartmentDetailView } from './components/ApartmentDetailView';
import { BookingWizard } from './components/BookingWizard';
import { BookingConfirmation } from './components/BookingConfirmation';
import { RentalAgreementView } from './components/RentalAgreementView';
import { TermsView } from './components/TermsView';
import { AdminDashboard } from './components/AdminDashboard';
import { LuxuryScrollBar } from './components/LuxuryScrollBar';
import { Booking, INITIAL_BOOKINGS } from './data/apartmentsData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>('apt-01');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(INITIAL_BOOKINGS[0]);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track scroll progress for subtle luxury progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedApartmentId]);

  const handleNavigate = (view: string, aptId?: string) => {
    if (aptId) {
      setSelectedApartmentId(aptId);
    }
    setCurrentView(view);
  };

  const handleOpenBooking = (aptId?: string) => {
    if (aptId) {
      setSelectedApartmentId(aptId);
    }
    setCurrentView('booking-wizard');
  };

  const handleSelectApartment = (aptId: string) => {
    setSelectedApartmentId(aptId);
    setCurrentView('apartment-detail');
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    setCurrentView('booking-confirmation');
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const handleViewContract = (booking: Booking) => {
    setActiveBooking(booking);
    setCurrentView('contract-view');
  };

  return (
    <div className="min-h-screen bg-[#F3E2CC] text-[#3A2522] flex flex-col font-sans selection:bg-[#570A1B] selection:text-[#FFF9F1]">
      
      {/* Luxury Gold Scroll Progress Indicator */}
      <div 
        className="no-print fixed top-0 right-0 h-[2.5px] bg-gradient-to-l from-[#C6A16B] via-[#ebd2a9] to-[#C6A16B] z-50 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(198,161,107,0.8)] pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Header - hidden during full A4 print */}
      <div className="no-print">
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />
      </div>

      {/* Main Content Router */}
      <main className="flex-1">
        {/* HOME VIEW: Strictly Hero + Features Section */}
        {currentView === 'home' && (
          <>
            <Hero
              onOpenBooking={handleOpenBooking}
              onExploreApartments={() => handleNavigate('apartments')}
              onSelectApartment={handleSelectApartment}
            />
            {/* White VIP Features & Amenities section - Home page ends strictly at 8th card */}
            <FeaturesSection />
          </>
        )}

        {/* APARTMENTS SHOWCASE STANDALONE VIEW */}
        {currentView === 'apartments' && (
          <div className="py-6 sm:py-8">
            <ApartmentsShowcase
              selectedApartmentId={selectedApartmentId}
              onSelectApartment={(id) => setSelectedApartmentId(id)}
              onBookApartment={handleOpenBooking}
            />
          </div>
        )}

        {/* APARTMENT DETAIL VIEW */}
        {currentView === 'apartment-detail' && (
          <ApartmentDetailView
            apartmentId={selectedApartmentId}
            onBack={() => setCurrentView('home')}
            onBook={handleOpenBooking}
            onSwitchApartment={(newAptId) => setSelectedApartmentId(newAptId)}
          />
        )}

        {/* BOOKING WIZARD VIEW */}
        {currentView === 'booking-wizard' && (
          <BookingWizard
            initialApartmentId={selectedApartmentId}
            onBookingComplete={handleBookingComplete}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {/* BOOKING CONFIRMATION VIEW */}
        {currentView === 'booking-confirmation' && activeBooking && (
          <BookingConfirmation
            booking={activeBooking}
            onViewAgreement={() => setCurrentView('contract-view')}
            onReturnHome={() => setCurrentView('home')}
          />
        )}

        {/* PRINTABLE A4 ELECTRONIC RENTAL AGREEMENT */}
        {currentView === 'contract-view' && activeBooking && (
          <RentalAgreementView
            booking={activeBooking}
            onBack={() => setCurrentView('home')}
          />
        )}

        {/* LOCATION VIEW */}
        {currentView === 'location' && (
          <div className="py-8">
            <LocationSection />
          </div>
        )}

        {/* CONTACT VIEW */}
        {currentView === 'contact' && (
          <div className="py-8">
            <ContactSection />
          </div>
        )}

        {/* TERMS & CONDITIONS VIEW */}
        {currentView === 'terms' && (
          <TermsView onBack={() => setCurrentView('home')} />
        )}

        {/* ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onViewContract={handleViewContract}
            onBackToSite={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Footer - only rendered on other views, not on home page */}
      {currentView !== 'home' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* Luxury Floating Bottom Nav */}
      <BottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Luxury Bespoke Floating Scroll Navigator (replaces ugly browser scrollbar on left) */}
      <LuxuryScrollBar currentView={currentView} />

    </div>
  );
}
