export interface StateRound {
  state: string;
  link: string;
}

export interface EventItem {
  id: string;
  level: string; // e.g. "LEVEL 01", "LEVEL 02", "LEVEL 03", etc.
  title: string;
  subtitle: string;
  category: string;
  description: string;
  date: string; // Default: "TBA"
  time: string; // Default: "TBA"
  venue: string; // Default: "TBA"
  unstopLink?: string; // Optional Unstop URL; if missing/empty => "COMING SOON"
  stateRounds?: StateRound[]; // Specific to Craft N Code multi-state hackathon
  whatAwaits: string[];
  bannerBadge?: string; // e.g. "FIRST CHALLENGE AHEAD!"
  rulebookLink?: string;
  teamFormat?: string;
}

export const FEST_CONFIG = {
  name: "D³ FEST '26",
  motto: "DREAM. DARE. DEVELOP.",
  tagline: "East India's Biggest Techfest",
  organization: "IIIT Bhubaneswar",
  campus: "IIIT Bhubaneswar Campus, Gothapatna, Malipada, Bhubaneswar, Odisha 751003",
  contactEmails: [
    "dcube_techfest@iiit-bh.ac.in",
    "tech-society@iiit-bh.ac.in"
  ],
  socials: {
    instagram: "https://instagram.com/d3fest.iiitbh",
    linkedin: "https://www.linkedin.com/company/tech-society-iiitbh/",
    twitter: "https://x.com/techsociiitbh",
    website: "https://d3fest.techsoc-iiitbbsr.com",
  },
  stats: {
    participants: "3,200+",
    unstopImpressions: "12 Lakh+",
    websiteViews: "4 Lakh+",
    socialReach: "5 Lakh+",
    states: "15+",
    colleges: "70+",
    days: "4 Days"
  },
  events: [
    // ----------------- TECHNICAL COMPETITIONS -----------------
    {
      id: "craft-n-code",
      level: "LEVEL 01",
      title: "CRAFT N CODE '26",
      subtitle: "NATIONAL HACKATHON",
      category: "24-Hour Flagship Hackathon",
      description: "Gear up for the ultimate National level Hackathon! 24-hour non-stop hackathon inviting brilliant minds nationwide to build creative solutions and solve real-world challenges.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Central Computing Arena, IIIT-BH)",
      teamFormat: "2 - 4 Members",
      rulebookLink: "https://drive.google.com/file/d/1iyiSNVeNCb1sEuLReG3oIY8hC8bFBZ0u/view",
      stateRounds: [
        { state: "Odisha (Host Zone)", link: "https://unstop.com" },
        { state: "West Bengal Zone", link: "https://unstop.com" },
        { state: "Delhi NCR Zone", link: "https://unstop.com" },
        { state: "Karnataka Zone", link: "https://unstop.com" },
        { state: "Maharashtra Zone", link: "https://unstop.com" },
        { state: "Online National Pool", link: "https://unstop.com" }
      ],
      whatAwaits: [
        "24 Hours Non-Stop Coding",
        "Real-World Problem Statements",
        "Hardware & Software Tracks",
        "Direct Mentorship & Swag"
      ],
      bannerBadge: "FIRST CHALLENGE AHEAD!"
    },
    {
      id: "code-kombat",
      level: "LEVEL 02",
      title: "CODE KOMBAT",
      subtitle: "1V1 CODING BATTLE",
      category: "Competitive Programming",
      description: "ICPC-inspired programming tournament where coders face off in intense algorithmic challenges. Real-time elimination format testing coding speed, precision, and edge-case handling.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Auditorium Projection Colosseum)",
      teamFormat: "Teams / Solo",
      unstopLink: "", // Empty => Shows COMING SOON
      rulebookLink: "https://drive.google.com/file/d/1iyiSNVeNCb1sEuLReG3oIY8hC8bFBZ0u/view",
      whatAwaits: [
        "1v1 Battles (Real-Time)",
        "Time-Bound Elimination Rounds",
        "Live Audience Arena Display",
        "Prove Your Algorithmic Skill"
      ],
      bannerBadge: "1V1 BATTLE ROYALE!"
    },
    {
      id: "techxpo",
      level: "LEVEL 03",
      title: "TECHXPO",
      subtitle: "INNOVATION ON DISPLAY",
      category: "Innovation Exhibition & Startup Stalls",
      description: "Curated exhibition where local startups, research labs, and student innovators showcase cutting-edge technology products and live prototypes to a nationwide audience.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Main Exhibition Quadrangle)",
      teamFormat: "1 - 5 Members (Startups / Teams)",
      unstopLink: "",
      rulebookLink: "https://drive.google.com/file/d/1iyiSNVeNCb1sEuLReG3oIY8hC8bFBZ0u/view",
      whatAwaits: [
        "Live Startup & Project Booths",
        "Hands-On Interactive Demos",
        "Investor & CXO Networking",
        "Groundbreaking Real Innovation"
      ],
      bannerBadge: "EXPLORE THE FUTURE"
    },
    {
      id: "ctf-arena",
      level: "LEVEL 04",
      title: "CTF ARENA",
      subtitle: "CYBERSEC DEFENSE BATTLE",
      category: "Cybersecurity & Cryptography",
      description: "Demonstrate cybersecurity expertise in defending digital assets and combating national security threats, financial fraud, vulnerability exploitation, and cyberattacks.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Cyber Security Center)",
      teamFormat: "1 - 3 Members",
      unstopLink: "",
      whatAwaits: [
        "Reverse Engineering & Exploits",
        "Cryptography & Web Sec",
        "Real-Time Flag Capture",
        "Digital Forensics Gauntlet"
      ],
      bannerBadge: "CYBERSEC BATTLE!"
    },
    {
      id: "ui-ux-showdown",
      level: "LEVEL 05",
      title: "UI/UX SHOWDOWN",
      subtitle: "DIGITAL EXPERIENCE SPRINT",
      category: "Design & Product Experience",
      description: "Transform complex problem statements into intuitive, accessible, and aesthetically compelling UI/UX solutions emphasizing usability, accessibility, and design thinking.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Design Studio)",
      teamFormat: "1 - 2 Members",
      unstopLink: "",
      whatAwaits: [
        "User Journey Mapping",
        "High-Fidelity Wireframing",
        "Interactive Prototyping",
        "Live Design Jury Critique"
      ],
      bannerBadge: "DESIGN SPRINT!"
    },

    // ----------------- ROBOTICS EVENTS (ARS) -----------------
    {
      id: "bot-bowl",
      level: "LEVEL 06",
      title: "BOT BOWL",
      subtitle: "ROBOSOCCER CHAMPIONSHIP",
      category: "Robotics & Hardware",
      description: "Adrenaline-charged RoboSoccer challenge where teams operate custom bots to dribble, pass, and score on a mini soccer field. Agility and engineering decide the victor.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (RoboSoccer Arena)",
      teamFormat: "2 - 4 Members",
      unstopLink: "",
      whatAwaits: [
        "Fast-Paced Soccer Duels",
        "Tactical Bot Maneuvers",
        "Knockout Tournament Brackets",
        "Engineering Precision"
      ],
      bannerBadge: "ROBOSOCCER ARENA!"
    },
    {
      id: "flytron",
      level: "LEVEL 07",
      title: "FLYTRON",
      subtitle: "HIGH-SPEED DRONE RACING",
      category: "Autonomous & FPV Robotics",
      description: "Navigate high-speed aerial obstacle courses where surgical precision meets throttle control. Dominate the skies in thrilling competitive heats.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Aerial Drone Cage)",
      teamFormat: "1 - 3 Pilots",
      unstopLink: "",
      whatAwaits: [
        "Acrobatic Air Gates",
        "Precision Throttle Control",
        "High-Speed Lap Records",
        "FPV Drone Spectator Feed"
      ],
      bannerBadge: "RULE THE SKIES!"
    },
    {
      id: "robo-rash",
      level: "LEVEL 08",
      title: "ROBO RASH",
      subtitle: "ALL-TERRAIN ENDURANCE RUSH",
      category: "Robotics & Hardware",
      description: "Navigate mobile robots through rugged multi-surface tracks featuring gravel, sand, turf, and steep slopes with maximum stability and record time.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (All-Terrain Obstacle Track)",
      teamFormat: "2 - 4 Members",
      unstopLink: "",
      whatAwaits: [
        "Multi-Surface Terrain Tracks",
        "Steep Incline Challenges",
        "Durability & Suspension Tests",
        "Time-Attack Obstacle Run"
      ],
      bannerBadge: "ALL-TERRAIN CLASH!"
    },
    {
      id: "ground-zero",
      level: "LEVEL 09",
      title: "GROUND ZERO",
      subtitle: "DISASTER DETECTION QUEST",
      category: "Autonomous & Search Robotics",
      description: "Deploy robotic explorers into simulated disaster zones to traverse rubble, detect metallic hazards, locate hidden resources, and identify signs of human life.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Disaster Arena)",
      teamFormat: "2 - 4 Members",
      unstopLink: "",
      whatAwaits: [
        "Rugged Debris Traversal",
        "Target Sensor Recognition",
        "Emergency Search Protocol",
        "Autonomous Navigation"
      ],
      bannerBadge: "SEARCH & RESCUE!"
    },
    {
      id: "buildathon",
      level: "LEVEL 10",
      title: "BUILDATHON",
      subtitle: "HARDWARE & PROTOTYPE SPRINT",
      category: "Maker & Automation",
      description: "A race against time to turn bold ideas into working solutions. Brainstorm, design, prototype, and present working electronics, software, or automation systems.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Maker Space Lab)",
      teamFormat: "2 - 5 Members",
      unstopLink: "",
      whatAwaits: [
        "12-Hour Hardware Sprint",
        "Rapid Circuit Prototyping",
        "IoT & Automation Builds",
        "Live Functional Demonstration"
      ],
      bannerBadge: "PROTOTYPE RACE!"
    },
    {
      id: "experience-center",
      level: "LEVEL 11",
      title: "EXPERIENCE CENTER",
      subtitle: "STEP IN. EXPERIENCE THE FUTURE.",
      category: "Experiential Tech Zone",
      description: "An immersive zone where technology comes alive. Explore interactive demos, live robotics showcases, and hands-on automation experiences built by the Automation & Robotics Society.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Central ARS Pavillion)",
      teamFormat: "Open to All",
      unstopLink: "",
      whatAwaits: [
        "Live Robotics Showcases",
        "Interactive Sensor Displays",
        "Automation Hands-On Demos",
        "Cutting-Edge Hardware R&D"
      ],
      bannerBadge: "STEP INTO FUTURE!"
    },

    // ----------------- WORKSHOPS & TALKS -----------------
    {
      id: "workshop-exe",
      level: "LEVEL 12",
      title: "WORKSHOP.EXE",
      subtitle: "MASTERCLASS IN FUTURE TECH",
      category: "Masterclasses & Workshops",
      description: "Engage in hands-on learning with top industry experts covering Artificial Intelligence (AI), Blockchain, Web3, Augmented Reality (AR), and Virtual Reality (VR).",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Advanced Lab)",
      teamFormat: "Solo",
      unstopLink: "",
      whatAwaits: [
        "Hands-On Guided Labs",
        "AI & Web3 Practical Tooling",
        "Industry Best Practices",
        "Take-Home Project Blueprint"
      ],
      bannerBadge: "HANDS-ON LABS!"
    },
    {
      id: "dev-dialogue",
      level: "LEVEL 13",
      title: "DEV DIALOGUE",
      subtitle: "INSPIRATIONAL TECH TALK",
      category: "Tech Talks & Panels",
      description: "Leading industry visionaries and tech innovators dive into the latest breakthrough trends, sparking new ideas, expanding horizons, and shaping the future.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Main Auditorium)",
      teamFormat: "Open to All",
      unstopLink: "",
      whatAwaits: [
        "Visionary Keynote Addresses",
        "Interactive Fireside Chats",
        "Audience Q&A Networking",
        "Front-Row Seat to Future Tech"
      ],
      bannerBadge: "INDUSTRY VISION!"
    },
    {
      id: "mechlab-io",
      level: "LEVEL 14",
      title: "MECHLAB.IO",
      subtitle: "EMBEDDED & AUTONOMOUS SYSTEMS",
      category: "Robotics Workshop",
      description: "Comprehensive hands-on workshop presented by the Automation and Robotics Society on Embedded Systems, IoT, RPA, Computer Vision, and Autonomous Navigation.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Robotics Center)",
      teamFormat: "Solo / Duo",
      unstopLink: "",
      whatAwaits: [
        "Microcontroller Programming",
        "Computer Vision & OpenCV",
        "IoT Sensor Integration",
        "Real-World Robotics Testing"
      ],
      bannerBadge: "ARS MASTERCLASS!"
    },

    // ----------------- CEREMONIES -----------------
    {
      id: "welcoming-ceremony",
      level: "LEVEL 15",
      title: "WELCOMING CEREMONY",
      subtitle: "GRAND INAUGURATION",
      category: "Festival Ceremony",
      description: "The official inauguration ceremony of D³ Fest 2026, unveiling 4 days of arcade engineering, special keynote announcements, and festivities.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Main Amphitheatre)",
      teamFormat: "All Delegates",
      unstopLink: "",
      whatAwaits: [
        "Dignitary Keynote Addresses",
        "Official Fest Opening Ceremony",
        "Special Announcements & Surprises",
        "Opening Swag & Delegate Kits"
      ],
      bannerBadge: "GRAND OPENING!"
    },
    {
      id: "bits-of-past",
      level: "LEVEL 16",
      title: "BITS OF PAST",
      subtitle: "RETRO COMMUNITY CELEBRATION",
      category: "Festival Ceremony",
      description: "An inspiring retro retrospective and community celebration honoring tech evolution, student projects, and the timeless 80s arcade culture.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Quadrangle Arena)",
      teamFormat: "All Attendees",
      unstopLink: "",
      whatAwaits: [
        "Vintage Tech Gallery",
        "Retro High-Score Arcades",
        "Community Storytelling",
        "Nostalgia Music Jam"
      ],
      bannerBadge: "RETRO RETROSPECTIVE!"
    },
    {
      id: "closing-ceremony",
      level: "LEVEL 17",
      title: "CLOSING CEREMONY",
      subtitle: "AWARDS GALA & GRAND SURPRISE",
      category: "Festival Ceremony",
      description: "Summing up the fest with the announcement of the Grand Surprise, awards gala for tournament champions, and the official closing celebration.",
      date: "TBA",
      time: "TBA",
      venue: "TBA (Main Auditorium)",
      teamFormat: "All Participants",
      unstopLink: "",
      whatAwaits: [
        "Champion Trophy Honors",
        "Grand Surprise Reveal",
        "Commemorative Certificates",
        "Official 2026 Fest Wrap-Up"
      ],
      bannerBadge: "GRAND FINALE!"
    }
  ]
};
