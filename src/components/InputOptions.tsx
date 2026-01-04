import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormatType, FormatOptions } from '../types';

interface InputOptionsProps {
  selectedFormat: FormatType | null;
  formatOptions: FormatOptions;
  onFormatOptionsChange: (options: Partial<FormatOptions>) => void;
}

const InputOptions: React.FC<InputOptionsProps> = ({
  selectedFormat,
  formatOptions,
  onFormatOptionsChange,
}) => {
  const { t } = useTranslation();

  // Handle CSV options change
  const handleCsvOptionChange = (
    key: keyof FormatOptions['csv'],
    value: string | boolean
  ) => {
    onFormatOptionsChange({
      csv: {
        ...formatOptions.csv,
        [key]: value,
      },
    });
  };

  // Only show options for CSV input (other formats don't have input-specific options)
  if (selectedFormat !== 'csv') {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-200">
      <h3 className="text-sm font-semibold mb-3 text-slate-700">{t('options.inputOptions')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-600">{t('options.delimiter')}</label>
          <select
            className="w-full p-2 border border-slate-300 rounded-md text-sm"
            value={formatOptions.csv.delimiter}
            onChange={(e) => handleCsvOptionChange('delimiter', e.target.value)}
          >
            <option value=",">{t('options.comma')}</option>
            <option value=";">{t('options.semicolon')}</option>
            <option value={'\t'}>{t('options.tab')}</option>
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
          <label htmlFor="hasHeader" className="text-sm text-slate-600">
            {t('options.hasHeader')}
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-600">{t('options.encoding')}</label>
          <select
            className="w-full p-2 border border-slate-300 rounded-md text-sm"
            value={formatOptions.csv.encoding}
            onChange={(e) => handleCsvOptionChange('encoding', e.target.value)}
          >
            <option value="utf8">{t('options.utf8')}</option>
            <option value="utf8-bom">{t('options.utf8Bom')}</option>
            <option value="shift-jis">{t('options.shiftJis')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InputOptions;
