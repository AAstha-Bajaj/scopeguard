import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  Save, 
  ArrowRight,
  Info,
  Clock,
  DollarSign,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { PRESET_TEST_REQUESTS } from '../data/sampleProject';

export default function AnalyzerConsole({ 
  onAnalyze, 
  currentAnalysis, 
  isAnalyzing, 
  onSaveToHistory,
  onShowToast
}) {
  const [inputText, setInputText] = useState('');
  const [editableDraft, setEditableDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Sync editable draft when a new analysis completes or when currentAnalysis changes
  useEffect(() => {
    if (currentAnalysis?.responseDraft) {
      setEditableDraft(currentAnalysis.responseDraft);
      setDraftSaved(false);
    }
  }, [currentAnalysis]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    onAnalyze(inputText);
  };

  const handleSelectPreset = (preset) => {
    setInputText(preset.text);
    onAnalyze(preset.text);
  };

  const handleCopy = async () => {
    if (!editableDraft) return;
    try {
      await navigator.clipboard.writeText(editableDraft);
      setCopied(true);
      onShowToast({
        type: 'success',
        message: 'Draft response copied to clipboard!'
      });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback for environments where clipboard write fails
      const textarea = document.createElement('textarea');
      textarea.value = editableDraft;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      onShowToast({
        type: 'success',
        message: 'Draft response copied to clipboard!'
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSave = () => {
    if (!currentAnalysis) return;
    onSaveToHistory({
      ...currentAnalysis,
      responseDraft: editableDraft
    });
    setDraftSaved(true);
    onShowToast({
      type: 'info',
      message: 'Analysis and custom draft saved to history!'
    });
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleReset = () => {
    setInputText('');
    setEditableDraft('');
  };

  // Helper styles & icons for classifications
  const getClassificationMeta = (classification) => {
    switch (classification) {
      case 'Likely Included':
        return {
          icon: <CheckCircle2 size={20} className="text-emerald" />,
          pillClass: 'badge-included',
          borderClass: 'border-included',
          bgClass: 'bg-included-subtle',
          label: 'Likely Included'
        };
      case 'Potentially Out of Scope':
        return {
          icon: <AlertCircle size={20} className="text-rose" />,
          pillClass: 'badge-out-of-scope',
          borderClass: 'border-out-of-scope',
          bgClass: 'bg-out-of-scope-subtle',
          label: 'Potentially Out of Scope'
        };
      case 'Needs Clarification':
      default:
        return {
          icon: <AlertTriangle size={20} className="text-amber" />,
          pillClass: 'badge-clarification',
          borderClass: 'border-clarification',
          bgClass: 'bg-clarification-subtle',
          label: 'Needs Clarification'
        };
    }
  };

  const classMeta = currentAnalysis ? getClassificationMeta(currentAnalysis.classification) : null;

  return (
    <div className="analyzer-console-wrapper">
      {/* Input Box Card */}
      <div className="card analyzer-card">
        <div className="card-header">
          <div className="analyzer-header-left">
            <div className="card-header-icon bg-blue-soft">
              <Send size={18} className="text-blue" />
            </div>
            <div>
              <h3 className="card-title">New Client Request</h3>
              <p className="card-subtitle">Paste incoming client email, Slack message, or revision note</p>
            </div>
          </div>
          
          {inputText && (
            <button 
              type="button" 
              onClick={handleReset} 
              className="btn-text-subtle"
              title="Clear request"
            >
              <RotateCcw size={14} /> Clear
            </button>
          )}
        </div>

        <div className="card-body">
          {/* Preset Prompts bar */}
          <div className="presets-wrapper">
            <span className="presets-label">
              <Sparkles size={13} className="text-indigo" />
              <span>Quick Test Presets:</span>
            </span>
            <div className="presets-list">
              {PRESET_TEST_REQUESTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`preset-chip preset-${p.color}`}
                  onClick={() => handleSelectPreset(p)}
                  title={`Test "${p.title}"`}
                >
                  <span className="preset-chip-tag">{p.tag}</span>
                  <span className="preset-chip-title">{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="analyzer-form">
            <div className="textarea-container">
              <textarea
                className="analyzer-textarea"
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Example: 'Can we add a quick checkout and shopping cart for 3 merchandise items before launch?' or 'Can we tweak the headline font size on the About page?'"
                aria-label="Client request text"
              />
              <div className="textarea-footer">
                <span className="char-count">{inputText.length} characters</span>
                <span className="tip-text">Tip: Test common edge cases or hedge words like "quick", "just", or "simple"</span>
              </div>
            </div>

            <div className="analyzer-actions-row">
              <button
                type="submit"
                disabled={!inputText.trim() || isAnalyzing}
                className="btn btn-primary btn-analyse"
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner-sm" />
                    <span>Analyzing Scope...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Analyse Request</span>
                  </>
                )}
              </button>

              <div className="disclaimer-chip">
                <Info size={13} />
                <span>Simulated Heuristic Analysis • Non-AI Local Verification</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Analysis Results & Draft Generator */}
      {currentAnalysis && (
        <div className={`card analysis-result-card ${classMeta.borderClass}`}>
          {/* Classification Header Banner */}
          <div className={`analysis-banner ${classMeta.bgClass}`}>
            <div className="banner-status-left">
              <div className="banner-icon-wrap">
                {classMeta.icon}
              </div>
              <div>
                <div className="banner-status-title-row">
                  <span className={`status-badge-lg ${classMeta.pillClass}`}>
                    {classMeta.label}
                  </span>
                  <span className="confidence-pill">Confidence: <strong>{currentAnalysis.confidence}</strong></span>
                </div>
                <h4 className="banner-matched-clause">
                  <strong>Clause:</strong> {currentAnalysis.matchedClause}
                </h4>
              </div>
            </div>

            <div className="banner-status-right">
              <div className="impact-box">
                <span className="impact-label"><Clock size={12} /> Effort Estimate</span>
                <span className="impact-val">{currentAnalysis.effortEstimate}</span>
              </div>
              <div className="impact-box">
                <span className="impact-label"><DollarSign size={12} /> Billing Impact</span>
                <span className="impact-val">{currentAnalysis.pricingEstimate}</span>
              </div>
            </div>
          </div>

          <div className="card-body">
            {/* Reason Explanation Card */}
            <div className="reason-explanation-box">
              <h4 className="reason-heading">
                <FileCheck2 size={16} className="text-indigo" />
                <span>Classification Reason & Scope Analysis</span>
              </h4>
              <p className="reason-text">{currentAnalysis.summaryReason}</p>
              
              {currentAnalysis.recommendation && (
                <div className="recommendation-callout">
                  <strong>Recommended Freelancer Posture:</strong> {currentAnalysis.recommendation}
                </div>
              )}

              {currentAnalysis.hasHedgeWarning && (
                <div className="hedge-warning-box">
                  <AlertTriangle size={15} className="text-amber" />
                  <span>
                    <strong>Scope Creep Phrasing Detected:</strong> This request uses minimizing words ("just", "quick", or "simple"). Ensure exact specs are locked down before agreeing.
                  </span>
                </div>
              )}
            </div>

            {/* Editable Client-Response Draft */}
            <div className="response-draft-section">
              <div className="draft-header">
                <div>
                  <h4 className="draft-title">Generated Client Response Draft</h4>
                  <p className="draft-subtitle">
                    Polite, professional, and contract-backed. You can edit this message directly before copying.
                  </p>
                </div>
                
                <div className="draft-actions">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn btn-secondary btn-copy"
                    title="Copy response to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-emerald" />
                        <span className="text-emerald">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Response</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={draftSaved}
                    className="btn btn-subtle btn-save"
                    title="Save current analysis and draft to history"
                  >
                    {draftSaved ? (
                      <>
                        <Check size={15} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Save size={15} />
                        <span>Save to History</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="draft-editor-wrapper">
                <textarea
                  className="draft-textarea"
                  rows={9}
                  value={editableDraft}
                  onChange={(e) => setEditableDraft(e.target.value)}
                  placeholder="Your generated client email response draft will appear here..."
                  aria-label="Editable client response draft"
                />
              </div>

              <div className="draft-footer-info">
                <span>✓ Fully editable. Addresses client Sarah Jenkins by name and protects your $95/hr overtime terms.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
