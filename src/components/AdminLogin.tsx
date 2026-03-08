import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { motion, AnimatePresence } from "motion/react";
import { X, Lock } from "lucide-react";

export default function AdminLogin() {
  const { isAdmin, setIsAdmin } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let spaceCount = 0;
    let lastPressTime = 0;
    const RESET_TIME = 1000; // Reset count if more than 1 second passes between presses

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Ctrl and Shift are held down
      if (e.ctrlKey && e.shiftKey && e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling

        const currentTime = Date.now();
        
        // Reset if too much time has passed
        if (currentTime - lastPressTime > RESET_TIME) {
          spaceCount = 0;
        }

        spaceCount++;
        lastPressTime = currentTime;

        if (spaceCount === 5) {
          setIsOpen(true);
          spaceCount = 0; // Reset after successful trigger
        }
      } else {
        // Reset if any other key is pressed or modifiers are released (though keydown only fires on press)
        // We rely on the time reset mostly, but strict reset on other keys is good too
        if (!e.ctrlKey || !e.shiftKey) {
             spaceCount = 0;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '@Amen1234!') {
      setIsAdmin(true);
      setIsOpen(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && !isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-dark-card border border-gold-primary/20 rounded-2xl p-8 relative"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-4 text-gold-primary">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Admin Access</h2>
              <p className="text-white/40 mt-2">Enter your secure password to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/50 transition-colors"
                  autoFocus
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">Incorrect password. Please try again.</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-primary text-black font-bold hover:bg-gold-light transition-colors"
              >
                Unlock Backend
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
