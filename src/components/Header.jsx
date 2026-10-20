import React from 'react';
import { Shield, Sparkles, FileText, CheckCircle, Clock } from 'lucide-react';

export default function Header({ project, onOpenScopeModal }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="logo-badge">
            <Shield className="logo-icon" size={26} />
          </div>
          <div className="brand-text">
            <div className="brand-row">
              <h1 className="brand-title">ScopeGuard</h1>
              <span className="badge badge-beta">SaaS Preview</span>
            </div>
            <p className="brand-subtitle">Scope Defense & Change-Order Assistant for Freelancers</p>
          </div>
        </div>

        <div className="header-actions">
          {/* Simulated Engine Notice Banner */}
          <div className="simulated-pill">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Simulated Heuristic Engine (100% Local • Zero APIs)</span>
          </div>

          <button 
            type="button"
            onClick={onOpenScopeModal}
            className="btn btn-secondary btn-sm header-scope-btn"
            title="View complete signed Scope of Work contract"
          >
            <FileText size={16} />
            <span>View Signed Scope (ABC Studio)</span>
          </button>
        </div>
      </div>

      {/* Project Status Bar */}
      <div className="project-status-bar">
        <div className="project-status-container">
          <div className="project-meta-item project-title-meta">
            <span className="meta-label">Active Project</span>
            <strong className="meta-value highlight-project">{project.title}</strong>
          </div>
          
          <div className="project-meta-divider" />

          <div className="project-meta-item">
            <span className="meta-label">Client</span>
            <span className="meta-value">{project.client}</span>
          </div>

          <div className="project-meta-divider" />

          <div className="project-meta-item">
            <span className="meta-label">Contract Budget</span>
            <span className="meta-value budget-highlight">${project.budget.total.toLocaleString()} ({project.budget.type})</span>
          </div>

          <div className="project-meta-divider" />

          <div className="project-meta-item">
            <span className="meta-label">Revision Rounds</span>
            <span className="meta-value revision-tag">
              <Clock size={13} /> {project.revisionPolicy.remainingRounds} of {project.revisionPolicy.maxRounds} Remaining
            </span>
          </div>

          <div className="project-meta-divider" />

          <div className="project-meta-item">
            <span className="meta-label">Out-of-Scope Rate</span>
            <span className="meta-value rate-highlight">${project.budget.outOfScopeRate}/hr</span>
          </div>
        </div>
      </div>
    </header>
  );
}
