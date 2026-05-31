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
    ...(hasGuide ? [{ id: 'guide', label: 'User Guide', icon: 'fa-book-open' }] : []),
  ];

  return (
    <div>
      {/* Tab Headers — only show when there are multiple tabs */}
      {tabs.length > 1 && (
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
      )}

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
              style={
                isVisible
                  ? { display: 'block' }
                  : { visibility: 'hidden', height: 0, overflow: 'hidden', position: 'absolute', pointerEvents: 'none' }
              }
              className={isVisible ? 'pulse' : ''}
              aria-hidden={!isVisible}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
