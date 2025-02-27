// Table data types
export interface TableCell {
  value: string;
  row: number;
  col: number;
}

export interface TableColumn {
  id: string;
  name: string;
  index: number;
}

export interface TableRow {
  id: string;
  index: number;
  cells: Record<string, TableCell>;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  originalFormat: FormatType;
}

// Format types
export type FormatType = 'csv' | 'json' | 'markdown' | 'html' | 'tex';

// CSV options
export interface CSVOptions {
  delimiter: string;
  hasHeader: boolean;
  encoding: 'utf8' | 'utf8-bom' | 'shift-jis';
}

// JSON options
export interface JSONOptions {
  indent: number;
  includeLineBreaks: boolean;
}

// Markdown options
export interface MarkdownOptions {
  alignment: ('left' | 'center' | 'right')[];
}

// HTML options
export interface HTMLOptions {
  tableClass: string;
  tableId: string;
  includeTheadTbody: boolean;
}

// TeX options
export interface TeXOptions {
  columnAlignment: ('l' | 'c' | 'r')[];
  includeVerticalLines: boolean;
  includeHorizontalLines: boolean;
}

// Format detection result
export interface FormatDetectionResult {
  format: FormatType;
  confidence: number;
}

// All format options
export interface FormatOptions {
  csv: CSVOptions;
  json: JSONOptions;
  markdown: MarkdownOptions;
  html: HTMLOptions;
  tex: TeXOptions;
}
