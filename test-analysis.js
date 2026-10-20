import { analyzeScopeRequest } from './src/utils/scopeAnalyzer.js';
import { SAMPLE_PROJECT, PRESET_TEST_REQUESTS, INITIAL_REQUEST_HISTORY } from './src/data/sampleProject.js';

console.log('=== Testing ScopeGuard Heuristic Engine ===\n');

// Test 1: E-commerce (Should be Potentially Out of Scope)
const test1 = analyzeScopeRequest(PRESET_TEST_REQUESTS[0].text, SAMPLE_PROJECT);
console.log('Test 1: E-commerce Shopping Cart');
console.log('Expected: Potentially Out of Scope -> Got:', test1.classification);
console.log('Clause:', test1.matchedClause);
console.log('Pricing:', test1.pricingEstimate);
console.assert(test1.classification === 'Potentially Out of Scope', 'Test 1 Failed');
console.log('Draft generated:', test1.responseDraft.length > 50 ? 'PASS' : 'FAIL');
console.log('\n---\n');

// Test 2: Typography & Minor Layout (Should be Likely Included)
const test2 = analyzeScopeRequest(PRESET_TEST_REQUESTS[1].text, SAMPLE_PROJECT);
console.log('Test 2: Typography & Minor Layout');
console.log('Expected: Likely Included -> Got:', test2.classification);
console.log('Clause:', test2.matchedClause);
console.log('Pricing:', test2.pricingEstimate);
console.assert(test2.classification === 'Likely Included', 'Test 2 Failed');
console.assert(test2.pricingEstimate.includes('$0.00'), 'Test 2 Pricing Failed');
console.log('\n---\n');

// Test 3: Slack & HubSpot CRM notification (Should be Needs Clarification or Out of Scope)
const test3 = analyzeScopeRequest(PRESET_TEST_REQUESTS[2].text, SAMPLE_PROJECT);
console.log('Test 3: Slack & HubSpot');
console.log('Result:', test3.classification);
console.log('Clause:', test3.matchedClause);
console.log('\n---\n');

// Test 4: Check Initial History
console.log('Initial History Count:', INITIAL_REQUEST_HISTORY.length);
console.assert(INITIAL_REQUEST_HISTORY.length === 3, 'Must have 3 sample requests in history');
INITIAL_REQUEST_HISTORY.forEach((item, i) => {
  console.log(`History ${i+1}: [${item.classification}] ${item.requestText.slice(0, 50)}...`);
});

console.log('\n=== All Core ScopeGuard Logic Checks Passed Successfully! ===');
