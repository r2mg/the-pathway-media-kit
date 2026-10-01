import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import logo from '../imports/logo@2x.png';
import badge from '../imports/badge@2x.png';

function CountUpNumber({ end, duration = 2000, suffix = '', inView }: { end: number; duration?: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const endValue = end;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * endValue);

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function App() {
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="The Pathway" className="h-8" />
          </div>
          <a
            href="mailto:sponsors@thepathway.email?subject=I'd like to sponsor The Pathway"
            className="text-[#2b74ba] hover:text-[#1f5489] transition-colors duration-200"
            style={{ fontFamily: 'athelas, Georgia, serif' }}
          >
            Sponsor the Pathway →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#2b74ba] min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-24 pb-20 flex-1 flex flex-col justify-center">
          <h1
            className="max-w-4xl mb-8 text-white"
            style={{
              fontFamily: 'athelas, Georgia, serif',
              fontSize: '4rem',
              lineHeight: '1.1',
              fontWeight: 400
            }}
          >
            Reach the teams deciding how medical devices get to market.
          </h1>
          <div className="text-lg text-white/90 max-w-3xl space-y-4 mb-8">
            <p>
              A twice-weekly newsletter read across medical device, diagnostics, and life sciences companies. More than 28,000 subscribers, roughly 6,000 of them active each month, and 97% on work email.
            </p>
            <p>
              One primary sponsor per issue, so your message doesn't share the spotlight. Everything you need to decide is on this page.
            </p>
          </div>

          <div>
            <a
              href="mailto:sponsors@thepathway.email?subject=I'd like to sponsor The Pathway"
              className="px-8 py-4 bg-white text-[#2b74ba] hover:bg-white/90 transition-colors duration-200 inline-block"
              style={{ fontFamily: 'athelas, Georgia, serif', fontSize: '1.125rem' }}
            >
              Sponsor the Pathway
            </a>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section id="stats" ref={statsRef} className="bg-[#F5F3EE] py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-300">
            <div className="text-center px-6">
              <div
                className="mb-2"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '4rem',
                  lineHeight: '1',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                <CountUpNumber end={28000} suffix="+" inView={statsInView} />
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Subscribers, Growing Weekly
              </div>
            </div>

            <div className="text-center px-6">
              <div
                className="mb-2"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '4rem',
                  lineHeight: '1',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                ~<CountUpNumber end={6000} inView={statsInView} />
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Active Monthly Readers
              </div>
            </div>

            <div className="text-center px-6">
              <div
                className="mb-2"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '4rem',
                  lineHeight: '1',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                <CountUpNumber end={97} suffix="%" inView={statsInView} />
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Work Email Addresses
              </div>
            </div>

            <div className="text-center px-6">
              <div
                className="mb-2"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '4rem',
                  lineHeight: '1',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                2×
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Weekly Sends <br className="hidden lg:block" /> Monday + Thursday
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Publication */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="uppercase tracking-wider text-xs text-gray-500 mb-4">The Publication</div>
        <h2
          className="mb-12"
          style={{
            fontFamily: 'athelas, Georgia, serif',
            fontSize: '2.5rem',
            lineHeight: '1.2',
            color: '#1A1A18',
            fontWeight: 400
          }}
        >
          What We Publish
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-gray-300 p-8">
            <div className="uppercase tracking-wider text-xs text-gray-500 mb-3">Monday</div>
            <h3
              className="mb-4"
              style={{
                fontFamily: 'athelas, Georgia, serif',
                fontSize: '1.75rem',
                color: '#1A1A18',
                fontWeight: 400
              }}
            >
              Weekly Digest
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The eight medtech stories worth knowing each week, pulled from across the industry and summarized in a few lines each. Read at the start of the week by people in regulatory, commercial, and executive roles.
            </p>
          </div>

          <div className="border border-gray-300 p-8">
            <div className="uppercase tracking-wider text-xs text-gray-500 mb-3">Thursday</div>
            <h3
              className="mb-4"
              style={{
                fontFamily: 'athelas, Georgia, serif',
                fontSize: '1.75rem',
                color: '#1A1A18',
                fontWeight: 400
              }}
            >
              Field Note
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              One original story each week, reported and analyzed by someone who works in the industry. Launched April 2026. The debut issue drew more than 10x the engagement of a typical send.
            </p>
            <p className="text-sm" style={{ color: '#2b74ba' }}>
              Highest reader engagement
            </p>
          </div>
        </div>

      </section>

      {/* Audience Section */}
      <section className="bg-[#F5F3EE] py-24">
        <div className="max-w-5xl mx-auto px-8 lg:px-16">
        <div className="uppercase tracking-wider text-xs text-gray-500 mb-4">The Audience</div>
        <h2
          className="mb-12"
          style={{
            fontFamily: 'athelas, Georgia, serif',
            fontSize: '2.5rem',
            lineHeight: '1.2',
            color: '#1A1A18',
            fontWeight: 400
          }}
        >
          Who Reads The Pathway
        </h2>

        <blockquote
          className="mb-10 italic"
          style={{
            fontFamily: 'athelas, Georgia, serif',
            fontSize: '1.75rem',
            lineHeight: '1.4',
            color: '#1A1A18',
            fontWeight: 400
          }}
        >
          Founders, executives, and regulatory, commercial, and clinical leaders across medical device, diagnostics, and life sciences companies. An audience built over years in the industry.
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The Pathway covers the decisions that move device and diagnostics companies forward: regulatory strategy, go-to-market sequencing, reimbursement, capital, and partnerships. If your company serves any part of that work, this is your audience.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          Readers work at companies including Boston Scientific, Alcon, Biotronik, bioMérieux, GE HealthCare, B. Braun, Philips, Siemens Healthineers, Johnson & Johnson, and Cardinal Health.
        </p>

        <div className="border-l-4 border-gray-300 pl-6">
          <p className="text-sm italic text-gray-600 leading-relaxed">
            We're not the right fit for consumer health or pharma-only products. We'd rather say so now than sell you a placement that doesn't fit.
          </p>
        </div>
        </div>
      </section>

      {/* Sponsorship Placements */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="uppercase tracking-wider text-xs text-gray-500 mb-4">Sponsorship Options</div>
        <h2
          className="mb-12"
          style={{
            fontFamily: 'athelas, Georgia, serif',
            fontSize: '2.5rem',
            lineHeight: '1.2',
            color: '#1A1A18',
            fontWeight: 400
          }}
        >
          Placements & Pricing
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Pricing Table */}
          <div className="lg:col-span-2">
            <div className="border border-gray-300">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-300 bg-gray-50">
            <div className="col-span-8 uppercase tracking-wider text-xs text-gray-600">
              Placement
            </div>
            <div className="col-span-4 text-right uppercase tracking-wider text-xs text-gray-600">
              Price
            </div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-4 p-8 border-b border-gray-300 hover:bg-gray-50 transition-colors duration-150">
            <div className="col-span-8">
              <div
                className="mb-3"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '1.25rem',
                  color: '#1A1A18',
                  fontWeight: 400
                }}
              >
                Monday Digest, Primary Sponsor
              </div>
              <p className="text-gray-700 leading-relaxed">
                Logo and one positioning line at the top of the issue, one link.
              </p>
            </div>
            <div className="col-span-4 text-right flex flex-col justify-center">
              <div
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '2rem',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                $1,500
              </div>
              <div className="text-sm text-gray-500">per issue</div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4 p-8 border-b border-gray-300 hover:bg-gray-50 transition-colors duration-150">
            <div className="col-span-8">
              <div
                className="mb-3"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '1.25rem',
                  color: '#1A1A18',
                  fontWeight: 400
                }}
              >
                Monday Digest, Sponsor Block
              </div>
              <p className="text-gray-700 leading-relaxed">
                Two or three lines in their own block after the third story. One link.
              </p>
            </div>
            <div className="col-span-4 text-right flex flex-col justify-center">
              <div
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '2rem',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                $750
              </div>
              <div className="text-sm text-gray-500">per issue</div>
            </div>
          </div>

          {/* Row 3 - Featured */}
          <div className="grid grid-cols-12 gap-4 p-8 border-b border-l-4 border-gray-300 hover:bg-gray-50 transition-colors duration-150" style={{ borderLeftColor: '#2b74ba' }}>
            <div className="col-span-8">
              <div className="mb-3">
                <div
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '1.25rem',
                    color: '#1A1A18',
                    fontWeight: 400
                  }}
                >
                  Thursday Field Note, Sponsor
                </div>
                <span className="inline-block mt-2 px-2 py-1 text-xs uppercase tracking-wider bg-[#2b74ba] text-white">
                  Highest Engagement
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Your message featured in Thursday's original story issue. One link.
              </p>
            </div>
            <div className="col-span-4 text-right flex flex-col justify-center">
              <div
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '2rem',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                $1,500
              </div>
              <div className="text-sm text-gray-500">per issue</div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-12 gap-4 p-8 hover:bg-gray-50 transition-colors duration-150">
            <div className="col-span-8">
              <div
                className="mb-3"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '1.25rem',
                  color: '#1A1A18',
                  fontWeight: 400
                }}
              >
                Thursday Field Note, Sponsor Block
              </div>
              <p className="text-gray-700 leading-relaxed">
                Two or three lines in their own block. One link.
              </p>
            </div>
            <div className="col-span-4 text-right flex flex-col justify-center">
              <div
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '2rem',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                $750
              </div>
              <div className="text-sm text-gray-500">per issue</div>
            </div>
          </div>
        </div>
          </div>

          {/* Right Column - Who's a Good Fit */}
          <div className="lg:col-span-1">
            <div className="border border-gray-300 p-8">
              <h3
                className="mb-6"
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '1.75rem',
                  color: '#1A1A18',
                  fontWeight: 400
                }}
              >
                Who's a Good Fit
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Regulatory consulting & law firms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>QMS & submission software</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Medtech-focused recruiters & talent platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Contract manufacturers & suppliers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Reimbursement & market access advisors</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Healthcare investment banking & VC</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Commercial intelligence & CRM tools</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Clinical affairs & HEOR consultancies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#2b74ba]">•</span>
                  <span>Event organizers & medtech conferences</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Package Pricing */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FBF9F4] border border-[#E5D5B7] border-l-4 p-8" style={{ borderLeftColor: '#2b74ba' }}>
            <div className="flex justify-between gap-8 h-full">
              <div className="flex-1">
                <div
                  className="mb-3"
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '1.5rem',
                    color: '#1A1A18',
                    fontWeight: 400
                  }}
                >
                  Four-Issue Package
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Any mix of Monday and Thursday primary placements. Reach out to discuss dates and availability.
                </p>
              </div>
              <div className="text-right flex flex-col justify-center shrink-0">
                <div
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '2.5rem',
                    color: '#2b74ba',
                    fontWeight: 400
                  }}
                >
                  $5,000
                </div>
                <div className="text-sm text-gray-500">four issues</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FBF9F4] border border-[#E5D5B7] p-8">
            <div className="flex justify-between gap-8 h-full">
              <div className="flex-1">
                <div
                  className="mb-3"
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '1.5rem',
                    color: '#1A1A18',
                    fontWeight: 400
                  }}
                >
                  Full-Year Commitment
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Twelve issues, one a month. Limited to six sponsors per year.
                </p>
              </div>
              <div className="text-right flex flex-col justify-center shrink-0">
                <div
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '2.5rem',
                    color: '#2b74ba',
                    fontWeight: 400
                  }}
                >
                  $13,500
                </div>
                <div className="text-sm text-gray-500">twelve issues</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FBF9F4] border border-[#E5D5B7] p-8">
            <div className="flex justify-between gap-8 h-full">
              <div className="flex-1">
                <div
                  className="mb-3"
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '1.5rem',
                    color: '#1A1A18',
                    fontWeight: 400
                  }}
                >
                  Dedicated Send
                </div>
                <p className="text-gray-700 leading-relaxed">
                  A single email under The Pathway name carrying your content: a report, data, or an event. Clearly labeled as sponsored, and we approve the content. One per quarter.
                </p>
              </div>
              <div className="text-right flex flex-col justify-center shrink-0">
                <div
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '2.5rem',
                    color: '#2b74ba',
                    fontWeight: 400
                  }}
                >
                  $3,000
                </div>
                <div className="text-sm text-gray-500">per send</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FBF9F4] border border-[#E5D5B7] p-8">
            <div className="flex justify-between gap-8 h-full">
              <div className="flex-1">
                <div
                  className="mb-3"
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '1.5rem',
                    color: '#1A1A18',
                    fontWeight: 400
                  }}
                >
                  Special Editions
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Year in Review (December) and our annual list (January) each carry a single presenting sponsor.
                </p>
              </div>
              <div className="text-right flex flex-col justify-center shrink-0">
                <div
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '2.5rem',
                    color: '#2b74ba',
                    fontWeight: 400
                  }}
                >
                  Inquire
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-l-4 border-gray-300 pl-6 mt-12 max-w-5xl">
          <p className="text-sm italic text-gray-600 leading-relaxed">
            One primary sponsor per issue. Sponsor blocks run alongside the primary placement, never in place of it. Every placement is reviewed for fit before scheduling, and every sponsor gets a report of opens and link clicks afterward.
          </p>
        </div>
      </section>

      {/* Contact / CTA Footer */}
      <section id="contact" className="bg-[#1A1A18] text-white py-24">
        <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
          <h2
            className="mb-6"
            style={{
              fontFamily: 'athelas, Georgia, serif',
              fontSize: '2.5rem',
              lineHeight: '1.2',
              fontWeight: 400
            }}
          >
            To inquire about open dates
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            We schedule on a rolling basis and can usually confirm a date and run your placement within a week of agreement. Reach out directly. No forms, no sales process.
          </p>
          <a
            href="mailto:sponsors@thepathway.email?subject=I'd like to sponsor The Pathway"
            className="inline-block px-8 py-4 bg-[#2b74ba] text-white hover:bg-[#1f5489] transition-colors duration-200"
            style={{ fontFamily: 'athelas, Georgia, serif', fontSize: '1.125rem' }}
          >
            Sponsor the Pathway
          </a>
        </div>
      </section>

      {/* Page Footer */}
      <footer className="border-t border-gray-300 bg-white py-8">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex justify-between items-center">
          <div className="text-sm text-gray-500">© 2026 The Pathway</div>
          <a
            href="https://www.thepathway.email"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img src={badge} alt="The Pathway" className="h-12" />
          </a>
        </div>
      </footer>
    </div>
  );
}
