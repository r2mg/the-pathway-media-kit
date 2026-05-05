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
            Reach the people making the most consequential decisions in medical devices.
          </h1>
          <div className="text-lg text-white/90 max-w-3xl space-y-4 mb-8">
            <p>
              The Pathway is read by medical device founders, executives, and senior operators who are actively building, scaling, or navigating the medtech industry. If you're receiving this, you already know what it is — because you read it.
            </p>
            <p>
              We keep advertising limited by design. We're opening a small number of sponsorship placements to companies whose work is relevant to this audience. Here's everything you need to know.
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
                <CountUpNumber end={30000} inView={statsInView} />
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Total Subscribers and Growing Weekly
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
                <CountUpNumber end={162} suffix="K+" inView={statsInView} />
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Views in the Last 90 Days
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
                22%
              </div>
              <div className="uppercase tracking-wider text-sm text-gray-600">
                Open Rate per Issue
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
            <p className="text-gray-700 leading-relaxed mb-6">
              A curated briefing of the top eight medtech stories of the week, sourced from across the industry. Read as a standing start-of-week reference by subscribers in regulatory, commercial, and executive roles.
            </p>
            <p className="text-sm" style={{ color: '#2b74ba' }}>
              ~8,000-9,000 opens per send
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
              One original story reported and analyzed by an industry insider — not summarized, not aggregated, just real reporting. Launched April 2026. Debut issue generated more than 10× the engagement of a typical weekly send.
            </p>
            <p className="text-sm" style={{ color: '#2b74ba' }}>
              Highest reader engagement
            </p>
          </div>
        </div>

        <div className="border-l-4 border-gray-300 pl-6 max-w-5xl">
          <p className="text-sm italic text-gray-600 leading-relaxed">The open rate ranges from ~20-30%, holding steady at a ~22% average consistently across every issue since launch — above the B2B newsletter benchmark of 20%, in a category where most publications trend lower over time. This one is trending higher.</p>
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
          Medical device founders, C-suite executives, regulatory leaders, commercial operators, and investors — concentrated in Class II and III device companies at commercialization stage, early commercial, or pre-launch. Self-selected, highly engaged, and not duplicated anywhere else at this scale.
        </blockquote>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          This is not a broad healthcare audience. It is a narrow, specific one: the people who make decisions about regulatory strategy, go-to-market sequencing, reimbursement planning, capital allocation, and partnerships. If your company serves any part of that decision landscape, this is your audience.
        </p>

        <div className="border-l-4 border-gray-300 pl-6">
          <p className="text-sm italic text-gray-600 leading-relaxed">
            This is not the right fit for consumer health products, pharma-only solutions, or companies seeking high-volume click performance. We're a high-trust publication with a specific audience. Placements that are relevant perform. We'd rather tell you that upfront than take your money and deliver a misaligned result.
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
                Monday Digest — Primary Sponsor
              </div>
              <p className="text-gray-700 leading-relaxed">
                Logo above editorial content, one positioning line, one link. Maximum visibility within the Monday send. Top-of-issue placement seen by every opener before any editorial content.
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
                $2,500
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
                Monday Digest — Text Placement
              </div>
              <p className="text-gray-700 leading-relaxed">
                2–3 lines of copy within the newsletter body, one link or CTA. Works well for event announcements, tool offers, or targeted visibility without header-level commitment.
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
                $1,750
              </div>
              <div className="text-sm text-gray-500">per issue</div>
            </div>
          </div>

          {/* Row 3 - Featured */}
          <div className="grid grid-cols-12 gap-4 p-8 border-l-4 hover:bg-gray-50 transition-colors duration-150" style={{ borderLeftColor: '#2b74ba' }}>
            <div className="col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <div
                  style={{
                    fontFamily: 'athelas, Georgia, serif',
                    fontSize: '1.25rem',
                    color: '#1A1A18',
                    fontWeight: 400
                  }}
                >
                  Thursday Field Note — Sponsor
                </div>
                <span className="px-2 py-1 text-xs uppercase tracking-wider bg-[#2b74ba] text-white">
                  Highest Engagement
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Integrated mention within the highest-engagement send in the newsletter. Contextual placement alongside original medtech journalism. One link or CTA. The Field Note audience is the most actively engaged segment of the list.
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
                $2,500
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
        <div className="mt-12 bg-[#FBF9F4] border border-[#E5D5B7] p-8">
          <div className="flex justify-between">
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
                Multi-Issue Commitment
              </div>
              <p className="text-gray-700 leading-relaxed">
                Available for Monday Digest Primary Sponsor and Thursday Field Note placements only. <strong>Four-issue packages are priced at $8,500</strong> — a discount of roughly 15% off the single-issue rate. Mix and match across Monday and Thursday placements. Reach out to discuss specific dates and availability.
              </p>
            </div>
            <div className="ml-8 text-right flex flex-col justify-center">
              <div
                style={{
                  fontFamily: 'athelas, Georgia, serif',
                  fontSize: '2.5rem',
                  color: '#2b74ba',
                  fontWeight: 400
                }}
              >
                $8,500
              </div>
              <div className="text-sm text-gray-500">per 4 issue engagement</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-l-4 border-gray-300 pl-6 mt-8 max-w-5xl">
          <p className="text-sm italic text-gray-600 leading-relaxed">
            One sponsor per issue, maximum. All placements are reviewed for alignment with the publication's editorial standards and audience before scheduling. Copy must be clear, factual, and appropriate for a senior professional medtech audience.
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
            Sponsorship slots are scheduled on a rolling basis and limited by design. We can typically confirm availability and turn around a placement within a week of agreement. Reach out directly — no forms, no sales process.
          </p>
          <a
            href="mailto:sponsors@thepathway.email?subject=I'd like to sponsor The Pathway"
            className="inline-block px-8 py-4 bg-[#2b74ba] text-white hover:bg-[#1f5489] transition-colors duration-200 mb-8"
            style={{ fontFamily: 'athelas, Georgia, serif', fontSize: '1.125rem' }}
          >
            Sponsor the Pathway
          </a>
          <p className="text-sm italic text-gray-400 leading-relaxed">
            Availability is first-come, first-scheduled. Issues during periods of high industry activity — earnings seasons, major conference weeks — book quickly.
          </p>
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
