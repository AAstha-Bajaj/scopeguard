export const SAMPLE_PROJECT = {
  id: "proj-abc-001",
  title: "Website Redesign for ABC Studio",
  client: "ABC Creative Studio & Partners",
  clientContact: "Sarah Jenkins (Creative Director)",
  status: "In Progress (Milestone 2/3)",
  timeline: "6 Weeks (Week 4 of 6)",
  budget: {
    total: 6500,
    currency: "USD",
    type: "Fixed Milestone",
    paidToDate: 4000,
    remaining: 2500,
    outOfScopeRate: 95, // $95/hr for additional work
  },
  revisionPolicy: {
    maxRounds: 2,
    completedRounds: 1,
    remainingRounds: 1,
    notes: "2 rounds of design feedback per page template included. Additional revisions billed at standard hourly rate ($95/hr) with minimum 1-hour increments."
  },
  originalScopeSummary: "Complete modern redesign and front-end development of the agency portfolio website to showcase design projects, team bios, service packages, and capture inbound client inquiries.",
  deliverables: [
    {
      id: "del-1",
      title: "5 Responsive Page Templates",
      description: "Homepage, About Us, Services, Case Studies listing & detail template, and Contact page.",
      status: "In Review",
      includedKeywords: ["page", "template", "home", "about", "services", "case study", "portfolio", "contact"]
    },
    {
      id: "del-2",
      title: "Mobile-First Responsive Layouts",
      description: "Optimized for Desktop (1440px+), Tablet (768px-1024px), and Mobile (375px-430px) screens.",
      status: "Approved",
      includedKeywords: ["mobile", "responsive", "tablet", "screen", "breakpoint", "css", "layout", "safari", "chrome"]
    },
    {
      id: "del-3",
      title: "Standard Inbound Contact Form",
      description: "Name, email, project budget selector, message field with basic client-side validation and email delivery via EmailJS / standard SMTP.",
      status: "Completed",
      includedKeywords: ["contact form", "form", "inquiry", "fields", "email", "submit", "validation"]
    },
    {
      id: "del-4",
      title: "Foundational On-Page SEO",
      description: "Semantic HTML5, OpenGraph meta tags, XML sitemap generation, favicon setup, and Google Search Console verification readiness.",
      status: "Pending Launch",
      includedKeywords: ["seo", "meta tags", "sitemap", "opengraph", "social preview", "title tag", "favicon"]
    },
    {
      id: "del-5",
      title: "CMS / Markdown Content Handoff",
      description: "1-hour Zoom training walkthrough and recorded Loom video demonstrating how to update case studies and team bios.",
      status: "Scheduled for Final Phase",
      includedKeywords: ["training", "zoom", "handoff", "walkthrough", "loom", "documentation", "guide"]
    }
  ],
  exclusions: [
    {
      id: "ex-1",
      category: "E-Commerce & Transactions",
      title: "E-Commerce, Checkout, or Payment Processing",
      description: "Stripe/PayPal gateways, shopping carts, product catalog databases, inventory tracking, and payment security compliance.",
      keywords: ["shop", "store", "cart", "checkout", "stripe", "paypal", "payment", "buy", "merchandise", "product catalog", "ecommerce", "e-commerce", "order"]
    },
    {
      id: "ex-2",
      category: "Backend & User Accounts",
      title: "Custom User Authentication & Client Portals",
      description: "User login/signup, password resets, member dashboard, protected document repository, role-based access control.",
      keywords: ["login", "user account", "portal", "client portal", "authentication", "dashboard", "member", "signup", "register", "password", "backend database", "sql", "firebase auth"]
    },
    {
      id: "ex-3",
      category: "Content Creation",
      title: "Copywriting, Stock Asset Licensing & Custom Photography",
      description: "Drafting marketing copy, purchasing premium stock photography or video licenses, or original brand logo design.",
      keywords: ["write copy", "copywriting", "stock photo license", "photo shoot", "write blog posts", "logo redesign", "branding package", "article writing"]
    },
    {
      id: "ex-4",
      category: "Localization & Multi-Language",
      title: "Multi-Language Internationalization (i18n)",
      description: "Automated translation engines, localized routing (e.g. /es, /fr), multi-currency switchers, or translated asset repositories.",
      keywords: ["multi-language", "multilingual", "translation", "spanish", "french", "german", "i18n", "language switcher", "locale", "translate"]
    },
    {
      id: "ex-5",
      category: "Third-Party Integrations",
      title: "Advanced CRM / Webhook Automations",
      description: "Custom HubSpot/Salesforce two-way syncing, Zapier webhook workflows, ERP feeds, or automated newsletter drip campaigns.",
      keywords: ["hubspot", "salesforce", "crm integration", "zapier", "webhook", "mailchimp drip", "airtable sync", "api integration", "database sync"]
    },
    {
      id: "ex-6",
      category: "Revisions Beyond Agreement",
      title: "Revisions Exceeding Round 2 or Post-Approval Changes",
      description: "Complete layout redesigns after design sign-off, or additional revision iterations beyond the 2 included rounds.",
      keywords: ["complete redesign", "start from scratch", "re-do the layout", "another round of revisions", "revision 3", "revision 4"]
    }
  ]
};

export const INITIAL_REQUEST_HISTORY = [
  {
    id: "hist-001",
    timestamp: "2026-10-14 11:24 AM",
    requestText: "Can we integrate a booking calendar widget like Calendly or Acuity into the contact section so clients can schedule intro calls directly?",
    classification: "Needs Clarification",
    confidence: "Medium",
    matchedClause: "Deliverable 3 (Contact Form) vs. Exclusions 5 (Third-Party Integrations)",
    summaryReason: "Embedding a pre-existing iframe widget (e.g., standard Calendly embed code provided by the client) is a quick 15-minute adjustment that fits within minor revisions. However, setting up custom API booking sync or styling an embedded third-party app goes beyond agreed scope.",
    effortEstimate: "0.5 - 1 hr (if simple embed) / 4-6 hrs (if API sync)",
    pricingEstimate: "Included if client provides iframe snippet; $95/hr if API custom setup needed",
    responseDraft: `Hi Sarah,

Thanks for reaching out! 

Embedding a standard booking widget (like Calendly) into the Contact page is something we can easily accommodate. 

To keep this within our current agreed scope and timeline:
- If you have an active Calendly account and can share the embed code / link, I'd be glad to place it on the Contact page as part of our remaining revision round at no extra charge.
- If you're looking for custom two-way calendar sync, customized widget styling, or automated CRM routing, that would require a small add-on scope (~$250 - $400).

Let me know which approach you prefer and send over the embed code if you have it ready!

Best regards,
Alex`
  },
  {
    id: "hist-002",
    timestamp: "2026-10-16 02:45 PM",
    requestText: "On the Case Studies page, the mobile navigation drawer alignment feels slightly off when viewing on Safari iOS. Can we also tweak the subhead font size on the About page?",
    classification: "Likely Included",
    confidence: "High",
    matchedClause: "Deliverables 1 & 2 (Responsive Page Templates & Mobile-First Layouts) & Revision Round 2",
    summaryReason: "This request directly addresses cross-browser mobile responsiveness (Deliverable 2) and minor typographic styling on an agreed page template (Deliverable 1). It is fully covered under the remaining revision round.",
    effortEstimate: "1 - 2 hours",
    pricingEstimate: "$0.00 (Covered under Milestone 2 & Revision Round 2)",
    responseDraft: `Hi Sarah,

Great catch on the Safari iOS mobile drawer alignment! I will inspect the viewport height and z-index behavior specifically for Safari and get that looking seamless.

I'll also adjust the subhead font size on the About page to match your updated hierarchy. Since this falls right within our agreed mobile QA and our remaining revision round, there is no extra charge for this.

I'll have these updates pushed to the staging preview by tomorrow afternoon for your review.

Best regards,
Alex`
  },
  {
    id: "hist-003",
    timestamp: "2026-10-18 09:15 AM",
    requestText: "Our European partners mentioned they'd love the site to be available in French and Spanish. Can we add a multi-language switcher dropdown in the header with translated pages?",
    classification: "Potentially Out of Scope",
    confidence: "High",
    matchedClause: "Explicit Exclusion 4: Multi-Language Internationalization (i18n)",
    summaryReason: "Multi-language internationalization (i18n routing, content translation structure, and language switchers) is explicitly excluded under Section 4.4 of our agreement. This represents a significant architectural addition.",
    effortEstimate: "14 - 18 hours",
    pricingEstimate: "$1,330 - $1,710 (14-18 hrs @ $95/hr standard out-of-scope rate)",
    responseDraft: `Hi Sarah,

Expanding ABC Studio's web presence into French and Spanish is an exciting strategic step for your European reach!

Looking at our project agreement, multi-language internationalization (i18n routing, localized content structures, and translated asset management) is explicitly listed under Section 4 (Exclusions) and wasn't budgeted into our initial 5-page English build.

Because we're currently in Week 4 focusing on our core launch milestones, here is how I recommend handling this:

1. **Option A (Recommended): Launch English First** — We launch the core redesign on schedule, and prepare a Phase 2 Change Order immediately after launch to implement a full i18n localization system.
2. **Option B: Add to Current Milestone** — We can draft a Change Order now for an estimated 14-18 hours ($1,330 - $1,710 at our $95/hr rate), which would extend our launch target by approximately 1.5 weeks.

Let me know which route aligns best with your team's priorities!

Best regards,
Alex`
  }
];

export const PRESET_TEST_REQUESTS = [
  {
    title: "E-Commerce Checkout Request",
    tag: "Out of Scope",
    color: "red",
    text: "Could we add a quick shopping cart and Stripe checkout so visitors can buy 3 branded t-shirts and our physical agency book directly from the site before launch?"
  },
  {
    title: "Typography & Layout Polish",
    tag: "Likely Included",
    color: "green",
    text: "Can we adjust the hero section headline font size on the homepage, swap the secondary photo on the About page, and fix the button hover color to match our new brand hex #2563EB?"
  },
  {
    title: "CRM / Notification Request",
    tag: "Needs Clarification",
    color: "amber",
    text: "We'd like the contact form submissions to automatically notify our team channel in Slack and sync the inquiries into HubSpot."
  },
  {
    title: "Client Portal & Logins",
    tag: "Out of Scope",
    color: "red",
    text: "We want our existing studio clients to log into a password-protected portal to download their high-res brand asset folders and view project invoices."
  },
  {
    title: "Copywriting & Content Writing",
    tag: "Out of Scope",
    color: "red",
    text: "We don't have time to write the case study stories or team biographies. Could you research our past projects and write 6 detailed 800-word case studies for us?"
  }
];
