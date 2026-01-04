import React, { useState, useRef, useEffect } from 'react';
import { FormatType } from '../types';
import {
  FaFileAlt,
  FaFileCode,
  FaFileExcel,
  FaCode
} from 'react-icons/fa';

interface InputFormatTabsProps {
  selectedFormat: FormatType | null;
  detectedFormat: FormatType | null;
  onFormatChange: (format: FormatType) => void;
}

const InputFormatTabs: React.FC<InputFormatTabsProps> = ({
  selectedFormat,
  detectedFormat,
  onFormatChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const [showLeftGradient, setShowLeftGradient] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const hasScrollableContent = scrollWidth > clientWidth;
        const isNotAtEnd = scrollLeft < scrollWidth - clientWidth - 1;
        const isNotAtStart = scrollLeft > 1;
        setShowRightGradient(hasScrollableContent && isNotAtEnd);
        setShowLeftGradient(hasScrollableContent && isNotAtStart);
      }
    };

    const el = scrollRef.current;
    if (el) {
      // Initial check with a small delay to ensure content is rendered
      setTimeout(checkScroll, 0);
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

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
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex border border-slate-200 rounded-md overflow-x-auto scrollbar-hide"
      >
        {inputFormats.map((format) => (
          <button
            key={format}
            className={`sm:flex-1 flex-shrink-0 py-2 px-3 flex items-center justify-center space-x-2 transition-colors text-sm whitespace-nowrap ${
              selectedFormat === format
                ? 'bg-blue-100 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 bg-white'
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
      {showLeftGradient && (
        <div className="sm:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none rounded-l-md" />
      )}
      {showRightGradient && (
        <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none rounded-r-md" />
      )}
    </div>
  );
};

export default InputFormatTabs;
