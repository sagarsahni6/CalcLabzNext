'use client';

import React, { useState, ReactNode } from 'react';
import Icon from '@/components/ui/Icon';

interface CalculatorTabsProps {
  children: ReactNode;
  hasGuide: boolean;
}

export default function CalculatorTabs({ children, hasGuide }: CalculatorTabsProps) {
  const [activeTab, setActiveTab] = useState('calc');

  const tabs = [
    { id: 'calc', label: 'Calculator', icon: 'fa-calculator' },
    { id: 'formula', label: 'Formula & Examples', icon: 'fa-square-root-variable' },
    { id: 'faqs', label: 'FAQs & Schema', icon: 'fa-circle-question' },
    ...(hasGuide ? [{ id: 'guide', label: 'User Guide', icon: 'fa-book-open' }] : []),
  ];

  return (
    <div>
      {/* Tab Headers */}
      <div className="tabs-row">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon name={tab.icon} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents - Keep all rendered in the HTML for Search Engine Indexing! */}
      <div className="tab-contents-wrap">
        {React.Children.map(children, (child) => {
          if (!child || !React.isValidElement(child)) return null;
          const tabId = (child.props as Record<string, string>)['data-tab'];
          if (!tabId) return null;
          const isVisible = activeTab === tabId;
          return (
            <div
              key={tabId}
              style={{
                display: isVisible ? 'block' : 'none',
              }}
              className={isVisible ? 'pulse' : ''}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
