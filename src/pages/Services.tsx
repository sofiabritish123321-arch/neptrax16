import { useState, useEffect, useRef } from 'react';
import WebGLParticles from './WebGLParticles';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const servicesGridRef = useRef<HTMLDivElement>(null);

  const handleDiscoverClick = () => {
    servicesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Reveal on scroll for showcase section
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  // Image tilt effect
  useEffect(() => {
    const images = document.querySelectorAll('.services-visual img');

    images.forEach((img) => {
      const handleMouseMove = (ev: MouseEvent) => {
        const target = ev.currentTarget as HTMLElement;
        const r = target.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        target.style.transform = `perspective(900px) rotateX(${y * 6}deg) rotateY(${x * -6}deg) scale(1.02)`;
      };

      const handleMouseLeave = (ev: MouseEvent) => {
        const target = ev.currentTarget as HTMLElement;
        target.style.transform = '';
      };

      img.addEventListener('mousemove', handleMouseMove as EventListener);
      img.addEventListener('mouseleave', handleMouseLeave as EventListener);

      return () => {
        img.removeEventListener('mousemove', handleMouseMove as EventListener);
        img.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      };
    });
  }, []);

  const servicesList = [
    {
      title: 'Custom Website Design',
      description: 'Crafted pixel-perfect designs that reflect your brand identity. We create stunning, user-friendly websites that captivate visitors and convert them into loyal customers through strategic visual storytelling,',
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Building robust, scalable web applications with cutting-edge technologies. From front-end interfaces to back-end architecture, we deliver high-performance solutions that grow with your business needs.',
    },
    {
      title: 'AI-Powered Chatbots',
      description: 'Intelligent conversational AI that engages customers 24/7. Our chatbots provide instant support, answer queries, and guide users through seamless experiences while learning from every interaction.',
    },
    {
      title: 'Social Media Management & Growth',
      description: 'Strategic social media campaigns that build communities and drive engagement. We manage your presence across platforms, create compelling content, and grow your audience organically with data-driven strategies.',
    },
    {
      title: 'Brand Identity & Visual Design',
      description: 'Comprehensive brand development from concept to execution. We craft memorable logos, color palettes, and visual systems that establish strong brand recognition and communicate your unique value proposition.',
    },
    {
      title: 'Social Media & Digital Advertising',
      description: 'High-converting ad campaigns across Facebook, Instagram, LinkedIn, and Google. We optimize targeting, creative, and messaging to maximize ROI and deliver measurable results for your marketing investment.',
    },
    {
      title: 'SEO Optimization & Growth Strategy',
      description: 'Comprehensive SEO solutions that boost your search rankings and organic traffic. We implement technical optimizations, content strategies, and link-building campaigns that deliver sustainable growth and visibility.',
    },
    {
      title: 'AI Automation Agents',
      description: 'Custom AI-powered automation that streamlines workflows and increases efficiency. From data processing to customer service, we build intelligent agents that handle repetitive tasks and free up your team.',
    },
    {
      title: 'Mobile App Design & Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We design and develop iOS and Android apps that are intuitive, fast, and aligned with your business objectives.',
    },
    {
      title: 'Marketing Audit & Strategic Planning',
      description: 'In-depth analysis of your marketing performance with actionable recommendations. We identify opportunities, optimize spending, and create comprehensive strategies that align with your business goals and budget.',
    },
    {
      title: 'E-Commerce Store Development',
      description: 'Complete e-commerce solutions built for conversions and scalability. From product catalogs to secure checkout systems, we create online stores that provide seamless shopping experiences and drive revenue.',
    },
    {
      title: 'Content Creation & Copywriting',
      description: 'Compelling content that resonates with your audience and drives action. Our expert writers craft SEO-optimized blog posts, website copy, and marketing materials that establish authority and generate leads.',
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <WebGLParticles />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 bg-clip-text text-transparent animate-glow-text">
                OUR SERVICES
              </span>
            </h1>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Crafting digital excellence through innovative solutions that transform your vision into reality
            </p>
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={handleDiscoverClick}
              className="group relative px-12 py-4 rounded-full bg-transparent border-2 border-cyan-400/50 text-white font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Discover</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section ref={servicesGridRef} className="relative py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 reveal-heading">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Explore our Service</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="service-card group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Card Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image Placeholder */}
                  <div className="relative mb-6 rounded-xl overflow-hidden h-48 bg-gray-800/50 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/portfolio/jeton.png"
                      alt={service.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 mix-blend-overlay`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`}></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} p-[1px]`}>
                      <div className="w-full h-full bg-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section id="services-showcase-2" aria-label="Services showcase" className="relative bg-[#0b0b0b] py-[120px] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-orb floating-orb-1"></div>
          <div className="floating-orb floating-orb-2"></div>
          <div className="floating-orb floating-orb-3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          {/* First Row - Featured Service */}
          <div className="reveal-up showcase-row mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <div className="order-2 lg:order-1 showcase-text">
                <div className="badge-pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#222222] text-[#d7d7d7] text-xs uppercase tracking-wider mb-6 badge-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c2b3] badge-dot-pulse"></span>
                  Featured Service
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight gradient-text-reveal">
                  Website Development
                </h2>
                <p className="text-lg md:text-xl text-[#bdbdbd] mb-8 leading-relaxed text-fade-in">
                  Developing digital experiences that are as beautiful as they are functional.
                </p>
                <button
                  className="cta-outline group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/12 text-white transition-all duration-300 hover:bg-white/95 hover:text-[#0b0b0b] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00c2b3] focus:ring-offset-4 focus:ring-offset-[#0b0b0b] cta-enhanced"
                  onClick={() => onNavigate('portfolio')}
                >
                  <span>Explore Projects</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>

              {/* Right Column - Visual */}
              <div className="services-visual order-1 lg:order-2">
                <div className="relative showcase-image-wrapper">
                  {/* Glow effect layers */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 image-glow"></div>

                  {/* Main image container with glass effect */}
                  <div className="relative overflow-hidden rounded-3xl glass-card">
                    <img
                      src="public/portfolio/wildebrands.png"
                      alt="Website development demo"
                      className="w-full h-[500px] object-cover image-float"
                    />
                    {/* Overlay gradient animation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Shimmer effect on hover */}
                    <div className="shimmer-overlay"></div>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="corner-accent corner-accent-tl"></div>
                  <div className="corner-accent corner-accent-br"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Large Typographic Hero */}
          <div className="reveal-up mb-32 typography-hero-section">
            <div className="relative max-w-5xl">
              {/* Enhanced animated glow background */}
              <div className="absolute -inset-8 bg-gradient-radial from-[#061e28]/22 via-transparent to-transparent rounded-full blur-3xl opacity-60 mix-blend-screen pointer-events-none glow-pulse"></div>

              {/* Additional animated accent lines */}
              <div className="accent-line accent-line-1"></div>
              <div className="accent-line accent-line-2"></div>

              {/* Text with gradient animation and word reveal */}
              <h2 className="display-hero text-7xl md:text-7xl lg:text-7xl xl:text-6xl font-black leading-[0.98] tracking-tight text-hero-animated">
                <span className="text-line" style={{ animationDelay: '0.1s' }}>Simplify operations.</span><br />
                <span className="text-line" style={{ animationDelay: '0.2s' }}>Accelerate results.</span><br />
                <span className="text-line" style={{ animationDelay: '0.3s' }}>Reclaim your time for what</span><br />
                <span className="text-line" style={{ animationDelay: '0.4s' }}>truly grows your business.</span><br />
                <span className="text-line" style={{ animationDelay: '0.5s' }}>From no-code agility to custom</span><br />
                <span className="text-line" style={{ animationDelay: '0.6s' }}>development, we make workflows</span><br />
                <span className="text-line" style={{ animationDelay: '0.7s' }}>effortless and impactful.</span>
              </h2>

              {/* Floating particles effect */}
              <div className="hero-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
              </div>
            </div>
          </div>

          {/* Third Row - Newly Added */}
          <div className="reveal-up showcase-row">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <div className="showcase-text">
                <div className="badge-pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#222222] text-[#d7d7d7] text-xs uppercase tracking-wider mb-6 badge-pulse badge-new">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c2b3] badge-dot-pulse"></span>
                  Newly Added
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight gradient-text-reveal">
                  AI Chatbots Development
                </h2>
                <p className="text-lg md:text-xl text-[#bdbdbd] mb-8 leading-relaxed text-fade-in">
                  Your Dedicated AI Support Bot, Built Just for Coaches
                </p>
                <button
                  className="cta-outline group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/12 text-white transition-all duration-300 hover:bg-white/95 hover:text-[#0b0b0b] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00c2b3] focus:ring-offset-4 focus:ring-offset-[#0b0b0b] cta-enhanced"
                  onClick={() => onNavigate('portfolio')}
                >
                  <span>Explore Projects</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>

              {/* Right Column - Visual */}
              <div className="services-visual">
                <div className="relative showcase-image-wrapper">
                  {/* Glow effect layers */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 image-glow"></div>

                  {/* Main image container with glass effect */}
                  <div className="relative overflow-hidden rounded-3xl glass-card">
                    <img
                      src="public/portfolio/wildebrands.png"
                      alt="AI Chatbot demo"
                      className="w-full h-[500px] object-cover image-float"
                    />
                    {/* Overlay gradient animation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Shimmer effect on hover */}
                    <div className="shimmer-overlay"></div>

                    {/* AI pulse indicator */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full ai-badge">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ai-pulse"></span>
                      <span className="text-white text-xs font-semibold">AI Powered</span>
                    </div>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="corner-accent corner-accent-tl"></div>
                  <div className="corner-accent corner-accent-br"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Modern Animation Styles */}
      <style jsx>{`
        /* ============================================
           KEYFRAME ANIMATIONS
           ============================================ */

        /* Reveal heading animation */
        @keyframes reveal-heading {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .reveal-heading {
          animation: reveal-heading 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Hero text glow animation */
        @keyframes glow-text {
          0%, 100% {
            text-shadow:
              0 0 20px rgba(34, 211, 238, 0.5),
              0 0 40px rgba(34, 211, 238, 0.3),
              0 0 60px rgba(34, 211, 238, 0.2);
          }
          50% {
            text-shadow:
              0 0 30px rgba(34, 211, 238, 0.7),
              0 0 60px rgba(34, 211, 238, 0.5),
              0 0 80px rgba(34, 211, 238, 0.3);
          }
        }

        /* Card entrance animation */
        @keyframes card-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Floating orb animation for background */
        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.25;
          }
        }

        /* Badge pulse animation */
        @keyframes badge-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 194, 179, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(0, 194, 179, 0);
          }
        }

        /* Badge dot pulse */
        @keyframes dot-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        /* Shimmer effect for images */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        /* Glow pulse for typography hero */
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        /* Text line reveal animation */
        @keyframes text-line-reveal {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* Gradient text shimmer */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Accent line animation */
        @keyframes accent-line-draw {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        /* Floating particle animation */
        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -20px);
            opacity: 0.6;
          }
          50% {
            transform: translate(40px, 0);
            opacity: 0.3;
          }
          75% {
            transform: translate(20px, 20px);
            opacity: 0.6;
          }
        }

        /* Image float animation */
        @keyframes image-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Corner accent animation */
        @keyframes corner-accent-fade {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 0.4;
            transform: scale(1);
          }
        }

        /* AI pulse animation */
        @keyframes ai-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(52, 211, 153, 0);
            transform: scale(1.1);
          }
        }

        /* CTA button enhanced animation */
        @keyframes cta-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 194, 179, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(0, 194, 179, 0);
          }
        }

        /* ============================================
           BASE STYLES & UTILITIES
           ============================================ */

        .animate-glow-text {
          animation: glow-text 3s ease-in-out infinite;
        }

        .service-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .service-card.card-visible {
          animation: card-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Reveal animations for showcase section */
        .reveal-up {
          opacity: 0;
          transform: translateY(18px);
          transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.6s;
        }

        .reveal-up.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* ============================================
           FLOATING BACKGROUND ORBS
           ============================================ */

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .floating-orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
          top: 10%;
          right: 10%;
          animation: float-orb 20s ease-in-out infinite;
        }

        .floating-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%);
          bottom: 20%;
          left: 5%;
          animation: float-orb 25s ease-in-out infinite 5s;
        }

        .floating-orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          animation: float-orb 18s ease-in-out infinite 10s;
        }

        /* ============================================
           SHOWCASE ROW ANIMATIONS
           ============================================ */

        .showcase-row.in-view .showcase-text {
          animation: text-line-reveal 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }

        .showcase-row.in-view .showcase-image-wrapper {
          animation: text-line-reveal 1s cubic-bezier(0.2, 0.9, 0.2, 1) 0.3s forwards;
        }

        /* ============================================
           BADGE ANIMATIONS
           ============================================ */

        .badge-pill {
          font-weight: 600;
          letter-spacing: 0.05em;
          position: relative;
        }

        .badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }

        .badge-dot-pulse {
          animation: dot-pulse 1.5s ease-in-out infinite;
        }

        .badge-new {
          background: linear-gradient(135deg, rgba(0, 194, 179, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%);
          border: 1px solid rgba(0, 194, 179, 0.3);
        }

        /* ============================================
           TEXT ANIMATIONS
           ============================================ */

        .gradient-text-reveal {
          background: linear-gradient(90deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradient-shift 3s ease-in-out infinite;
        }

        .text-fade-in {
          opacity: 0;
          animation: text-line-reveal 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) 0.4s forwards;
        }

        /* ============================================
           TYPOGRAPHY HERO SECTION
           ============================================ */

        .typography-hero-section .glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        .text-hero-animated {
          position: relative;
        }

        .text-line {
          display: inline-block;
          opacity: 0;
        }

        .typography-hero-section.in-view .text-line {
          animation: text-line-reveal 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }

        /* Accent lines for typography section */
        .accent-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.6) 50%, transparent 100%);
          opacity: 0;
        }

        .accent-line-1 {
          top: 0;
          left: 0;
          width: 100%;
        }

        .accent-line-2 {
          bottom: 0;
          right: 0;
          width: 100%;
        }

        .typography-hero-section.in-view .accent-line {
          animation: accent-line-draw 1.5s cubic-bezier(0.2, 0.9, 0.2, 1) 0.5s forwards;
        }

        /* Floating particles */
        .hero-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
        }

        .typography-hero-section.in-view .particle {
          animation: particle-float 15s ease-in-out infinite;
        }

        .particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 40%; right: 15%; animation-delay: 2s; }
        .particle-3 { bottom: 30%; left: 20%; animation-delay: 4s; }
        .particle-4 { top: 60%; right: 25%; animation-delay: 6s; }
        .particle-5 { bottom: 15%; right: 10%; animation-delay: 8s; }

        /* ============================================
           IMAGE & VISUAL EFFECTS
           ============================================ */

        .showcase-image-wrapper {
          position: relative;
          isolation: isolate;
        }

        /* Glass card effect with backdrop blur */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.05);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .glass-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(6, 182, 212, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        /* Image floating animation */
        .image-float {
          animation: image-float 6s ease-in-out infinite;
          transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .showcase-image-wrapper:hover .image-float {
          animation-play-state: paused;
        }

        /* Shimmer overlay effect */
        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 60%,
            transparent 100%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .glass-card:hover .shimmer-overlay {
          animation: shimmer 2s ease-in-out;
        }

        /* Corner accent decorations */
        .corner-accent {
          position: absolute;
          width: 40px;
          height: 40px;
          opacity: 0;
          pointer-events: none;
        }

        .corner-accent-tl {
          top: -10px;
          left: -10px;
          border-top: 2px solid rgba(6, 182, 212, 0.6);
          border-left: 2px solid rgba(6, 182, 212, 0.6);
          border-radius: 8px 0 0 0;
        }

        .corner-accent-br {
          bottom: -10px;
          right: -10px;
          border-bottom: 2px solid rgba(6, 182, 212, 0.6);
          border-right: 2px solid rgba(6, 182, 212, 0.6);
          border-radius: 0 0 8px 0;
        }

        .showcase-image-wrapper:hover .corner-accent {
          animation: corner-accent-fade 0.5s ease-out forwards;
        }

        /* Image glow effect */
        .image-glow {
          transition: opacity 0.7s ease-out;
        }

        .showcase-image-wrapper:hover .image-glow {
          opacity: 1 !important;
        }

        /* ============================================
           AI BADGE EFFECTS
           ============================================ */

        .ai-badge {
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .glass-card:hover .ai-badge {
          opacity: 1;
          transform: translateY(0);
        }

        .ai-pulse {
          animation: ai-pulse 2s ease-in-out infinite;
        }

        /* ============================================
           CTA BUTTON ENHANCEMENTS
           ============================================ */

        .cta-enhanced {
          position: relative;
          overflow: hidden;
        }

        .cta-enhanced::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-enhanced:hover::before {
          opacity: 1;
        }

        .cta-enhanced:active {
          animation: cta-pulse 0.6s ease-out;
        }

        /* ============================================
           DISPLAY HERO TYPOGRAPHY
           ============================================ */

        .display-hero {
          word-break: keep-all;
        }

        /* Radial gradient utility */
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }

        /* Services visual hover effects */
        .services-visual img {
          cursor: pointer;
        }

        /* ============================================
           ACCESSIBILITY - REDUCED MOTION
           ============================================ */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .reveal-up {
            transform: none;
            opacity: 1;
            transition: none;
          }

          .floating-orb,
          .particle,
          .image-float,
          .shimmer-overlay {
            animation: none !important;
          }
        }

        /* ============================================
           RESPONSIVE BREAKPOINTS
           ============================================ */

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .display-hero {
            font-size: 3rem;
            line-height: 1.1;
          }

          .floating-orb {
            opacity: 0.5;
          }

          .floating-orb-1 { width: 200px; height: 200px; }
          .floating-orb-2 { width: 250px; height: 250px; }
          .floating-orb-3 { width: 150px; height: 150px; }
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: repeat(1, 1fr);
          }

          .display-hero {
            font-size: 2rem;
            line-height: 1.15;
            text-align: center;
          }

          #services-showcase-2 {
            padding: 60px 0;
          }

          .reveal-up {
            margin-bottom: 60px !important;
          }

          .floating-orb {
            display: none;
          }

          .hero-particles {
            display: none;
          }

          .glass-card {
            backdrop-filter: blur(5px);
          }

          .corner-accent {
            display: none;
          }
        }

        /* Mobile order fixes */
        @media (max-width: 1023px) {
          .services-visual {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}