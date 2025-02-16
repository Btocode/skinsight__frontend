"use client";
import { motion } from "motion/react";

const SectionTransform = ({
  children,
  type = "down",
}: {
  children: React.ReactNode;
  type: "up" | "down" | "left" | "right";
}) => {
  function getTransform(type: "up" | "down" | "left" | "right") {
    switch (type) {
      case "up":
        return {
          initial: { y: 100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
      case "left":
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      default:
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
        };
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={getTransform(type)}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransform;
