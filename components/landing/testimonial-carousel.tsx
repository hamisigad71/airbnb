'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  color: string;
  text: string;
  stay: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1000px)': { active: false } // Disable carousel on desktop
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="tc-wrapper">
      <style>{`
        .tc-wrapper {
          position: relative;
          margin-top: 48px;
        }

        /* ── Desktop Grid ── */
        .tc-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Mobile Carousel Viewport ── */
        @media (max-width: 999px) {
          .tc-viewport {
            overflow: hidden;
            width: 100%;
            cursor: grab;
          }
          .tc-viewport:active { cursor: grabbing; }

          .tc-container {
            display: flex;
            grid-template-columns: none;
            gap: 0;
            margin: 0 -10px; /* offset for outer padding */
          }

          .tc-slide {
            flex: 0 0 85%; /* show a bit of the next card */
            min-width: 0;
            padding: 0 10px;
          }
        }

        /* ── Card Styles (matching app/page.tsx) ── */
        .tc-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.32s;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .tc-card::before {
          content: '"';
          position: absolute;
          top: 16px;
          right: 20px;
          font-family: var(--font-sans), serif;
          font-size: 6rem;
          line-height: 1;
          color: var(--p);
          opacity: 0.07;
          pointer-events: none;
        }

        .tc-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--sh-m);
        }

        .tc-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 16px;
          color: oklch(0.72 0.18 55);
        }

        .tc-text {
          font-size: 0.93rem;
          line-height: 1.76;
          color: var(--fg);
          flex: 1;
          margin-bottom: 24px;
          font-style: italic;
        }

        .tc-stay {
          font-size: 0.72rem;
          color: var(--p);
          font-weight: 600;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
          display: flex;
          align-items: center; gap: 5px;
        }

        .tc-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--border);
        }

        .tc-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          color: #fff;
          flex-shrink: 0;
        }

        .tc-name { font-weight: 600; font-size: 0.9rem; color: var(--fg); }
        .tc-loc  { font-size: 0.76rem; color: var(--muted); margin-top: 2px; }

        /* ── Dots for Mobile ── */
        .tc-dots {
          display: none;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        @media (max-width: 999px) { .tc-dots { display: flex; } }

        .tc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tc-dot.active {
          background: var(--p);
          transform: scale(1.2);
        }
      `}</style>

      <div className="tc-viewport" ref={emblaRef}>
        <div className="tc-container">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-slide">
              <div className="tc-card">
                <div className="tc-stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4" fill="currentColor" />
                  ))}
                </div>
                <p className="tc-text">"{t.text}"</p>
                <div className="tc-stay">
                  <MapPin className="w-3 h-3" />
                  {t.stay}
                </div>
                <div className="tc-author">
                  <div className="tc-avatar" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="tc-name">{t.name}</div>
                    <div className="tc-loc">{t.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tc-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={cn('tc-dot', selectedIndex === i && 'active')}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
