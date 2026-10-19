
export default function HomePageSkeleton() {
    return (
      <main className="home-page home-skeleton">
        {/* Navbar skeleton */}
        <nav className="home-skeleton-nav">
          <div className="skeleton skeleton-brand" />
          <div className="home-skeleton-nav-links">
            <div className="skeleton skeleton-nav-link" />
            <div className="skeleton skeleton-nav-link" />
            <div className="skeleton skeleton-nav-button" />
          </div>
        </nav>
  
        {/* Hero section */}
        <section className="hero">
          <div className="hero-content">
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-kicker" />
  
            <div className="skeleton skeleton-heading" />
            <div className="skeleton skeleton-heading skeleton-heading-short" />
  
            <div className="skeleton skeleton-description" />
            <div className="skeleton skeleton-description skeleton-description-mid" />
            <div className="skeleton skeleton-description skeleton-description-short" />
  
            <div className="skeleton skeleton-cta" />
  
            <div className="home-skeleton-trust">
              <div className="skeleton skeleton-trust-item" />
              <div className="skeleton skeleton-trust-item" />
              <div className="skeleton skeleton-trust-item" />
            </div>
          </div>
  
          {/* Study preview card */}
          <div className="card home-preview home-preview-skeleton">
            <div className="skeleton skeleton-kicker" />
            <div className="skeleton skeleton-preview-title" />
  
            <div className="skeleton skeleton-progress-label" />
            <div className="skeleton skeleton-progress-track" />
  
            {[1, 2, 3].map((item) => (
              <div className="skeleton-step" key={item}>
                <div className="skeleton skeleton-step-number" />
                <div className="skeleton-step-content">
                  <div className="skeleton skeleton-step-title" />
                  <div className="skeleton skeleton-step-description" />
                </div>
                <div className="skeleton skeleton-step-arrow" />
              </div>
            ))}
  
            <div className="skeleton skeleton-preview-footer" />
          </div>
        </section>
  
        {/* Feature cards */}
        <section className="home-features home-features-skeleton">
          {[1, 2, 3].map((item) => (
            <div className="home-feature" key={item}>
              <div className="skeleton skeleton-feature-icon" />
              <div className="skeleton skeleton-feature-title" />
              <div className="skeleton skeleton-feature-text" />
              <div className="skeleton skeleton-feature-text skeleton-feature-text-short" />
            </div>
          ))}
        </section>
  
        {/* Footer */}
        <footer className="home-footer">
          <div className="skeleton skeleton-footer-text" />
          <div className="skeleton skeleton-footer-text skeleton-footer-text-short" />
        </footer>
      </main>
    );
  }
  