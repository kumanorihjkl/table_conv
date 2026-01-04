import React, { useState } from 'react';
import { FaGithub, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="p-4">
        <div className="container mx-auto max-w-5xl flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-slate-500">TableConv</h1>
            <span className="text-sm text-slate-500">
              テーブル形式のデータを相互変換できるツール。ブラウザ内で実行され、サーバーへのデータ送信を行いません。<br/>
              対応形式: CSV, JSON, Markdown, HTML, TeX(出力のみ)<br />
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
              >
                詳しい使い方
              </button>
            </span>
          </div>
          <div className="flex items-center space-x-4">
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

      {/* モーダルウィンドウ */}
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
              <h2 className="text-xl font-bold text-slate-700">詳しい使い方</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="閉じる"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="px-6 py-4 text-slate-700">
              <h3 className="text-lg font-bold mb-3">基本的な使い方</h3>

              <div className="mb-4">
                <p className="font-semibold">1. データ入力：</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>テキストエリアに直接入力するか、ファイルをドラッグ＆ドロップ</li>
                  <li>入力形式が自動検出されます（または手動で選択可能）</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold">2. テーブルプレビュー：</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>入力データがテーブル形式で表示されます</li>
                  <li>セルをクリックして値を編集できます</li>
                  <li>列ヘッダーをクリックしてソートできます</li>
                  <li>「行を追加」ボタンで新しい行を追加できます</li>
                  <li>各行の削除ボタンで行を削除できます</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold">3. 出力形式の選択：</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  <li>出力タブ（CSV, JSON, Markdown, HTML, TeX）を選択</li>
                  <li>形式ごとのオプションを設定</li>
                  <li>「コピー」ボタンでクリップボードにコピー</li>
                  <li>「ダウンロード」ボタンでファイルとして保存</li>
                </ul>
              </div>

              <h3 className="text-lg font-bold mb-3 mt-6">ユースケース例</h3>

              <div className="mb-4">
                <p className="font-semibold">CSVからMarkdownへの変換</p>
                <ol className="list-decimal list-inside ml-4 text-sm">
                  <li>CSVデータをテキストエリアに貼り付けるか、CSVファイルをアップロード</li>
                  <li>テーブルプレビューで必要に応じてデータを編集</li>
                  <li>出力形式タブで「Markdown」を選択</li>
                  <li>生成されたMarkdownコードをコピーしてGitHubのREADMEなどに貼り付け</li>
                </ol>
              </div>

              <div className="mb-4">
                <p className="font-semibold">JSONからHTMLテーブルの作成</p>
                <ol className="list-decimal list-inside ml-4 text-sm">
                  <li>JSONデータをテキストエリアに貼り付け</li>
                  <li>テーブルプレビューでデータを確認・編集</li>
                  <li>出力形式タブで「HTML」を選択</li>
                  <li>テーブルクラスやIDを設定</li>
                  <li>生成されたHTMLコードをコピーしてWebページに組み込み</li>
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
