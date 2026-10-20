# ScopeGuard 🛡️

> **Scope Defense & Change-Order Assistant for Freelance Web Designers and Developers**

ScopeGuard is a modern, responsive single-page SaaS dashboard built with **React**, **Vite**, **JavaScript**, and modular modern **CSS**. It helps freelance web professionals quickly evaluate incoming client messages, check them against agreed project deliverables and signed contract exclusions, classify whether requests fall within scope, and generate professional, assertive client email responses.

---

## 🚀 Key Features

- **Sample Project Baseline ("Website Redesign for ABC Studio")**:
  - Displays original project scope objective.
  - Lists **5 agreed page deliverables** (templates, responsive layouts, contact form, foundational SEO, and handoff training).
  - Explicitly highlights **6 declared exclusions** (e-commerce/payments, user authentication/portals, copywriting, multi-language/i18n, custom CRM webhooks, and revisions exceeding limits).
  - Tracks project budget (\$6,500 milestone), paid amount, and **out-of-scope hourly rate (\$95/hr)**.
  - Tracks revision limits (2 included rounds, tracking used vs. remaining rounds).
- **Interactive Request Scope Analyzer**:
  - Enter raw client requests from email or Slack.
  - Quick test preset prompt chips to demonstrate various scope scenarios with a single click.
  - Detects scope-creep hedge phrases (e.g., *"can we just"*, *"quick addition"*, *"simple tweak"*).
- **Three-Tier Scope Classification**:
  - 🟢 **Likely Included**: Covered under agreed deliverables and within revision limits.
  - 🔴 **Potentially Out of Scope**: Violates explicit contract exclusions or exceeds agreed revisions.
  - 🟡 **Needs Clarification**: Ambiguous requests (e.g., simple embed snippet vs. full API integration).
- **Clause Citation & Impact Assessment**:
  - Cites the exact clause or section from the agreement.
  - Provides estimated effort (hours) and transparent billing impact based on the contractual rate (\$95/hr).
- **Editable Professional Response Generator**:
  - Automatically drafts a courteous, assertive response addressed to the client (*Sarah Jenkins*).
  - Allows full live editing by the freelancer before sending.
  - Working **"Copy Response"** button with clipboard write and instant feedback toast.
  - Option to save custom analyses and edited drafts directly to the history log.
- **Request History & Audit Log**:
  - Pre-populated with **three realistic historical client requests** representing all three classifications.
  - Filter by category (`All`, `Likely Included`, `Potentially Out of Scope`, `Needs Clarification`).
  - Search requests by keyword.
  - Expand to view full historical reasoning or click **"Load in Console"** to restore.
- **Contract Scope Modal**:
  - Formal view of the signed Scope of Work (SOW) agreement.
- **100% Transparent Simulated Engine**:
  - Clearly labeled as a local heuristic pattern-matching engine.
  - Requires **zero external AI APIs**, zero databases, and zero user authentication.
  - Preserves privacy with zero data transmission.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: JavaScript (ES Modules)
- **Styling**: Custom CSS Design System (CSS Custom Properties, Responsive Flexbox & Grid)
- **Icons**: Lucide React (`lucide-react`)
- **Fonts**: Plus Jakarta Sans & JetBrains Mono

---

## 💻 Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended; developed and tested on v24.11.1)
- npm (v9 or higher)

### Installation & Launch

1. **Open terminal** in the project directory:
   ```bash
   cd c:\Users\Lenovo\OneDrive\Documents\scopeguard
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at:
   ```
   http://127.0.0.1:5173/
   ```
   *(or `http://localhost:5173/`)*

4. **Run the automated heuristic verification tests**:
   ```bash
   npm test
   ```

5. **Build for production preview**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧪 Testing the Main Workflow

1. **Inspect Signed Scope**: View the left column to inspect the 5 agreed deliverables, 6 exclusions, and the 2-round revision policy for *Website Redesign for ABC Studio*.
2. **Test Out-of-Scope Detection**: Click the quick preset chip **"E-Commerce Checkout Request"** or paste:
   > *"Could we add a quick shopping cart and Stripe checkout so visitors can buy 3 merchandise items before launch?"*
   - Click **"Analyse Request"**.
   - Notice the classification badge changes to 🔴 **Potentially Out of Scope**, citing **Section 4 Exclusions (E-Commerce & Transactions)**.
   - Review the estimated billing impact (\$1,140 - \$1,900 at \$95/hr) and the generated change-order proposal email.
3. **Edit & Copy Response Draft**:
   - Make an inline edit to the draft in the text area.
   - Click **"Copy Response"** and observe the green checkmark and toast notification indicating it has been copied to your clipboard.
4. **Test In-Scope Detection**: Click the **"Typography & Layout Polish"** preset chip.
   - Observe the 🟢 **Likely Included** classification, \$0.00 billing impact, and confirmation that it's covered under the remaining revision round.
5. **Test Ambiguous / Needs Clarification**: Click the **"CRM / Notification Request"** preset chip.
   - Observe the 🟡 **Needs Clarification** classification with clarifying questions distinguishing between a static embed and custom API webhooks.
6. **Audit Past Requests**: Scroll to the **Request History & Scope Audit Log** section. Filter by status or click **"View Breakdown"** on any of the 3 pre-loaded requests to review past analyses.

---

## ⚠️ System Limitations & Disclaimers

- **Simulated Heuristic Inference**: ScopeGuard utilizes local, transparent keyword and pattern-matching logic to match requests against defined contract deliverables, revision counters, and exclusion rules. It is **not** an external large language model (LLM) and does not transmit data over the network.
- **Sample Contract Scope**: The current demo is wired to the sample project *"Website Redesign for ABC Studio"*. In a production system, projects would be loaded from a user-configured contract database or uploaded SOW document.
- **Client-Side State**: Analysis history and draft edits are maintained in memory for the active browser session. Refreshing the browser resets the session back to the initial sample state.
- **Informational Tool**: The generated response drafts and pricing estimates serve as professional suggestions and negotiation starting points for freelancers, not binding legal counsel.
