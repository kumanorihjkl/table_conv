export default {
  // Common
  common: {
    appName: 'TableConv',
    copy: 'コピー',
    copied: 'コピー済み',
    download: 'ダウンロード',
    close: '閉じる',
    processing: '処理中...',
    rows: '行',
    columns: '列',
  },

  // SEO / Meta
  meta: {
    title: 'TableConv - CSV/JSON/Markdown/HTML/TeX テーブル変換ツール【無料】',
    description: 'CSV、JSON、Markdown、HTML、TeXのテーブルデータを相互変換できる無料オンラインツール。ファイルアップロード対応、リアルタイムプレビュー、セル編集機能付き。プログラマー・データ分析者に最適。',
    ogTitle: 'TableConv - CSV/JSON/Markdown テーブル変換ツール',
    ogDescription: 'CSV、JSON、Markdown、HTML、TeXのテーブルデータを相互変換。無料で使えるオンライン変換ツール。',
    twitterDescription: 'CSV、JSON、Markdown、HTML、TeXを相互変換できる無料オンラインツール',
  },

  // Header
  header: {
    description: 'テーブル形式のデータを相互変換できるツール。ブラウザ内で実行され、サーバーへのデータ送信を行いません。',
    supportedFormats: '対応形式: CSV, JSON, Markdown, HTML, TeX(出力のみ)',
    howToUse: '詳しい使い方',
  },

  // Usage Modal
  usage: {
    title: '詳しい使い方',
    basicUsage: '基本的な使い方',
    dataInput: 'データ入力：',
    dataInputDesc1: 'テキストエリアに直接入力するか、ファイルをドラッグ＆ドロップ',
    dataInputDesc2: '入力形式が自動検出されます（または手動で選択可能）',
    tablePreview: 'テーブルプレビュー：',
    tablePreviewDesc1: '入力データがテーブル形式で表示されます',
    tablePreviewDesc2: 'セルをクリックして値を編集できます',
    tablePreviewDesc3: '列ヘッダーをクリックしてソートできます',
    tablePreviewDesc4: '「行を追加」ボタンで新しい行を追加できます',
    tablePreviewDesc5: '各行の削除ボタンで行を削除できます',
    outputFormat: '出力形式の選択：',
    outputFormatDesc1: '出力タブ（CSV, JSON, Markdown, HTML, TeX）を選択',
    outputFormatDesc2: '形式ごとのオプションを設定',
    outputFormatDesc3: '「コピー」ボタンでクリップボードにコピー',
    outputFormatDesc4: '「ダウンロード」ボタンでファイルとして保存',
    useCases: 'ユースケース例',
    csvToMarkdown: 'CSVからMarkdownへの変換',
    csvToMarkdownStep1: 'CSVデータをテキストエリアに貼り付けるか、CSVファイルをアップロード',
    csvToMarkdownStep2: 'テーブルプレビューで必要に応じてデータを編集',
    csvToMarkdownStep3: '出力形式タブで「Markdown」を選択',
    csvToMarkdownStep4: '生成されたMarkdownコードをコピーしてGitHubのREADMEなどに貼り付け',
    jsonToHtml: 'JSONからHTMLテーブルの作成',
    jsonToHtmlStep1: 'JSONデータをテキストエリアに貼り付け',
    jsonToHtmlStep2: 'テーブルプレビューでデータを確認・編集',
    jsonToHtmlStep3: '出力形式タブで「HTML」を選択',
    jsonToHtmlStep4: 'テーブルクラスやIDを設定',
    jsonToHtmlStep5: '生成されたHTMLコードをコピーしてWebページに組み込み',
  },

  // Input Area
  input: {
    title: 'テーブルデータ入力',
    placeholder: 'ここにテーブルデータを入力するか、ファイルをドラッグ＆ドロップしてください...',
    detectedFormat: '検出されたフォーマット:',
    dropFile: 'ファイルをドロップしてください',
    dragOrClick: 'ファイルをドラッグ＆ドロップするか、クリックして選択してください',
    supportedFormats: '対応形式: CSV, JSON, Markdown, HTML',
    inputFormat: '入力形式',
  },

  // Table Preview
  table: {
    title: 'テーブルプレビュー',
    addRow: '行を追加',
    deleteRow: '行を削除',
    noData: 'テーブルデータがありません。データを入力してください。',
    rowsColumns: '{{rows}} 行 × {{columns}} 列',
  },

  // Output Area
  output: {
    title: '出力形式',
    outputTitle: '{{format}} 出力',
    noData: 'テーブルデータがありません。データを入力してください。',
    error: '出力の生成中にエラーが発生しました。',
  },

  // Options
  options: {
    inputOptions: '入力オプション',
    outputOptions: '出力オプション',
    delimiter: '区切り文字',
    comma: 'カンマ (,)',
    semicolon: 'セミコロン (;)',
    tab: 'タブ',
    hasHeader: '1行目をヘッダとして扱う',
    encoding: 'エンコーディング',
    utf8: 'UTF-8',
    utf8Bom: 'UTF-8 (BOM付き)',
    shiftJis: 'Shift-JIS',
    indent: 'インデント',
    includeLineBreaks: '改行を含める',
    tableClass: 'テーブルクラス',
    tableClassPlaceholder: '例: table table-striped',
    tableId: 'テーブルID',
    tableIdPlaceholder: '例: myTable',
    includeTheadTbody: 'thead/tbody タグを含める',
    includeVerticalLines: '縦罫線を含める',
    includeHorizontalLines: '横罫線を含める',
  },

  // Language
  language: {
    label: '言語',
    ja: '日本語',
    en: 'English',
    zh: '中文',
  },
};
