import Papa from 'papaparse';
import { TableData, CSVOptions, TableColumn, TableRow, TableCell } from '../types';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Parse CSV to TableData
export const parseCSV = (csvText: string, options: CSVOptions): TableData => {
  const parseResult = Papa.parse(csvText, {
    delimiter: options.delimiter,
    header: options.hasHeader,
    skipEmptyLines: true,
  });

  if (parseResult.errors && parseResult.errors.length > 0) {
    console.error('CSV parsing errors:', parseResult.errors);
  }

  const data = parseResult.data as Record<string, string>[];
  
  // Create columns
  let columns: TableColumn[] = [];
  
  if (options.hasHeader && data.length > 0) {
    // Use header row for column names
    columns = Object.keys(data[0]).map((key, index) => ({
      id: key,
      name: key,
      index,
    }));
  } else if (data.length > 0) {
    // Generate column names (Column 1, Column 2, etc.)
    const firstRow = data[0];
    columns = Object.keys(firstRow).map((key, index) => ({
      id: `column_${index}`,
      name: `Column ${index + 1}`,
      index,
    }));
  }

  // Create rows
  const rows: TableRow[] = data.map((rowData, rowIndex) => {
    const cells: Record<string, TableCell> = {};
    
    columns.forEach((column) => {
      const value = rowData[column.id] || '';
      cells[column.id] = {
        value,
        row: rowIndex,
        col: column.index,
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
    originalFormat: 'csv',
  };
};

// Export TableData to CSV
export const exportToCSV = (tableData: TableData, options: CSVOptions): string => {
  const { columns, rows } = tableData;
  
  // Convert to format expected by PapaParse
  const data = rows.map((row) => {
    const rowData: Record<string, string> = {};
    columns.forEach((column) => {
      rowData[column.id] = row.cells[column.id]?.value || '';
    });
    return rowData;
  });

  // Generate CSV
  const csv = Papa.unparse(data, {
    delimiter: options.delimiter,
    header: options.hasHeader,
  });

  // Handle encoding
  if (options.encoding === 'utf8-bom') {
    return '\ufeff' + csv; // Add BOM
  }
  
  // Note: Shift-JIS encoding would require additional libraries for proper conversion
  // For now, we'll just return UTF-8
  return csv;
};

// Detect if text is likely CSV
export const detectCSV = (text: string): number => {
  if (!text || text.trim() === '') return 0;
  
  // Check for common CSV delimiters
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return 0;
  
  // Check for comma delimiter
  const commaCount = lines[0].split(',').length - 1;
  // Check for tab delimiter
  const tabCount = lines[0].split('\t').length - 1;
  // Check for semicolon delimiter
  const semicolonCount = lines[0].split(';').length - 1;
  
  const maxDelimiterCount = Math.max(commaCount, tabCount, semicolonCount);
  
  // Check if all lines have consistent number of delimiters
  const isConsistent = lines.every(line => {
    if (commaCount === maxDelimiterCount) {
      return line.split(',').length === commaCount + 1;
    }
    if (tabCount === maxDelimiterCount) {
      return line.split('\t').length === tabCount + 1;
    }
    if (semicolonCount === maxDelimiterCount) {
      return line.split(';').length === semicolonCount + 1;
    }
    return false;
  });
  
  // Calculate confidence score (0-100)
  let confidence = 0;
  
  if (maxDelimiterCount > 0) {
    confidence += 50; // Has delimiters
    
    if (isConsistent) {
      confidence += 30; // Consistent structure
    }
    
    // Check if first row could be headers (different pattern than other rows)
    if (lines.length > 1) {
      const firstRowHasQuotes = lines[0].includes('"');
      const secondRowHasQuotes = lines[1].includes('"');
      
      if (firstRowHasQuotes !== secondRowHasQuotes) {
        confidence += 10; // Possible header row
      }
    }
  }
  
  return Math.min(confidence, 100);
};
