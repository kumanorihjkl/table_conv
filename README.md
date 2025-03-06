# TableConv - テーブル形式変換ツール

![TableConv Logo](https://img.shields.io/badge/TableConv-テーブル形式変換ツール-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue)
![License](https://img.shields.io/badge/License-MIT-green)

TableConv は、さまざまな形式のテーブルデータを相互に変換できる Web アプリケーションです。CSV、JSON、Markdown、HTML、TeX の間でシームレスに変換し、データを編集・整形できます。

## 📋 目次

- [機能概要](#機能概要)
- [対応フォーマット](#対応フォーマット)
- [インストール方法](#インストール方法)
- [使用方法](#使用方法)
- [開発ガイド](#開発ガイド)
- [プロジェクト構成](#プロジェクト構成)
- [技術スタック](#技術スタック)
- [ライセンス](#ライセンス)

## 🚀 機能概要

TableConv は以下の主要機能を提供します：

### 入力機能

- 複数形式のテーブルデータ入力（CSV, JSON, Markdown, HTML, TeX）
- テキスト直接入力とファイルアップロード（ドラッグ＆ドロップ対応）
- 入力形式の自動検出
- 形式ごとの詳細オプション設定

### テーブル編集

- インタラクティブなテーブルプレビュー
- セル値の直接編集
- 行の追加・削除
- 列によるソート
- 列名の編集

### 出力機能

- 複数形式への変換（CSV, JSON, Markdown, HTML, TeX）
- 形式ごとのカスタマイズオプション
- クリップボードへのコピー
- ファイルダウンロード

## 📊 対応フォーマット

### CSV

- カンマ、タブ、セミコロンなどの区切り文字オプション
- ヘッダー行の有無設定
- UTF-8（BOM有/無）、Shift-JISなどのエンコーディング対応

### JSON

- 配列形式のオブジェクト構造
- インデント設定
- 改行オプション

### Markdown

- GitHub Flavored Markdown テーブル形式
- 列アライメント設定（左寄せ、中央寄せ、右寄せ）

### HTML

- 標準的なテーブル構造
- thead/tbody タグの有無オプション
- クラス名・ID 設定

### TeX (LaTeX)

- tabular 環境形式
- 列揃え設定（l, c, r）
- 罫線オプション（縦線・横線）

## 📥 インストール方法

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

### インストール手順

1. リポジトリをクローン：

```bash
git clone https://github.com/yourusername/table_conv.git
cd table_conv
```

2. 依存パッケージをインストール：

```bash
npm install
```

3. 開発サーバーを起動：

```bash
npm run dev
```

4. ブラウザで http://localhost:5173 にアクセス

## 🖥️ 使用方法

### 基本的な使い方

1. **データ入力**：
   - テキストエリアに直接入力するか、ファイルをドラッグ＆ドロップ
   - 入力形式が自動検出されます（または手動で選択可能）

2. **テーブルプレビュー**：
   - 入力データがテーブル形式で表示されます
   - セルをクリックして値を編集できます
   - 列ヘッダーをクリックしてソートできます
   - 「行を追加」ボタンで新しい行を追加できます
   - 各行の削除ボタンで行を削除できます

3. **出力形式の選択**：
   - 出力タブ（CSV, JSON, Markdown, HTML, TeX）を選択
   - 形式ごとのオプションを設定
   - 「コピー」ボタンでクリップボードにコピー
   - 「ダウンロード」ボタンでファイルとして保存

### ユースケース例

#### CSVからMarkdownへの変換

1. CSVデータをテキストエリアに貼り付けるか、CSVファイルをアップロード
2. テーブルプレビューで必要に応じてデータを編集
3. 出力形式タブで「Markdown」を選択
4. 生成されたMarkdownコードをコピーしてGitHubのREADMEなどに貼り付け

#### JSONからHTMLテーブルの作成

1. JSONデータをテキストエリアに貼り付け
2. テーブルプレビューでデータを確認・編集
3. 出力形式タブで「HTML」を選択
4. テーブルクラスやIDを設定
5. 生成されたHTMLコードをコピーしてWebページに組み込み

## 🛠️ 開発ガイド

### 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### コード規約

- TypeScriptの型定義を適切に使用
- コンポーネントはReact関数コンポーネントで実装
- スタイリングはTailwind CSSクラスを使用

## 📁 プロジェクト構成

```
table_conv/
├── public/              # 静的ファイル
├── src/                 # ソースコード
│   ├── components/      # Reactコンポーネント
│   │   ├── Header.tsx   # ヘッダーコンポーネント
│   │   ├── Sidebar.tsx  # サイドバーコンポーネント
│   │   └── ...          # その他コンポーネント
│   ├── utils/           # ユーティリティ関数
│   │   ├── csvUtils.ts  # CSV処理ユーティリティ
│   │   ├── jsonUtils.ts # JSON処理ユーティリティ
│   │   └── ...          # その他ユーティリティ
│   ├── types/           # TypeScript型定義
│   ├── hooks/           # カスタムReactフック
│   ├── App.tsx          # メインアプリケーション
│   └── main.tsx         # エントリーポイント
├── index.html           # HTMLテンプレート
├── tailwind.config.js   # Tailwind CSS設定
├── postcss.config.js    # PostCSS設定
├── tsconfig.json        # TypeScript設定
├── vite.config.ts       # Vite設定
└── package.json         # プロジェクト設定
```

## 💻 技術スタック

- **フロントエンド**:
  - [React](https://reactjs.org/) - UIライブラリ
  - [TypeScript](https://www.typescriptlang.org/) - 型付きJavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
  - [Vite](https://vitejs.dev/) - 高速な開発環境とビルドツール

- **パッケージ**:
  - [react-dropzone](https://react-dropzone.js.org/) - ファイルアップロード
  - [papaparse](https://www.papaparse.com/) - CSV解析
  - [file-saver](https://github.com/eligrey/FileSaver.js) - ファイルダウンロード
  - [react-icons](https://react-icons.github.io/react-icons/) - アイコン

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

---

© 2025 [kumanorihjkl](https://github.com/kumanorihjkl) - テーブル形式変換ツール
