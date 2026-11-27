export interface HeroProductSlide {
  eyebrow: string;
  tag: string;
  words: [string, string, string];
  lead: string;
  ctaLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  deckCode: string;
  deckStatus: string;
  kpis: Array<{ label: string; value: string }>;
  specs: string[];
  deckLinkText: string;
}

export const HERO_SLIDES: HeroProductSlide[] = [
  {
    eyebrow: "FLAGSHIP PLATFORM — MARS",
    tag: "MERCHANT ACQUIRING & BILLING",
    words: ["NEXT-GEN", "MERCHANT", "ACQUIRING"],
    lead: "Seamless merchant onboarding, unified POS & digital payment processing, automated fee billing, and scheme clearing.",
    ctaLabel: "Explore MARS ↗",
    secondaryLabel: "View Details ↓",
    secondaryHref: "#product-mars",
    deckCode: "MARS // ACQUIRING SUITE",
    deckStatus: "● LIVE ENGINE",
    kpis: [
      { label: "Coverage", value: "POS & Web" },
      { label: "Clearing", value: "Multi-Rail" },
      { label: "Standard", value: "PA-DSS" },
    ],
    specs: [
      "Instant digital onboarding and automated KYC",
      "Dynamic MDR, merchant rentals, and fee splits",
      "Multi-scheme clearing: Visa, Mastercard, RuPay & Amex",
    ],
    deckLinkText: "Talk to Product Specialists →",
  },
  {
    eyebrow: "FLAGSHIP PLATFORM — RECONPLUS",
    tag: "TRANSACTION RECONCILIATION",
    words: ["AUTOMATED", "TRANSACTION", "RECONCILIATION"],
    lead: "Automate multi-source transaction matching, dispute handling, and fee reconciliation across banking entities with zero discrepancy.",
    ctaLabel: "Explore ReconPlus ↗",
    secondaryLabel: "View Details ↓",
    secondaryHref: "#product-reconplus",
    deckCode: "RECONPLUS // RECON ENGINE",
    deckStatus: "● 100% ACCURACY",
    kpis: [
      { label: "Matching", value: "Multi-Source" },
      { label: "Deployments", value: "Multi-Bank" },
      { label: "Standard", value: "PA-DSS" },
    ],
    specs: [
      "High-volume multi-channel automated reconciliation",
      "Intelligent rule-based exception and dispute workflows",
      "Deployable for Issuers, Acquirers, and Payment Networks",
    ],
    deckLinkText: "Request a Live Demo →",
  },
];

export const CORE_PILLARS = [
  {
    title: "Our Vision",
    subtitle: "Trusted Financial Technology Partner",
    body: "To become a trusted name in financial technology by developing meaningful software solutions that support the changing needs of the financial services industry.",
  },
  {
    title: "Our Mission",
    subtitle: "Domain Knowledge Meets Technology",
    body: "To combine financial domain knowledge and technology expertise to create practical solutions that simplify operations and support business growth.",
  },
];

export const WHAT_DRIVES_US = [
  "Understanding before development.",
  "Practical solutions over unnecessary complexity.",
  "Continuous improvement in technology.",
  "Commitment to customer requirements.",
  "Building lasting professional relationships.",
];

export const OUR_EXPERTISE = [
  {
    name: "Payment Processing",
    desc: "Managing electronic payment transactions through technology that supports smooth and organised payment operations.",
  },
  {
    name: "Transaction Reconciliation",
    desc: "Bringing transaction records together, identifying differences and helping financial institutions maintain accurate financial data.",
  },
  {
    name: "Merchant Acquiring",
    desc: "Supporting the technology requirements behind merchant onboarding, transaction management and acquiring operations.",
  },
  {
    name: "Clearing & Settlement",
    desc: "Helping manage the processes involved in clearing transactions and settling financial obligations.",
  },
  {
    name: "Electronic Fund Transfers",
    desc: "Enabling electronic fund transfer operations through transaction routing and connectivity between financial systems.",
  },
];

export const OUR_SERVICES = [
  {
    name: "Software Development",
    desc: "Turning business requirements into practical software solutions through structured development and technical expertise.",
    detail: "We develop software solutions based on business requirements, functional expectations and the technical needs of financial institutions.",
  },
  {
    name: "System Integration & Implementation",
    desc: "Helping organisations bring technology solutions into their existing systems and operational environments.",
    detail: "We support the integration and implementation of software solutions within existing technology environments, helping organisations connect their systems and processes.",
  },
  {
    name: "Technical Support & Maintenance",
    desc: "Supporting software systems through technical assistance, maintenance and ongoing issue resolution.",
    detail: "We provide technical assistance and maintenance support to help organisations address software-related requirements and maintain their systems.",
  },
];

export const WHY_EMPAY = [
  {
    num: "01",
    title: "Experience Since 2008",
    desc: "More than a decade of experience in developing technology for the financial services and electronic payments industry.",
    meta: "ESTABLISHED 2008",
  },
  {
    num: "02",
    title: "Understanding Financial Operations",
    desc: "Knowledge of the processes behind card payments, transaction reconciliation, merchant acquiring and fund transfers.",
    meta: "DOMAIN KNOWLEDGE",
  },
  {
    num: "03",
    title: "Solutions Built Around Business Needs",
    desc: "A practical approach to understanding requirements and developing solutions that address specific operational challenges.",
    meta: "PRACTICAL DELIVERY",
  },
  {
    num: "04",
    title: "Flexible Technology Capabilities",
    desc: "Configurable product capabilities to accommodate different business processes and transaction requirements.",
    meta: "CONFIGURABLE SUITE",
  },
  {
    num: "05",
    title: "Technical & Domain Expertise",
    desc: "Bringing together software development capabilities and financial industry knowledge.",
    meta: "ENGINEERING + FINANCE",
  },
  {
    num: "06",
    title: "Long-Term Customer Relationships",
    desc: "Building relationships through an understanding of customer requirements and a commitment to providing relevant support.",
    meta: "PARTNERSHIP",
  },
];

export const INDUSTRIES_WE_SUPPORT = [
  {
    badge: "BANKING",
    title: "Banks",
    desc: "Technology support for issuing and acquiring operations, card transaction management, reconciliation and payment processing.",
    tags: ["Issuing & Acquiring", "Card Management", "Reconciliation"],
  },
  {
    badge: "NBFC",
    title: "Non-Banking Financial Companies",
    desc: "Software solutions addressing financial operations and transaction management requirements within the NBFC environment.",
    tags: ["Financial Operations", "Transaction Management", "NBFC"],
  },
  {
    badge: "PSP",
    title: "Payment Service Providers",
    desc: "Technology capabilities for transaction processing, switching, reconciliation and settlement operations.",
    tags: ["Processing", "Switching", "Settlement"],
  },
  {
    badge: "FINTECH & TPPSP",
    title: "Third-Party Payment Service Providers",
    desc: "Solutions that support the management of payment-related processes, transaction flows, and financial operations.",
    tags: ["Payment Flows", "FinTech Operations", "Connectivity"],
  },
];

export const WHAT_WE_OFFER = [
  {
    name: "Acquiring Solutions",
    desc: "End-to-end acquiring infrastructure built for POS, e-commerce, and multi-channel card acceptance.",
  },
  {
    name: "ATM Reconciliation",
    desc: "Automated matching of ATM switch logs, EJ files, CBS entries, and network settlement reports.",
  },
  {
    name: "Card Management Systems",
    desc: "Complete lifecycle issuance, PIN/limits control, and portfolio administration across card programs.",
  },
  {
    name: "Chargeback Management",
    desc: "Structured dispute tracking, representment workflows, and scheme compliance case handling.",
  },
  {
    name: "Clearing and Settlement Solutions",
    desc: "Automated clearing file generation and multi-party net settlement across major card associations.",
  },
  {
    name: "Debit Card Reconciliation",
    desc: "High-accuracy reconciliation across issuer ledgers, ATM/POS channels, and interchange statements.",
  },
  {
    name: "Merchant Management Systems",
    desc: "Merchant onboarding, MDR/rental configuration, billing statements, and hierarchy management.",
  },
  {
    name: "Transaction Processing Systems",
    desc: "Mission-critical high-throughput authorization and transaction processing engines.",
  },
  {
    name: "Pre-paid Card Management",
    desc: "Flexible closed-loop and open-loop prepaid card issuance, loading, and ledger controls.",
  },
  {
    name: "Switching Applications",
    desc: "Reliable EFT routing, protocol conversion, and interchange connectivity across payment channels.",
  },
];

export interface ArchNode {
  label: string;
  left: string;
  top: string;
  tag: string;
  title: string;
  desc: string;
  specs: string[];
}

export const ARCH_NODES: ArchNode[] = [
  {
    label: "Channels",
    left: "15.7%",
    top: "20%",
    tag: "NODE 01 // PAYMENT CHANNELS",
    title: "POS, Mobile, Kiosks & IPG",
    desc: "Unified intake across POS terminals, Internet Payment Gateways (IPG), mobile apps, kiosks, ATMs, and Core Banking Systems (CBS).",
    specs: [
      "POS & Internet Payment Gateway (IPG)",
      "Mobile, Kiosk & ATM channel intake",
      "Direct Core Banking System (CBS) integration",
    ],
  },
  {
    label: "Switching",
    left: "12.6%",
    top: "50%",
    tag: "NODE 02 // EFT SWITCHING",
    title: "Switching Applications",
    desc: "Transaction authorization and routing switch with source and interchange converter applications.",
    specs: [
      "Channel-to-interchange transaction routing",
      "Visa, MasterCard, Amex & RuPay support",
      "Protocol & format converter modules",
    ],
  },
  {
    label: "MARS",
    left: "15.7%",
    top: "80%",
    tag: "NODE 03 // ACQUIRING",
    title: "MARS Acquiring Engine",
    desc: "PA-DSS Certified merchant onboarding, POS/IPG processing, discount & fee calculation, and merchant billing.",
    specs: [
      "Automated MDR, rentals, fees & charges",
      "Merchant statement generation",
      "Full acquiring lifecycle management",
    ],
  },
  {
    label: "Interchanges",
    left: "84.3%",
    top: "20%",
    tag: "NODE 04 // CLEARING",
    title: "Card Association Clearing",
    desc: "Generates compliant clearing files and manages settlement flows with Visa, MasterCard, RuPay, and Amex.",
    specs: [
      "Visa & MasterCard clearing files",
      "RuPay & Amex network integration",
      "Chargeback & dispute handling",
    ],
  },
  {
    label: "ReconPlus",
    left: "87.4%",
    top: "50%",
    tag: "NODE 05 // RECONCILIATION",
    title: "ReconPlus Engine",
    desc: "PA-DSS Certified modular reconciliation across multiple entities and sources for Service Providers, Issuers, and Acquirers.",
    specs: [
      "Multi-bank Service Provider deployment",
      "Stand-alone Issuer / Acquirer Bank mode",
      "ATM & Debit Card reconciliation",
    ],
  },
  {
    label: "GL & Settlement",
    left: "84.3%",
    top: "80%",
    tag: "NODE 06 // ACCOUNTING",
    title: "Settlement & GL Entries",
    desc: "Reconciles association settlements, produces accurate merchant statements, and generates General Ledger (GL) accounting entries.",
    specs: [
      "Association settlement verification",
      "Automated GL entry generation",
      "Audit-ready financial reporting",
    ],
  },
];

export interface CareerRole {
  id: string;
  title: string;
  experience: string;
  location: string;
  workMode: string;
  summary: string;
  responsibilities: string[];
  skillsHeading: string;
  skills: string[];
  qualification?: string[];
}

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "tech-manager-java",
    title: "Technical Manager / Technical Project Lead – Java (8–10+ Years)",
    experience: "8–10+ Years",
    location: "Lulu IT Twin Tower, SmartCity, Kochi",
    workMode: "Work From Office (Mandatory)",
    summary:
      "We are looking for a technically strong Technical Manager / Technical Project Lead with 8–10+ years of experience in software development and technical leadership. The candidate should have strong hands-on expertise in Java, along with experience managing engineering teams and delivering complex software projects.",
    responsibilities: [
      "Own the technical direction of projects and guide engineering teams throughout the software development lifecycle.",
      "Analyze business requirements and define suitable architecture, technology approaches, technical components, and implementation strategies.",
      "Review code and technical implementations to ensure quality, maintainability, security, scalability, and performance.",
      "Guide developers in applying OOP principles, SOLID practices, Design Patterns, clean coding standards, and appropriate architectural approaches.",
      "Investigate complex technical problems and lead the resolution of production failures, performance bottlenecks, integration issues, and application defects.",
      "Review database structures, SQL queries, API behavior, and application performance, and recommend improvements where required.",
      "Work closely with Team Leads, Developers, and QA Engineers to ensure smooth development, testing, issue resolution, deployment, and production support.",
      "Evaluate new technologies and frameworks and determine their suitability for business and technical requirements.",
      "Participate in customer and stakeholder discussions and provide technical explanations, solution proposals, and effort/feasibility inputs.",
      "Lead technical estimation and contribute to project planning, priorities, dependencies, risks, and delivery commitments.",
      "Manage team allocation and workload while ensuring technical tasks are assigned according to skills and project requirements.",
      "Mentor Team Leads and developers through technical guidance, feedback, knowledge sharing, and capability development.",
      "Participate in technical recruitment, interviews, onboarding, performance discussions, and team development activities.",
      "Encourage engineering improvements that enhance code quality, system reliability, development efficiency, and delivery predictability.",
    ],
    skillsHeading: "Technical Expertise",
    skills: [
      "Strong experience with Java and modern software development practices.",
      "Strong knowledge of Spring Boot, Spring MVC, and relevant frontend technologies.",
      "Solid understanding of RESTful APIs, Microservices, Object-Oriented Programming, Design Patterns, SOLID principles, and System Design.",
      "Strong knowledge of SQL and relational databases, including SQL Server, MySQL, or PostgreSQL.",
      "Experience with API integrations, authentication and authorization, application security, caching, logging, monitoring, and performance tuning.",
      "Good understanding of version control, CI/CD, Agile development, SDLC, and production deployment practices.",
      "Exposure to AWS/Azure/GCP, Docker/Kubernetes, messaging platforms, and DevOps tools will be an advantage.",
    ],
    qualification: [
      "B.Tech / M.Tech / MCA / MSc in Computer Science, Information Technology, or a related field.",
      "8–10+ years of experience in software engineering, with strong exposure to technical architecture, application development, technical leadership, team management, and project delivery.",
      "Extensive experience working with Java-based applications is required.",
    ],
  },
  {
    id: "qa-lead",
    title: "QA Lead (5–8 Years, including at least 2+ years in a QA Lead / Leadership role)",
    experience: "5–8 Years",
    location: "Lulu IT Twin Tower, SmartCity, Kochi",
    workMode: "Work From Office (Mandatory)",
    summary:
      "We are looking for an experienced QA Lead with 5–8 years of experience in software testing, including at least 2+ years of experience in a QA leadership role. The candidate should have strong knowledge of manual and automation testing, Agile methodologies, test planning, defect management, and quality assurance processes. Experience in the FinTech / Financial Services domain will be an added advantage.",
    responsibilities: [
      "Lead and manage QA activities across projects.",
      "Develop test strategies, test plans, test scenarios, and test cases.",
      "Plan, estimate, coordinate, and monitor testing activities.",
      "Oversee functional, regression, integration, and system testing.",
      "Identify, track, manage, and follow up on defects through resolution.",
      "Work closely with developers, product teams, and business stakeholders to ensure quality deliverables.",
      "Review business and technical requirements and provide QA inputs.",
      "Identify opportunities to improve testing processes and automation.",
      "Monitor QA metrics and maintain required testing documentation.",
      "Mentor, guide, and support QA team members.",
      "Ensure defined quality standards and processes are followed throughout the Agile development lifecycle.",
    ],
    skillsHeading: "Required Skills & Experience",
    skills: [
      "6–8 years of experience in QA / Software Testing.",
      "At least 2+ years of experience in a QA Lead or similar leadership role.",
      "Proven experience in leading and mentoring QA team members.",
      "Strong knowledge of both manual and automation testing.",
      "Experience in test planning, test execution, defect management, and QA reporting.",
      "Experience with automation tools such as Selenium or similar tools will be an added advantage.",
      "Knowledge of Java, Python, C, C++, or any relevant programming/scripting language will be an added advantage.",
      "Good understanding of SDLC, STLC, defect life cycle, and Agile methodologies.",
      "Strong analytical and problem-solving skills; excellent communication and team management skills.",
      "Experience in the FinTech / Financial Services domain will be an added advantage.",
      "Willingness to work from the office is mandatory for this role.",
    ],
  },
  {
    id: "java-team-lead",
    title: "Java Team Lead (6+ Years in Java Development, including at least 2+ years in a Team Lead role)",
    experience: "6+ Years",
    location: "Lulu IT Twin Tower, SmartCity, Kochi",
    workMode: "Work From Office (Mandatory)",
    summary:
      "We are looking for a highly skilled and motivated Java Team Lead to join our growing technology team. The ideal candidate will have strong expertise in Java-based application development along with proven experience leading development teams, microservices, cloud platforms, and modern frameworks. Experience in the Banking, EFT, or Card Payment domains will be an added advantage.",
    responsibilities: [
      "Design, develop, test, and deliver high-quality software based on functional and technical requirements.",
      "Review code, perform debugging, and ensure adherence to best coding practices.",
      "Lead and mentor a team of Java developers by providing technical guidance and performance feedback.",
      "Participate actively across all stages of the Software Development Life Cycle (SDLC).",
      "Collaborate with cross-functional teams to define technical solutions and resolve project challenges.",
      "Ensure timely delivery of project modules while maintaining code quality, performance, and reliability standards.",
      "Prepare and maintain technical documentation as required.",
      "Support the team in identifying and resolving technical issues and development challenges.",
      "Contribute to continuous improvement of development processes, coding standards, and engineering practices.",
    ],
    skillsHeading: "Required Skills & Experience",
    skills: [
      "Minimum 5+ years of experience in Java development and at least 2+ years in a Team Lead or Senior Developer role.",
      "Strong expertise in Core Java, OOPS concepts, Spring MVC, Spring Boot, and Spring Security.",
      "Good knowledge of JPA and Hibernate.",
      "Strong understanding of RESTful APIs and Microservices architecture.",
      "Knowledge of HTML/JSP and React will be an added advantage.",
      "Proficiency with development environments such as Eclipse or IntelliJ IDEA.",
      "Strong knowledge of SQL Server or Oracle databases.",
      "Good understanding of SDLC methodologies (Agile/Scrum) and cloud platforms (AWS, Azure, or Google Cloud).",
      "Experience in the Banking, EFT, or Card Payment domains will be an added advantage.",
      "Bachelor's or Master's degree in Computer Science, Engineering, or a related field.",
      "Willingness to work from the office is mandatory for this role.",
    ],
  },
  {
    id: "senior-java-dev",
    title: "Senior Java Developer (4+ Years)",
    experience: "4+ Years",
    location: "Lulu IT Twin Tower, SmartCity, Kochi",
    workMode: "Work From Office (Mandatory)",
    summary:
      "We are looking for a skilled and passionate Senior Java Developer to join our dynamic development team. The ideal candidate should have strong technical expertise in Java technologies, along with hands-on experience in building scalable, robust, and efficient applications.",
    responsibilities: [
      "Design, develop, and maintain robust, efficient, and reusable Java-based applications.",
      "Collaborate with cross-functional teams to define, design, and implement new features.",
      "Identify and resolve application issues through effective debugging and troubleshooting.",
      "Participate in code reviews to maintain high-quality coding standards and best practices.",
      "Work within project timelines and deliver high-quality solutions in a fast-paced environment.",
      "Ensure compliance with software development methodologies and maintain required technical documentation.",
      "Contribute to continuous improvement of development processes and coding practices.",
    ],
    skillsHeading: "Required Skills & Experience",
    skills: [
      "Minimum 4+ years of experience in Java development.",
      "Strong knowledge and hands-on experience with Core Java, OOP concepts, Spring MVC, Spring Boot, and Spring Security.",
      "Good knowledge of Hibernate and JPA.",
      "Experience with RESTful Web Services and Microservices will be preferred.",
      "Knowledge of HTML/JSP and React will be an added advantage.",
      "Proficiency with development environments such as Eclipse or IntelliJ IDEA.",
      "Strong understanding of SQL Server or Oracle databases and SDLC / Agile development methodologies.",
      "Bachelor's or Master's degree in Computer Science, Engineering, or a related field.",
      "Experience in the Banking, EFT, or Card Payment domains will be an added advantage.",
      "Willingness to work from the office is mandatory for this role.",
    ],
  },
  {
    id: "it-business-analyst",
    title: "IT Business Analyst (4+ Years of Experience in the FinTech Domain Preferred)",
    experience: "4+ Years",
    location: "Lulu IT Twin Tower, SmartCity, Kochi",
    workMode: "Work From Office (Mandatory)",
    summary:
      "We are looking for a skilled IT Business Analyst with 4+ years of experience in business analysis within an IT/software development environment. Experience in the FinTech domain, particularly Banking, Electronic Funds Transfer (EFT), or Card Payments, will be preferred.",
    responsibilities: [
      "Gather, analyze, and document business requirements through client and stakeholder discussions.",
      "Conduct gap analysis to identify business process improvements and define suitable solutions.",
      "Translate business requirements into functional specifications, user stories, and acceptance criteria.",
      "Prepare and maintain BRDs, FRDs, use cases, process flows, and other project documentation.",
      "Collaborate with development and QA teams to ensure requirements are clearly understood and implemented accurately.",
      "Participate in system testing and User Acceptance Testing (UAT) to validate functionality against business requirements.",
      "Work closely with Project Managers to support project planning, requirement prioritization, and timely delivery.",
      "Identify requirement gaps, manage changes, and ensure alignment between business stakeholders and technical teams.",
      "Analyze existing business processes and recommend improvements to enhance operational efficiency and solution effectiveness.",
      "Support client discussions, clarify functional requirements, and coordinate the resolution of business-related issues.",
    ],
    skillsHeading: "Technical Expertise",
    skills: [
      "Strong understanding of business analysis, requirement engineering, and software development processes.",
      "Hands-on experience in requirement gathering, stakeholder management, and functional documentation.",
      "Proficiency in preparing BRDs, FRDs, user stories, acceptance criteria, and process flow diagrams.",
      "Good understanding of SDLC, Agile methodologies, and project delivery practices.",
      "Knowledge of SQL, data analysis, REST APIs, and system integration concepts will be an advantage.",
      "Understanding of functional testing, UAT, and defect tracking.",
      "Experience in the FinTech domain, particularly Banking, EFT, or Card Payments, will be preferred.",
    ],
    qualification: [
      "B.Tech / M.Tech / MCA / BCA / B.Sc / M.Sc in Computer Science, Information Technology, Software Engineering, or a related field.",
      "4+ years of experience as a Business Analyst in an IT/software development environment.",
      "Prior experience in software project development or testing is preferred.",
      "Strong experience in client communication, requirement gathering, and stakeholder coordination.",
    ],
  },
  {
    id: "react-js-dev",
    title: "React JS Developer (2–3 Years)",
    experience: "2–3 Years",
    location: "Lulu IT Twin Tower, SmartCity, Kochi",
    workMode: "Work From Office (Mandatory)",
    summary:
      "We are looking for a skilled React JS Developer with 2–3 years of hands-on experience in frontend development, capable of developing user-friendly, scalable, and maintainable web applications and collaborating effectively with backend developers, QA engineers, designers, and project teams.",
    responsibilities: [
      "Develop, maintain, and enhance responsive web applications based on project requirements.",
      "Build reusable and maintainable frontend components and user interfaces.",
      "Integrate frontend applications with backend services and efficiently manage application data.",
      "Collaborate with backend developers to ensure smooth frontend and backend integration.",
      "Identify, troubleshoot, and resolve frontend bugs and technical issues.",
      "Ensure applications provide a consistent experience across browsers, devices, and screen sizes.",
      "Work closely with QA engineers to support testing and resolve identified issues.",
      "Collaborate with designers and project teams to understand requirements and implement UI/UX designs.",
      "Participate in code reviews, debugging, testing, and deployment-related activities.",
      "Follow established coding standards, development practices, and project guidelines.",
      "Contribute to improving application performance, usability, maintainability, and overall code quality.",
    ],
    skillsHeading: "Required Skills & Experience",
    skills: [
      "2–3 years of hands-on experience in React.js development.",
      "Strong hands-on experience with React.js, TypeScript, and Vite.js.",
      "Good knowledge of JavaScript (ES6+), HTML, and CSS.",
      "Solid understanding of React components, Props, State, Hooks, and component lifecycle concepts.",
      "Experience developing reusable and maintainable frontend components and consuming REST APIs.",
      "Knowledge of state management tools such as Zustand; familiarity with TanStack React Query and TanStack Table will be an added advantage.",
      "Familiarity with Bootstrap, Material UI, or similar frameworks; Git, CI/CD pipelines, cloud deployment, and Agile SDLC.",
      "Bachelor's degree in Computer Science, Information Technology, Software Engineering, or a related discipline.",
    ],
  },
];

export interface ClientPartnerItem {
  id: string;
  name: string;
  type: "client" | "partner";
  category: string;
  subtitle: string;
  badge: string;
}

export const CLIENT_LOGOS: ClientPartnerItem[] = [
  {
    id: "client-1",
    name: "Logo 1",
    type: "client",
    category: "Commercial Banking",
    subtitle: "Tier-1 Commercial Bank",
    badge: "Core Banking",
  },
  {
    id: "client-2",
    name: "Logo 2",
    type: "client",
    category: "Retail Banking",
    subtitle: "National Retail Bank",
    badge: "Card Issuance",
  },
  {
    id: "client-3",
    name: "Logo 3",
    type: "client",
    category: "Switch Network",
    subtitle: "Transaction Switch",
    badge: "EFT Switching",
  },
  {
    id: "client-4",
    name: "Logo 4",
    type: "client",
    category: "Merchant Acquirer",
    subtitle: "Payment Aggregator & IPG",
    badge: "POS & Gateway",
  },
  {
    id: "client-5",
    name: "Logo 5",
    type: "client",
    category: "FinTech Enterprise",
    subtitle: "Digital Wallet Engine",
    badge: "FinTech Engine",
  },
];

export const PARTNER_LOGOS: ClientPartnerItem[] = [
  {
    id: "partner-1",
    name: "RuPay",
    type: "partner",
    category: "Payment Scheme",
    subtitle: "National Card Network",
    badge: "Certified",
  },
  {
    id: "partner-2",
    name: "Visa",
    type: "partner",
    category: "Global Network",
    subtitle: "Worldwide Card Scheme",
    badge: "Certified",
  },
  {
    id: "partner-3",
    name: "Mastercard",
    type: "partner",
    category: "Global Network",
    subtitle: "Worldwide Payments",
    badge: "Certified",
  },
  {
    id: "partner-4",
    name: "American Express",
    type: "partner",
    category: "Payment Network",
    subtitle: "Integrated Payments",
    badge: "Interchange",
  },
  {
    id: "partner-5",
    name: "PA-DSS",
    type: "partner",
    category: "Security Standard",
    subtitle: "PCI Security Council",
    badge: "Compliant",
  },
];
