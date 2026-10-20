import React, { useState } from 'react';
import Header from './components/Header';
import ProjectScopeCard from './components/ProjectScopeCard';
import AnalyzerConsole from './components/AnalyzerConsole';
import HistorySection from './components/HistorySection';
import ScopeModal from './components/ScopeModal';
import Toast from './components/Toast';
import { SAMPLE_PROJECT, INITIAL_REQUEST_HISTORY } from './data/sampleProject';
import { analyzeScopeRequest } from './utils/scopeAnalyzer';

export default function App() {
  const [project, setProject] = useState(SAMPLE_PROJECT);
  const [historyList, setHistoryList] = useState(INITIAL_REQUEST_HISTORY);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = ({ type = 'info', message }) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAnalyze = (rawText) => {
    setIsAnalyzing(true);
    // Smooth micro-interaction delay (300ms) for realistic analysis feedback
    setTimeout(() => {
      const result = analyzeScopeRequest(rawText, project);
      setCurrentAnalysis(result);
      setIsAnalyzing(false);
      showToast({
        type: 'info',
        message: `Evaluated request: "${result.classification}"`
      });
    }, 300);
  };

  const handleSaveToHistory = (savedItem) => {
    setHistoryList((prev) => {
      // Check if already in history by id
      const exists = prev.some((item) => item.id === savedItem.id);
      if (exists) {
        return prev.map((item) => item.id === savedItem.id ? savedItem : item);
      }
      return [savedItem, ...prev];
    });
  };

  const handleLoadRequest = (item) => {
    setCurrentAnalysis(item);
    window.scrollTo({ top: 380, behavior: 'smooth' });
    showToast({
      type: 'info',
      message: 'Loaded historical request into analyzer'
    });
  };

  return (
    <div className="app-shell">
      {/* Top Application Header */}
      <Header 
        project={project} 
        onOpenScopeModal={() => setIsScopeModalOpen(true)} 
      />

      {/* Main SaaS Dashboard Container */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Left Column: Signed Scope Baseline (Deliverables, Exclusions, Budget, Limits) */}
          <section className="dashboard-col col-scope" aria-label="Project Scope Baseline">
            <ProjectScopeCard project={project} />
          </section>

          {/* Right Column: Interactive Scope Analyzer Console & Draft Generator */}
          <section className="dashboard-col col-analyzer" aria-label="Request Scope Analyzer">
            <AnalyzerConsole 
              onAnalyze={handleAnalyze}
              currentAnalysis={currentAnalysis}
              isAnalyzing={isAnalyzing}
              onSaveToHistory={handleSaveToHistory}
              onShowToast={showToast}
            />
          </section>
        </div>

        {/* Full-width History & Audit Log Section */}
        <section className="dashboard-history-section" aria-label="Request Evaluation History">
          <HistorySection 
            historyList={historyList}
            onLoadRequest={handleLoadRequest}
            onShowToast={showToast}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand">ScopeGuard</span>
            <span className="footer-divider">•</span>
            <span>Local Heuristic Prototype for Freelance Web Designers & Developers</span>
          </div>
          <div className="footer-right">
            <span className="badge badge-subtle">Simulated Engine (No API Keys / No Database)</span>
          </div>
        </div>
      </footer>

      {/* Contract SOW Modal */}
      <ScopeModal 
        project={project} 
        isOpen={isScopeModalOpen} 
        onClose={() => setIsScopeModalOpen(false)} 
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
