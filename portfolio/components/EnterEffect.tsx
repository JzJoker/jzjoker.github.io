'use client'; 

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string; 
  rotate?: number;
}

const EnterEffect = ({ children, x = 150, y = -20, delay = 0, className, rotate = 0 }: Props) => {
  return (
    <motion.div
      className={ className }
      initial={{
        opacity: 0,
        scale: 1,
        rotate: rotate,
        skewX: "0deg",
        skewY: "0deg",
        x: x,
        y: y,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 8,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default EnterEffect;
