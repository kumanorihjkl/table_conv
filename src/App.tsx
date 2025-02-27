import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import InputArea from './components/InputArea';
import TablePreview from './components/TablePreview';
import FormatTabs from './components/FormatTabs';
import OutputArea from './components/OutputArea';
import { 
  TableData, 
  FormatType, 
  FormatOptions, 
  FormatDetectionResult 
} from './types';
import { 
  detectFormat, 
  parseTable, 
  defaultFormatOptions 
} from './utils/tableUtils';

function App() {
  // State for input text and detected formats
  const [inputText, setInputText] = useState('');
  const [detectedFormats, setDetectedFormats] = useState<FormatDetectionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State for input format selection
  const [inputFormat, setInputFormat] = useState<FormatType>('csv');
  
  // State for table data
  const [tableData, setTableData] = useState<TableData>({
    columns: [],
    rows: [],
    originalFormat: 'csv',
  });
  
  // State for output format selection
  const [outputFormat, setOutputFormat] = useState<FormatType>('json');
  
  // State for format options
  const [formatOptions, setFormatOptions] = useState<FormatOptions>(defaultFormatOptions);

  // Handle input text change
  const handleInputTextChange = (text: string) => {
    setInputText(text);
    
    if (text.trim() === '') {
      setDetectedFormats([]);
      setTableData({
        columns: [],
        rows: [],
        originalFormat: inputFormat,
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Detect format
    const formats = detectFormat(text);
    setDetectedFormats(formats);
    
    // Auto-select detected format if confidence is high
    if (formats.length > 0 && formats[0].confidence > 70) {
      setInputFormat(formats[0].format);
    }
    
    // Parse table data
    try {
      const parsedData = parseTable(text, inputFormat, formatOptions);
      setTableData(parsedData);
    } catch (error) {
      console.error('Error parsing table data:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle input format change
  const handleInputFormatChange = (format: FormatType) => {
    setInputFormat(format);
    
    // Re-parse with new format
    if (inputText.trim() !== '') {
      setIsProcessing(true);
      
      try {
        const parsedData = parseTable(inputText, format, formatOptions);
        setTableData(parsedData);
      } catch (error) {
        console.error('Error parsing table data:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Handle format options change
  const handleFormatOptionsChange = (options: Partial<FormatOptions>) => {
    const newOptions = {
      ...formatOptions,
      ...options,
    };
    
    setFormatOptions(newOptions);
    
    // Re-parse with new options if it's the input format
    if (inputText.trim() !== '' && options[inputFormat as keyof FormatOptions]) {
      setIsProcessing(true);
      
      try {
        const parsedData = parseTable(inputText, inputFormat, newOptions);
        setTableData(parsedData);
      } catch (error) {
        console.error('Error parsing table data:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Handle table data change (from editing)
  const handleTableDataChange = (newTableData: TableData) => {
    setTableData(newTableData);
  };

  // Handle output format change
  const handleOutputFormatChange = (format: FormatType) => {
    setOutputFormat(format);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          detectedFormat={detectedFormats.length > 0 ? detectedFormats[0].format : null}
          selectedFormat={inputFormat}
          onFormatChange={handleInputFormatChange}
          formatOptions={formatOptions}
          onFormatOptionsChange={handleFormatOptionsChange}
        />
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {/* Input area */}
              <InputArea
                onTextInput={handleInputTextChange}
                detectedFormats={detectedFormats}
                isProcessing={isProcessing}
              />
              
              {/* Table preview */}
              {tableData.columns.length > 0 && (
                <TablePreview
                  tableData={tableData}
                  onTableDataChange={handleTableDataChange}
                />
              )}
              
              {/* Output format tabs */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">出力形式</h2>
                <FormatTabs
                  selectedFormat={outputFormat}
                  onFormatChange={handleOutputFormatChange}
                />
                
                {/* Output area */}
                <OutputArea
                  tableData={tableData}
                  outputFormat={outputFormat}
                  formatOptions={formatOptions}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
