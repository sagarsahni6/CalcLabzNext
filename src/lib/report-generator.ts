/* ═══════════════════════════════════════════════════
   Calc Labz — PDF Engineering Report Generator
   Lazy-loaded jsPDF report with inputs, results,
   standards, and validation status.
   ═══════════════════════════════════════════════════ */
import type { EngineeringStandard, EngineeringValidation } from '@/types/engineering';

interface ReportInput {
  label: string;
  value: string | number;
  unit?: string;
}

interface ReportOptions {
  calcName: string;
  calcId: string;
  inputs: ReportInput[];
  mainResult: { label: string; value: string | number };
  secondaryResults?: { label: string; value: string | number }[];
  standards?: EngineeringStandard[];
  validation?: EngineeringValidation | null;
  formulaSteps?: { title: string; description: string; latex: string; result?: string }[];
}

/**
 * Generate a professional engineering PDF report.
 * jsPDF and jspdf-autotable are lazy-loaded on first call.
 */
export async function generateEngineeringPDF(opts: ReportOptions): Promise<Blob> {
  const jsPDFModule = await import('jspdf');
  const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
  const autoTableModule = await import('jspdf-autotable');
  const autoTable = autoTableModule.default || autoTableModule;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = margin;

  // ── Colors
  const blue = [37, 99, 235] as [number, number, number];
  const darkGray = [15, 23, 42] as [number, number, number];
  const medGray = [100, 116, 139] as [number, number, number];
  const lightGray = [241, 245, 249] as [number, number, number];
  const green = [16, 185, 129] as [number, number, number];
  const amber = [245, 158, 11] as [number, number, number];
  const red = [239, 68, 68] as [number, number, number];

  // ── Helper: add page break if needed
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Header
  doc.setFillColor(...blue);
  doc.rect(0, 0, pageW, 38, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ENGINEERING REPORT', margin, 16);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(opts.calcName, margin, 24);

  doc.setFontSize(8);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} | CalcLabz.com`, margin, 32);

  doc.setFontSize(8);
  doc.text(`ID: ${opts.calcId.toUpperCase()}`, pageW - margin, 32, { align: 'right' });

  y = 48;

  // ── Section helper
  const sectionTitle = (title: string) => {
    checkPageBreak(16);
    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, y, contentW, 10, 2, 2, 'F');
    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 4, y + 7);
    y += 16;
  };

  // ── 1. Input Parameters
  sectionTitle('INPUT PARAMETERS');

  const inputTableData = opts.inputs.map((inp) => [
    inp.label,
    `${inp.value}${inp.unit ? ` ${inp.unit}` : ''}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Parameter', 'Value']],
    body: inputTableData,
    margin: { left: margin, right: margin },
    headStyles: {
      fillColor: blue,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
    },
    bodyStyles: { fontSize: 9, textColor: darkGray },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    styles: { cellPadding: 4, lineColor: [226, 232, 240], lineWidth: 0.2 },
    theme: 'grid',
  });

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

  // ── 2. Results
  sectionTitle('RESULTS');

  // Main result box
  checkPageBreak(20);
  doc.setFillColor(...blue);
  doc.roundedRect(margin, y, contentW, 16, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(opts.mainResult.label, margin + 6, y + 6);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(String(opts.mainResult.value), margin + 6, y + 13);
  y += 22;

  // Secondary results
  if (opts.secondaryResults && opts.secondaryResults.length > 0) {
    const secData = opts.secondaryResults.map((r) => [r.label, String(r.value)]);
    autoTable(doc, {
      startY: y,
      head: [['Metric', 'Value']],
      body: secData,
      margin: { left: margin, right: margin },
      headStyles: { fillColor: [71, 85, 105], textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: darkGray },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: { cellPadding: 4, lineColor: [226, 232, 240], lineWidth: 0.2 },
      theme: 'grid',
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;
  }

  // ── 3. Engineering Validation
  if (opts.validation) {
    sectionTitle('ENGINEERING VALIDATION');
    checkPageBreak(30);

    const statusColors: Record<string, readonly [number, number, number]> = {
      safe: green,
      warning: amber,
      critical: red,
    };
    const color = statusColors[opts.validation.status] || medGray;

    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(margin, y, 4, 22, 1, 1, 'F');

    doc.setFillColor(color[0], color[1], color[2], 15);
    doc.roundedRect(margin + 4, y, contentW - 4, 22, 0, 2, 'F');

    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${opts.validation.status.toUpperCase()} — ${opts.validation.title}`, margin + 8, y + 7);

    doc.setTextColor(...darkGray);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const msgLines = doc.splitTextToSize(opts.validation.message, contentW - 16);
    doc.text(msgLines.slice(0, 2), margin + 8, y + 13);

    if (opts.validation.standardRef) {
      doc.setTextColor(...medGray);
      doc.setFontSize(7);
      doc.text(`Ref: ${opts.validation.standardRef}`, margin + 8, y + 20);
    }

    y += 30;
  }

  // ── 4. Formula Derivation
  if (opts.formulaSteps && opts.formulaSteps.length > 0) {
    sectionTitle('FORMULA DERIVATION');

    opts.formulaSteps.forEach((step, idx) => {
      checkPageBreak(16);
      doc.setTextColor(...darkGray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Step ${idx + 1}: ${step.title}`, margin + 4, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...medGray);
      const descLines = doc.splitTextToSize(step.description, contentW - 8);
      doc.text(descLines.slice(0, 2), margin + 4, y);
      y += descLines.length * 4 + 2;

      // LaTeX as plain text (KaTeX can't render in PDF)
      doc.setFont('courier', 'normal');
      doc.setTextColor(...blue);
      doc.setFontSize(9);
      doc.text(step.latex.replace(/\\\\/g, '\\'), margin + 8, y);
      y += 8;

      if (step.result) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...green);
        doc.setFontSize(8);
        doc.text(`-> ${step.result}`, margin + 8, y);
        y += 6;
      }
      y += 2;
    });
    y += 4;
  }

  // ── 5. Applicable Standards
  if (opts.standards && opts.standards.length > 0) {
    sectionTitle('APPLICABLE STANDARDS');

    const stdData = opts.standards.map((s) => [
      s.code + (s.section ? ` ${s.section}` : ''),
      s.organization,
      s.title,
    ]);

    autoTable(doc, {
      startY: y,
      head: [['Code', 'Org', 'Title']],
      body: stdData,
      margin: { left: margin, right: margin },
      headStyles: { fillColor: [71, 85, 105], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8, textColor: darkGray },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 20 } },
      styles: { cellPadding: 3, lineColor: [226, 232, 240], lineWidth: 0.2 },
      theme: 'grid',
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;
  }

  // ── Footer / Disclaimer
  checkPageBreak(24);
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  doc.setTextColor(...medGray);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  const disclaimer = 'DISCLAIMER: This report is generated for informational and planning purposes only. Calculations are based on standard engineering formulas and should be verified by a qualified professional engineer before use in any critical design, construction, or manufacturing application. CalcLabz.com is not liable for any decisions made based on this report.';
  const discLines = doc.splitTextToSize(disclaimer, contentW);
  doc.text(discLines, margin, y);
  y += discLines.length * 3 + 4;

  doc.setTextColor(...blue);
  doc.setFontSize(7);
  doc.text('Generated by CalcLabz.com — Free Engineering Calculators', margin, y);
  doc.text(`Page 1 of ${doc.getNumberOfPages()}`, pageW - margin, y, { align: 'right' });

  return doc.output('blob');
}
