'use client';

import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/Icon';
import { saveProject, getProjectsForCalc, loadProject, deleteProject } from '@/lib/project-manager';
import type { EngineeringProject } from '@/types/engineering';

interface ProjectManagerProps {
  calcId: string;
  calcName: string;
  currentInputs: Record<string, number | string>;
  onLoad: (inputs: Record<string, number | string>) => void;
}

export default function ProjectManager({ calcId, calcName, currentInputs, onLoad }: ProjectManagerProps) {
  const [projects, setProjects] = useState<EngineeringProject[]>([]);
  const [showSave, setShowSave] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [toast, setToast] = useState('');

  // Load projects on mount
  useEffect(() => {
    setProjects(getProjectsForCalc(calcId));
  }, [calcId]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  const handleSave = useCallback(() => {
    if (!projectName.trim()) return;
    saveProject({
      name: projectName.trim(),
      calcId,
      calcName,
      inputs: currentInputs,
      notes: projectNotes.trim() || undefined,
    });
    setProjects(getProjectsForCalc(calcId));
    setShowSave(false);
    setProjectName('');
    setProjectNotes('');
    showToast('Project saved!');
  }, [projectName, projectNotes, calcId, calcName, currentInputs, showToast]);

  const handleLoad = useCallback((id: string) => {
    const project = loadProject(id);
    if (project) {
      onLoad(project.inputs);
      showToast(`Loaded: ${project.name}`);
    }
  }, [onLoad, showToast]);

  const handleDelete = useCallback((id: string, name: string) => {
    if (!confirm(`Delete project "${name}"?`)) return;
    deleteProject(id);
    setProjects(getProjectsForCalc(calcId));
    showToast('Project deleted');
  }, [calcId, showToast]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="standalone-section project-manager-section">
      <div className="standalone-section-header">
        <div className="standalone-section-icon">
          <Icon name="fa-folder-open" />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Saved Projects</h2>
          <p>Save and load your {calcName} calculations</p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setShowSave(!showSave)}
            style={{
              background: 'var(--p)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s var(--ease)',
            }}
          >
            <Icon name="fa-floppy-disk" style={{ fontSize: '0.72rem' }} />
            Save
          </button>
          {projects.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--brd)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                color: 'var(--txt2)',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Icon name={expanded ? 'fa-chevron-up' : 'fa-chevron-down'} style={{ fontSize: '0.7rem' }} />
              {projects.length} saved
            </button>
          )}
        </div>
      </div>

      <div className="standalone-section-body">
        {/* Save dialog */}
        {showSave && (
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--brd)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
            animation: 'slideUp 0.3s var(--ease)',
          }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--txt1)', display: 'block', marginBottom: '4px' }}>
                Project Name
              </label>
              <input
                type="text"
                placeholder="e.g. Bridge Beam Analysis"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg1)',
                  border: '1px solid var(--brd)',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  color: 'var(--txt)',
                  outline: 'none',
                }}
                autoFocus
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--txt1)', display: 'block', marginBottom: '4px' }}>
                Notes (optional)
              </label>
              <input
                type="text"
                placeholder="Design notes..."
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  background: 'var(--bg1)',
                  border: '1px solid var(--brd)',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  color: 'var(--txt)',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSave(false)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg3)',
                  border: 'none',
                  color: 'var(--txt2)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!projectName.trim()}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: projectName.trim() ? 'var(--p)' : 'var(--bg3)',
                  border: 'none',
                  color: projectName.trim() ? '#fff' : 'var(--txt2)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: projectName.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Save Project
              </button>
            </div>
          </div>
        )}

        {/* Project list */}
        {expanded && projects.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--brd)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.15s var(--ease)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {proj.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--txt2)', marginTop: '2px' }}>
                    {formatDate(proj.timestamp)}
                    {proj.notes && <span> · {proj.notes}</span>}
                  </div>
                </div>
                <button
                  onClick={() => handleLoad(proj.id)}
                  title="Load this project"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'var(--p-light)',
                    border: '1px solid var(--p)',
                    color: 'var(--p)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                  }}
                >
                  <Icon name="fa-upload" style={{ fontSize: '0.65rem' }} />
                  Load
                </button>
                <button
                  onClick={() => handleDelete(proj.id, proj.name)}
                  title="Delete project"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Icon name="fa-trash" />
                </button>
              </div>
            ))}
          </div>
        )}

        {expanded && projects.length === 0 && !showSave && (
          <div style={{
            textAlign: 'center',
            padding: '24px 16px',
            color: 'var(--txt2)',
            fontSize: '0.85rem',
          }}>
            <Icon name="fa-folder" style={{ fontSize: '1.5rem', marginBottom: '8px', display: 'block', color: 'var(--bg4)' }} />
            No saved projects yet. Click &quot;Save&quot; to save your current calculation.
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg3)',
          color: 'var(--txt)',
          padding: '10px 20px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 9999,
          animation: 'slideUp 0.3s var(--ease)',
          border: '1px solid var(--brd)',
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
