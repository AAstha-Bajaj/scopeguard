import React from 'react';
import { X, FileText, CheckCircle2, XCircle, ShieldAlert, DollarSign } from 'lucide-react';

export default function ScopeModal({ project, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <FileText size={20} className="text-indigo" />
            <div>
              <h3 className="modal-title">Contract Scope of Work (SOW-2026-ABC)</h3>
              <p className="modal-subtitle">Signed Agreement Baseline for {project.title}</p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close Scope Details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body legal-doc-body">
          <div className="doc-section">
            <h4>1. Project Summary & Purpose</h4>
            <p>
              This agreement establishes the scope, deliverables, and revision protocols for the design and front-end development of the agency website for <strong>{project.client}</strong>. All work is executed on a fixed milestone schedule totaling <strong>${project.budget.total.toLocaleString()} USD</strong>.
            </p>
          </div>

          <div className="doc-section">
            <h4>2. Schedule of Agreed Deliverables</h4>
            <ul className="doc-deliverables-list">
              {project.deliverables.map((del, i) => (
                <li key={del.id}>
                  <strong>Section 2.{i + 1} — {del.title}:</strong> {del.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="doc-section">
            <h4>3. Revision & Feedback Limits</h4>
            <p>
              The agreed package provides up to <strong>{project.revisionPolicy.maxRounds} consolidated rounds of design revisions</strong> across the approved page templates. 
              One (1) round has been consumed during Milestone 1 sign-off; one (1) round remains active.
            </p>
          </div>

          <div className="doc-section">
            <h4>4. Explicit Exclusions (Out of Scope)</h4>
            <p>The following capabilities are explicitly omitted from this milestone and will require a signed Change Order:</p>
            <ul className="doc-exclusions-list">
              {project.exclusions.map((ex, i) => (
                <li key={ex.id}>
                  <strong>Section 4.{i + 1} — {ex.title}:</strong> {ex.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="doc-section">
            <h4>5. Change Order & Out-of-Scope Billing</h4>
            <p>
              Any requests beyond Section 2 or covered under Section 4 are subject to freelance contractor review. 
              Authorized change work is billed at the contractually agreed rate of <strong>${project.budget.outOfScopeRate}/hr</strong>.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="doc-footer-meta">
            <span>Status: <strong>Executed Contract</strong></span>
            <span>Client Signatory: <strong>{project.clientContact}</strong></span>
          </div>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
