'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  
  Hospital,
  
  MessageSquare,
  Users,
 
  ShoppingCart,
  CreditCard,
  UserCheck
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  text: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
  github?: string;
  features: Feature[];
  tech: string[];
}

const ProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "Delhi-walah-halwai",
      description:
        "A comprehensive e-commerce platform for a traditional sweet and savories shop based in Hisar, Haryana. Complete full-stack solution featuring OAuth authentication, secure payment gateway integration, shopping cart functionality, and inventory management system.",
      link: "www.delhiwalahalwai.com",
      github: "https://github.com/Ipsita-Mondal-30/DWH",
      features: [
        { icon: UserCheck, text: "OAuth login and authentication" },
        { icon: CreditCard, text: "Payment gateway integration" },
        { icon: ShoppingCart, text: "Full shopping cart system" },
        { icon: Users, text: "Customer management dashboard" },
      ],
      tech: ["React", "Node.js", "MongoDB", "OAuth", "Payment Gateway", "Express"],
    },
    {
      title: "CityCare",
      description:
        "Comprehensive hospital management system with patient-centric features and emergency services.",
      link: "https://city-care.vercel.app",
      github: "https://github.com/Ipsita-Mondal-30/CityCare",
      features: [
        { icon: Hospital, text: "Hospital locator with navigation" },
        { icon: MessageSquare, text: "Doctor appointment booking" },
        { icon: Users, text: "Patient management system" },
      ],
      tech: ["React", "Node.js", "MongoDB", "Maps API"],
    },
    
  ];

  return (
    <div className="min-h-screen py-20" id="projects">
      <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#00ced1] to-[#00ced1] bg-clip-text text-transparent">
        Featured Projects
      </h2>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`p-6 rounded-xl transition-all duration-300 ${
              hoveredProject === index
                ? 'bg-gray-900/60 scale-102 border-[#00CED1]'
                : 'bg-black/40 border-[#808080]/30'
            } border`}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold text-[#00CED1]">{project.title}</h3>
                <div className="flex gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 bg-[#00CED1] text-black rounded-lg hover:bg-[#00CED1]/80 transition-all duration-300"
                  >
                    <span>Visit</span>
                    <ExternalLink
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-[#808080] text-white rounded-lg hover:bg-[#808080]/80 transition-all duration-300"
                    >
                      <span>Code</span>
                      <Github
                        size={18}
                        className="group-hover:rotate-12 transition-transform duration-300"
                      />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300">{project.description}</p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <feature.icon
                      size={20}
                      className="text-[#00CED1] group-hover:text-[#00CED1]/80 transition-colors duration-300"
                    />
                    <span className="text-gray-300 group-hover:text-[#00CED1] transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#808080]/30">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-[#00CED1]/20 rounded-full text-[#00CED1] hover:bg-[#00CED1]/30 hover:scale-105 transition-all duration-300"
                  >
                    {tech}
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

export default ProjectsSection;