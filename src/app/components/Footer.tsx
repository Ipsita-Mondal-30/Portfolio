'use client';

import React from 'react';
import { Linkedin,  FileText, Heart } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Graphic Design Portfolio',
      icon: FileText,
      url: 'https://drive.google.com/file/d/1h11K6GsnoV1A1CPeNouWpe97nBFYyErB/view?usp=drive_link', // replace with your actual ID
      color: 'hover:text-purple-400',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/ipsita-mondal-865912313',
      color: 'hover:text-blue-400',
    },
  ];
  

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative min-h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/footer.png')", // Replace with your image path
      }}
    >
     
      
      {/* Content */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Let's Connect heading */}
          <h2 
            className="text-5xl md:text-6xl font-bold mb-8 transition-all duration-300 hover:scale-105"
            style={{ color: '#8f5cae' }}
          >
            Let&apos;s Connect
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-900 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.name === 'Graphic Design Portfolio' ? '_blank' : '_blank'}
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 ${link.color} transition-all duration-300 hover:scale-110 hover:bg-white/20`}
              >
                <link.icon 
                  size={32} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
                <span className="text-sm font-medium text-gray-900 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8"></div>
          
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-900">
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>by Ipsita Mondal</span>
            </div>
            
            <div className="text-sm">
              © {currentYear} Ipsita Mondal. All rights reserved.
            </div>
            
            <div className="text-sm">
              Second Year B.Tech CSE Student
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating animation elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-500/30 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-500/30 rounded-full animate-bounce delay-500"></div>
    </footer>
  );
};

export default Footer;