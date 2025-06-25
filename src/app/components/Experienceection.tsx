'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Code2, Users, Briefcase,  Rocket, Palette, Globe, Award, Building } from 'lucide-react';

interface Experience {
  title: string;
  icon: React.ElementType;
  description: string;
  type: string;
  color: string;
}

const ExperienceSection: React.FC = () => {
  const [activeCheckpoints, setActiveCheckpoints] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const checkpointRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences: Experience[] = [
    {
      title: "Head of Design, International Affairs Society",
      icon: Palette,
      description: "Leading design strategy and visual communications for international affairs initiatives, managing creative projects and brand identity.",
      type: "Leadership Role",
      color: "from-[#00CED1] to-purple-500"
    },
    {
      title: "Front-end Developer, Zenevia Events Team",
      icon: Code2,
      description: "Developing responsive web interfaces and interactive event management platforms using modern front-end technologies.",
      type: "Development Role",
      color: "from-[#00CED1] to-blue-500"
    },
    {
      title: "Selected for IIT Madras & IIT Bombay ESL",
      icon: Award,
      description: "Selected for prestigious English as Second Language programs at top-tier Indian Institutes of Technology.",
      type: "Academic Achievement",
      color: "from-[#808080] to-[#00CED1]"
    },
    {
      title: "Full Stack Developer Intern, Scalar School of Technology",
      icon: Briefcase,
      description: "Working on full-stack development projects, implementing end-to-end solutions and gaining industry experience.",
      type: "Technical Internship",
      color: "from-green-500 to-[#00CED1]"
    },
    {
      title: "HR Intern, TopTrop Foundation",
      icon: Users,
      description: "Managing human resources operations, recruitment processes, and organizational development initiatives.",
      type: "HR Internship",
      color: "from-orange-500 to-[#808080]"
    },
    {
      title: "In-Cabinet Member, Clubs and Chapters Committee",
      icon: Building,
      description: "Strategic committee member overseeing club operations, policy development, and inter-organizational coordination.",
      type: "Administrative Role",
      color: "from-purple-500 to-[#00CED1]"
    },
    {
      title: "Social Media Team, Spark E-Cell",
      icon: Globe,
      description: "Managing digital presence and social media strategy for the entrepreneurship cell, creating engaging content.",
      type: "Marketing Role",
      color: "from-pink-500 to-[#808080]"
    },
    {
      title: "Freelance: Graphic Design & Web Development",
      icon: Rocket,
      description: "Providing professional graphic design and web development services to various clients, delivering creative solutions.",
      type: "Freelance Work",
      color: "from-[#00CED1] to-black"
    }
  ];

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const index = checkpointRefs.current.findIndex(ref => ref === entry.target);
        setActiveCheckpoints((prev) => {
          const newSet = new Set(prev);
          if (entry.isIntersecting) {
            newSet.add(index);
          } else {
            newSet.delete(index);
          }
          return newSet;
        });
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    checkpointRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getLineGlowHeight = (): string => {
    if (activeCheckpoints.size === 0) return '0%';
    const highestActive = Math.max(...Array.from(activeCheckpoints));
    return `${(highestActive + 1) * (100 / experiences.length)}%`;
  };

  return (
    <div className="min-h-screen py-20 relative" id="experience">
<h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#00ced1] to-[#00ced1] bg-clip-text text-transparent">
  Experience & Involvement
</h2>


      <div className="space-y-16 relative">
        {/* Base timeline line */}
        <div 
          ref={timelineRef}
          className="absolute right-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-[#808080]/20"
          style={{ height: 'calc(100% - 100px)', top: '50px' }}
        />

        {/* Glowing timeline overlay */}
        <div 
          className="absolute right-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-[#00CED1] to-[#808080] transition-all duration-500"
          style={{
            height: getLineGlowHeight(),
            top: '50px',
            boxShadow: '0 0 20px rgba(0, 206, 209, 0.5)',
            opacity: activeCheckpoints.size > 0 ? 1 : 0
          }}
        />

        {/* Experience Cards */}
        {experiences.map((exp, index) => (
          <div
            key={exp.title}
            ref={(el) => {
              checkpointRefs.current[index] = el;
            }}
            className="relative flex items-center md:flex-row gap-8"
          >
            {/* Timeline checkpoint */}
            <div
              className={`absolute right-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 transition-all duration-500
                ${activeCheckpoints.has(index)
                  ? 'bg-[#00CED1] border-white shadow-[0_0_15px_rgba(0,206,209,0.5)]'
                  : 'bg-[#808080] border-black'
                }`}
            />

            {/* Experience Card */}
            <div className={`w-full md:w-5/12 p-6 rounded-xl transition-all duration-500
              ${activeCheckpoints.has(index) 
                ? 'bg-gray-900/60 scale-105 border-[#00CED1]' 
                : 'bg-black/40 border-[#808080]/30'
              } 
              border
              ${index % 2 === 0 ? 'md:mr-auto pr-12 md:pr-6' : 'md:ml-auto pl-12 md:pl-6'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${exp.color} bg-opacity-20 
                  ${activeCheckpoints.has(index) ? 'shadow-lg' : ''}`}>
                  <exp.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#00CED1]">{exp.title}</h3>
                  <span className="text-sm text-[#808080]">{exp.type}</span>
                  <p className="mt-3 text-gray-300">{exp.description}</p>
                </div>
              </div>

              {/* Skills/Keywords */}
              <div className="mt-4 flex flex-wrap gap-2">
                {getRelevantSkills(exp.title).map((skill) => (
                  <span
                    key={skill}
                    className={`px-2 py-1 text-xs rounded-full transition-all duration-500
                      ${activeCheckpoints.has(index)
                        ? 'bg-[#00CED1]/30 text-white'
                        : 'bg-[#808080]/20 text-[#808080]'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Type-safe helper function
const getRelevantSkills = (title: string): string[] => {
  if (title.includes("Head of Design")) {
    return ["Creative Direction", "Brand Strategy", "Visual Design", "Team Leadership"];
  } else if (title.includes("Front-end Developer")) {
    return ["React", "JavaScript", "UI/UX", "Responsive Design"];
  } else if (title.includes("IIT")) {
    return ["Academic Excellence", "Communication", "Technical Writing"];
  } else if (title.includes("Full Stack Developer")) {
    return ["MERN Stack", "API Development", "Database Design", "DevOps"];
  } else if (title.includes("HR Intern")) {
    return ["Recruitment", "Employee Relations", "Organizational Development"];
  } else if (title.includes("In-Cabinet")) {
    return ["Strategic Planning", "Policy Development", "Committee Management"];
  } else if (title.includes("Social Media")) {
    return ["Content Creation", "Digital Marketing", "Brand Management"];
  } else if (title.includes("Freelance")) {
    return ["Client Management", "Project Delivery", "Creative Solutions"];
  }
  return [];
};

export default ExperienceSection;