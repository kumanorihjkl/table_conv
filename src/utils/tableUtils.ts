import { TableData, FormatType, FormatOptions, FormatDetectionResult, TableCell, TableRow } from '../types';
import { parseCSV, exportToCSV, detectCSV } from './csvUtils';
import { parseJSON, exportToJSON, detectJSON } from './jsonUtils';
import { parseMarkdown, exportToMarkdown, detectMarkdown } from './markdownUtils';
import { parseHTML, exportToHTML, detectHTML } from './htmlUtils';
import { parseTeX, exportToTeX, detectTeX } from './texUtils';

// Default format options
export const defaultFormatOptions: FormatOptions = {
  csv: {
    delimiter: ',',
    hasHeader: true,
    encoding: 'utf8',
  },
  json: {
    indent: 2,
    includeLineBreaks: true,
  },
  markdown: {
    alignment: ['left', 'left', 'left'],
  },
  html: {
    tableClass: '',
    tableId: '',
    includeTheadTbody: true,
  },
  tex: {
    columnAlignment: ['c', 'c', 'c'],
    includeVerticalLines: true,
    includeHorizontalLines: true,
  },
};

// Detect the format of the input text
export const detectFormat = (text: string): FormatDetectionResult[] => {
  if (!text || text.trim() === '') {
    return [];
  }
  
  const results: FormatDetectionResult[] = [];
  
  // Check each format and get confidence score
  const csvConfidence = detectCSV(text);
  const jsonConfidence = detectJSON(text);
  const markdownConfidence = detectMarkdown(text);
  const htmlConfidence = detectHTML(text);
  const texConfidence = detectTeX(text);
  
  // Add results with confidence > 0, sorted by confidence (highest first)
  if (csvConfidence > 0) {
    results.push({ format: 'csv', confidence: csvConfidence });
  }
  
  if (jsonConfidence > 0) {
    results.push({ format: 'json', confidence: jsonConfidence });
  }
  
  if (markdownConfidence > 0) {
    results.push({ format: 'markdown', confidence: markdownConfidence });
  }
  
  if (htmlConfidence > 0) {
    results.push({ format: 'html', confidence: htmlConfidence });
  }
  
  if (texConfidence > 0) {
    results.push({ format: 'tex', confidence: texConfidence });
  }
  
  // Sort by confidence (highest first)
  results.sort((a, b) => b.confidence - a.confidence);
  
  return results;
};

// Parse input text to TableData based on format
export const parseTable = (text: string, format: FormatType, options: FormatOptions): TableData => {
  switch (format) {
    case 'csv':
      return parseCSV(text, options.csv);
    case 'json':
      return parseJSON(text);
    case 'markdown':
      return parseMarkdown(text);
    case 'html':
      return parseHTML(text);
    case 'tex':
      return parseTeX(text);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

// Export TableData to specified format
export const exportTable = (tableData: TableData, format: FormatType, options: FormatOptions): string => {
  switch (format) {
    case 'csv':
      return exportToCSV(tableData, options.csv);
    case 'json':
      return exportToJSON(tableData, options.json);
    case 'markdown':
      return exportToMarkdown(tableData, options.markdown);
    case 'html':
      return exportToHTML(tableData, options.html);
    case 'tex':
      return exportToTeX(tableData, options.tex);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

// Generate a unique ID (for rows, etc.)
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Create an empty table with specified columns
export const createEmptyTable = (columnNames: string[], format: FormatType = 'csv'): TableData => {
  const columns = columnNames.map((name, index) => ({
    id: `column_${index}`,
    name,
    index,
  }));
  
  return {
    columns,
    rows: [],
    originalFormat: format,
  };
};

// Add a new row to the table
export const addRow = (tableData: TableData, values: string[] = []): TableData => {
  const { columns, rows } = tableData;
  
  const cells: Record<string, TableCell> = {};
  
  columns.forEach((column, index) => {
    cells[column.id] = {
      value: values[index] || '',
      row: rows.length,
      col: index,
    };
  });
  
  const newRow: TableRow = {
    id: generateId(),
    index: rows.length,
    cells,
  };
  
  return {
    ...tableData,
    rows: [...rows, newRow],
  };
};

// Update a cell value
export const updateCell = (
  tableData: TableData,
  rowIndex: number,
  columnId: string,
  value: string
): TableData => {
  const { rows } = tableData;
  
  if (rowIndex < 0 || rowIndex >= rows.length) {
    return tableData;
  }
  
  const row = rows[rowIndex];
  
  if (!row.cells[columnId]) {
    return tableData;
  }
  
  const updatedRows = [...rows];
  updatedRows[rowIndex] = {
    ...row,
    cells: {
      ...row.cells,
      [columnId]: {
        ...row.cells[columnId],
        value,
      },
    },
  };
  
  return {
    ...tableData,
    rows: updatedRows,
  };
};

// Delete a row
export const deleteRow = (tableData: TableData, rowIndex: number): TableData => {
  const { rows } = tableData;
  
  if (rowIndex < 0 || rowIndex >= rows.length) {
    return tableData;
  }
  
  const updatedRows = rows.filter((_, index) => index !== rowIndex)
    .map((row, index) => ({
      ...row,
      index,
      cells: Object.fromEntries(
        Object.entries(row.cells).map(([key, cell]) => [
          key,
          { ...cell, row: index }
        ])
      ),
    }));
  
  return {
    ...tableData,
    rows: updatedRows,
  };
};

// Update a column name
export const updateColumnName = (
  tableData: TableData,
  columnId: string,
  newName: string
): TableData => {
  const { columns } = tableData;
  
  const columnIndex = columns.findIndex(col => col.id === columnId);
  
  if (columnIndex === -1) {
    return tableData;
  }
  
  const updatedColumns = [...columns];
  updatedColumns[columnIndex] = {
    ...columns[columnIndex],
    name: newName,
  };
  
  return {
    ...tableData,
    columns: updatedColumns,
  };
};

// Reorder columns
export const reorderColumns = (tableData: TableData, newOrder: string[]): TableData => {
  const { columns } = tableData;
  
  // Validate that all column IDs are present
  const allColumnsPresent = columns.every(col => newOrder.includes(col.id));
  
  if (!allColumnsPresent || newOrder.length !== columns.length) {
    return tableData;
  }
  
  const updatedColumns = newOrder.map((id, index) => {
    const column = columns.find(col => col.id === id);
    return {
      ...column!,
      index,
    };
  });
  
  return {
    ...tableData,
    columns: updatedColumns,
  };
};

// Sort table by column
export const sortTableByColumn = (
  tableData: TableData,
  columnId: string,
  direction: 'asc' | 'desc' = 'asc'
): TableData => {
  const { rows } = tableData;
  
  const sortedRows = [...rows].sort((a, b) => {
    const valueA = a.cells[columnId]?.value || '';
    const valueB = b.cells[columnId]?.value || '';
    
    // Try to sort numerically if both values are numbers
    const numA = Number(valueA);
    const numB = Number(valueB);
    
    if (!isNaN(numA) && !isNaN(numB)) {
      return direction === 'asc' ? numA - numB : numB - numA;
    }
    
    // Otherwise sort alphabetically
    return direction === 'asc'
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
  
  // Update row indices
  const updatedRows = sortedRows.map((row, index) => ({
    ...row,
    index,
    cells: Object.fromEntries(
      Object.entries(row.cells).map(([key, cell]) => [
        key,
        { ...cell, row: index }
      ])
    ),
  }));
  
  return {
    ...tableData,
    rows: updatedRows,
  };
};
