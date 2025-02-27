import { TableData, HTMLOptions, TableColumn, TableRow, TableCell } from '../types';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Parse HTML table to TableData
export const parseHTML = (htmlText: string): TableData => {
  try {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    // Find the first table element
    const tableElement = doc.querySelector('table');
    
    if (!tableElement) {
      throw new Error('No table element found in HTML');
    }
    
    // Find header rows (either in thead or first tr)
    const headerRow = tableElement.querySelector('thead tr') || tableElement.querySelector('tr');
    
    if (!headerRow) {
      throw new Error('No header row found in table');
    }
    
    // Extract header cells
    const headerCells = Array.from(headerRow.querySelectorAll('th, td'));
    
    // Create columns
    const columns: TableColumn[] = headerCells.map((cell, index) => ({
      id: `column_${index}`,
      name: cell.textContent?.trim() || `Column ${index + 1}`,
      index,
    }));
    
    // Find all data rows
    let dataRows: HTMLTableRowElement[];
    
    // If there's a tbody, use its rows (excluding any header rows)
    const tbody = tableElement.querySelector('tbody');
    if (tbody) {
      dataRows = Array.from(tbody.querySelectorAll('tr'));
    } else {
      // Otherwise use all rows except the first one (assumed to be header)
      const allRows = Array.from(tableElement.querySelectorAll('tr'));
      dataRows = allRows.slice(1);
    }
    
    // Create rows
    const rows: TableRow[] = dataRows.map((rowElement, rowIndex) => {
      const cells: Record<string, TableCell> = {};
      const cellElements = Array.from(rowElement.querySelectorAll('td, th'));
      
      columns.forEach((column, colIndex) => {
        const cellElement = cellElements[colIndex];
        cells[column.id] = {
          value: cellElement?.textContent?.trim() || '',
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
      originalFormat: 'html',
    };
  } catch (error) {
    console.error('HTML parsing error:', error);
    // Return empty table data
    return {
      columns: [],
      rows: [],
      originalFormat: 'html',
    };
  }
};

// Export TableData to HTML
export const exportToHTML = (tableData: TableData, options: HTMLOptions): string => {
  const { columns, rows } = tableData;
  
  if (columns.length === 0) {
    return '';
  }
  
  // Start table tag with optional class and id
  let html = '<table';
  
  if (options.tableClass) {
    html += ` class="${options.tableClass}"`;
  }
  
  if (options.tableId) {
    html += ` id="${options.tableId}"`;
  }
  
  html += '>\n';
  
  // Add thead if specified
  if (options.includeTheadTbody) {
    html += '  <thead>\n    <tr>\n';
    
    // Add header cells
    columns.forEach(column => {
      html += `      <th>${escapeHTML(column.name)}</th>\n`;
    });
    
    html += '    </tr>\n  </thead>\n';
    
    // Add tbody
    html += '  <tbody>\n';
    
    // Add data rows
    rows.forEach(row => {
      html += '    <tr>\n';
      
      columns.forEach(column => {
        const value = row.cells[column.id]?.value || '';
        html += `      <td>${escapeHTML(value)}</td>\n`;
      });
      
      html += '    </tr>\n';
    });
    
    html += '  </tbody>\n';
  } else {
    // Simple table without thead/tbody
    
    // Add header row
    html += '  <tr>\n';
    
    columns.forEach(column => {
      html += `    <th>${escapeHTML(column.name)}</th>\n`;
    });
    
    html += '  </tr>\n';
    
    // Add data rows
    rows.forEach(row => {
      html += '  <tr>\n';
      
      columns.forEach(column => {
        const value = row.cells[column.id]?.value || '';
        html += `    <td>${escapeHTML(value)}</td>\n`;
      });
      
      html += '  </tr>\n';
    });
  }
  
  // Close table tag
  html += '</table>';
  
  return html;
};

// Helper function to escape HTML special characters
const escapeHTML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Detect if text is likely HTML table
export const detectHTML = (text: string): number => {
  if (!text || text.trim() === '') return 0;
  
  // Check for basic HTML table tags
  const hasTableTag = /<table[^>]*>.*<\/table>/is.test(text);
  
  if (!hasTableTag) {
    return 0;
  }
  
  // Calculate confidence score (0-100)
  let confidence = 70; // Base confidence for having table tags
  
  // Check for more specific table structure
  if (/<thead[^>]*>.*<\/thead>/is.test(text)) {
    confidence += 10; // Has thead
  }
  
  if (/<tbody[^>]*>.*<\/tbody>/is.test(text)) {
    confidence += 10; // Has tbody
  }
  
  if (/<th[^>]*>.*<\/th>/is.test(text)) {
    confidence += 5; // Has th elements
  }
  
  if (/<tr[^>]*>.*<\/tr>/is.test(text)) {
    confidence += 5; // Has tr elements
  }
  
  return Math.min(confidence, 100);
};
