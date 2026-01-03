import React from 'react';
import { FormatType } from '../types';
import {
  FaFileAlt,
  FaFileCode,
  FaFileExcel,
  FaCode
} from 'react-icons/fa';

interface InputFormatTabsProps {
  selectedFormat: FormatType;
  detectedFormat: FormatType | null;
  onFormatChange: (format: FormatType) => void;
}

const InputFormatTabs: React.FC<InputFormatTabsProps> = ({
  selectedFormat,
  detectedFormat,
  onFormatChange,
}) => {
  // Input formats (exclude TeX which is output-only)
  const inputFormats: FormatType[] = ['csv', 'json', 'markdown', 'html'];

  // Format icons
  const formatIcons: Record<FormatType, React.ReactNode> = {
    csv: <FaFileExcel />,
    json: <FaFileCode />,
    markdown: <FaFileAlt />,
    html: <FaCode />,
    tex: null,
  };

  // Format display names
  const formatNames: Record<FormatType, string> = {
    csv: 'CSV',
    json: 'JSON',
    markdown: 'Markdown',
    html: 'HTML',
    tex: 'TeX',
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 mb-4">
      <div className="flex">
        {inputFormats.map((format) => (
          <button
            key={format}
            className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 transition-colors ${
              selectedFormat === format
                ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
                : 'text-slate-600 hover:bg-slate-50 border-b border-slate-200'
            }`}
            onClick={() => onFormatChange(format)}
          >
            <span>{formatIcons[format]}</span>
            <span>{formatNames[format]}</span>
            {detectedFormat === format && (
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                検出
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InputFormatTabs;
