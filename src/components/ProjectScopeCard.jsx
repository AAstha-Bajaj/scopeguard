import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  FileCheck, 
  Layers, 
  ShieldAlert, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

export default function ProjectScopeCard({ project }) {
  const [activeTab, setActiveTab] = useState('deliverables');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="card scope-summary-card">
      <div className="card-header scope-card-header">
        <div className="scope-header-left">
          <div className="card-header-icon bg-indigo-soft">
            <FileCheck size={20} className="text-indigo" />
          </div>
          <div>
            <h2 className="card-title">Signed Project Scope Baseline</h2>
            <p className="card-subtitle">
              Agreed terms for <strong className="text-dark">{project.title}</strong>
            </p>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-icon-subtle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse Scope Details" : "Expand Scope Details"}
          title={isExpanded ? "Collapse Scope Details" : "Expand Scope Details"}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isExpanded && (
        <div className="card-body">
          {/* Quick Metrics Grid */}
          <div className="scope-metrics-grid">
            <div className="scope-metric-box">
              <div className="metric-icon-wrap text-emerald">
                <DollarSign size={16} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Agreed Budget</span>
                <span className="metric-val">${project.budget.total.toLocaleString()}</span>
                <span className="metric-sub">Paid: ${project.budget.paidToDate.toLocaleString()} | Due: ${project.budget.remaining.toLocaleString()}</span>
              </div>
            </div>

            <div className="scope-metric-box">
              <div className="metric-icon-wrap text-amber">
                <Clock size={16} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Revision Limit</span>
                <span className="metric-val">{project.revisionPolicy.remainingRounds} of {project.revisionPolicy.maxRounds} Round(s) Left</span>
                <span className="metric-sub">{project.revisionPolicy.completedRounds} round completed</span>
              </div>
            </div>

            <div className="scope-metric-box">
              <div className="metric-icon-wrap text-indigo">
                <Layers size={16} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Agreed Scope</span>
                <span className="metric-val">{project.deliverables.length} Page Deliverables</span>
                <span className="metric-sub">{project.exclusions.length} Explicit Exclusions</span>
              </div>
            </div>

            <div className="scope-metric-box">
              <div className="metric-icon-wrap text-rose">
                <ShieldAlert size={16} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Out-of-Scope Work</span>
                <span className="metric-val">${project.budget.outOfScopeRate}/hr</span>
                <span className="metric-sub">Requires approved Change Order</span>
              </div>
            </div>
          </div>

          {/* Original Scope Statement */}
          <div className="original-scope-statement">
            <span className="statement-badge">Original Scope Objective:</span>
            <p className="statement-text">"{project.originalScopeSummary}"</p>
          </div>

          {/* Tabs navigation */}
          <div className="scope-tabs-nav">
            <button
              type="button"
              className={`scope-tab-btn ${activeTab === 'deliverables' ? 'active' : ''}`}
              onClick={() => setActiveTab('deliverables')}
            >
              <CheckCircle2 size={16} />
              <span>Agreed Deliverables ({project.deliverables.length})</span>
            </button>

            <button
              type="button"
              className={`scope-tab-btn ${activeTab === 'exclusions' ? 'active' : ''}`}
              onClick={() => setActiveTab('exclusions')}
            >
              <XCircle size={16} />
              <span>Explicit Exclusions ({project.exclusions.length})</span>
            </button>

            <button
              type="button"
              className={`scope-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              <Clock size={16} />
              <span>Revisions & Change Orders</span>
            </button>
          </div>

          {/* Tab Content: Deliverables */}
          {activeTab === 'deliverables' && (
            <div className="scope-tab-content">
              <div className="deliverables-list">
                {project.deliverables.map((item, idx) => (
                  <div key={item.id} className="deliverable-item">
                    <div className="item-header">
                      <div className="item-title-row">
                        <span className="item-number">0{idx + 1}</span>
                        <h4 className="item-title">{item.title}</h4>
                      </div>
                      <span className={`status-pill status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="item-desc">{item.description}</p>
                    <div className="item-keywords">
                      <Tag size={12} className="tag-icon" />
                      <span className="keywords-label">In-scope triggers:</span>
                      {item.includedKeywords.slice(0, 5).map((kw) => (
                        <span key={kw} className="keyword-chip in-scope">{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Exclusions */}
          {activeTab === 'exclusions' && (
            <div className="scope-tab-content">
              <div className="exclusions-banner">
                <ShieldAlert size={18} className="text-rose" />
                <span>The following capabilities were explicitly declared <strong>Out of Scope</strong> in Section 4 of the contract and require a billable Change Order.</span>
              </div>
              <div className="exclusions-grid">
                {project.exclusions.map((ex) => (
                  <div key={ex.id} className="exclusion-item">
                    <div className="exclusion-header">
                      <span className="exclusion-category">{ex.category}</span>
                      <span className="badge badge-out-of-scope">Excluded</span>
                    </div>
                    <h4 className="exclusion-title">{ex.title}</h4>
                    <p className="exclusion-desc">{ex.description}</p>
                    <div className="exclusion-keywords">
                      <span className="keywords-label">Excluded triggers:</span>
                      {ex.keywords.slice(0, 4).map((kw) => (
                        <span key={kw} className="keyword-chip out-of-scope">{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Revision & Hourly Terms */}
          {activeTab === 'terms' && (
            <div className="scope-tab-content terms-tab">
              <div className="terms-grid">
                <div className="term-card">
                  <h4 className="term-card-title">Revision Threshold Policy</h4>
                  <p className="term-card-body">
                    {project.revisionPolicy.notes}
                  </p>
                  <div className="revision-bar-wrapper">
                    <div className="revision-bar-label">
                      <span>Rounds Used: <strong>{project.revisionPolicy.completedRounds}</strong></span>
                      <span>Remaining: <strong>{project.revisionPolicy.remainingRounds}</strong></span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(project.revisionPolicy.completedRounds / project.revisionPolicy.maxRounds) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="term-card">
                  <h4 className="term-card-title">Change Order Protocol</h4>
                  <p className="term-card-body">
                    Any feature or change falling outside agreed deliverables is billed at <strong>${project.budget.outOfScopeRate}/hr</strong>. 
                    Before any out-of-scope development begins, ScopeGuard generates an approval draft for the client to confirm in writing.
                  </p>
                  <div className="term-callout">
                    <span>💡 Milestone Protection: Unapproved out-of-scope work will never silently extend launch deadlines.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
