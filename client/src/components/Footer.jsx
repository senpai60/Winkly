import React from 'react';
import { FaTwitter, FaDiscord, FaGithub, FaTelegram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">WINKLY</h2>
            <p className="text-sm text-zinc-400 mb-4">
              The future of dating meets blockchain. Connect, experience, and earn rewards.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaDiscord size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <FaTelegram size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">NFT Marketplace</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Tokenomics</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © 2025 Winkly. All rights reserved.
          </p>
          <p className="text-sm text-zinc-400">
            Made with ❤️ for the Web3 community
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;