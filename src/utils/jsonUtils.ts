import { TableData, JSONOptions, TableColumn, TableRow, TableCell } from '../types';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Parse JSON to TableData
export const parseJSON = (jsonText: string): TableData => {
  try {
    const parsedData = JSON.parse(jsonText);
    
    // Handle array of objects
    if (Array.isArray(parsedData)) {
      return parseArrayOfObjects(parsedData);
    }
    
    // Handle object with array properties
    if (typeof parsedData === 'object' && parsedData !== null) {
      // Find the first array property
      const arrayProp = Object.keys(parsedData).find(key => Array.isArray(parsedData[key]));
      
      if (arrayProp && Array.isArray(parsedData[arrayProp])) {
        return parseArrayOfObjects(parsedData[arrayProp]);
      }
    }
    
    // Fallback: convert any JSON to a simple table
    return parseFallback(parsedData);
    
  } catch (error) {
    console.error('JSON parsing error:', error);
    // Return empty table data
    return {
      columns: [],
      rows: [],
      originalFormat: 'json',
    };
  }
};

// Parse array of objects (most common JSON table format)
const parseArrayOfObjects = (data: any[]): TableData => {
  if (data.length === 0) {
    return {
      columns: [],
      rows: [],
      originalFormat: 'json',
    };
  }
  
  // Collect all possible keys from all objects
  const allKeys = new Set<string>();
  data.forEach(item => {
    if (typeof item === 'object' && item !== null) {
      Object.keys(item).forEach(key => allKeys.add(key));
    }
  });
  
  // Create columns
  const columns: TableColumn[] = Array.from(allKeys).map((key, index) => ({
    id: key,
    name: key,
    index,
  }));
  
  // Create rows
  const rows: TableRow[] = data.map((item, rowIndex) => {
    const cells: Record<string, TableCell> = {};
    
    columns.forEach(column => {
      let value = '';
      
      if (typeof item === 'object' && item !== null && column.id in item) {
        const cellValue = item[column.id];
        
        // Handle different value types
        if (typeof cellValue === 'object' && cellValue !== null) {
          value = JSON.stringify(cellValue);
        } else {
          value = String(cellValue);
        }
      }
      
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
    originalFormat: 'json',
  };
};

// Fallback parser for non-standard JSON
const parseFallback = (data: any): TableData => {
  // Convert to a simple key-value table
  const columns: TableColumn[] = [
    { id: 'key', name: 'Key', index: 0 },
    { id: 'value', name: 'Value', index: 1 },
  ];
  
  const rows: TableRow[] = [];
  
  // Recursive function to flatten JSON
  const flattenJSON = (obj: any, prefix = '') => {
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenJSON(obj[key], fullKey);
        } else {
          const value = typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : String(obj[key]);
          
          rows.push({
            id: generateId(),
            index: rows.length,
            cells: {
              key: { value: fullKey, row: rows.length, col: 0 },
              value: { value, row: rows.length, col: 1 },
            },
          });
        }
      });
    } else {
      rows.push({
        id: generateId(),
        index: 0,
        cells: {
          key: { value: 'value', row: 0, col: 0 },
          value: { value: String(data), row: 0, col: 1 },
        },
      });
    }
  };
  
  flattenJSON(data);
  
  return {
    columns,
    rows,
    originalFormat: 'json',
  };
};

// Export TableData to JSON
export const exportToJSON = (tableData: TableData, options: JSONOptions): string => {
  const { columns, rows } = tableData;
  
  // Convert to array of objects
  const jsonData = rows.map(row => {
    const obj: Record<string, string> = {};
    
    columns.forEach(column => {
      obj[column.name] = row.cells[column.id]?.value || '';
    });
    
    return obj;
  });
  
  // Generate JSON string with specified formatting
  return JSON.stringify(
    jsonData,
    null,
    options.includeLineBreaks ? options.indent : 0
  );
};

// Detect if text is likely JSON
export const detectJSON = (text: string): number => {
  if (!text || text.trim() === '') return 0;
  
  // Try to parse as JSON
  try {
    const parsed = JSON.parse(text);
    
    // Calculate confidence score (0-100)
    let confidence = 80; // Base confidence if it parses
    
    // Check if it's an array of objects (ideal for table)
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
      confidence += 20;
    }
    // Check if it's an object with array properties
    else if (typeof parsed === 'object' && parsed !== null) {
      const hasArrayProp = Object.values(parsed).some(val => Array.isArray(val));
      if (hasArrayProp) {
        confidence += 15;
      }
    }
    
    return confidence;
  } catch (e) {
    // Not valid JSON
    return 0;
  }
};
