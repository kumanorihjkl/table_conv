import React from 'react';
import { FormatType } from '../types';
import { 
  FaFileAlt, 
  FaFileCode, 
  FaFileExcel, 
  FaCode, 
  FaTable 
} from 'react-icons/fa';

interface FormatTabsProps {
  selectedFormat: FormatType;
  onFormatChange: (format: FormatType) => void;
}

const FormatTabs: React.FC<FormatTabsProps> = ({
  selectedFormat,
  onFormatChange,
}) => {
  // Format icons
  const formatIcons: Record<FormatType, React.ReactNode> = {
    csv: <FaFileExcel />,
    json: <FaFileCode />,
    markdown: <FaFileAlt />,
    html: <FaCode />,
    tex: <FaTable />,
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
    <div className="flex border border-slate-200 rounded-md overflow-hidden">
      {Object.entries(formatNames).map(([format, name]) => (
        <button
          key={format}
          className={`flex-1 py-2 px-3 flex items-center justify-center space-x-2 transition-colors text-sm ${
            selectedFormat === format
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-600 hover:bg-slate-50 bg-white'
          }`}
          onClick={() => onFormatChange(format as FormatType)}
        >
          <span>{formatIcons[format as FormatType]}</span>
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default FormatTabs;
