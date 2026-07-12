import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import InputArea from './components/InputArea';
import InputFormatTabs from './components/InputFormatTabs';
import InputOptions from './components/InputOptions';
import TablePreview from './components/TablePreview';
import FormatTabs from './components/FormatTabs';
import OutputOptions from './components/OutputOptions';
import OutputArea from './components/OutputArea';
import SEOHead from './components/SEOHead';
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
  const { t } = useTranslation();

  // State for input text and detected formats
  const [inputText, setInputText] = useState('');
  const [detectedFormats, setDetectedFormats] = useState<FormatDetectionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // State for input format selection (null = auto-detect mode)
  const [inputFormat, setInputFormat] = useState<FormatType | null>(null);

  // State for table data
  const [tableData, setTableData] = useState<TableData>({
    columns: [],
    rows: [],
    originalFormat: 'csv', // Default, will be updated when parsing
  });

  // State for output format selection (null = not selected yet)
  const [outputFormat, setOutputFormat] = useState<FormatType | null>(null);

  // State for format options
  const [formatOptions, setFormatOptions] = useState<FormatOptions>(defaultFormatOptions);

  // Handle input text change
  const handleInputTextChange = (text: string) => {
    setInputText(text);

    if (text.trim() === '') {
      setDetectedFormats([]);
      setInputFormat(null); // Reset to auto-detect mode
      setTableData({
        columns: [],
        rows: [],
        originalFormat: 'csv',
      });
      return;
    }

    setIsProcessing(true);

    // Detect format
    const formats = detectFormat(text);
    setDetectedFormats(formats);

    // Determine format to use for parsing:
    // - If user has selected a format, use that
    // - Otherwise, auto-select the detected format with highest confidence
    let formatToUse = inputFormat;
    if (formatToUse === null && formats.length > 0) {
      formatToUse = formats[0].format;
      setInputFormat(formatToUse); // Auto-select detected format
    }
    formatToUse = formatToUse ?? 'csv';

    // Parse table data
    try {
      const parsedData = parseTable(text, formatToUse, formatOptions);
      setTableData(parsedData);
    } catch (error) {
      console.error('Error parsing table data:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Re-parse when inputFormat changes (only if we have input text)
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      try {
        // Use selected format, or detected format, or default to csv
        const formatToUse = inputFormat ?? (detectedFormats.length > 0 ? detectedFormats[0].format : 'csv');
        const parsedData = parseTable(inputText, formatToUse, formatOptions);
        setTableData(parsedData);
      } catch (error) {
        console.error('Error parsing table data:', error);
      } finally {
        setIsProcessing(false);
      }
    }, 0);
    // Intentionally re-parse only when the selected input format changes;
    // text and option changes are re-parsed by their own handlers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFormat]);

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

    // Determine the effective format for checking options
    const effectiveFormat = inputFormat ?? (detectedFormats.length > 0 ? detectedFormats[0].format : null);

    // Re-parse with new options if it's the input format
    if (inputText.trim() !== '' && effectiveFormat && options[effectiveFormat as keyof FormatOptions]) {
      setIsProcessing(true);

      try {
        const parsedData = parseTable(inputText, effectiveFormat, newOptions);
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
      <SEOHead />
      <Header />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6">
            {/* Input section - contains input area, format tabs, and options */}
            <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
              <InputArea
                onTextInput={handleInputTextChange}
                detectedFormats={detectedFormats}
                isProcessing={isProcessing}
              />

              {/* Input format tabs (shown only when there's input) */}
              {inputText.trim() && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-semibold mb-3 text-slate-700">{t('input.inputFormat')}</h3>
                  <InputFormatTabs
                    selectedFormat={inputFormat}
                    detectedFormat={detectedFormats.length > 0 ? detectedFormats[0].format : null}
                    onFormatChange={handleInputFormatChange}
                  />
                </div>
              )}

              {/* Input format options (shown only for selected input format) */}
              <InputOptions
                selectedFormat={inputFormat}
                formatOptions={formatOptions}
                onFormatOptionsChange={handleFormatOptionsChange}
              />
            </div>

            {/* Table preview */}
            {tableData.columns.length > 0 && (
              <TablePreview
                tableData={tableData}
                onTableDataChange={handleTableDataChange}
              />
            )}

            {/* Output section - contains format tabs, options, and output */}
            {tableData.columns.length > 0 && (
              <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                <h3 className="text-sm font-semibold mb-3 text-slate-700">{t('output.title')}</h3>
                <FormatTabs
                  selectedFormat={outputFormat}
                  onFormatChange={handleOutputFormatChange}
                />

                {/* Output format options and output area (shown only when format is selected) */}
                {outputFormat && (
                  <>
                    <OutputOptions
                      selectedFormat={outputFormat}
                      formatOptions={formatOptions}
                      onFormatOptionsChange={handleFormatOptionsChange}
                    />

                    <OutputArea
                      tableData={tableData}
                      outputFormat={outputFormat}
                      formatOptions={formatOptions}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
