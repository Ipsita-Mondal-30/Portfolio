'use client';

import React, { useState, useEffect } from 'react';
import { Code2, Smartphone, Server, Box, Send,  Terminal } from 'lucide-react';

const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer';
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [, setActiveSection] = useState('home');
  const [glitchActive, setGlitchActive] = useState(false);

  const skills = {
    frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI Libraries'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    mobile: ['React Native'],
    tools: ['Git', 'GitHub', 'Deployment', 'Version Control'],
  };

  useEffect(() => {
    setIsVisible(true);
    let currentText = '';
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setTypedText(currentText);
        currentIndex++;
        setTimeout(typeText, 100);
      }
    };

    setTimeout(typeText, 500);

    const handleScroll = () => {
      const sections = ['home', 'skills', 'about'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000 + Math.random() * 2000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Glitch overlay */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-200 ${glitchActive ? 'opacity-20' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ced1] to-transparent animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 206, 209, 0.03) 2px,
            rgba(0, 206, 209, 0.03) 4px
          )`
        }}></div>
      </div>

      <div className="relative z-10 text-white p-8 max-w-6xl mx-auto" id="home">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col justify-center">
          <div className={`space-y-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className={`text-6xl font-bold bg-gradient-to-r from-[#00ced1] to-[#808080] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 ${glitchActive ? 'animate-pulse' : ''}`}>
              Ipsita Mondal
            </h1>
            <h2 className="text-2xl text-[#00ced1] font-mono">
              {typedText}
              <span className="animate-pulse text-[#808080]">|</span>
            </h2>
            <p className="text-lg text-[#808080] max-w-2xl hover:text-[#00ced1] transition-colors duration-300">
            A second-year B.Tech CSE student passionate about building impactful web and mobile experiences. Proficient in the MERN stack and modern frontend technologies, with strong backend knowledge including GraphQL and system design. Actively exploring freelance opportunities to apply and expand my skills.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={scrollToContact}
                className="group px-6 py-3 bg-[#00ced1] text-black rounded-lg hover:bg-[#00ced1]/80 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ced1]/30"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span className="font-semibold">Contact Me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="min-h-screen py-20" id="skills">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#00ced1] to-[#808080] bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <div
                key={category}
                className="p-6 rounded-xl bg-[#808080]/10 border border-[#00ced1]/30 transform hover:scale-105 transition-all duration-300 hover:bg-[#00ced1]/5 hover:border-[#00ced1]/60 hover:shadow-lg hover:shadow-[#00ced1]/20"
                style={{
                  animationDelay: `${idx * 200}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {getCategoryIcon(category)}
                  <h3 className="text-xl font-semibold text-[#00ced1]">{formatCategory(category)}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 cursor-default border ${
                        hoveredSkill === skill 
                          ? 'bg-[#00ced1]/20 scale-110 text-[#00ced1] border-[#00ced1] shadow-lg shadow-[#00ced1]/30' 
                          : 'bg-[#808080]/10 text-[#808080] border-[#808080]/30 hover:border-[#00ced1]/50'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="min-h-screen py-20" id="about">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#00ced1] to-[#808080] bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-[#808080] hover:text-[#00ced1] transition-colors duration-300">
                As a second-year B.Tech CSE student, I&apos;m passionate about creating innovative web and mobile solutions. My journey in development started with web technologies and quickly expanded to include mobile development.
              </p>
              <p className="text-lg text-[#808080] hover:text-[#00ced1] transition-colors duration-300">
                When I&apos;m not coding, you can find me with pain brush or desining , where I enjoy maintaining a healthy balance between technical growth and creativity.
              </p>
              <div className="flex flex-col gap-4 mt-8">
                <h3 className="text-xl font-semibold text-[#00ced1]">What I&apos;m Currently...</h3>
                {['Learning advanced Next.js features', 'Looking for freelance opportunities', 'Building personal projects'].map((item) => (
                  <div key={item} className="flex items-center gap-3 group">
                    <span className="w-2 h-2 bg-[#00ced1] rounded-full group-hover:scale-150 transition-transform duration-300 shadow-sm shadow-[#00ced1]"></span>
                    <p className="group-hover:translate-x-2 transition-transform duration-300 text-[#808080] group-hover:text-[#00ced1]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="w-full h-full bg-[#808080]/10 rounded-xl border border-[#00ced1]/30 transition-all duration-300 group-hover:bg-[#00ced1]/5 group-hover:border-[#00ced1] group-hover:shadow-xl group-hover:shadow-[#00ced1]/20 p-6 overflow-hidden">
                {/* Default state - Terminal icon */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  <Terminal
                    size={48}
                    className="text-[#00ced1] group-hover:text-[#808080] transition-colors duration-300"
                  />
                </div>
                
                {/* Hover state - Profile image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00ced1] to-[#808080] flex items-center justify-center text-black font-bold text-2xl shadow-lg shadow-[#00ced1]/30">
                    IM
                  </div>
                </div>

                {/* Glitch lines effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-[#00ced1] animate-pulse"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-[#808080] animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-[#00ced1] animate-pulse" style={{animationDelay: '0.3s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for icon rendering
interface CategoryIcons {
  [key: string]: React.ReactElement;
}

const getCategoryIcon = (category: string): React.ReactElement => {
  const iconProps = { className: 'text-[#00ced1]', size: 24 };

  const icons: CategoryIcons = {
    frontend: React.createElement(Code2, iconProps),
    backend: React.createElement(Server, iconProps),
    mobile: React.createElement(Smartphone, iconProps),
    tools: React.createElement(Box, iconProps),
  };

  return icons[category] || React.createElement(Code2, iconProps);
};


// Formatter for skill category names
interface FormatCategoryProps {
    category: string;
}

const formatCategory = (category: FormatCategoryProps['category']): string => {
    switch (category) {
        case 'frontend':
            return 'Frontend Development';
        case 'backend':
            return 'Backend Development';
        case 'mobile':
            return 'Mobile Development';
        case 'tools':
            return 'Tools & Deployment';
        default:
            return category.charAt(0).toUpperCase() + category.slice(1);
    }
};

export default Main;