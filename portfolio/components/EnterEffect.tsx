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
      className={className}
      initial={{
        opacity: 0,
        rotate,
        x,
        y,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 8,
        delay,
      }}
      whileHover={{
        y: -10,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay:0,
        },
        cursor: 'pointer',
      }}
      whileTap={{
        y: 15,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: .5,
        }
      }}
    >
      {children}
    </motion.div>


  );
};

export default EnterEffect;
