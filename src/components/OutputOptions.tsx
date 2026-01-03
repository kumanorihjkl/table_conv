import React from 'react';
import { FormatType, FormatOptions } from '../types';

interface OutputOptionsProps {
  selectedFormat: FormatType;
  formatOptions: FormatOptions;
  onFormatOptionsChange: (options: Partial<FormatOptions>) => void;
}

const OutputOptions: React.FC<OutputOptionsProps> = ({
  selectedFormat,
  formatOptions,
  onFormatOptionsChange,
}) => {
  // Handle JSON options change
  const handleJsonOptionChange = (
    key: keyof FormatOptions['json'],
    value: number | boolean
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
    value: string | boolean
  ) => {
    onFormatOptionsChange({
      html: {
        ...formatOptions.html,
        [key]: value,
      },
    });
  };

  // Handle CSV output options change
  const handleCsvOutputOptionChange = (
    key: keyof FormatOptions['csv'],
    value: string
  ) => {
    onFormatOptionsChange({
      csv: {
        ...formatOptions.csv,
        [key]: value,
      },
    });
  };

  // Handle TeX options change
  const handleTexOptionChange = (
    key: keyof FormatOptions['tex'],
    value: boolean
  ) => {
    onFormatOptionsChange({
      tex: {
        ...formatOptions.tex,
        [key]: value,
      },
    });
  };

  // CSV output options
  if (selectedFormat === 'csv') {
    return (
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold mb-3 text-slate-700">出力オプション</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">区切り文字</label>
            <select
              className="w-full p-2 border border-slate-300 rounded-md text-sm"
              value={formatOptions.csv.delimiter}
              onChange={(e) => handleCsvOutputOptionChange('delimiter', e.target.value)}
            >
              <option value=",">カンマ (,)</option>
              <option value=";">セミコロン (;)</option>
              <option value={'\t'}>タブ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">エンコーディング</label>
            <select
              className="w-full p-2 border border-slate-300 rounded-md text-sm"
              value={formatOptions.csv.encoding}
              onChange={(e) => handleCsvOutputOptionChange('encoding', e.target.value)}
            >
              <option value="utf8">UTF-8</option>
              <option value="utf8-bom">UTF-8 (BOM付き)</option>
              <option value="shift-jis">Shift-JIS</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // JSON output options
  if (selectedFormat === 'json') {
    return (
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold mb-3 text-slate-700">出力オプション</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">インデント</label>
            <input
              type="number"
              className="w-full p-2 border border-slate-300 rounded-md text-sm"
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
            <label htmlFor="includeLineBreaks" className="text-sm text-slate-600">
              改行を含める
            </label>
          </div>
        </div>
      </div>
    );
  }

  // HTML output options
  if (selectedFormat === 'html') {
    return (
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold mb-3 text-slate-700">出力オプション</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">テーブルクラス</label>
            <input
              type="text"
              className="w-full p-2 border border-slate-300 rounded-md text-sm"
              placeholder="例: table table-striped"
              value={formatOptions.html.tableClass}
              onChange={(e) => handleHtmlOptionChange('tableClass', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600">テーブルID</label>
            <input
              type="text"
              className="w-full p-2 border border-slate-300 rounded-md text-sm"
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
            <label htmlFor="includeTheadTbody" className="text-sm text-slate-600">
              thead/tbody タグを含める
            </label>
          </div>
        </div>
      </div>
    );
  }

  // TeX output options
  if (selectedFormat === 'tex') {
    return (
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold mb-3 text-slate-700">出力オプション</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeVerticalLines"
              className="mr-2"
              checked={formatOptions.tex.includeVerticalLines}
              onChange={(e) => handleTexOptionChange('includeVerticalLines', e.target.checked)}
            />
            <label htmlFor="includeVerticalLines" className="text-sm text-slate-600">
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
            <label htmlFor="includeHorizontalLines" className="text-sm text-slate-600">
              横罫線を含める
            </label>
          </div>
        </div>
      </div>
    );
  }

  // Markdown has no specific output options
  return null;
};

export default OutputOptions;
