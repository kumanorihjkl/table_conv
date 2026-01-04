export default {
  // Common
  common: {
    appName: 'TableConv',
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download',
    close: 'Close',
    processing: 'Processing...',
    rows: 'rows',
    columns: 'columns',
  },

  // SEO / Meta
  meta: {
    title: 'TableConv - Free CSV/JSON/Markdown/HTML/TeX Table Converter',
    description: 'Free online tool to convert table data between CSV, JSON, Markdown, HTML, and TeX formats. Features file upload, real-time preview, and cell editing. Perfect for programmers and data analysts.',
    ogTitle: 'TableConv - CSV/JSON/Markdown Table Converter',
    ogDescription: 'Convert table data between CSV, JSON, Markdown, HTML, and TeX. Free online conversion tool.',
    twitterDescription: 'Free online tool to convert between CSV, JSON, Markdown, HTML, and TeX',
  },

  // Header
  header: {
    description: 'A tool to convert between table formats. Runs in your browser with no data sent to servers.',
    supportedFormats: 'Supported formats: CSV, JSON, Markdown, HTML, TeX (output only)',
    howToUse: 'How to Use',
  },

  // Usage Modal
  usage: {
    title: 'How to Use',
    basicUsage: 'Basic Usage',
    dataInput: 'Data Input:',
    dataInputDesc1: 'Enter text directly or drag and drop a file',
    dataInputDesc2: 'Input format is auto-detected (or select manually)',
    tablePreview: 'Table Preview:',
    tablePreviewDesc1: 'Input data is displayed in table format',
    tablePreviewDesc2: 'Click cells to edit values',
    tablePreviewDesc3: 'Click column headers to sort',
    tablePreviewDesc4: 'Use "Add Row" button to add new rows',
    tablePreviewDesc5: 'Use delete button on each row to remove rows',
    outputFormat: 'Output Format Selection:',
    outputFormatDesc1: 'Select output tab (CSV, JSON, Markdown, HTML, TeX)',
    outputFormatDesc2: 'Configure format-specific options',
    outputFormatDesc3: 'Use "Copy" button to copy to clipboard',
    outputFormatDesc4: 'Use "Download" button to save as file',
    useCases: 'Use Case Examples',
    csvToMarkdown: 'Convert CSV to Markdown',
    csvToMarkdownStep1: 'Paste CSV data into text area or upload CSV file',
    csvToMarkdownStep2: 'Edit data in table preview if needed',
    csvToMarkdownStep3: 'Select "Markdown" in output format tab',
    csvToMarkdownStep4: 'Copy generated Markdown code for GitHub README etc.',
    jsonToHtml: 'Create HTML Table from JSON',
    jsonToHtmlStep1: 'Paste JSON data into text area',
    jsonToHtmlStep2: 'Review and edit data in table preview',
    jsonToHtmlStep3: 'Select "HTML" in output format tab',
    jsonToHtmlStep4: 'Configure table class and ID',
    jsonToHtmlStep5: 'Copy generated HTML code to embed in web page',
  },

  // Input Area
  input: {
    title: 'Table Data Input',
    placeholder: 'Enter table data here or drag and drop a file...',
    detectedFormat: 'Detected format:',
    dropFile: 'Drop file here',
    dragOrClick: 'Drag and drop a file or click to select',
    supportedFormats: 'Supported formats: CSV, JSON, Markdown, HTML',
    inputFormat: 'Input Format',
  },

  // Table Preview
  table: {
    title: 'Table Preview',
    addRow: 'Add Row',
    deleteRow: 'Delete row',
    noData: 'No table data. Please enter data.',
    rowsColumns: '{{rows}} rows × {{columns}} columns',
  },

  // Output Area
  output: {
    title: 'Output Format',
    outputTitle: '{{format}} Output',
    noData: 'No table data. Please enter data.',
    error: 'An error occurred while generating output.',
  },

  // Options
  options: {
    inputOptions: 'Input Options',
    outputOptions: 'Output Options',
    delimiter: 'Delimiter',
    comma: 'Comma (,)',
    semicolon: 'Semicolon (;)',
    tab: 'Tab',
    hasHeader: 'Treat first row as header',
    encoding: 'Encoding',
    utf8: 'UTF-8',
    utf8Bom: 'UTF-8 (with BOM)',
    shiftJis: 'Shift-JIS',
    indent: 'Indent',
    includeLineBreaks: 'Include line breaks',
    tableClass: 'Table Class',
    tableClassPlaceholder: 'e.g. table table-striped',
    tableId: 'Table ID',
    tableIdPlaceholder: 'e.g. myTable',
    includeTheadTbody: 'Include thead/tbody tags',
    includeVerticalLines: 'Include vertical lines',
    includeHorizontalLines: 'Include horizontal lines',
  },

  // Language
  language: {
    label: 'Language',
    ja: '日本語',
    en: 'English',
    zh: '中文',
  },
};
