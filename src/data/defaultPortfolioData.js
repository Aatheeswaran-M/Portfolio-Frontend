export const defaultPortfolioData = {
  hero: {
    name: 'Aatheeswaran M',
    profileImage: '',
    roles: [
      'Software Developer',
      'Full Stack MERN Developer',
      'Building Production-Ready Products',
    ],
    description:
      'Graduate software developer focused on shipping scalable full-stack products with clean UX, secure APIs, and real business impact.',
    primaryButtonText: 'View Projects',
    primaryButtonHref: '#projects',
    secondaryButtonText: 'Download Resume',
    secondaryButtonHref: '#contact',
    resumeFileName: 'resume.pdf',
    badges: ['Graduate Developer', 'Production Projects', 'Full Stack Delivery'],
  },
  proof: {
    title: 'Proof of Work',
    metrics: [
      {
        icon: '🌐',
        number: '4+',
        label: 'Production Projects',
      },
      {
        icon: '🔗',
        number: 'End-to-End',
        label: 'Feature Ownership',
      },
      {
        icon: '⚙️',
        number: 'REST APIs + Auth',
        label: 'Built and Integrated',
      },
      {
        icon: '📦',
        number: 'Client Ready',
        label: 'Delivery Mindset',
      },
    ],
  },
  about: {
    title: 'About Me',
    paragraphs: [
      'I am a B.Sc Computer Science graduate from NGM College and currently working as a software developer focused on real product delivery.',
      'I build complete web applications using React, Node.js, Express, and MongoDB from UI development and API architecture to deployment and maintenance.',
      'As an early-career developer, I stand out through ownership: understanding requirements clearly, shipping features quickly, fixing bugs fast, and improving performance.',
      'I am looking for a growth-focused developer role where I can contribute from day one, collaborate with strong teams, and scale into larger responsibilities.',
    ],
  },
  experience: {
    title: 'Experience',
    intro:
      'A snapshot of the roles and delivery environments where I have built products, supported real users, and grown as a full-stack developer.',
    items: [
      {
        role: 'Software Developer',
        company: 'Azhagappar Academy',
        period: '2025 - Present',
        location: 'Tamil Nadu, India',
        type: 'Full-time',
        description:
          'Contributing to live product development across learner journeys, admin workflows, API integrations, and ongoing platform improvements.',
        highlights: [
          'Built and maintained React-based LMS flows and admin-facing features used in day-to-day operations.',
          'Integrated backend APIs, authentication, and data-driven UI states to support reliable product delivery.',
          'Worked through bug fixes, feature iterations, and production-ready updates with a delivery mindset.',
        ],
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
      },
      {
        role: 'Full Stack MERN Developer',
        company: 'Client & Product Projects',
        period: '2024 - 2025',
        location: 'Remote',
        type: 'Project Delivery',
        description:
          'Designed and shipped end-to-end web applications for portfolio and client-facing use cases, from frontend UI to backend logic and deployment.',
        highlights: [
          'Developed complete MERN applications with dashboards, authentication, and CRUD workflows.',
          'Translated business requirements into usable features with responsive interfaces and clear data flows.',
          'Managed deployment, debugging, and iteration cycles to keep products stable and ready for users.',
        ],
        tech: ['React', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
      },
    ],
  },
  skills: {
    title: 'Skills & Technologies',
    groups: [
      {
        title: 'Frontend',
        skills: [
          { name: 'HTML', icon: 'FaHtml5', color: 'text-orange-500' },
          { name: 'CSS', icon: 'FaCss3Alt', color: 'text-blue-500' },
          { name: 'JavaScript', icon: 'FaJs', color: 'text-yellow-500' },
          { name: 'React.js', icon: 'FaReact', color: 'text-cyan-500' },
          { name: 'Tailwind CSS', icon: 'FaCss3Alt', color: 'text-teal-400' },
        ],
      },
      {
        title: 'Backend',
        skills: [
          { name: 'Node.js', icon: 'FaNodeJs', color: 'text-green-500' },
          { name: 'Express.js', icon: 'FaNodeJs', color: 'text-gray-400' },
        ],
      },
      {
        title: 'Database',
        skills: [
          { name: 'MongoDB', icon: 'FaDatabase', color: 'text-green-600' },
          { name: 'SQL', icon: 'FaDatabase', color: 'text-blue-600' },
        ],
      },
      {
        title: 'Programming',
        skills: [
          { name: 'JavaScript', icon: 'FaJs', color: 'text-yellow-500' },
          { name: 'Python', icon: 'FaPython', color: 'text-blue-400' },
          { name: 'Java', icon: 'FaJava', color: 'text-red-500' },
        ],
      },
      {
        title: 'Tools',
        skills: [
          { name: 'Git', icon: 'FaGitAlt', color: 'text-orange-600' },
          { name: 'GitHub', icon: 'FaGithub', color: 'text-gray-300' },
          { name: 'Postman', icon: 'FaTools', color: 'text-orange-500' },
          { name: 'Docker', icon: 'FaTools', color: 'text-blue-500' },
        ],
      },
      {
        title: 'Concepts',
        skills: [
          { name: 'REST API', icon: 'FaCode', color: 'text-purple-400' },
          { name: 'JWT Auth', icon: 'FaCode', color: 'text-red-400' },
          { name: 'CRUD', icon: 'FaDatabase', color: 'text-green-500' },
          { name: 'Deployment', icon: 'FaCode', color: 'text-cyan-500' },
        ],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    items: [
      {
        title: 'News App',
        link: 'https://aathees.me/news',
        repoUrl: '',
        description: 'Real-time news app with API integration and responsive UI',
        tech: ['React', 'Node.js', 'MongoDB', 'NewsAPI'],
        details:
          'A full-stack news application that fetches real-time news from NewsAPI, features user authentication, and provides a responsive design for optimal viewing on all devices.',
        thumbnail: 'https://placehold.co/600x360/111827/ffffff?text=News+App',
      },
      {
        title: 'Thozha - Construction Management System',
        link: 'https://aathees.me/thozha',
        repoUrl: '',
        description: 'Full stack app with REST API, authentication, and database',
        tech: ['React', 'Express', 'MongoDB', 'JWT'],
        details:
          'A comprehensive construction management system built with MERN stack, featuring project tracking, team management, and secure authentication using JWT tokens.',
        thumbnail:
          'https://placehold.co/600x360/1f2937/f9fafb?text=Construction+Management',
      },
      {
        title: 'Agriculture Management System',
        link: 'https://aathees.me/agro',
        repoUrl: '',
        description: 'Web app helping farmers manage and monitor data',
        tech: ['React', 'Node.js', 'MongoDB', 'Charts'],
        details:
          'An agricultural management platform that helps farmers track crops, monitor weather data, and manage farm operations with data visualization and analytics.',
        thumbnail:
          'https://placehold.co/600x360/0f172a/e2e8f0?text=Agriculture+Management',
      },
      {
        title: 'Azhagappar Academy LMS',
        link: 'https://azhagapparacadamy.com',
        repoUrl: '',
        description: 'Real client LMS with user features',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        details:
          'A learning management system developed for Azhagappar Academy, featuring course management, student progress tracking, and payment integration.',
        thumbnail: 'https://placehold.co/600x360/334155/ffffff?text=Academy+LMS',
      },
    ],
  },
  certificates: {
    title: 'Certificates',
    items: [
      {
        title: 'Full Stack Web Development',
        issuer: 'Udemy',
        date: '2025',
        credentialUrl: '#',
        description: 'Completed full-stack web development with MERN stack projects.',
        thumbnail:
          'https://placehold.co/600x360/111827/ffffff?text=Full+Stack+Certificate',
      },
      {
        title: 'React Advanced',
        issuer: 'Coursera',
        date: '2025',
        credentialUrl: '#',
        description: 'Advanced React patterns, hooks, state architecture, and performance.',
        thumbnail:
          'https://placehold.co/600x360/1e293b/f8fafc?text=React+Advanced+Certificate',
      },
      {
        title: 'Node.js and APIs',
        issuer: 'freeCodeCamp',
        date: '2024',
        credentialUrl: '#',
        description: 'Built API services, authentication flows, and database-backed apps.',
        thumbnail:
          'https://placehold.co/600x360/0b1120/e2e8f0?text=Node.js+API+Certificate',
      },
    ],
  },
  whyHire: {
    title: 'Why I Am a Strong Hire',
    intro:
      'I am a graduate software developer with real delivery experience, strong fundamentals, and the drive to create measurable impact from day one.',
    items: [
      {
        icon: '🚀',
        title: 'Product Mindset',
        description:
          'I focus on outcomes, not only code. I translate requirements into usable features that solve real problems for users.',
      },
      {
        icon: '🌐',
        title: 'Production Delivery',
        description:
          'I have experience shipping full-stack applications to live environments with deployment, debugging, and post-release improvements.',
      },
      {
        icon: '⚡',
        title: 'Full-Stack Ownership',
        description:
          'I can own features across frontend, backend, database, authentication, and integrations without handoff delays.',
      },
      {
        icon: '🎯',
        title: 'Fast Learner, Reliable Teammate',
        description:
          'I adapt quickly to new tools and requirements, communicate clearly, and maintain a dependable execution pace under deadlines.',
      },
    ],
  },
  learning: {
    title: 'Currently Improving',
    items: [
      {
        icon: '🤖',
        title: 'AI-Assisted Development',
        description: 'Using AI tools to improve development speed, testing quality, and engineering workflow',
      },
      {
        icon: '🏗️',
        title: 'Scalable Backend Architecture',
        description: 'Improving API design, caching strategies, and service reliability for production systems',
      },
      {
        icon: '🧩',
        title: 'System Design',
        description: 'Strengthening architecture thinking, trade-off analysis, and maintainable design patterns',
      },
    ],
  },
  contact: {
    title: "Let's Build Something Together",
    subtitle:
      'Open to software developer opportunities where I can deliver strong engineering outcomes and grow with a high-performing team.',
    methods: [
      {
        icon: 'FaEnvelope',
        label: 'Email',
        value: 'aatheessubash48@gmail.com',
        href: 'mailto:aatheessubash48@gmail.com',
      },
      {
        icon: 'FaPhone',
        label: 'Phone',
        value: '+91 99948 23277',
        href: 'tel:+919994823277',
      },
      {
        icon: 'FaGlobe',
        label: 'Portfolio',
        value: 'https://aathees.me',
        href: 'https://aathees.me',
      },
      {
        icon: 'FaGithub',
        label: 'GitHub',
        value: 'https://github.com/aatheeswaran',
        href: 'https://github.com/aatheeswaran',
      },
      {
        icon: 'FaLinkedin',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/aatheeswaran',
        href: 'https://linkedin.com/in/aatheeswaran',
      },
    ],
    primaryButtonText: 'Contact Me',
    primaryButtonHref: 'mailto:aatheessubash48@gmail.com',
    secondaryButtonText: 'Hire Me',
    secondaryButtonHref: 'mailto:aatheessubash48@gmail.com',
  },
  sidebar: {
    items: [
      { icon: 'FaHome', label: 'Home', href: '#hero' },
      { icon: 'FaUser', label: 'About', href: '#about' },
      { icon: 'FaBriefcase', label: 'Experience', href: '#experience' },
      { icon: 'FaCode', label: 'Skills', href: '#skills' },
      { icon: 'FaProjectDiagram', label: 'Projects', href: '#projects' },
      { icon: 'FaEnvelope', label: 'Contact', href: '#contact' },
      { icon: 'FaUserShield', label: 'Admin', href: '/admin' },
    ],
  },
}
