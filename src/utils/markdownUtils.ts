import { TableData, MarkdownOptions, TableColumn, TableRow, TableCell } from '../types';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Parse Markdown table to TableData
export const parseMarkdown = (markdownText: string): TableData => {
  // Split into lines and filter out empty lines
  const lines = markdownText.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length < 3) {
    // Not enough lines for a valid markdown table
    return {
      columns: [],
      rows: [],
      originalFormat: 'markdown',
    };
  }
  
  // Check if the second line contains separator pattern (---|---|---)
  const isSeparatorLine = (line: string): boolean => {
    return /^\s*\|?\s*(:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(line);
  };
  
  // Find the separator line index
  const separatorLineIndex = lines.findIndex(isSeparatorLine);
  
  if (separatorLineIndex === -1 || separatorLineIndex === 0) {
    // No separator line or it's the first line (invalid)
    return {
      columns: [],
      rows: [],
      originalFormat: 'markdown',
    };
  }
  
  // Parse header row (line before separator)
  const headerLine = lines[separatorLineIndex - 1];
  const headerCells = parseMarkdownRow(headerLine);
  
  // Create columns
  const columns: TableColumn[] = headerCells.map((cell, index) => ({
    id: `column_${index}`,
    name: cell,
    index,
  }));
  
  // Separator line exists at lines[separatorLineIndex]
  // We could use it for alignment parsing in the future
  
  // Parse data rows (lines after separator)
  const dataLines = lines.slice(separatorLineIndex + 1);
  
  // Create rows
  const rows: TableRow[] = dataLines.map((line, rowIndex) => {
    const rowCells = parseMarkdownRow(line);
    const cells: Record<string, TableCell> = {};
    
    columns.forEach((column, colIndex) => {
      cells[column.id] = {
        value: rowCells[colIndex] || '',
        row: rowIndex,
        col: colIndex,
      };
    });
    
    return {
      id: generateId(),
      index: rowIndex,
      cells,
    };
  });
  
  return {
    columns,
    rows,
    originalFormat: 'markdown',
  };
};

// Parse a markdown table row into cells
const parseMarkdownRow = (line: string): string[] => {
  // Remove leading and trailing |
  const trimmedLine = line.trim().replace(/^\||\|$/g, '');
  
  // Split by | and trim each cell
  return trimmedLine.split('|').map(cell => cell.trim());
};

// Helper functions for alignment can be added here if needed in the future

// Export TableData to Markdown
export const exportToMarkdown = (tableData: TableData, options: MarkdownOptions): string => {
  const { columns, rows } = tableData;
  
  if (columns.length === 0) {
    return '';
  }
  
  // Create header row
  const headerRow = '| ' + columns.map(col => col.name).join(' | ') + ' |';
  
  // Create separator row with alignment
  const separatorRow = '| ' + columns.map((_, index) => {
    const alignment = options.alignment[index] || 'left';
    
    switch (alignment) {
      case 'center':
        return ':---:';
      case 'right':
        return '---:';
      case 'left':
      default:
        return '---';
    }
  }).join(' | ') + ' |';
  
  // Create data rows
  const dataRows = rows.map(row => {
    return '| ' + columns.map(col => {
      return row.cells[col.id]?.value || '';
    }).join(' | ') + ' |';
  });
  
  // Combine all rows
  return [headerRow, separatorRow, ...dataRows].join('\n');
};

// Detect if text is likely Markdown table
export const detectMarkdown = (text: string): number => {
  if (!text || text.trim() === '') return 0;
  
  // Split into lines and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length < 3) {
    return 0; // Not enough lines for a markdown table
  }
  
  // Check for pipe characters
  const hasPipes = lines.every(line => line.includes('|'));
  if (!hasPipes) {
    return 0;
  }
  
  // Check for separator line (---|---|---)
  const isSeparatorLine = (line: string): boolean => {
    return /^\s*\|?\s*(:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(line);
  };
  
  const separatorLineIndex = lines.findIndex(isSeparatorLine);
  
  if (separatorLineIndex === -1 || separatorLineIndex === 0) {
    return 0; // No separator line or it's the first line (invalid)
  }
  
  // Check if all rows have the same number of cells
  const headerCells = parseMarkdownRow(lines[separatorLineIndex - 1]).length;
  const allRowsHaveSameCellCount = lines
    .filter((_, i) => i !== separatorLineIndex) // Skip separator line
    .every(line => parseMarkdownRow(line).length === headerCells);
  
  // Calculate confidence score (0-100)
  let confidence = 70; // Base confidence for having pipes and separator
  
  if (allRowsHaveSameCellCount) {
    confidence += 30; // All rows have same number of cells
  }
  
  return confidence;
};
