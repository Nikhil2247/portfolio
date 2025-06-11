"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Database,
  Wrench,
  CheckCircle,
  AlertCircle,
  Loader2,
  Terminal,
  Play,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Quote,
  Star,
  Building,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionState {
  loading: boolean;
  showJson: boolean;
  showContent: boolean;
  hasLoaded: boolean;
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Section loading states
  const [heroState, setHeroState] = useState<SectionState>({
    loading: false,
    showJson: false,
    showContent: false,
    hasLoaded: false,
  });
  const [aboutState, setAboutState] = useState<SectionState>({
    loading: false,
    showJson: false,
    showContent: false,
    hasLoaded: false,
  });
  const [skillsState, setSkillsState] = useState<SectionState>({
    loading: false,
    showJson: false,
    showContent: false,
    hasLoaded: false,
  });
  // const [experienceState, setExperienceState] = useState<SectionState>({
  //   loading: false,
  //   showJson: false,
  //   showContent: false,
  //   hasLoaded: false,
  // })
  const [educationState, setEducationState] = useState<SectionState>({
    loading: false,
    showJson: false,
    showContent: false,
    hasLoaded: false,
  });
  const [projectsState, setProjectsState] = useState<SectionState>({
    loading: false,
    showJson: false,
    showContent: false,
    hasLoaded: false,
  });
  // const [testimonialsState, setTestimonialsState] = useState<SectionState>({
  //   loading: false,
  //   showJson: false,
  //   showContent: false,
  //   hasLoaded: false,
  // })
  // const [achievementsState, setAchievementsState] = useState<SectionState>({
  //   loading: false,
  //   showJson: false,
  //   showContent: false,
  //   hasLoaded: false,
  // })
  const [contactState, setContactState] = useState<SectionState>({
    loading: true,
    showJson: false,
    showContent: true,
    hasLoaded: true,
  });

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        // "experience",
        "education",
        "projects",
        // "testimonials",
        // "achievements",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeSection !== section) {
              setActiveSection(section);
              triggerSectionLoad(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger hero section on load
    setTimeout(() => triggerSectionLoad("hero"), 500);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const triggerSectionLoad = (section: string) => {
    const stateMap = {
      hero: { state: heroState, setState: setHeroState },
      about: { state: aboutState, setState: setAboutState },
      skills: { state: skillsState, setState: setSkillsState },
      //  experience: { state: experienceState, setState: setExperienceState },
      education: { state: educationState, setState: setEducationState },
      projects: { state: projectsState, setState: setProjectsState },
      // testimonials: { state: testimonialsState, setState: setTestimonialsState },
      // achievements: { state: achievementsState, setState: setAchievementsState },
      contact: { state: contactState, setState: setContactState },
    };

    const sectionData = stateMap[section as keyof typeof stateMap];
    if (!sectionData) return;

    const { state, setState } = sectionData;

    // If section has already loaded, show content directly
    if (state.hasLoaded) {
      setState({
        loading: false,
        showJson: false,
        showContent: true,
        hasLoaded: true,
      });
      return;
    }

    setState({
      loading: true,
      showJson: false,
      showContent: false,
      hasLoaded: false,
    });

    // Simulate API call
    setTimeout(() => {
      setState({
        loading: false,
        showJson: true,
        showContent: false,
        hasLoaded: false,
      });
    }, 1500);

    // Show content after JSON
    setTimeout(() => {
      setState({
        loading: false,
        showJson: false,
        showContent: true,
        hasLoaded: true,
      });
    }, 3500);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setFormStatus("loading");

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("success");
        formRef.current.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const TerminalLoader = ({
    endpoint,
    method = "GET",
  }: {
    endpoint: string;
    method?: string;
  }) => (
    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-700">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-slate-400">Terminal</span>
      </div>
      <div className="text-green-400">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="overflow-hidden whitespace-nowrap"
        >
          $ curl -X {method} https://api.nikhilkumar.dev{endpoint}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center gap-2 mt-2"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-slate-300">Fetching data...</span>
        </motion.div>
      </div>
    </div>
  );

  const JsonDisplay = ({ data, endpoint }: { data: any; endpoint: string }) => (
    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-700 max-h-96 overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-slate-400">API Response - {endpoint}</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-green-400"
      >
        <div className="text-slate-300 mb-2">HTTP/1.1 200 OK</div>
        <div className="text-slate-300 mb-2">
          Content-Type: application/json
        </div>
        <div className="text-slate-300 mb-4">{"{"}</div>
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-slate-200 pl-4"
        >
          {JSON.stringify(data, null, 2)
            .split("\n")
            .map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                className={cn(
                  line.includes('"') && line.includes(":") && "text-blue-400",
                  line.includes('"') && !line.includes(":") && "text-green-400",
                  line.includes("true") || line.includes("false")
                    ? "text-purple-400"
                    : "",
                  line.match(/\d+/) && "text-orange-400"
                )}
              >
                {line}
              </motion.div>
            ))}
        </motion.pre>
        <div className="text-slate-300 mt-2">{"}"}</div>
      </motion.div>
    </div>
  );

  // Data objects for each section
  const heroData = {
    name: "Nikhil Kumar",
    title: "Full Stack Web Developer",
    tagline:
      "Crafting digital experiences with clean code and modern technologies",
    description:
      "Passionate about building scalable applications that make a difference. Specialized in React, Node.js, and cloud technologies.",
    status: "available",
    location: "Talwara, Punjab, India",
    // experience_years: 5,
  };

  const aboutData = {
    bio: "I'm a passionate full-stack developer with experience of building web applications. I love turning complex problems into simple, beautiful solutions. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.",
    image_url: "/1749618817668.jpg",
    tech_stack: {
      frontend: [
        "React",
        "Next.js",
        "Ant Designs",
        "Tailwind CSS",
        "Bootstrap",
      ],
      backend: ["Node.js", "Express", "RestAPI", "NestJs", "MongoDB"],
      tools: ["Git", "Docker", "AWS", "Vercel", "Hostinger", "GitHub"],
    },
    current_focus:
      "Building scalable microservices and modern web applications",
    interests: [
      "Open Source",
      "Cloud Architecture",
      "Developer Tools",
      "Ai Tools",
    ],
  };

  const skillsData = {
    categories: [
      {
        name: "Frontend",
        icon: "code",
        color: "indigo",
        technologies: [
          "React",
          "Next.js",
          "Tailwind CSS",
          "Bootstrap",
          "Ant Design",
        ],
        proficiency: 95,
      },
      {
        name: "Backend",
        icon: "database",
        color: "emerald",
        technologies: ["Node.js", "Express", "NestJs", "MongoDB"],
        proficiency: 90,
      },
      {
        name: "Tools",
        icon: "wrench",
        color: "purple",
        technologies: ["Git", "Docker", "AWS", "Vercel", "Hostinger", "GitHub"],
        proficiency: 85,
      },
    ],
    total_technologies: 16,
    //  years_experience: 5,
  };

  // const experienceData = {
  //   positions: [
  //     {
  //       id: 1,
  //       title: "Senior Full Stack Developer",
  //       company: "TechCorp Solutions",
  //       location: "San Francisco, CA",
  //       period: "2022 - Present",
  //       type: "full_time",
  //       description:
  //         "Led development of microservices architecture, mentored junior developers, and improved application performance by 40%. Built scalable APIs serving 1M+ requests daily.",
  //       technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
  //       achievements: [
  //         "Reduced API response time by 60%",
  //         "Mentored 5 junior developers",
  //         "Led migration to microservices",
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: "Full Stack Developer",
  //       company: "StartupXYZ",
  //       location: "Remote",
  //       period: "2020 - 2022",
  //       type: "full_time",
  //       description:
  //         "Built scalable web applications using React and Node.js, implemented CI/CD pipelines, and collaborated with design team to deliver pixel-perfect interfaces.",
  //       technologies: ["React", "Express", "MongoDB", "Redis", "Jest"],
  //       achievements: [
  //         "Delivered 15+ production features",
  //         "Implemented automated testing",
  //         "Improved code coverage to 90%",
  //       ],
  //     },
  //     {
  //       id: 3,
  //       title: "Frontend Developer",
  //       company: "Digital Agency",
  //       location: "New York, NY",
  //       period: "2019 - 2020",
  //       type: "full_time",
  //       description:
  //         "Developed responsive websites for clients, optimized for performance, and gained experience in modern frontend frameworks and design systems.",
  //       technologies: ["Vue.js", "SCSS", "Webpack", "Figma"],
  //       achievements: [
  //         "Built 20+ client websites",
  //         "Achieved 95+ Lighthouse scores",
  //         "Created reusable component library",
  //       ],
  //     },
  //   ],
  //   total_experience: "5+ years",
  //   companies_worked: 3,
  // }

  const educationData = {
    degrees: [
      {
        id: 1,
        degree: "Diploma in Computer Science and Engineering",
        institution: "S. Amarjit Singh Sahi Polytechnic College",
        location: "Talwara",
        period: "2023- 2025",
        //      gpa: "3.8/4.0",
        relevant_courses: [
          "Data Structures & Algorithms",
          "Database Systems",
          "Software Engineering",
          "Web Development",
          "Computer Networks",
        ],
        projects: [
          "Developed an e-commerce platform",
          "Created a college management system",
        ],
      },
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Skill Center: Become a cloud practitioner",
        issuer: "Amazon Web Services",
        date: "2024",
        // credential_id: "AWS-SAA-123456",
      },
      {
        id: 2,
        name: "React Js",
        issuer: "Excellence Technology",
        date: "2024",
        //  credential_id: "GCP-PD-789012",
      },
      // {
      //   id: 3,
      //   name: "MongoDB Certified Developer",
      //   issuer: "MongoDB University",
      //   date: "2021",
      //   credential_id: "MDB-DEV-345678",
      // },
    ],
  };

  const projectsData = {
    featured_projects: [
      {
        id: 1,
        name: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with admin dashboard, Point on sale system, and real-time inventory management.",
        technologies: ["Reactjs", "Expressjs", "MongoDB", "AntDesign"],
        //  github_url: "https://github.com/Nikhil2247/ecom-app",
        demo_url: "https://ecom-app-mtio.onrender.com/",
        status: "completed",
        category: "web_app",
        color_scheme: "rose-orange",
        icon: "🛒",
      },
      {
        id: 2,
        name: "Omnicassion ( Startup )",
        description:
          "Event Management platform with various vendors, ai planner, and booking system.",
        technologies: [
          "ReactJs",
          "NestJs",
          "MongoDB",
          "AWS S3",
          "Razorpay",
          "Hostinger",
          "AntDesign",
        ],
        // github_url: "https://github.com",
        demo_url: "https://www.omnicassion.com/",
        status: "completed",
        category: "productivity",
        color_scheme: "cyan-blue",
        icon: "✓",
      },
      {
        id: 3,
        name: "College Management System",
        description:
          "College management system with student portal, admin dashboard, and course management. Primarly Based upon the PSBTE Colleges",
        technologies: [
          "Reactjs",
          "Nestjs",
          "Cloudinary",
          "MongoDB",
          "AntDesign",
        ],
        // github_url: "https://github.com",
        demo_url: "https://cms-polytechnic.vercel.app/",
        status: "completed",
        category: "ai_tool",
        color_scheme: "violet-purple",
        icon: "🤖",
      },
    ],
    total_projects: 12,
    public_repos: 8,
  };

  // const testimonialsData = {
  //   testimonials: [
  //     {
  //       id: 1,
  //       name: "Sarah Johnson",
  //       position: "Product Manager",
  //       company: "TechCorp Solutions",
  //       avatar: "/placeholder.svg?height=60&width=60",
  //       content:
  //         "Nikhil is an exceptional developer who consistently delivers high-quality code. His ability to understand complex requirements and translate them into elegant solutions is remarkable.",
  //       rating: 5,
  //       project: "E-Commerce Platform",
  //     },
  //     {
  //       id: 2,
  //       name: "Michael Chen",
  //       position: "CTO",
  //       company: "StartupXYZ",
  //       avatar: "/placeholder.svg?height=60&width=60",
  //       content:
  //         "Working with Nikhil was a game-changer for our startup. He not only delivered excellent code but also provided valuable insights that improved our overall architecture.",
  //       rating: 5,
  //       project: "Task Management System",
  //     },
  //     {
  //       id: 3,
  //       name: "Emily Rodriguez",
  //       position: "Design Lead",
  //       company: "Digital Agency",
  //       avatar: "/placeholder.svg?height=60&width=60",
  //       content:
  //         "Nikhil has an excellent eye for detail and always ensures that the final product matches the design perfectly. His collaboration skills are outstanding.",
  //       rating: 5,
  //       project: "Client Portfolio Website",
  //     },
  //   ],
  //   average_rating: 5.0,
  //   total_reviews: 15,
  // }

  // const achievementsData = {
  //   achievements: [
  //     {
  //       id: 1,
  //       title: "Open Source Contributor",
  //       description: "Contributed to 20+ open source projects with 500+ GitHub stars",
  //       icon: "🌟",
  //       date: "2023",
  //       category: "open_source",
  //     },
  //     {
  //       id: 2,
  //       title: "Tech Conference Speaker",
  //       description: "Spoke at 5 major tech conferences about modern web development",
  //       icon: "🎤",
  //       date: "2023",
  //       category: "speaking",
  //     },
  //     {
  //       id: 3,
  //       title: "Hackathon Winner",
  //       description: "Won 1st place at TechCrunch Disrupt Hackathon 2022",
  //       icon: "🏆",
  //       date: "2022",
  //       category: "competition",
  //     },
  //     {
  //       id: 4,
  //       title: "Team Leadership",
  //       description: "Successfully led a team of 8 developers on a major project",
  //       icon: "👥",
  //       date: "2022",
  //       category: "leadership",
  //     },
  //     {
  //       id: 5,
  //       title: "Performance Optimization",
  //       description: "Improved application performance by 75% through code optimization",
  //       icon: "⚡",
  //       date: "2021",
  //       category: "technical",
  //     },
  //     {
  //       id: 6,
  //       title: "Mentorship Program",
  //       description: "Mentored 10+ junior developers through coding bootcamp",
  //       icon: "🎓",
  //       date: "2021",
  //       category: "mentorship",
  //     },
  //   ],
  //   total_achievements: 6,
  //   categories: ["open_source", "speaking", "competition", "leadership", "technical", "mentorship"],
  // }

  const contactData = {
    availability: "open_to_opportunities",
    preferred_contact: "email",
    response_time: "24_hours",
    contact_methods: [
      {
        type: "email",
        value: "nikhil97798@gmail.com",
        primary: true,
        icon: "mail",
        color: "blue",
      },
      {
        type: "github",
        value: "github.com/nikhil2247",
        primary: false,
        icon: "github",
        color: "purple",
      },
      {
        type: "linkedin",
        value: "www.linkedin.com/in/nikhil-kumar-6b2713297",
        primary: false,
        icon: "linkedin",
        color: "cyan",
      },
    ],
    timezone: "PST",
    languages: ["English", "Hindi"],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-mono text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              {"<NK />"}
            </motion.div>

            <div className="hidden lg:flex items-center space-x-6">
              {[
                { id: "hero", endpoint: "/intro" },
                { id: "about", endpoint: "/about" },
                { id: "skills", endpoint: "/skills" },
                // { id: "experience", endpoint: "/experience" },
                { id: "education", endpoint: "/education" },
                { id: "projects", endpoint: "/projects" },
                // { id: "testimonials", endpoint: "/testimonials" },
                // { id: "achievements", endpoint: "/achievements" },
                { id: "contact", endpoint: "/contact" },
              ].map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`font-mono text-xs transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                    activeSection === section.id
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {section.endpoint}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* GitHub Button */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <a
                  href="https://github.com/nikhil2247" // replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                  >
                    <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                  </Button>
                </a>
              </motion.div>
              {/* Dark Mode Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                >
                  <AnimatePresence mode="wait">
                    {darkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-5 w-5 text-amber-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-5 w-5 text-indigo-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section
        id="hero"
        className="h-svh flex items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatePresence mode="wait">
            {heroState.loading && (
              <motion.div
                key="hero-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <TerminalLoader endpoint="/intro" />
              </motion.div>
            )}

            {heroState.showJson && (
              <motion.div
                key="hero-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <JsonDisplay data={heroData} endpoint="GET /intro" />
              </motion.div>
            )}

            {heroState.showContent && (
              <motion.div
                key="hero-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent mb-4"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                >
                  {heroData.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-2 font-mono"
                >
                  {"> " + heroData.title}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  {heroData.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("projects")}
                      className="font-mono bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      GET /projects
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href="/Nikhil-Resume.pdf" download>
                      <Button
                        variant="outline"
                        size="lg"
                        className="font-mono border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-lg"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto lg:px-16 px-5">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /about"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {aboutState.loading && (
              <motion.div
                key="about-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/about" />
              </motion.div>
            )}

            {aboutState.showJson && (
              <motion.div
                key="about-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={aboutData} endpoint="GET /about" />
              </motion.div>
            )}

            {aboutState.showContent && (
              <motion.div
                key="about-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-800/50 dark:to-indigo-950/30 rounded-xl p-8 font-mono text-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl backdrop-blur-sm"
                  >
                    <div className="text-slate-500 dark:text-slate-400 mb-2">
                      {"// Developer Profile"}
                    </div>
                    <div className="text-slate-900 dark:text-white">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        const
                      </span>{" "}
                      <span className="text-purple-600 dark:text-purple-400">
                        developer
                      </span>{" "}
                      = {"{"}
                      <br />
                      <span className="ml-4">
                        name:{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                          'Nikhil Kumar'
                        </span>
                        ,
                      </span>
                      <br />
                      <span className="ml-4">
                        role:{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                          'Full Stack Developer'
                        </span>
                        ,
                      </span>
                      <br />
                      {/* <span className="ml-4">
                        experience:{" "}
                        <span className="text-amber-600 dark:text-amber-400">
                          5
                        </span>
                        ,
                      </span> */}
                      {/* <br /> */}
                      {/* <span className="ml-4">
                        location:{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                          'San Francisco, CA'
                        </span>
                        ,
                      </span>
                      <br /> */}
                      <span className="ml-4">
                        focus:{" "}
                        <span className="text-emerald-600 dark:text-emerald-400">
                          '{aboutData.current_focus}'
                        </span>
                      </span>
                      <br />
                      {"};"}
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-600 dark:text-slate-300 mt-6 leading-relaxed"
                  >
                    {aboutData.bio}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 mt-6"
                  >
                    {aboutData.tech_stack.frontend
                      .concat(aboutData.tech_stack.backend)
                      .slice(0, 6)
                      .map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className="font-mono bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/70 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className="w-80 h-80 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl"></div>
                    <Image
                      src={aboutData.image_url || "/placeholder.svg"}
                      alt="Nikhil Kumar"
                      width={320}
                      height={320}
                      className="absolute inset-0 rounded-2xl object-cover"
                    />
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl -z-10"></div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto lg:px-16 px-5">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /skills"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {skillsState.loading && (
              <motion.div
                key="skills-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/skills" />
              </motion.div>
            )}

            {skillsState.showJson && (
              <motion.div
                key="skills-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={skillsData} endpoint="GET /skills" />
              </motion.div>
            )}

            {skillsState.showContent && (
              <motion.div
                key="skills-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-3 gap-8"
              >
                {skillsData.categories.map((category, index) => {
                  const IconComponent =
                    category.icon === "code"
                      ? Code
                      : category.icon === "database"
                      ? Database
                      : Wrench;
                  const colorClasses = {
                    indigo: {
                      border:
                        "border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700",
                      bg: "bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800/50 dark:to-indigo-950/20",
                      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
                      iconColor: "text-indigo-600 dark:text-indigo-400",
                      titleColor: "text-indigo-700 dark:text-indigo-300",
                      badgeColor: "bg-indigo-600 hover:bg-indigo-700",
                    },
                    emerald: {
                      border:
                        "border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700",
                      bg: "bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800/50 dark:to-emerald-950/20",
                      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
                      iconColor: "text-emerald-600 dark:text-emerald-400",
                      titleColor: "text-emerald-700 dark:text-emerald-300",
                      badgeColor:
                        "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/70",
                    },
                    purple: {
                      border:
                        "border-purple-100 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-700",
                      bg: "bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800/50 dark:to-purple-950/20",
                      iconBg: "bg-purple-100 dark:bg-purple-900/50",
                      iconColor: "text-purple-600 dark:text-purple-400",
                      titleColor: "text-purple-700 dark:text-purple-300",
                      badgeColor:
                        "border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50",
                    },
                  }[category.color as keyof typeof colorClasses];

                  return (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <Card
                        className={cn(
                          "border-2 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm",
                          colorClasses.border,
                          colorClasses.bg
                        )}
                      >
                        <CardHeader>
                          <CardTitle
                            className={cn(
                              "flex items-center gap-2 font-mono",
                              colorClasses.titleColor
                            )}
                          >
                            <div
                              className={cn(
                                "p-2 rounded-lg",
                                colorClasses.iconBg
                              )}
                            >
                              <IconComponent
                                className={cn(
                                  "h-5 w-5",
                                  colorClasses.iconColor
                                )}
                              />
                            </div>
                            {category.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {category.technologies.map((tech, techIndex) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: 0.1 * techIndex,
                                  duration: 0.3,
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Badge
                                  variant={
                                    category.color === "indigo"
                                      ? "default"
                                      : category.color === "emerald"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className={cn(
                                    "font-mono transition-colors",
                                    colorClasses.badgeColor
                                  )}
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /experience"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {experienceState.loading && (
              <motion.div
                key="experience-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/experience" />
              </motion.div>
            )}

            {experienceState.showJson && (
              <motion.div
                key="experience-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={experienceData} endpoint="GET /experience" />
              </motion.div>
            )}

            {experienceState.showContent && (
              <motion.div
                key="experience-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-600"></div>

                  {experienceData.positions.map((position, index) => (
                    <motion.div
                      key={position.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative flex items-start mb-12"
                    >
                      <div className="absolute left-6 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900"></div>
                      <div className="ml-20">
                        <Card className="border-l-4 border-l-indigo-600 hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="font-mono text-lg flex items-center gap-2">
                              <Building className="h-5 w-5 text-indigo-600" />
                              {position.title}
                            </CardTitle>
                            <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="font-semibold">{position.company}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {position.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {position.period}
                              </span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">{position.description}</p>

                            <div className="mb-4">
                              <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                              <div className="flex flex-wrap gap-2">
                                {position.technologies.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="font-mono text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">Key Achievements:</h4>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                {position.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section> */}

      {/* Education Section */}
      <section id="education" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /education"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {educationState.loading && (
              <motion.div
                key="education-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/education" />
              </motion.div>
            )}

            {educationState.showJson && (
              <motion.div
                key="education-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={educationData} endpoint="GET /education" />
              </motion.div>
            )}

            {educationState.showContent && (
              <motion.div
                key="education-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Degree */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                          <GraduationCap className="h-6 w-6" />
                          Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {educationData.degrees.map((degree) => (
                          <div key={degree.id} className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {degree.degree}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-300">
                                {degree.institution}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {degree.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {degree.period}
                                </span>
                                {/* <span>GPA: {degree.gpa}</span> */}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">
                                Relevant Courses:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {degree.relevant_courses.map((course) => (
                                  <Badge
                                    key={course}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">
                                Key Projects:
                              </h4>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                {degree.projects.map((project, i) => (
                                  <li key={i}>{project}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Certifications */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                          <Award className="h-6 w-6" />
                          Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {educationData.certifications.map((cert, index) => (
                            <motion.div
                              key={cert.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800"
                            >
                              <h3 className="font-semibold">{cert.name}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-300">
                                {cert.issuer}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  Issued: {cert.date}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {cert.credential_id}
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto lg:px-16 px-5">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /projects"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {projectsState.loading && (
              <motion.div
                key="projects-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/projects" />
              </motion.div>
            )}

            {projectsState.showJson && (
              <motion.div
                key="projects-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={projectsData} endpoint="GET /projects" />
              </motion.div>
            )}

            {projectsState.showContent && (
              <motion.div
                key="projects-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projectsData.featured_projects.map((project, index) => {
                  const colorSchemes = {
                    "rose-orange": {
                      gradient: "from-rose-500 to-orange-500",
                      bgLight: "from-rose-50 to-orange-50",
                      bgDark: "from-rose-900/20 to-orange-900/20",
                      border:
                        "border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600",
                    },
                    "cyan-blue": {
                      gradient: "from-cyan-500 to-blue-500",
                      bgLight: "from-cyan-50 to-blue-50",
                      bgDark: "from-cyan-900/20 to-blue-900/20",
                      border:
                        "border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600",
                    },
                    "violet-purple": {
                      gradient: "from-violet-500 to-purple-500",
                      bgLight: "from-violet-50 to-purple-50",
                      bgDark: "from-violet-900/20 to-purple-900/20",
                      border:
                        "border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600",
                    },
                  }[project.color_scheme as keyof typeof colorSchemes];

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <Card
                        className={cn(
                          "group h-full border-2 transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-sm overflow-hidden",
                          colorSchemes.border
                          // `bg-gradient-to-br ${colorSchemes.bgLight} dark:${colorSchemes.bgDark}`,
                        )}
                      >
                        {/* <div
                          className={cn(
                            "absolute top-0 right-0 w-16 h-16 flex items-center justify-center text-2xl rounded-bl-lg bg-gradient-to-br",
                            colorSchemes.gradient
                          )}
                        >
                          <span className="text-white">{project.icon}</span>
                        </div> */}
                        <CardHeader>
                          <CardTitle
                            className={cn(
                              "font-mono text-lg transition-colors text-slate-800 dark:text-slate-200",
                              `group-hover:bg-gradient-to-r ${colorSchemes.gradient} group-hover:bg-clip-text group-hover:text-transparent`
                            )}
                          >
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-0">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: 0.1 * techIndex,
                                  duration: 0.3,
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    "text-xs font-mono transition-colors bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
                                    `group-hover:bg-gradient-to-r ${colorSchemes.gradient} group-hover:text-white`
                                  )}
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-4">
                          <div className="flex gap-2">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="font-mono border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                              >
                                {/* <Link href={project.github_url} target="_blank">
                                  <Github className="mr-2 h-4 w-4" />
                                  Code
                                </Link> */}
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="sm"
                                asChild
                                className={cn(
                                  "font-mono text-white transition-all duration-300",
                                  `bg-gradient-to-r ${colorSchemes.gradient} hover:shadow-md`
                                )}
                              >
                                <Link href={project.demo_url} target="_blank">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Demo
                                </Link>
                              </Button>
                            </motion.div>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /testimonials"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {testimonialsState.loading && (
              <motion.div
                key="testimonials-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/testimonials" />
              </motion.div>
            )}

            {testimonialsState.showJson && (
              <motion.div
                key="testimonials-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={testimonialsData} endpoint="GET /testimonials" />
              </motion.div>
            )}

            {testimonialsState.showContent && (
              <motion.div
                key="testimonials-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {testimonialsData.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-800/50 dark:to-amber-950/20 shadow-lg hover:shadow-xl backdrop-blur-sm h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{testimonial.position}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-amber-400/20" />
                          <p className="text-slate-600 dark:text-slate-300 italic pl-6">{testimonial.content}</p>
                        </div>
                        <Badge variant="outline" className="mt-4 text-xs">
                          Project: {testimonial.project}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section> */}

      {/* Achievements Section */}
      {/* <section id="achievements" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /achievements"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {achievementsState.loading && (
              <motion.div
                key="achievements-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/achievements" />
              </motion.div>
            )}

            {achievementsState.showJson && (
              <motion.div
                key="achievements-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={achievementsData} endpoint="GET /achievements" />
              </motion.div>
            )}

            {achievementsState.showContent && (
              <motion.div
                key="achievements-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {achievementsData.achievements.map((achievement, index) => {
                  const categoryColors = {
                    open_source: "from-green-500 to-emerald-500",
                    speaking: "from-blue-500 to-cyan-500",
                    competition: "from-yellow-500 to-orange-500",
                    leadership: "from-purple-500 to-pink-500",
                    technical: "from-red-500 to-rose-500",
                    mentorship: "from-indigo-500 to-violet-500",
                  }[achievement.category as keyof typeof categoryColors]

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Card className="border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50 shadow-lg hover:shadow-xl backdrop-blur-sm h-full">
                        <CardHeader className="text-center">
                          <div
                            className={cn(
                              "w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl bg-gradient-to-br",
                              categoryColors,
                            )}
                          >
                            <span>{achievement.icon}</span>
                          </div>
                          <CardTitle className="font-mono text-lg">{achievement.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {achievement.date}
                          </Badge>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-slate-600 dark:text-slate-300 text-sm">{achievement.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20 relative ">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl  md:text-4xl font-bold text-center  mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent font-mono"
          >
            {"GET /contact"}
          </motion.h2>

          <AnimatePresence mode="wait">
            {/* {contactState.loading && (
              <motion.div
                key="contact-loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <TerminalLoader endpoint="/contact" />
              </motion.div>
            )} */}

            {contactState.showJson && (
              <motion.div
                key="contact-json"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <JsonDisplay data={contactData} endpoint="GET /contact" />
              </motion.div>
            )}

            {contactState.showContent && (
              <motion.div
                key="contact-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent font-mono">
                    {"// Let's connect"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    I'm always interested in new opportunities and exciting
                    projects. Whether you have a question or just want to say
                    hi, feel free to reach out!
                  </p>

                  <div className="space-y-4">
                    {contactData.contact_methods.map((method, index) => {
                      const IconComponent =
                        method.icon === "mail"
                          ? Mail
                          : method.icon === "github"
                          ? Github
                          : Linkedin;
                      const colorClasses = {
                        blue: {
                          color: "text-blue-600 dark:text-blue-400",
                          bg: "bg-blue-100 dark:bg-blue-900/30",
                        },
                        purple: {
                          color: "text-purple-600 dark:text-purple-400",
                          bg: "bg-purple-100 dark:bg-purple-900/30",
                        },
                        cyan: {
                          color: "text-cyan-600 dark:text-cyan-400",
                          bg: "bg-cyan-100 dark:bg-cyan-900/30",
                        },
                      }[method.color as keyof typeof colorClasses];

                      return (
                        <motion.div
                          key={method.type}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300"
                        >
                          <div
                            className={cn("p-2 rounded-full", colorClasses.bg)}
                          >
                            <IconComponent
                              className={cn("h-5 w-5", colorClasses.color)}
                            />
                          </div>
                          <Link
                            href={
                              method.type === "email"
                                ? `mailto:${method.value}`
                                : `https://${method.value}`
                            }
                            target="_blank"
                            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono transition-colors"
                          >
                            {method.value}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <Card className="border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50 shadow-xl backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                  <CardHeader>
                    <CardTitle className="font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      POST /contact
                    </CardTitle>
                    <CardDescription>
                      Send a message via API endpoint
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      ref={formRef}
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      <input
                        type="hidden"
                        name="access_key"
                        value="ab190a95-a84b-4902-91df-cfedeef14336"
                      />
                      <input
                        type="hidden"
                        name="subject"
                        value="New message from portfolio API"
                      />
                      <input
                        type="hidden"
                        name="from_name"
                        value="Portfolio API Contact"
                      />
                      <input
                        type="checkbox"
                        name="botcheck"
                        className="hidden"
                        style={{ display: "none" }}
                      />

                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          required
                          className="font-mono border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="font-mono border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          name="subject"
                          placeholder="Subject"
                          required
                          className="font-mono border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          rows={5}
                          required
                          className="font-mono border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors resize-none"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={formStatus === "loading"}
                          className="w-full font-mono bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {formStatus === "loading" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              POST /contact...
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              POST /contact
                            </>
                          )}
                        </Button>
                      </motion.div>

                      <AnimatePresence mode="wait">
                        {formStatus === "success" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-3 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center gap-2 font-mono"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>200 OK - Message sent successfully!</span>
                          </motion.div>
                        )}

                        {formStatus === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-3 rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex items-center gap-2 font-mono"
                          >
                            <AlertCircle className="h-4 w-4" />
                            <span>500 Error - Please try again later</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-8 bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/30 border-t border-slate-200/50 dark:border-slate-700/50"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-600 dark:text-slate-300 font-mono">
            Made with ❤️ by Nikhil
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
