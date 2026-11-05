/**
 * ResumeCraft - Data Models, Presets, and Helper Constants
 */

export const INITIAL_DATA = {
  theme: {
    template: 'modern', // 'modern', 'classic', 'minimal', 'creative', 'academic'
    primaryColor: '#2563eb', // Blue
    fontFamily: 'Inter',
    fontSize: 'medium', // 'small', 'medium', 'large'
    spacing: 'normal', // 'compact', 'normal', 'spacious'
    showPhoto: true,
    accentSidebar: true,
  },
  personal: {
    fullName: 'Alex Vance',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.vance@devmail.io',
    phone: '+1 (555) 349-8201',
    location: 'San Francisco, CA',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance',
    github: 'github.com/alexvance',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    summary: 'Results-driven Senior Full Stack Engineer with 7+ years of experience architecting resilient cloud-native applications, microservices, and reactive web interfaces. Led teams delivering scalable platforms handling 10M+ daily active users while driving 35% performance optimizations and slashing cloud costs by 22%.'
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Lead Full Stack Engineer',
      company: 'Apex Cloud Systems',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description: '• Architected and migrated legacy monolith to modular microservices with Node.js, GraphQL, and AWS ECS, boosting system uptime to 99.99%.\n• Spearheaded the development of a real-time data analytics dashboard using React 18, TypeScript, and WebSockets, reducing customer latency by 45%.\n• Mentored 8 junior and mid-level engineers, implemented strict automated CI/CD pipelines, and reduced release cycle times from 2 weeks to daily deployments.'
    },
    {
      id: 'exp-2',
      role: 'Full Stack Developer',
      company: 'Vanguard Interactive',
      location: 'Austin, TX',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: '• Built responsive fintech portal processing $40M+ in monthly transactions using React, Tailwind CSS, PostgreSQL, and Stripe Connect API.\n• Optimized database indexing, query caching, and Redis layers, slashing median API response times from 340ms to 65ms.\n• Implemented end-to-end automated testing suites with Playwright and Jest, increasing code coverage from 52% to 91%.'
    },
    {
      id: 'exp-3',
      role: 'Software Engineer',
      company: 'ByteWave Labs',
      location: 'San Jose, CA',
      startDate: '2017-08',
      endDate: '2019-05',
      current: false,
      description: '• Collaborated in an agile scrum team to develop customer-facing SaaS tools in JavaScript (ES6+), Python, and Docker.\n• Designed and documented RESTful APIs consumed by iOS, Android, and web client applications.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2013-09',
      endDate: '2017-05',
      grade: '3.88 / 4.0 GPA',
      honors: 'Dean\'s Honor List, Magna Cum Laude'
    }
  ],
  skills: [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'HTML5/CSS3'] },
    { category: 'Backend & Cloud', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS (Lambda, S3, ECS)', 'GraphQL'] },
    { category: 'Tools & DevOps', items: ['Git', 'CI/CD (GitHub Actions)', 'Terraform', 'Jest', 'Playwright', 'Kubernetes'] }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Open Source Dev Observability',
      tech: 'Go, React, ClickHouse, Docker',
      link: 'https://github.com/alexvance/devpulse',
      description: 'Engineered a lightweight metrics visualization tool for developer environments. Gained 1,800+ GitHub stars and featured on Hacker News front page.'
    },
    {
      id: 'proj-2',
      title: 'HyperCache - Distributed In-Memory Cache',
      tech: 'Rust, WebAssembly, gRPC',
      link: 'https://hypercache.dev',
      description: 'Developed high-throughput key-value store with raft consensus and LRU eviction policy, achieving sub-millisecond p99 latencies.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022',
      link: ''
    }
  ],
  languages: [
    { language: 'English', fluency: 'Native / Bilingual' },
    { language: 'Spanish', fluency: 'Professional Working' }
  ],
  customSections: [
    {
      id: 'custom-1',
      title: 'Publications & Speaking',
      items: [
        {
          title: 'Speaker at ReactSummit 2023',
          subtitle: 'Talk: "Architecting Micro-Frontends at Enterprise Scale"',
          date: '2023'
        }
      ]
    }
  ]
};

export const SAMPLE_PRESETS = {
  software_engineer: INITIAL_DATA,
  product_manager: {
    theme: {
      template: 'classic',
      primaryColor: '#0f766e', // Teal
      fontFamily: 'Merriweather',
      fontSize: 'medium',
      spacing: 'normal',
      showPhoto: true,
      accentSidebar: false,
    },
    personal: {
      fullName: 'Sarah Chen',
      jobTitle: 'Principal Product Manager',
      email: 'sarah.chen@productleads.com',
      phone: '+1 (555) 782-9012',
      location: 'New York, NY',
      website: 'https://sarahchen.pm',
      linkedin: 'linkedin.com/in/sarahchen-pm',
      github: '',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      summary: 'Data-driven Principal Product Manager with 8+ years leading cross-functional squads in SaaS, B2B marketplaces, and AI automation. Track record of launching 4 flagship products generating over $35M in ARR, improving user retention by 28%, and establishing customer-centric discovery frameworks across globally distributed organizations.'
    },
    experiences: [
      {
        id: 'pm-exp-1',
        role: 'Principal Product Manager',
        company: 'Stratos Commerce',
        location: 'New York, NY',
        startDate: '2021-04',
        endDate: 'Present',
        current: true,
        description: '• Spearheaded end-to-end strategy, roadmap, and delivery of AI automated workflow engine, driving $18M ARR within 14 months of GA.\n• Led cross-functional squad of 14 engineers, 3 product designers, and product marketing specialists across 3 continents.\n• Instituted continuous user discovery interviews and data telemetry, identifying friction points that increased checkout conversion by 3.4%.'
      },
      {
        id: 'pm-exp-2',
        role: 'Senior Product Manager',
        company: 'FinTrack Systems',
        location: 'Boston, MA',
        startDate: '2018-02',
        endDate: '2021-03',
        current: false,
        description: '• Owned mobile app experience and onboarding funnels, scaling user base from 120K to 1.4M active accounts.\n• Spearheaded A/B testing framework running 20+ experiments per quarter, lifting 30-day retention from 41% to 64%.\n• Partnered with compliance and banking partners to launch real-time instant ACH payouts.'
      }
    ],
    education: [
      {
        id: 'pm-edu-1',
        degree: 'M.B.A. - Technology & Strategy',
        school: 'Columbia Business School',
        location: 'New York, NY',
        startDate: '2016-09',
        endDate: '2018-05',
        grade: 'Dean\'s List',
        honors: 'President of Tech Club'
      },
      {
        id: 'pm-edu-2',
        degree: 'B.S. in Economics',
        school: 'Boston University',
        location: 'Boston, MA',
        startDate: '2012-09',
        endDate: '2016-05',
        grade: '3.8 GPA',
        honors: 'Summa Cum Laude'
      }
    ],
    skills: [
      { category: 'Product Leadership', items: ['Product Strategy', 'Roadmapping', 'User Discovery', 'OKRs & KPIs', 'Go-To-Market (GTM)', 'Agile / Scrum'] },
      { category: 'Data & Analytics', items: ['SQL', 'Mixpanel', 'Amplitude', 'Tableau', 'A/B Testing', 'Hypothesis Validation'] },
      { category: 'Tools', items: ['Jira', 'Figma', 'Linear', 'Notion', 'Productboard', 'Postman'] }
    ],
    projects: [
      {
        id: 'pm-proj-1',
        title: 'ProductFrameworks.io',
        tech: 'Curated Resource Hub',
        link: 'https://productframeworks.io',
        description: 'Created comprehensive open resource of PM prioritization templates utilized by 50,000+ tech professionals worldwide.'
      }
    ],
    certifications: [
      {
        id: 'pm-cert-1',
        name: 'Pragmatic Institute Certified (PMC-III)',
        issuer: 'Pragmatic Institute',
        date: '2020',
        link: ''
      }
    ],
    languages: [
      { language: 'English', fluency: 'Native' },
      { language: 'Mandarin', fluency: 'Bilingual' }
    ],
    customSections: []
  },
  designer: {
    theme: {
      template: 'creative',
      primaryColor: '#7c3aed', // Purple
      fontFamily: 'Poppins',
      fontSize: 'medium',
      spacing: 'compact',
      showPhoto: true,
      accentSidebar: true,
    },
    personal: {
      fullName: 'Marcus Aurel',
      jobTitle: 'Senior UI/UX & Design Systems Lead',
      email: 'marcus@designflow.studio',
      phone: '+1 (555) 492-3118',
      location: 'Los Angeles, CA',
      website: 'https://marcusdesign.studio',
      linkedin: 'linkedin.com/in/marcus-aurel',
      github: 'dribbble.com/marcus-ui',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      summary: 'Passionate Senior Product Designer with 6+ years shaping delightful, accessible, and high-impact digital experiences across SaaS platforms and mobile apps. Specializes in building scalable multi-brand design systems, complex workflows, and data visualization. Champion of accessibility (WCAG AAA) and human-centered design principles.'
    },
    experiences: [
      {
        id: 'des-exp-1',
        role: 'Staff Product Designer',
        company: 'Pulse Design Labs',
        location: 'Los Angeles, CA',
        startDate: '2021-08',
        endDate: 'Present',
        current: true,
        description: '• Built and governed unified design system used by 60+ frontend engineers and 12 product squads across web and native mobile.\n• Redesigned enterprise analytics console, reducing user onboarding friction by 40% and winning 2023 Red Dot Design Award.\n• Conducted over 80 moderated user research sessions and usability testing to validate new generative AI feature suites.'
      },
      {
        id: 'des-exp-2',
        role: 'UI/UX Designer',
        company: 'Studio Kura',
        location: 'Seattle, WA',
        startDate: '2018-06',
        endDate: '2021-07',
        current: false,
        description: '• Delivered responsive digital experiences, branding identities, and e-commerce platforms for high-growth tech clients.\n• Created high-fidelity micro-interactions and animated prototypes with Principle and Framer, boosting stakeholder sign-off speed by 50%.'
      }
    ],
    education: [
      {
        id: 'des-edu-1',
        degree: 'B.F.A. in Interaction & Graphic Design',
        school: 'Rhode Island School of Design (RISD)',
        location: 'Providence, RI',
        startDate: '2014-09',
        endDate: '2018-05',
        grade: 'Honors',
        honors: 'Dean\'s Scholar Award'
      }
    ],
    skills: [
      { category: 'Design Disciplines', items: ['Design Systems', 'UI Architecture', 'User Research', 'Wireframing', 'Rapid Prototyping', 'WCAG Accessibility'] },
      { category: 'Tools & Software', items: ['Figma', 'Framer', 'FigJam', 'Principle', 'Adobe After Effects', 'Miro', 'Zeplin'] },
      { category: 'Frontend Fluency', items: ['HTML5', 'CSS3/Sass', 'Tailwind CSS', 'Design Tokens', 'Storybook'] }
    ],
    projects: [
      {
        id: 'des-proj-1',
        title: 'Aurora UI - Open Token System',
        tech: 'Figma Community Plugin & Design Tokens',
        link: 'https://figma.com/@aurora-tokens',
        description: 'Cross-platform design token management tool with 24,000+ Figma community installs and 5-star rating.'
      }
    ],
    certifications: [
      {
        id: 'des-cert-1',
        name: 'Nielsen Norman Group (NN/g) UX Master Certification',
        issuer: 'Nielsen Norman Group',
        date: '2022',
        link: ''
      }
    ],
    languages: [
      { language: 'English', fluency: 'Native' },
      { language: 'German', fluency: 'Intermediate' }
    ],
    customSections: []
  },
  data_scientist: {
    theme: {
      template: 'minimal',
      primaryColor: '#0369a1', // Deep Sky
      fontFamily: 'Roboto',
      fontSize: 'medium',
      spacing: 'normal',
      showPhoto: false,
      accentSidebar: false,
    },
    personal: {
      fullName: 'Dr. Elena Rostova',
      jobTitle: 'Senior Machine Learning & AI Research Scientist',
      email: 'elena.rostova@ai-research.org',
      phone: '+1 (555) 612-4099',
      location: 'Seattle, WA',
      website: 'https://elenarostova.ai',
      linkedin: 'linkedin.com/in/elena-rostova-ai',
      github: 'github.com/erostova',
      photo: '',
      summary: 'Senior AI & ML Scientist with Ph.D. in Computer Science and 6+ years executing machine learning research and enterprise deployment. Extensive experience fine-tuning Large Language Models (LLMs), designing retrieval-augmented generation (RAG) pipelines, and scaling computer vision models for production. Co-authored 5 papers accepted at NeurIPS and CVPR.'
    },
    experiences: [
      {
        id: 'ds-exp-1',
        role: 'Senior AI Research Scientist',
        company: 'Cognitive Matrix Labs',
        location: 'Seattle, WA',
        startDate: '2022-01',
        endDate: 'Present',
        current: true,
        description: '• Architected enterprise RAG system with hybrid semantic/BM25 search over 100M+ documents, achieving 94.2% retrieval accuracy.\n• Optimized LLM inference using quantization (GPTQ, AWQ) and vLLM, reducing GPU compute overhead by 58% and memory consumption by 40%.\n• Supervised team of 5 data engineers in model lifecycle monitoring, bias mitigation, and safety evaluation.'
      },
      {
        id: 'ds-exp-2',
        role: 'Machine Learning Engineer',
        company: 'NeuroSense BioTech',
        location: 'Cambridge, MA',
        startDate: '2019-06',
        endDate: '2021-12',
        current: false,
        description: '• Developed 3D convolutional neural networks for automated medical imaging segmentation with PyTorch and CUDA.\n• Published research paper in CVPR 2021 demonstrating state-of-the-art IoU accuracy on benchmark volumetric scans.'
      }
    ],
    education: [
      {
        id: 'ds-edu-1',
        degree: 'Ph.D. in Computer Science (Artificial Intelligence)',
        school: 'University of Washington',
        location: 'Seattle, WA',
        startDate: '2015-09',
        endDate: '2019-06',
        grade: 'GPA 3.96',
        honors: 'Outstanding Graduate Researcher Award'
      }
    ],
    skills: [
      { category: 'AI & Deep Learning', items: ['PyTorch', 'Transformers (HuggingFace)', 'LLM Fine-tuning (LoRA/QLoRA)', 'LangChain / LlamaIndex', 'TensorFlow', 'Vector DBs (Milvus, Pinecone)'] },
      { category: 'Programming & Data', items: ['Python', 'C++', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'Spark / PySpark'] },
      { category: 'MLOps & Systems', items: ['vLLM', 'Triton Inference Server', 'Docker', 'Kubeflow', 'MLflow', 'AWS SageMaker'] }
    ],
    projects: [
      {
        id: 'ds-proj-1',
        title: 'OpenRAG - High-Speed Document Intelligence',
        tech: 'Python, PyTorch, FAISS, FastEmbed',
        link: 'https://github.com/erostova/openrag',
        description: 'Open-source benchmark framework for retrieval architectures with 3,200+ stars on GitHub.'
      }
    ],
    certifications: [
      {
        id: 'ds-cert-1',
        name: 'Deep Learning Specialization',
        issuer: 'DeepLearning.AI / Coursera',
        date: '2019',
        link: ''
      }
    ],
    languages: [
      { language: 'English', fluency: 'Fluent' },
      { language: 'French', fluency: 'Conversational' }
    ],
    customSections: []
  }
};

export const COLOR_PALETTES = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Navy Executive', hex: '#1e3a8a' },
  { name: 'Emerald Forest', hex: '#059669' },
  { name: 'Teal Modern', hex: '#0f766e' },
  { name: 'Crimson Slate', hex: '#be123c' },
  { name: 'Purple Violet', hex: '#7c3aed' },
  { name: 'Graphite Charcoal', hex: '#374151' },
  { name: 'Amber Bronze', hex: '#b45309' },
  { name: 'Rose Bloom', hex: '#e11d48' },
  { name: 'Midnight Black', hex: '#09090b' }
];

export const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter (Clean & Modern)', family: "'Inter', sans-serif" },
  { id: 'Roboto', name: 'Roboto (Balanced Neo-Grotesque)', family: "'Roboto', sans-serif" },
  { id: 'Poppins', name: 'Poppins (Geometric & Friendly)', family: "'Poppins', sans-serif" },
  { id: 'Merriweather', name: 'Merriweather (Classic Editorial Serif)', family: "'Merriweather', serif" },
  { id: 'Playfair Display', name: 'Playfair Display (Executive High-End)', family: "'Playfair Display', serif" },
  { id: 'Montserrat', name: 'Montserrat (Authoritative & Crisp)', family: "'Montserrat', sans-serif" }
];

export const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Accelerated', 'Pioneered', 'Engineered', 'Overhauled',
  'Automated', 'Revamped', 'Streamlined', 'Negotiated', 'Deployed', 'Synthesized',
  'Championed', 'Transformed', 'Maximized', 'Curated', 'Eliminated', 'Established',
  'Generated', 'Delivered', 'Orchestrated', 'Optimized', 'Scaled', 'Innovated'
];

export const SUMMARY_TEMPLATES = [
  {
    role: 'Software Engineer',
    text: 'Results-oriented Software Engineer with [X] years of experience building scalable distributed web systems and microservices. Proven proficiency in [Key Tech 1], [Key Tech 2], and cloud infrastructure with a focus on high throughput, zero downtime, and code quality.'
  },
  {
    role: 'Product Manager',
    text: 'Strategic, user-obsessed Product Manager with [X]+ years leading cross-functional teams to launch high-growth SaaS solutions. Expert in customer discovery, data-driven roadmapping, and driving measurable revenue outcomes.'
  },
  {
    role: 'Designer / Creative',
    text: 'Innovative Product & UI/UX Designer dedicated to crafting accessible, beautiful, and intuitive multi-platform user journeys. Experienced in establishing scalable design systems and transforming user research into high-converting products.'
  },
  {
    role: 'Recent Graduate',
    text: 'Ambitious, fast-learning [Major] graduate with strong foundation in [Skill 1], [Skill 2], and practical project experience. Eager to bring strong problem-solving skills and dedication to high-impact challenges.'
  }
];
