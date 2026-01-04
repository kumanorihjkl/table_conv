import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaTimes } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="p-4">
        <div className="container mx-auto max-w-5xl flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-slate-500">TableConv</h1>
            <span className="text-sm text-slate-500">
              {t('header.description')}<br/>
              {t('header.supportedFormats')}<br />
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
              >
                {t('header.howToUse')}
              </button>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <a
              href="https://github.com/kumanorihjkl/table_conv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-700 transition-colors"
              title="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-700">{t('usage.title')}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title={t('common.close')}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="px-6 py-4 text-slate-700">
              <h3 className="text-lg font-bold mb-3">{t('usage.basicUsage')}</h3>

              <div className="mb-4">
                <p className="font-semibold">1. {t('usage.dataInput')}</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>{t('usage.dataInputDesc1')}</li>
                  <li>{t('usage.dataInputDesc2')}</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold">2. {t('usage.tablePreview')}</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>{t('usage.tablePreviewDesc1')}</li>
                  <li>{t('usage.tablePreviewDesc2')}</li>
                  <li>{t('usage.tablePreviewDesc3')}</li>
                  <li>{t('usage.tablePreviewDesc4')}</li>
                  <li>{t('usage.tablePreviewDesc5')}</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold">3. {t('usage.outputFormat')}</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>{t('usage.outputFormatDesc1')}</li>
                  <li>{t('usage.outputFormatDesc2')}</li>
                  <li>{t('usage.outputFormatDesc3')}</li>
                  <li>{t('usage.outputFormatDesc4')}</li>
                </ul>
              </div>

              <h3 className="text-lg font-bold mb-3 mt-6">{t('usage.useCases')}</h3>

              <div className="mb-4">
                <p className="font-semibold">{t('usage.csvToMarkdown')}</p>
                <ol className="list-decimal list-inside ml-4 text-sm">
                  <li>{t('usage.csvToMarkdownStep1')}</li>
                  <li>{t('usage.csvToMarkdownStep2')}</li>
                  <li>{t('usage.csvToMarkdownStep3')}</li>
                  <li>{t('usage.csvToMarkdownStep4')}</li>
                </ol>
              </div>

              <div className="mb-4">
                <p className="font-semibold">{t('usage.jsonToHtml')}</p>
                <ol className="list-decimal list-inside ml-4 text-sm">
                  <li>{t('usage.jsonToHtmlStep1')}</li>
                  <li>{t('usage.jsonToHtmlStep2')}</li>
                  <li>{t('usage.jsonToHtmlStep3')}</li>
                  <li>{t('usage.jsonToHtmlStep4')}</li>
                  <li>{t('usage.jsonToHtmlStep5')}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
