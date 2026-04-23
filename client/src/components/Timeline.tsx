import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Briefcase, Award } from 'lucide-react';

/**
 * Design System: Modern Engineering Minimalism
 * Timeline component for visualizing career and educational progression
 * Color Palette: Deep slate blue (#1e3a5f) + Vibrant teal (#0ea5e9)
 */

interface TimelineEvent {
  id: string;
  date: string;
  dateRange?: string;
  title: string;
  subtitle: string;
  description: string[];
  type: 'education' | 'experience' | 'achievement';
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  events: TimelineEvent[];
}

const typeIcons = {
  education: BookOpen,
  experience: Briefcase,
  achievement: Award,
};

const typeColors = {
  education: '#0ea5e9',
  experience: '#0ea5e9',
  achievement: '#0ea5e9',
};

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id || null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 md:transform md:-translate-x-1/2">
        <div 
          className="w-full bg-[#0ea5e9] transition-all duration-1000 ease-out"
          style={{ 
            height: isVisible ? '100%' : '0%',
            transitionDelay: '200ms'
          }}
        ></div>
      </div>

      {/* Timeline Events */}
      <div className="space-y-8 md:space-y-12">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const Icon = typeIcons[event.type];
          const isExpanded = expandedId === event.id;

          return (
            <div
              key={event.id}
              className="relative"
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-start">
                {/* Left Side */}
                <div className={isLeft ? 'text-right' : 'invisible'}>
                  <div className="text-sm text-gray-500 font-medium">{event.dateRange || event.date}</div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                  <div className="relative">
                    <div 
                      className="w-4 h-4 bg-white border-4 rounded-full transition-all duration-300"
                      style={{ borderColor: typeColors[event.type] }}
                    ></div>
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-0 transition-opacity duration-300"
                      style={{ 
                        backgroundColor: typeColors[event.type],
                        opacity: isExpanded ? 0.1 : 0
                      }}
                    ></div>
                  </div>
                </div>

                {/* Right Side */}
                <div className={!isLeft ? 'text-left' : 'invisible'}>
                  <div className="text-sm text-gray-500 font-medium">{event.dateRange || event.date}</div>
                </div>
              </div>

              {/* Card */}
              <div 
                className={`md:col-span-1 md:${isLeft ? 'col-start-1' : 'col-start-2'} ml-8 md:ml-0 transition-all duration-300 cursor-pointer`}
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
              >
                <Card 
                  className={`p-6 shadow-elevated border-l-4 transition-all duration-300 hover:shadow-lg ${
                    isExpanded ? 'ring-2 ring-[#0ea5e9] ring-offset-2' : ''
                  }`}
                  style={{ borderLeftColor: typeColors[event.type] }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${typeColors[event.type]}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: typeColors[event.type] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-dark">{event.title}</h3>
                          <p className="text-[#0ea5e9] font-medium text-sm">{event.subtitle}</p>
                        </div>
                        {event.status === 'current' && (
                          <span className="bg-[#0ea5e9] text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0">
                            Current
                          </span>
                        )}
                        {event.status === 'completed' && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0">
                            Completed
                          </span>
                        )}
                      </div>

                      {/* Mobile Date */}
                      <div className="md:hidden text-xs text-gray-500 font-medium mt-2">
                        {event.dateRange || event.date}
                      </div>

                      {/* Expandable Content */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96 mt-4' : 'max-h-0'
                        }`}
                      >
                        <ul className="space-y-2 text-gray-700">
                          {event.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-[#0ea5e9] mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expand Indicator */}
                      <div className="mt-3 flex items-center gap-2 text-[#0ea5e9] text-sm font-medium">
                        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
