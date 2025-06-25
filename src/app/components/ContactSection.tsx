'use client';

import React, { useState, ChangeEvent } from 'react';
import { Github, Linkedin, Send, ExternalLink, LucideIcon } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
  color: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isFocused, setIsFocused] = useState<string | null>(null);

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Ipsita-Mondal-30',
      color: 'hover:text-[#00CED1]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/ipsita-mondal-865912313',
      color: 'hover:text-[#00CED1]'
    },
    {
      name: 'Portfolio',
      icon: ExternalLink,
      url: 'https://yayy.io/yayyWebsite/',
      color: 'hover:text-[#00CED1]'
    }
  ];

  const handleInputFocus = (field: string) => setIsFocused(field);
  const handleInputBlur = () => setIsFocused(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-20" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#00ced1] to-[#00ced1] bg-clip-text text-transparent">
          Let's Connect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleInputFocus('name')}
                onBlur={handleInputBlur}
                className="w-full bg-[#00ced1]/20 border border-[#00ced1]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ced1] transition-all duration-300"
                placeholder="Your Name"
              />
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00ced1] to-[#00ced1] transition-all duration-300 ${isFocused === 'name' ? 'w-full' : 'w-0'}`}
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleInputFocus('email')}
                onBlur={handleInputBlur}
                className="w-full bg-[#00ced1]/20 border border-[#00ced1]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ced1] transition-all duration-300"
                placeholder="Your Email"
              />
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00ced1] to-[#00ced1] transition-all duration-300 ${isFocused === 'email' ? 'w-full' : 'w-0'}`}
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleInputFocus('message')}
                onBlur={handleInputBlur}
                rows={5}
                className="w-full bg-[#00ced1]/20 border border-[#00ced1]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ced1] transition-all duration-300"
                placeholder="Your Message"
              />
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00ced1] to-[#00ced1] transition-all duration-300 ${isFocused === 'message' ? 'w-full' : 'w-0'}`}
              />
            </div>

            <button
              className="w-full px-6 py-3 bg-[#00ced1] rounded-lg hover:bg-[#00b6b8] transition-all duration-300 flex items-center justify-center gap-2 group"
              type="button"
            >
              <span>Send Message</span>
              <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Social Links & Info */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-[#00ced1]/20 border border-[#00ced1]/30">
              <h3 className="text-xl font-semibold mb-4 text-[#00ced1]">Connect With Me</h3>
              <div className="flex flex-col space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-gray-300 ${link.color} transition-colors duration-300`}
                  >
                    <link.icon size={24} />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#00ced1]/20 border border-[#00ced1]/30">
              <h3 className="text-xl font-semibold mb-4 text-[#00ced1]">Quick Info</h3>
              <div className="space-y-3 text-gray-300">
                <p>Second Year B.Tech CSE Student</p>
                <p>Available for Freelance Projects</p>
                <p>Open to Collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
