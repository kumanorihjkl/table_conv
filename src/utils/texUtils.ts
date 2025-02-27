import { TableData, TeXOptions, TableColumn, TableRow, TableCell } from '../types';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Parse TeX table to TableData
export const parseTeX = (texText: string): TableData => {
  try {
    // Extract the tabular environment content
    const tabularMatch = texText.match(/\\begin\{tabular\}\{([^}]*)\}([\s\S]*?)\\end\{tabular\}/);
    
    if (!tabularMatch) {
      throw new Error('No tabular environment found in TeX');
    }
    
    const columnSpec = tabularMatch[1]; // e.g., "|l|c|r|"
    const tableContent = tabularMatch[2];
    
    // Split content by rows (separated by \\)
    // This regex handles \\ that might have whitespace or comments after them
    const rows = tableContent.split(/\\\\(\s*%[^\n]*)?(\n|$)/).filter(row => row.trim() !== '');
    
    if (rows.length === 0) {
      throw new Error('No rows found in tabular environment');
    }
    
    // Count columns based on column spec
    // Remove vertical bars and count column specifiers (l, c, r, p, etc.)
    const columnCount = columnSpec.replace(/\|/g, '').length;
    
    // Parse the first row as header
    const headerRow = rows[0].replace(/\\hline/g, '').trim();
    const headerCells = parseTeXRow(headerRow);
    
    // Create columns
    const columns: TableColumn[] = Array.from({ length: columnCount }).map((_, index) => {
      return {
        id: `column_${index}`,
        name: headerCells[index] || `Column ${index + 1}`,
        index,
      };
    });
    
    // Parse data rows (skip the first row which is the header)
    const dataRows = rows.slice(1);
    
    // Create rows
    const tableRows: TableRow[] = dataRows.map((rowText, rowIndex) => {
      // Remove \hline commands
      const cleanRowText = rowText.replace(/\\hline/g, '').trim();
      const cellValues = parseTeXRow(cleanRowText);
      
      const cells: Record<string, TableCell> = {};
      
      columns.forEach((column, colIndex) => {
        cells[column.id] = {
          value: cellValues[colIndex] || '',
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
      rows: tableRows,
      originalFormat: 'tex',
    };
  } catch (error) {
    console.error('TeX parsing error:', error);
    // Return empty table data
    return {
      columns: [],
      rows: [],
      originalFormat: 'tex',
    };
  }
};

// Parse a TeX table row into cells
const parseTeXRow = (rowText: string): string[] => {
  // Split by & but handle escaped & characters
  const cells: string[] = [];
  let currentCell = '';
  let inCommand = false;
  
  for (let i = 0; i < rowText.length; i++) {
    const char = rowText[i];
    
    if (char === '\\' && rowText[i + 1] === '&') {
      // Escaped &
      currentCell += '&';
      i++; // Skip the next character
    } else if (char === '\\') {
      // Start of a command
      inCommand = true;
      currentCell += char;
    } else if (inCommand && /\s/.test(char)) {
      // End of a command
      inCommand = false;
      currentCell += char;
    } else if (char === '&' && !inCommand) {
      // Cell separator
      cells.push(currentCell.trim());
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  
  // Add the last cell
  if (currentCell.trim() !== '') {
    cells.push(currentCell.trim());
  }
  
  return cells;
};

// Export TableData to TeX
export const exportToTeX = (tableData: TableData, options: TeXOptions): string => {
  const { columns, rows } = tableData;
  
  if (columns.length === 0) {
    return '';
  }
  
  // Create column specification
  let columnSpec = '';
  
  if (options.includeVerticalLines) {
    columnSpec += '|';
  }
  
  columns.forEach((_, index) => {
    const alignment = options.columnAlignment[index] || 'c';
    columnSpec += alignment;
    
    if (options.includeVerticalLines) {
      columnSpec += '|';
    }
  });
  
  // Start tabular environment
  let tex = `\\begin{tabular}{${columnSpec}}\n`;
  
  // Add horizontal line if specified
  if (options.includeHorizontalLines) {
    tex += '\\hline\n';
  }
  
  // Add header row
  tex += columns.map(col => escapeTeX(col.name)).join(' & ') + ' \\\\\n';
  
  // Add horizontal line after header
  if (options.includeHorizontalLines) {
    tex += '\\hline\n';
  }
  
  // Add data rows
  rows.forEach(row => {
    tex += columns.map(col => escapeTeX(row.cells[col.id]?.value || '')).join(' & ') + ' \\\\\n';
    
    // Add horizontal line after each row if specified
    if (options.includeHorizontalLines) {
      tex += '\\hline\n';
    }
  });
  
  // Close tabular environment
  tex += '\\end{tabular}';
  
  return tex;
};

// Helper function to escape special TeX characters
const escapeTeX = (str: string): string => {
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

// Detect if text is likely TeX table
export const detectTeX = (text: string): number => {
  if (!text || text.trim() === '') return 0;
  
  // Check for tabular environment
  const hasTabular = /\\begin\{tabular\}.*\\end\{tabular\}/s.test(text);
  
  if (!hasTabular) {
    return 0;
  }
  
  // Calculate confidence score (0-100)
  let confidence = 70; // Base confidence for having tabular environment
  
  // Check for more specific TeX table features
  if (/\\hline/.test(text)) {
    confidence += 10; // Has horizontal lines
  }
  
  if (/\{[|lcr|]+\}/.test(text)) {
    confidence += 10; // Has column specification
  }
  
  if (/&.*&/.test(text)) {
    confidence += 5; // Has multiple columns
  }
  
  if (/\\\\/.test(text)) {
    confidence += 5; // Has row separators
  }
  
  return Math.min(confidence, 100);
};
