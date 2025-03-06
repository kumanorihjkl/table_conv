import React from 'react';
import { FormatType, FormatOptions } from '../types';
import { 
  FaFileAlt, 
  FaFileCode, 
  FaFileExcel, 
  FaCode, 
  FaTable 
} from 'react-icons/fa';

interface SidebarProps {
  detectedFormat: FormatType | null;
  selectedFormat: FormatType;
  onFormatChange: (format: FormatType) => void;
  formatOptions: FormatOptions;
  onFormatOptionsChange: (options: Partial<FormatOptions>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  detectedFormat,
  selectedFormat,
  onFormatChange,
  formatOptions,
  onFormatOptionsChange,
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

  // Handle CSV options change
  const handleCsvOptionChange = (
    key: keyof FormatOptions['csv'],
    value: any
  ) => {
    onFormatOptionsChange({
      csv: {
        ...formatOptions.csv,
        [key]: value,
      },
    });
  };

  // Handle JSON options change
  const handleJsonOptionChange = (
    key: keyof FormatOptions['json'],
    value: any
  ) => {
    onFormatOptionsChange({
      json: {
        ...formatOptions.json,
        [key]: value,
      },
    });
  };

  // Handle HTML options change
  const handleHtmlOptionChange = (
    key: keyof FormatOptions['html'],
    value: any
  ) => {
    onFormatOptionsChange({
      html: {
        ...formatOptions.html,
        [key]: value,
      },
    });
  };

  // Handle TeX options change
  const handleTexOptionChange = (
    key: keyof FormatOptions['tex'],
    value: any
  ) => {
    onFormatOptionsChange({
      tex: {
        ...formatOptions.tex,
        [key]: value,
      },
    });
  };

  return (
    <div className="bg-slate-100 w-64 p-4 border-r border-slate-200 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">入力形式</h2>
        <div className="space-y-2">
          {Object.entries(formatNames).map(([format, name]) => {
            if (format === 'tex') return null;
            return (
              <button
                key={format}
                className={`flex items-center space-x-2 px-3 py-2 w-full rounded-md ${
                  selectedFormat === format
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-slate-200'
                }`}
                onClick={() => onFormatChange(format as FormatType)}
              >
                <span className="text-slate-600">{formatIcons[format as FormatType]}</span>
                <span>{name}</span>
                {detectedFormat === format && (
                  <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    検出
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <h2 className="text-lg font-semibold mb-2">オプション</h2>

        {/* CSV Options */}
        {selectedFormat === 'csv' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">区切り文字</label>
              <select
                className="w-full p-2 border border-slate-300 rounded-md"
                value={formatOptions.csv.delimiter}
                onChange={(e) => handleCsvOptionChange('delimiter', e.target.value)}
              >
                <option value=",">カンマ (,)</option>
                <option value=";">セミコロン (;)</option>
                <option value="\t">タブ</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasHeader"
                className="mr-2"
                checked={formatOptions.csv.hasHeader}
                onChange={(e) => handleCsvOptionChange('hasHeader', e.target.checked)}
              />
              <label htmlFor="hasHeader" className="text-sm">
                1行目をヘッダとして扱う
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">エンコーディング</label>
              <select
                className="w-full p-2 border border-slate-300 rounded-md"
                value={formatOptions.csv.encoding}
                onChange={(e) => handleCsvOptionChange('encoding', e.target.value)}
              >
                <option value="utf8">UTF-8</option>
                <option value="utf8-bom">UTF-8 (BOM付き)</option>
                <option value="shift-jis">Shift-JIS</option>
              </select>
            </div>
          </div>
        )}

        {/* JSON Options */}
        {selectedFormat === 'json' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">インデント</label>
              <input
                type="number"
                className="w-full p-2 border border-slate-300 rounded-md"
                min="0"
                max="8"
                value={formatOptions.json.indent}
                onChange={(e) => handleJsonOptionChange('indent', Number(e.target.value))}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeLineBreaks"
                className="mr-2"
                checked={formatOptions.json.includeLineBreaks}
                onChange={(e) => handleJsonOptionChange('includeLineBreaks', e.target.checked)}
              />
              <label htmlFor="includeLineBreaks" className="text-sm">
                改行を含める
              </label>
            </div>
          </div>
        )}

        {/* HTML Options */}
        {selectedFormat === 'html' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">テーブルクラス</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-md"
                placeholder="例: table table-striped"
                value={formatOptions.html.tableClass}
                onChange={(e) => handleHtmlOptionChange('tableClass', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">テーブルID</label>
              <input
                type="text"
                className="w-full p-2 border border-slate-300 rounded-md"
                placeholder="例: myTable"
                value={formatOptions.html.tableId}
                onChange={(e) => handleHtmlOptionChange('tableId', e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeTheadTbody"
                className="mr-2"
                checked={formatOptions.html.includeTheadTbody}
                onChange={(e) => handleHtmlOptionChange('includeTheadTbody', e.target.checked)}
              />
              <label htmlFor="includeTheadTbody" className="text-sm">
                thead/tbody タグを含める
              </label>
            </div>
          </div>
        )}

        {/* TeX Options */}
        {/*
        {selectedFormat === 'tex' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">列の配置</label>
              <div className="flex space-x-2">
                <button
                  className={`flex-1 p-2 border ${
                    formatOptions.tex.columnAlignment[0] === 'l'
                      ? 'bg-blue-100 border-blue-500'
                      : 'border-slate-300'
                  } rounded-md`}
                  onClick={() => handleTexOptionChange('columnAlignment', ['l', 'l', 'l'])}
                >
                  左揃え
                </button>
                <button
                  className={`flex-1 p-2 border ${
                    formatOptions.tex.columnAlignment[0] === 'c'
                      ? 'bg-blue-100 border-blue-500'
                      : 'border-slate-300'
                  } rounded-md`}
                  onClick={() => handleTexOptionChange('columnAlignment', ['c', 'c', 'c'])}
                >
                  中央揃え
                </button>
                <button
                  className={`flex-1 p-2 border ${
                    formatOptions.tex.columnAlignment[0] === 'r'
                      ? 'bg-blue-100 border-blue-500'
                      : 'border-slate-300'
                  } rounded-md`}
                  onClick={() => handleTexOptionChange('columnAlignment', ['r', 'r', 'r'])}
                >
                  右揃え
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeVerticalLines"
                className="mr-2"
                checked={formatOptions.tex.includeVerticalLines}
                onChange={(e) => handleTexOptionChange('includeVerticalLines', e.target.checked)}
              />
              <label htmlFor="includeVerticalLines" className="text-sm">
                縦罫線を含める
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeHorizontalLines"
                className="mr-2"
                checked={formatOptions.tex.includeHorizontalLines}
                onChange={(e) => handleTexOptionChange('includeHorizontalLines', e.target.checked)}
              />
              <label htmlFor="includeHorizontalLines" className="text-sm">
                横罫線を含める
              </label>
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default Sidebar;
