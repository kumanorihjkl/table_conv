import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormatType, TableData, FormatOptions } from '../types';
import { exportTable } from '../utils/tableUtils';
import { FaCopy, FaDownload, FaCheck } from 'react-icons/fa';

interface OutputAreaProps {
  tableData: TableData;
  outputFormat: FormatType | null;
  formatOptions: FormatOptions;
}

const OutputArea: React.FC<OutputAreaProps> = ({
  tableData,
  outputFormat,
  formatOptions,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Return null if no format selected
  if (outputFormat === null) {
    return null;
  }

  // Generate output text based on format
  const getOutputText = (): string => {
    if (tableData.columns.length === 0) {
      return '';
    }

    try {
      return exportTable(tableData, outputFormat, formatOptions);
    } catch (error) {
      console.error('Error generating output:', error);
      return t('output.error');
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    const outputText = getOutputText();

    if (!outputText) return;

    navigator.clipboard.writeText(outputText).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('Failed to copy to clipboard:', err);
      }
    );
  };

  // Handle download
  const handleDownload = () => {
    const outputText = getOutputText();

    if (!outputText) return;

    // Create file extensions map
    const fileExtensions: Record<FormatType, string> = {
      csv: '.csv',
      json: '.json',
      markdown: '.md',
      html: '.html',
      tex: '.tex',
    };

    // Create blob and download
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `table_export${fileExtensions[outputFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format display names
  const formatNames: Record<FormatType, string> = {
    csv: 'CSV',
    json: 'JSON',
    markdown: 'Markdown',
    html: 'HTML',
    tex: 'TeX',
  };

  // Get output text
  const outputText = getOutputText();

  return (
    <div className="mt-4 pt-4 border-t border-slate-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold mb-3">
          {t('output.outputTitle', { format: formatNames[outputFormat] })}
        </h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md flex items-center space-x-1 transition-colors ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
            onClick={handleCopy}
            disabled={!outputText}
          >
            {copied ? (
              <>
                <FaCheck size={12} />
                <span>{t('common.copied')}</span>
              </>
            ) : (
              <>
                <FaCopy size={12} />
                <span>{t('common.copy')}</span>
              </>
            )}
          </button>
          <button
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center space-x-1 hover:bg-blue-200 transition-colors"
            onClick={handleDownload}
            disabled={!outputText}
          >
            <FaDownload size={12} />
            <span>{t('common.download')}</span>
          </button>
        </div>
      </div>

      <div className="border border-slate-300 rounded-md bg-slate-50 p-4 h-64 overflow-auto">
        {tableData.columns.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>{t('output.noData')}</p>
          </div>
        ) : (
          <pre className="font-mono text-sm whitespace-pre-wrap">{outputText}</pre>
        )}
      </div>
    </div>
  );
};

export default OutputArea;
