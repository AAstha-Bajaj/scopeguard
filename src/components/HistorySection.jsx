import React, { useState } from 'react';
import { 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Copy, 
  Check, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export default function HistorySection({ 
  historyList, 
  onLoadRequest, 
  onShowToast 
}) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filteredItems = historyList.filter((item) => {
    const matchesFilter = 
      filter === 'All' || 
      item.classification.toLowerCase() === filter.toLowerCase();

    const matchesSearch = 
      !searchQuery.trim() ||
      item.requestText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.matchedClause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summaryReason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleCopyHistoryDraft = async (id, draft) => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopiedId(id);
      onShowToast({
        type: 'success',
        message: 'Saved draft copied to clipboard!'
      });
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = draft;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      onShowToast({
        type: 'success',
        message: 'Saved draft copied to clipboard!'
      });
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getBadgeClass = (classification) => {
    switch (classification) {
      case 'Likely Included':
        return 'badge-included';
      case 'Potentially Out of Scope':
        return 'badge-out-of-scope';
      case 'Needs Clarification':
      default:
        return 'badge-clarification';
    }
  };

  const getIcon = (classification) => {
    switch (classification) {
      case 'Likely Included':
        return <CheckCircle2 size={16} className="text-emerald" />;
      case 'Potentially Out of Scope':
        return <AlertCircle size={16} className="text-rose" />;
      case 'Needs Clarification':
      default:
        return <AlertTriangle size={16} className="text-amber" />;
    }
  };

  return (
    <div className="card history-card">
      <div className="card-header history-card-header">
        <div className="history-header-left">
          <div className="card-header-icon bg-purple-soft">
            <History size={18} className="text-purple" />
          </div>
          <div>
            <h3 className="card-title">Request History & Scope Audit Log</h3>
            <p className="card-subtitle">
              Previously evaluated client inquiries and generated drafts for ABC Studio
            </p>
          </div>
        </div>

        <span className="badge badge-subtle">
          {historyList.length} Requests Recorded
        </span>
      </div>

      <div className="card-body">
        {/* Filter & Search Bar */}
        <div className="history-controls-row">
          <div className="history-filter-pills">
            {['All', 'Likely Included', 'Potentially Out of Scope', 'Needs Clarification'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`history-filter-btn ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="history-search-wrap">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              className="history-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history requests..."
              aria-label="Search requests"
            />
          </div>
        </div>

        {/* History List */}
        <div className="history-items-list">
          {filteredItems.length === 0 ? (
            <div className="history-empty-state">
              <History size={32} className="text-muted" />
              <p>No historical requests match your current search or filter.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div 
                  key={item.id} 
                  className={`history-item-row ${isExpanded ? 'is-expanded' : ''}`}
                >
                  <div className="history-item-main">
                    <div className="history-meta-top">
                      <div className="history-status-group">
                        {getIcon(item.classification)}
                        <span className={`status-badge-sm ${getBadgeClass(item.classification)}`}>
                          {item.classification}
                        </span>
                      </div>
                      <span className="history-timestamp">
                        <Clock size={12} /> {item.timestamp}
                      </span>
                    </div>

                    <div className="history-request-text">
                      <p>"{item.requestText}"</p>
                    </div>

                    <div className="history-clause-row">
                      <span className="history-clause-label">Matched Clause:</span>
                      <span className="history-clause-val">{item.matchedClause}</span>
                    </div>

                    <div className="history-pricing-strip">
                      <span className="strip-item">
                        <Clock size={12} /> {item.effortEstimate || '1-2 hrs'}
                      </span>
                      <span className="strip-divider">•</span>
                      <span className="strip-item">
                        <DollarSign size={12} /> {item.pricingEstimate || '$0.00'}
                      </span>
                    </div>

                    {/* Expandable Deep-Dive & Draft Section */}
                    {isExpanded && (
                      <div className="history-expanded-content">
                        <div className="history-reason-box">
                          <strong>Analysis Explanation:</strong>
                          <p>{item.summaryReason}</p>
                        </div>

                        <div className="history-draft-preview">
                          <div className="draft-preview-header">
                            <span>Saved Response Draft:</span>
                            <button
                              type="button"
                              onClick={() => handleCopyHistoryDraft(item.id, item.responseDraft)}
                              className="btn btn-xs btn-secondary"
                              title="Copy this draft"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check size={12} className="text-emerald" />
                                  <span className="text-emerald">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Copy Draft</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="draft-preview-text">{item.responseDraft}</pre>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="history-item-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-subtle"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      title={isExpanded ? "Collapse details" : "Expand details & draft"}
                    >
                      {isExpanded ? 'Hide Details' : 'View Breakdown'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => onLoadRequest(item)}
                      title="Load this request into the active analyzer"
                    >
                      <span>Load in Console</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
