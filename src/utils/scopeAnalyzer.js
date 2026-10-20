import { SAMPLE_PROJECT } from '../data/sampleProject.js';

/**
 * Transparent, keyword-based simulated heuristic analyzer.
 * Compares client request text against agreed deliverables, revision limits, and explicit exclusions.
 * Fully transparent with zero external API calls or databases.
 */
export function analyzeScopeRequest(rawText, project = SAMPLE_PROJECT) {
  if (!rawText || !rawText.trim()) {
    return null;
  }

  const text = rawText.toLowerCase().trim();

  // Match against exclusions
  const matchedExclusions = [];
  project.exclusions.forEach((ex) => {
    const hits = ex.keywords.filter((kw) => text.includes(kw.toLowerCase()));
    if (hits.length > 0) {
      matchedExclusions.push({
        exclusion: ex,
        hits,
        score: hits.length
      });
    }
  });

  // Match against included deliverables
  const matchedDeliverables = [];
  project.deliverables.forEach((del) => {
    const hits = del.includedKeywords.filter((kw) => text.includes(kw.toLowerCase()));
    if (hits.length > 0) {
      matchedDeliverables.push({
        deliverable: del,
        hits,
        score: hits.length
      });
    }
  });

  // Check for common scope-creep hedge phrases ("just", "quick", "simple", "small tweak", "add-on")
  const hedgeWords = ["just a quick", "simple addition", "can we just", "won't take long", "small thing", "while you're at it"];
  const hasHedge = hedgeWords.some((h) => text.includes(h));

  // Check for revision limit mentions
  const revisionKeywords = ["round 3", "third round", "fourth round", "another revision", "start over", "scratch"];
  const mentionsExcessRevisions = revisionKeywords.some((r) => text.includes(r));

  // Determine Classification
  let classification = "Needs Clarification";
  let confidence = "Medium";
  let matchedClause = "";
  let summaryReason = "";
  let effortEstimate = "";
  let pricingEstimate = "";
  let recommendation = "";
  let matchedKeywords = [];

  // RULE 1: Severe Out of Scope Triggers
  if (matchedExclusions.length > 0) {
    const topExclusion = matchedExclusions.sort((a, b) => b.score - a.score)[0];
    matchedKeywords = topExclusion.hits;

    // Check if it's an ambiguous embed / third party widget vs heavy integration
    const isEmbedAmbiguous = (text.includes("calendly") || text.includes("widget") || text.includes("iframe") || text.includes("embed") || text.includes("slack")) &&
      (text.includes("form") || text.includes("contact") || text.includes("button"));

    if (isEmbedAmbiguous && !text.includes("checkout") && !text.includes("stripe") && !text.includes("portal") && !text.includes("login")) {
      classification = "Needs Clarification";
      confidence = "Medium";
      matchedClause = `Deliverable 3 (${project.deliverables[2].title}) vs. ${topExclusion.exclusion.title}`;
      summaryReason = `The request mentions a third-party service or notification (${matchedKeywords.join(", ")}). A basic embed or standard link might be handled within minor revisions, but automated syncing or deep API integration falls under ${topExclusion.exclusion.title}.`;
      effortEstimate = "0.5 - 1 hr (if simple embed) / 3 - 5 hrs (if custom API/webhook)";
      pricingEstimate = "Free if static embed; ~$95/hr for API or webhook configuration";
      recommendation = "Ask the client to clarify whether they simply want a standard embed code placed on the page, or if they expect an automated workflow integration.";
    } else {
      classification = "Potentially Out of Scope";
      confidence = topExclusion.hits.length >= 2 ? "High" : "Medium";
      matchedClause = `Section 4 Exclusions: ${topExclusion.exclusion.title}`;
      summaryReason = `This request references functionality (${matchedKeywords.join(", ")}) that is explicitly excluded in Section 4 of your agreement (${topExclusion.exclusion.title}). It is not covered under the \$${project.budget.total.toLocaleString()} milestone package.`;
      
      // Calculate realistic effort estimate based on exclusion category
      if (topExclusion.exclusion.id === "ex-1") { // Ecommerce
        effortEstimate = "12 - 20 hours";
        pricingEstimate = `$1,140 - $1,900 (12-20 hrs @ $${project.budget.outOfScopeRate}/hr)`;
      } else if (topExclusion.exclusion.id === "ex-2") { // User accounts
        effortEstimate = "16 - 28 hours";
        pricingEstimate = `$1,520 - $2,660 (16-28 hrs @ $${project.budget.outOfScopeRate}/hr)`;
      } else if (topExclusion.exclusion.id === "ex-4") { // i18n
        effortEstimate = "14 - 18 hours";
        pricingEstimate = `$1,330 - $1,710 (14-18 hrs @ $${project.budget.outOfScopeRate}/hr)`;
      } else if (topExclusion.exclusion.id === "ex-3") { // Copywriting
        effortEstimate = "8 - 12 hours";
        pricingEstimate = `$760 - $1,140 (8-12 hrs @ $${project.budget.outOfScopeRate}/hr)`;
      } else {
        effortEstimate = "6 - 10 hours";
        pricingEstimate = `$570 - $950 (6-10 hrs @ $${project.budget.outOfScopeRate}/hr)`;
      }
      
      recommendation = "Protect your project timeline. Acknowledge the idea, politely state that it's outside the initial agreement, and provide a Change Order proposal or Phase 2 roadmap.";
    }
  } else if (mentionsExcessRevisions) {
    // RULE 2: Revision Limit Exceeded
    classification = "Potentially Out of Scope";
    confidence = "High";
    matchedClause = `Scope Terms: Revision Limits (Max ${project.revisionPolicy.maxRounds} Rounds)`;
    summaryReason = `Your project terms include ${project.revisionPolicy.maxRounds} rounds of feedback per page. You have already utilized ${project.revisionPolicy.completedRounds} round(s). Major restructuring or post-approval redraws are billed at the standard rate.`;
    effortEstimate = "4 - 8 hours per page template";
    pricingEstimate = `$380 - $760 (billed at $${project.budget.outOfScopeRate}/hr)`;
    recommendation = "Remind the client of the revision policy and offer an hourly estimate to complete the extra iterations.";
  } else if (matchedDeliverables.length > 0) {
    // RULE 3: Matches Deliverables and no exclusions
    const topDeliverable = matchedDeliverables.sort((a, b) => b.score - a.score)[0];
    matchedKeywords = topDeliverable.hits;

    // Check if the request is excessively large or vague
    const isVagueOrComplex = text.length > 300 || text.includes("completely change") || text.includes("entirely new");

    if (isVagueOrComplex) {
      classification = "Needs Clarification";
      confidence = "Medium";
      matchedClause = `Deliverable: ${topDeliverable.deliverable.title} (Scope Boundary)`;
      summaryReason = `While the topic relates to an agreed deliverable (${topDeliverable.deliverable.title}), the phrasing suggests substantial changes that could exceed your remaining revision round (${project.revisionPolicy.remainingRounds} remaining).`;
      effortEstimate = "2 - 5 hours depending on clarification";
      pricingEstimate = "Covered if minor tweak; $95/hr if layout is redrawn from scratch";
      recommendation = "Confirm the specific scope of adjustments before starting to prevent an unexpected redesign cycle.";
    } else {
      classification = "Likely Included";
      confidence = topDeliverable.hits.length >= 2 ? "High" : "Medium";
      matchedClause = `Deliverable: ${topDeliverable.deliverable.title}`;
      summaryReason = `This request directly aligns with agreed Deliverable (${topDeliverable.deliverable.title}) and falls within your remaining revision allocation (Round ${project.revisionPolicy.completedRounds + 1} of ${project.revisionPolicy.maxRounds}).`;
      effortEstimate = "1 - 3 hours";
      pricingEstimate = "$0.00 (Covered under agreed milestone)";
      recommendation = "Confirm receipt with the client and note that this will be addressed in the current review cycle.";
    }
  } else {
    // RULE 4: No direct keyword hits found (Vague or Unspecified)
    classification = "Needs Clarification";
    confidence = "Low";
    matchedClause = "General Project Agreement & Deliverables Baseline";
    summaryReason = "The request does not distinctly match known deliverable keywords or explicit exclusion clauses. It requires further clarification from the client before committing.";
    effortEstimate = "TBD after scoping call";
    pricingEstimate = "TBD (Dependent on technical requirements)";
    recommendation = "Send a clarifying question to define the exact functionality, user flow, and design expectations.";
  }

  // Generate Editable Professional Client Response Draft
  const responseDraft = generateClientDraft({
    classification,
    matchedClause,
    summaryReason,
    effortEstimate,
    pricingEstimate,
    rawText,
    matchedKeywords,
    clientName: project.clientContact.split(" ")[0] || "Client",
    projectTitle: project.title,
    hourlyRate: project.budget.outOfScopeRate,
    hasHedge
  });

  return {
    id: `req-${Date.now()}`,
    timestamp: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    requestText: rawText,
    classification,
    confidence,
    matchedClause,
    summaryReason,
    effortEstimate,
    pricingEstimate,
    recommendation,
    matchedKeywords,
    hasHedgeWarning: hasHedge,
    responseDraft
  };
}

/**
 * Generates an editable, assertive, yet polite email draft for the freelancer.
 */
function generateClientDraft({
  classification,
  matchedClause,
  summaryReason,
  effortEstimate,
  pricingEstimate,
  rawText,
  matchedKeywords,
  clientName,
  projectTitle,
  hourlyRate
}) {
  if (classification === "Likely Included") {
    return `Hi ${clientName},

Thanks for sending over this update regarding the ${projectTitle}!

I've reviewed your request and this falls right within our agreed scope for ${matchedClause}. Because we still have our remaining review round open, I will incorporate these adjustments directly into our current build at no additional cost.

I will have this updated in the staging environment for you to review within the next 24 to 48 hours.

Let me know if you have any questions in the meantime!

Best regards,
Alex`;
  }

  if (classification === "Potentially Out of Scope") {
    return `Hi ${clientName},

Thank you for sharing this idea! It's a great concept and I can see how it would bring extra value to the site.

When reviewing our signed project agreement for the ${projectTitle}, this feature falls under ${matchedClause}. Because our current $6,500 milestone budget is focused specifically on the core 5-page responsive architecture and launch milestones, this wasn't included in our initial scope.

To make sure we keep our current launch timeline on track without any delays, here are two paths we can take:

1. **Option 1: Add as a Phase 2 Enhancement (Recommended)**
   We proceed with our scheduled launch for the core website. Immediately following launch, we can roll this out as a focused Phase 2 feature.

2. **Option 2: Approve a Change Order Now**
   If this is critical for Day 1 launch, I can prepare a brief Change Order for this scope (estimated at ${effortEstimate}, ${pricingEstimate}). This would adjust our launch target by approximately 1 week.

Which approach would you prefer to explore? Happy to jump on a quick 5-minute call if helpful!

Best regards,
Alex`;
  }

  // Needs Clarification
  return `Hi ${clientName},

Thanks for reaching out about this!

Before I dive into implementation, I want to clarify a few details regarding this request so we ensure it's delivered efficiently and stays aligned with our project scope:

1. Could you share a bit more detail on the exact workflow or design you have in mind?
2. If this involves a third-party tool or service, do you already have an existing account or embed snippet ready?

If this is a standard lightweight addition or embed, we can likely fold it into our remaining revision round. If it requires custom backend integration or extensive configuration, I'll be happy to provide a transparent estimate (${hourlyRate}/hr) before we begin.

Looking forward to your thoughts so we can keep moving forward smoothly!

Best regards,
Alex`;
}
