"use client";

import { motion } from "framer-motion";
import DisplayCards from "@/components/ui/display-cards";
import { User, Briefcase, FolderOpen } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const portfolioCards = [
  {
    icon: <FolderOpen className="size-4 text-blue-300" />,
    title: "Projects",
    description: "Things I've built",
    date: "Click to explore",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Briefcase className="size-4 text-blue-300" />,
    title: "Experience",
    description: "Where I've worked",
    date: "Click to view",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-6 sm:translate-x-12 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <User className="size-4 text-blue-300" />,
    title: "Chris Alpuerto",
    description: "Full-Stack Software Engineer with an emphasis on backend",
    date: "Click to learn more about me",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 sm:translate-x-24 translate-y-12 sm:translate-y-20 hover:translate-y-10",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-x-hidden bg-zinc-50 dark:bg-black">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="w-full max-w-3xl px-8"
      >
        <DisplayCards cards={portfolioCards} />
      </motion.div>
    </div>
  );
}
