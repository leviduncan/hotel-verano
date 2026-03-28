'use client'

export default function Contact() {


  return (
    <main className="pt-20 lg:pt-24 pb-24">
      {/* Header */}
      <header className="bg-accent-champagne dark:bg-dark-surface py-12 lg:py-20 px-6 lg:px-12 border-b border-border-warm dark:border-dark-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl lg:text-6xl text-primary-ink dark:text-dark-text-primary mb-4">Service Rates</h1>
          <p className="text-text-slate dark:text-dark-text-secondary max-w-xl">
            Have a question or special request? Our team is here to assist you with anything you need.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-12">
            <p>Content</p>
          </div>

          {/* Section */}
          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-primary-ink dark:text-dark-text-primary">Our Content</h2>
            <p>More Content</p>
          </div>
        </div>
      </section>
    </main>
  );
}
