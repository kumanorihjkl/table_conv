import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaFileAlt, FaSpinner } from 'react-icons/fa';
import { FormatType, FormatDetectionResult } from '../types';

interface InputAreaProps {
  onTextInput: (text: string) => void;
  detectedFormats: FormatDetectionResult[];
  isProcessing: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({
  onTextInput,
  detectedFormats,
  isProcessing,
}) => {
  const [inputText, setInputText] = useState('');

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    onTextInput(text);
  };

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        const text = reader.result as string;
        setInputText(text);
        onTextInput(text);
      };

      reader.readAsText(file);
    },
    [onTextInput]
  );

  // Set up dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt', '.csv', '.json', '.md', '.html', '.tex'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'text/markdown': ['.md'],
      'text/html': ['.html'],
      // 'text/x-tex': ['.tex'],
    },
    multiple: false,
  });

  // Format confidence display
  const renderFormatConfidence = () => {
    if (detectedFormats.length === 0 || !inputText.trim()) {
      return null;
    }

    return (
      <div className="mt-2 text-sm">
        <p className="font-medium">検出されたフォーマット:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {detectedFormats.map((format) => (
            <span
              key={format.format}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md flex items-center"
            >
              {formatNames[format.format]} ({format.confidence}%)
            </span>
          ))}
        </div>
      </div>
    );
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
    <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-2">テーブルデータ入力</h2>

      {/* Text input area */}
      <div className="mb-4">
        <textarea
          className="w-full h-64 p-3 border border-slate-300 rounded-md font-mono text-sm resize-none"
          placeholder="ここにテーブルデータを入力するか、ファイルをドラッグ＆ドロップしてください..."
          value={inputText}
          onChange={handleTextChange}
          disabled={isProcessing}
        />
      </div>

      {/* Format detection results */}
      {renderFormatConfidence()}

      {/* File upload area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 rounded-md text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-300 hover:bg-slate-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-slate-500">
          {isProcessing ? (
            <>
              <FaSpinner className="text-2xl animate-spin mb-2" />
              <p>処理中...</p>
            </>
          ) : isDragActive ? (
            <>
              <FaFileAlt className="text-2xl mb-2" />
              <p>ファイルをドロップしてください</p>
            </>
          ) : (
            <>
              <FaUpload className="text-2xl mb-2" />
              <p>
                ファイルをドラッグ＆ドロップするか、クリックして選択してください
              </p>
              <p className="text-xs mt-1">
                {/* 対応形式: CSV, JSON, Markdown, HTML, TeX */}
                対応形式: CSV, JSON, Markdown, HTML
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputArea;
