'use client'; 

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

const FadeInOnScroll = ({ children, delay = 0, className="shadow-md border-1 border-gray w-full h-full", direction = 'bottom'}: Props) => {
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'left':
      initialX = -50;
      break;
    case 'right':
      initialX = 50;
      break;
    case 'top':
      initialY = -50;
      break;
    case 'bottom':
      initialY = 50;
      break;
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }} 
      className={ className }
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
