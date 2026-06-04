/* ═══════════════════════════════════════════════════
   Calc Labz — Project Save/Load System
   LocalStorage-based project manager for engineering
   calculations with max 50 projects + auto-purge.
   ═══════════════════════════════════════════════════ */
import type { EngineeringProject } from '@/types/engineering';

const STORAGE_KEY = 'calclabz_engineering_projects';
const MAX_PROJECTS = 50;

/**
 * Get all saved projects from localStorage.
 */
export function listProjects(): EngineeringProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const projects = JSON.parse(raw) as EngineeringProject[];
    return projects.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

/**
 * Save a project. Auto-generates ID and timestamp.
 * Auto-purges oldest projects if count exceeds MAX_PROJECTS.
 */
export function saveProject(project: Omit<EngineeringProject, 'id' | 'timestamp'>): EngineeringProject {
  const projects = listProjects();

  const newProject: EngineeringProject = {
    ...project,
    id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
  };

  projects.unshift(newProject);

  // Auto-purge oldest if over limit
  while (projects.length > MAX_PROJECTS) {
    projects.pop();
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('Failed to save project:', err);
  }

  return newProject;
}

/**
 * Load a specific project by ID.
 */
export function loadProject(id: string): EngineeringProject | null {
  const projects = listProjects();
  return projects.find((p) => p.id === id) || null;
}

/**
 * Delete a project by ID.
 */
export function deleteProject(id: string): void {
  const projects = listProjects().filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('Failed to delete project:', err);
  }
}

/**
 * Rename a project.
 */
export function renameProject(id: string, newName: string): void {
  const projects = listProjects();
  const project = projects.find((p) => p.id === id);
  if (project) {
    project.name = newName;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (err) {
      console.warn('Failed to rename project:', err);
    }
  }
}

/**
 * Export a project as a JSON string.
 */
export function exportProject(id: string): string | null {
  const project = loadProject(id);
  if (!project) return null;
  return JSON.stringify(project, null, 2);
}

/**
 * Import a project from a JSON string.
 */
export function importProject(json: string): EngineeringProject | null {
  try {
    const parsed = JSON.parse(json) as EngineeringProject;
    if (!parsed.calcId || !parsed.name || !parsed.inputs) {
      throw new Error('Invalid project format');
    }
    // Generate new ID and timestamp for imported project
    const imported = saveProject({
      name: `${parsed.name} (Imported)`,
      calcId: parsed.calcId,
      calcName: parsed.calcName,
      inputs: parsed.inputs,
      notes: parsed.notes,
    });
    return imported;
  } catch (err) {
    console.warn('Failed to import project:', err);
    return null;
  }
}

/**
 * Get projects for a specific calculator.
 */
export function getProjectsForCalc(calcId: string): EngineeringProject[] {
  return listProjects().filter((p) => p.calcId === calcId);
}
