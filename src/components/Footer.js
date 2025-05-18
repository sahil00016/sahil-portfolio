import React from 'react';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/sahil00016' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com' },
    { icon: <SiLeetcode />, href: 'https://leetcode.com/sahilsonker5111/' },
    { icon: <FiInstagram />, href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-primary py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightText hover:text-secondary transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-lightestText text-sm">
            Designed & Built by{' '}
            <span className="text-secondary">Sahil</span>
          </p>
          <p className="text-lightestText text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
