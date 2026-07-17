import { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const [width, setWidth] = useState(420);
  const isResizing = useRef(false);

  const startResizing = (e) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX;
    if (newWidth >= 320 && newWidth <= 600) {
      setWidth(newWidth);
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  return (
    <aside className="sidebar-container" style={{ width: `${width}px` }}>
      {/* Left thin vertical navigation tab bar */}
      <div className="sidebar-nav">
        <div className="sidebar-nav-logo-area">
          <span className="sidebar-logo-q">Q</span>
        </div>
        
        <div className="sidebar-nav-lower">
          <div className="sidebar-nav-body">
            <div className="nav-tab-btn" title="Question Description">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <line x1="9" y1="12" x2="15" y2="12"></line>
                <line x1="9" y1="16" x2="13" y2="16"></line>
              </svg>
            </div>
          </div>

          <div className="sidebar-nav-bottom">
            <button className="nav-icon-btn" title="Settings">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            
            <div className="sidebar-brand-icon-wrapper" title="Newton School">
              <svg width="18" height="24" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10H12M6 10V22C6 25.3137 8.68629 28 12 28C15.3137 28 18 25.3137 18 22V14M12 28V18M12 18L17.5 12.5M17.5 12.5H14M17.5 12.5V16" stroke="#0072F9" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main panel for content */}
      <div className="sidebar-panel">
        <div className="sidebar-content-wrapper">
          <header className="panel-header">
            <span className="panel-category-title">QUESTION</span>
            <div className="panel-header-actions">
              <button className="panel-action-btn" title="Feedback">
                <svg width="18" height="14" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="14" rx="2" ry="2" />
                  <path d="M16 17l4 4v-4" />
                  <line x1="12" y1="7" x2="12" y2="11" />
                  <line x1="12" y1="14" x2="12.01" y2="14" />
                </svg>
              </button>
              <button className="panel-action-btn" title="Close Panel">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </header>

          <div className="panel-scroll-content">
            <h2 className="question-title-top">React Signup form</h2>
            
            <div className="question-meta-row">
              <span className="badge badge-difficulty">Medium</span>
              <span className="meta-separator">▪</span>
              <span className="badge badge-multiplier">2x</span>
              <span className="meta-separator">▪</span>
              <div className="badge badge-score">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#FEB000" stroke="#D17300" strokeWidth="1.5" className="score-hexagon">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                  <path d="M13 6 L8.5 13 H12 L11 18 L15.5 11 H12 L13 6 Z" fill="#FFF" stroke="none" />
                </svg>
                <span className="score-text">80/80</span>
              </div>
            </div>

            <h1 className="question-main-title">React Signup Form</h1>
            
            <p className="question-desc-text">
              You are asked to build a <strong>Signup Form component in React</strong> that collects user information and displays a success message upon submission.
            </p>
            
            <p className="question-desc-text">
              This form represents a simple user input flow where users can type into fields and submit their details.
            </p>

            <hr className="content-divider" />

            <h3 className="section-title">What You're Starting With</h3>
            <p className="section-intro">You already have a basic <code>SignUpForm</code> component with:</p>
            <ul className="details-list">
              <li>Four input fields</li>
              <li>A <strong>SignUp</strong> button</li>
              <li>A section where a message can be displayed</li>
              <li>Four paragraph tags that should display the current values of all input fields.</li>
            </ul>

            <hr className="content-divider" />

            <h3 className="section-title">Form Details</h3>
            <p className="section-intro">The form should collect the following information:</p>
            <ul className="details-list">
              <li>First Name</li>
              <li>Age</li>
              <li>Email</li>
              <li>Password</li>
            </ul>
          </div>
        </div>

        {/* Drag resize handle */}
        <div className="resize-handle" onMouseDown={startResizing} />
      </div>
    </aside>
  );
}
