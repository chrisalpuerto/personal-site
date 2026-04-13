"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

import AnoAI from "@/components/ui/animated-shader-background";
import { SpecialText } from "@/components/ui/fx/special-text";

interface SignInPageProps {
  className?: string;
}

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-gray-300';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-sm';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-5 h-5 flex items-center justify-center">
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
    <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
 </div>
  );

  const navLinksData = [
    { label: 'About', href: '#1' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#4' },
  ];

const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
       <div className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-gray-100
                     opacity-40 filter blur-lg pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
       <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto">
         Contact
       </button>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${headerShapeClass}
                       border border-[#333] bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-0 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
           {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {signupButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors w-full text-center">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {signupButtonElement}
        </div>
      </div>
    </header>
  );
}

export const SignInPage = ({ className }: SignInPageProps) => {
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input when code screen appears
  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 500);
    }
  }, [step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus next input if value is entered
      if (value && index < 5) {
        codeInputRefs.current[index + 1]?.focus();
      }

      // Check if code is complete
      if (index === 5 && value) {
        const isComplete = newCode.every(digit => digit.length === 1);
        if (isComplete) {
          // Transition to success screen after animation
          setTimeout(() => {
            setStep("success");
          }, 2000);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackClick = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
  };

  return (
    <div className={cn("flex flex-col bg-black w-full", className)}>
      {/* Navbar lives here so its z-20 is in the root stacking context, above everything */}
      <MiniNavbar />

      {/* Fixed shader background — behind all sections */}
      <motion.div
        className="fixed inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <AnoAI />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </motion.div>

      {/* ── Hero section ── */}
      <div className="relative h-screen flex flex-col">
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full">

          {/* Hero copy — fills remaining height, centers content below the fixed nav */}
          <div className="flex-1 flex flex-col items-center justify-center pt-20">
            <div className="w-full max-w-3xl px-8">
                <AnimatePresence mode="wait">
                  {step === "email" ? (
                    <motion.div
                      key="email-step"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-center space-y-6"
                    >
                      <h1 className="text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white">
                        <SpecialText
                          className="!h-auto !leading-[1.05] !font-sans !font-bold text-white"
                          speed={15}
                          delay={0.4}
                        >
                          Chris Alpuerto
                        </SpecialText>
                      </h1>
                      <p className="text-[2.25rem] text-white/60 font-light leading-snug">
                        Backend / DevOps / Cloud Engineer
                      </p>

                      {/* Learn more */}
                      <motion.button
                        onClick={() =>
                          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
                        }
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                        className="flex flex-col items-center gap-1.5 text-white/35 hover:text-white/60 transition-colors duration-300 mx-auto pt-4"
                      >
                        <span className="text-sm font-light tracking-widest uppercase">
                          learn more about me
                        </span>
                        <motion.span
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </motion.span>
                      </motion.button>
                    </motion.div>
                ) : step === "code" ? (
                  <motion.div
                    key="code-step"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">We sent you a code</h1>
                      <p className="text-[1.25rem] text-white/50 font-light">Please enter it</p>
                    </div>

                    <div className="w-full">
                      <div className="relative rounded-full py-4 px-5 border border-white/10 bg-transparent">
                        <div className="flex items-center justify-center">
                          {code.map((digit, i) => (
                            <div key={i} className="flex items-center">
                              <div className="relative">
                                <input
                                  ref={(el) => {
                                    codeInputRefs.current[i] = el;
                                  }}
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={1}
                                  value={digit}
                                  onChange={e => handleCodeChange(i, e.target.value)}
                                  onKeyDown={e => handleKeyDown(i, e)}
                                  className="w-8 text-center text-xl bg-transparent text-white border-none focus:outline-none focus:ring-0 appearance-none"
                                  style={{ caretColor: 'transparent' }}
                                />
                                {!digit && (
                                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                    <span className="text-xl text-white">0</span>
                                  </div>
                                )}
                              </div>
                              {i < 5 && <span className="text-white/20 text-xl">|</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <motion.p
                        className="text-white/50 hover:text-white/70 transition-colors cursor-pointer text-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        Resend code
                      </motion.p>
                    </div>

                    <div className="flex w-full gap-3">
                      <motion.button
                        onClick={handleBackClick}
                        className="rounded-full bg-white text-black font-medium px-8 py-3 hover:bg-white/90 transition-colors w-[30%]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        className={`flex-1 rounded-full font-medium py-3 border transition-all duration-300 ${
                          code.every(d => d !== "")
                          ? "bg-white text-black border-transparent hover:bg-white/90 cursor-pointer"
                          : "bg-[#111] text-white/50 border-white/10 cursor-not-allowed"
                        }`}
                        disabled={!code.every(d => d !== "")}
                      >
                        Continue
                      </motion.button>
                    </div>

                    <div className="pt-16">
                      <p className="text-xs text-white/40">
                        By signing up, you agree to the <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">MSA</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Product Terms</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Policies</Link>, <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Privacy Notice</Link>, and <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Cookie Notice</Link>.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-step"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">You're in!</h1>
                      <p className="text-[1.25rem] text-white/50 font-light">Welcome</p>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="py-10"
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/70 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="w-full rounded-full bg-white text-black font-medium py-3 hover:bg-white/90 transition-colors"
                    >
                      Continue to Dashboard
                    </motion.button>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      {/* ── About section ── */}
      <section id="about" className="relative z-10 min-h-screen flex items-center border-t border-white/5">
        <div className="w-full max-w-4xl mx-auto px-8 py-24 flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: header */}
          <div className="lg:w-2/5">
            <h2 className="text-[4.5rem] font-bold leading-[1.05] tracking-tight text-white">
              About me
            </h2>
          </div>
          {/* Right: description */}
          <div className="lg:w-3/5 flex flex-col justify-center">
            <p className="text-sm text-white/60 font-light leading-relaxed space-y-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, shaping systems that are as resilient as they are elegant.{" "}
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, bringing distributed infrastructure to life at scale.{" "}
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, architecting pipelines that developers actually enjoy working with.{" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, with a bias toward automation and zero-downtime deployments.{" "}
              Curabitur pretium tincidunt lacus, nec facilisis lorem ornare vel — always chasing the intersection of performance, reliability, and developer experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── Experience section ── */}
      <section id="experience" className="relative z-10 border-t border-white/5">
        <div className="w-full max-w-4xl mx-auto px-8 py-24">

          <h2 className="text-[4.5rem] font-bold leading-[1.05] tracking-tight text-white mb-20">
            Experience
          </h2>

          {/* Work Experience */}
          <div className="mb-20">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-10">
              Work Experience
            </p>

            {/* Single vertical line spans all work entries; dots sit on top */}
            <div className="relative">
              <div className="absolute hidden lg:block top-[2.875rem] bottom-0 w-px bg-white/15" style={{ left: 'calc((100% - 48px) * 0.4 + 24px)' }} />

              {/* Paramount — first entry: horizontal divider above */}
              <div className="border-t border-white/10 py-10 flex flex-col lg:grid lg:grid-cols-[2fr_48px_3fr]">
                <div className="pr-8 mb-6 lg:mb-0">
                  <p className="text-white font-medium text-lg">Paramount</p>
                  <p className="text-white/50 text-sm mt-1">Los Angeles, CA</p>
                  <p className="text-white/40 text-sm mt-1">June 2026 — August 2026</p>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/50 relative z-10 mt-0.5 flex-shrink-0" />
                </div>
                <div className="lg:pl-4">
                  <p className="text-white font-medium mb-4">Incoming DevOps Intern</p>
                  <ul className="space-y-2">
                    <li className="text-white/50 text-sm font-light leading-relaxed">Placeholder description for role responsibilities and achievements.</li>
                    <li className="text-white/50 text-sm font-light leading-relaxed">Placeholder for another key responsibility or skill demonstrated.</li>
                    <li className="text-white/50 text-sm font-light leading-relaxed">Placeholder for a third achievement or technical contribution.</li>
                  </ul>
                </div>
              </div>

              {/* Company Name — no additional border */}
              <div className="py-10 flex flex-col lg:grid lg:grid-cols-[2fr_48px_3fr]">
                <div className="pr-8 mb-6 lg:mb-0">
                  <p className="text-white font-medium text-lg">Teamlead</p>
                  <p className="text-white/50 text-sm mt-1">Los Angeles, CA</p>
                  <p className="text-white/40 text-sm mt-1">July 2025 — Present</p>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/50 relative z-10 mt-0.5 flex-shrink-0" />
                </div>
                <div className="lg:pl-4">
                  <p className="text-white font-medium mb-4">Software Engineer</p>
                  <ul className="space-y-2">
                    <li className="text-white/50 text-sm font-light leading-relaxed">Placeholder description for role responsibilities and achievements.</li>
                    <li className="text-white/50 text-sm font-light leading-relaxed">Placeholder for another key responsibility or skill demonstrated.</li>
                    <li className="text-white/50 text-sm font-light leading-relaxed">Placeholder for a third achievement or technical contribution.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-10">
              Education
            </p>

            {/* Single vertical line spans all education entries; dots sit on top */}
            <div className="relative">
              <div className="absolute hidden lg:block top-[2.875rem] bottom-0 w-px bg-white/15" style={{ left: 'calc((100% - 48px) * 0.4 + 24px)' }} />

              {/* Cal State Fullerton — first entry: horizontal divider above */}
              <div className="border-t border-white/10 py-10 flex flex-col lg:grid lg:grid-cols-[2fr_48px_3fr]">
                <div className="pr-8 mb-6 lg:mb-0">
                  <p className="text-white font-medium text-lg">California State University, Fullerton</p>
                  <p className="text-white/50 text-sm mt-1">Fullerton, CA</p>
                  <p className="text-white/40 text-sm mt-1">Expected May 2027</p>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/50 relative z-10 mt-0.5 flex-shrink-0" />
                </div>
                <div className="lg:pl-4">
                  <p className="text-white font-medium mb-4">Bachelor of Science in Computer Science</p>
                  <ul className="space-y-2">
                    <li className="text-white/50 text-sm font-light leading-relaxed">Specialized in [area of study] and [related discipline].</li>
                    <li className="text-white/50 text-sm font-light leading-relaxed">Completed a capstone project on [project topic or theme].</li>
                  </ul>
                </div>
              </div>

              {/* Pasadena City College — no additional border */}
              <div className="py-10 flex flex-col lg:grid lg:grid-cols-[2fr_48px_3fr]">
                <div className="pr-8 mb-6 lg:mb-0">
                  <p className="text-white font-medium text-lg">Pasadena City College</p>
                  <p className="text-white/50 text-sm mt-1">Pasadena, CA</p>
                  <p className="text-white/40 text-sm mt-1">Aug 20XX — May 20XX</p>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/50 relative z-10 mt-0.5 flex-shrink-0" />
                </div>
                <div className="lg:pl-4">
                  <p className="text-white font-medium mb-4">Associate Degree in [Field]</p>
                  <ul className="space-y-2">
                    <li className="text-white/50 text-sm font-light leading-relaxed">Focused on [subject area] and [related coursework].</li>
                    <li className="text-white/50 text-sm font-light leading-relaxed">Participated in a collaborative project to [brief description].</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Projects section ── */}
      <section id="projects" className="relative z-10 border-t border-white/5">
        <div className="w-full max-w-4xl mx-auto px-8 py-24">

          <h2 className="text-[4.5rem] font-bold leading-[1.05] tracking-tight text-white mb-20">
            Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Project One", stack: "Next.js · TypeScript · Tailwind", description: "Placeholder description for what this project does and the problem it solves.", link: "#", pinned: true },
              { name: "Project Two", stack: "Python · FastAPI · PostgreSQL", description: "Placeholder description for what this project does and the problem it solves.", link: "#" },
              { name: "Project Three", stack: "Go · Docker · Kubernetes", description: "Placeholder description for what this project does and the problem it solves.", link: "#" },
              { name: "Project Four", stack: "React · Node.js · MongoDB", description: "Placeholder description for what this project does and the problem it solves.", link: "#" },
              { name: "Project Five", stack: "Rust · WebAssembly", description: "Placeholder description for what this project does and the problem it solves.", link: "#" },
              { name: "Project Six", stack: "Terraform · AWS · GitHub Actions", description: "Placeholder description for what this project does and the problem it solves.", link: "#" },
            ].map((project) => (
              <div
                key={project.name}
                className={`relative flex flex-col gap-3 p-6 rounded-xl transition-colors duration-200 ${
                  project.pinned
                    ? "border border-white/25 hover:border-white/35 shadow-[0_0_28px_4px_rgba(255,255,255,0.07)]"
                    : "border border-white/10 hover:border-white/20"
                }`}
              >
                {project.pinned && (
                  <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/35">
                    Pinned Project
                  </p>
                )}
                <div className="flex items-start justify-between gap-4">
                  <p className="text-white font-medium">{project.name}</p>
                  <a
                    href={project.link}
                    className="text-white/30 hover:text-white/60 transition-colors duration-200 flex-shrink-0 mt-0.5"
                    aria-label={`Link to ${project.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
                <p className="text-white/40 text-xs font-light tracking-wide">{project.stack}</p>
                <p className="text-white/50 text-sm font-light leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
