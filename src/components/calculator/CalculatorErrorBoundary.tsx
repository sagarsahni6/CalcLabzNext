'use client';

import React, { Component, type ReactNode } from 'react';
import Icon from '@/components/ui/Icon';

interface Props {
  children: ReactNode;
  calculatorName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for Calculator pages.
 * Catches render errors in child components and shows a friendly recovery UI
 * instead of a blank white screen.
 */
export default class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console for debugging (could be sent to Sentry in the future)
    console.error('[CalculatorErrorBoundary]', {
      calculator: this.props.calculatorName || 'Unknown',
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReport = () => {
    const subject = encodeURIComponent(
      `Bug Report: ${this.props.calculatorName || 'Calculator'} Error`
    );
    const body = encodeURIComponent(
      `Calculator: ${this.props.calculatorName || 'Unknown'}\n` +
      `Error: ${this.state.error?.message || 'Unknown error'}\n` +
      `URL: ${typeof window !== 'undefined' ? window.location.href : ''}\n` +
      `Time: ${new Date().toISOString()}\n\n` +
      `Please describe what you were doing when this error occurred:\n`
    );
    window.open(`/contact?subject=${subject}&body=${body}`, '_blank');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '40px 24px',
            textAlign: 'center',
            background: 'var(--bg2)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid var(--brd)',
            margin: '20px 0',
          }}
        >
          {/* Error icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px',
              fontSize: '1.5rem',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)',
            }}
          >
            <Icon name="fa-triangle-exclamation" />
          </div>

          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--txt)',
              marginBottom: '8px',
            }}
          >
            Something went wrong
          </h3>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--txt1)',
              marginBottom: '24px',
              maxWidth: '400px',
              margin: '0 auto 24px',
              lineHeight: 1.6,
            }}
          >
            The {this.props.calculatorName || 'calculator'} encountered an
            unexpected error. Your data is safe — try resetting below.
          </p>

          {/* Error details (collapsed) */}
          {this.state.error && (
            <details
              style={{
                marginBottom: '24px',
                textAlign: 'left',
                maxWidth: '480px',
                margin: '0 auto 24px',
              }}
            >
              <summary
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--txt2)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Technical details
              </summary>
              <pre
                style={{
                  marginTop: '8px',
                  fontSize: '0.72rem',
                  color: 'var(--txt2)',
                  background: 'var(--bg)',
                  padding: '12px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  maxHeight: '120px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message}
              </pre>
            </details>
          )}

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              className="btn btn-p"
              onClick={this.handleReset}
              style={{ padding: '10px 24px' }}
            >
              <Icon name="fa-redo" style={{ marginRight: '6px' }} />
              Reset Calculator
            </button>
            <button
              className="btn btn-s"
              onClick={this.handleReport}
              style={{ padding: '10px 24px' }}
            >
              <Icon name="fa-flag" style={{ marginRight: '6px' }} />
              Report Issue
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
