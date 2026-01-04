export default {
  // Common
  common: {
    appName: 'TableConv',
    copy: '复制',
    copied: '已复制',
    download: '下载',
    close: '关闭',
    processing: '处理中...',
    rows: '行',
    columns: '列',
  },

  // SEO / Meta
  meta: {
    title: 'TableConv - 免费CSV/JSON/Markdown/HTML/TeX表格转换工具',
    description: '免费在线工具，可在CSV、JSON、Markdown、HTML和TeX格式之间转换表格数据。支持文件上传、实时预览和单元格编辑。适合程序员和数据分析师使用。',
    ogTitle: 'TableConv - CSV/JSON/Markdown表格转换工具',
    ogDescription: '在CSV、JSON、Markdown、HTML和TeX之间转换表格数据。免费在线转换工具。',
    twitterDescription: '免费在线工具，可在CSV、JSON、Markdown、HTML和TeX之间转换',
  },

  // Header
  header: {
    description: '表格格式相互转换工具。在浏览器中运行，不会将数据发送到服务器。',
    supportedFormats: '支持格式：CSV、JSON、Markdown、HTML、TeX（仅输出）',
    howToUse: '使用说明',
  },

  // Usage Modal
  usage: {
    title: '使用说明',
    basicUsage: '基本用法',
    dataInput: '数据输入：',
    dataInputDesc1: '直接输入文本或拖放文件',
    dataInputDesc2: '自动检测输入格式（或手动选择）',
    tablePreview: '表格预览：',
    tablePreviewDesc1: '输入数据以表格形式显示',
    tablePreviewDesc2: '点击单元格编辑值',
    tablePreviewDesc3: '点击列标题进行排序',
    tablePreviewDesc4: '使用"添加行"按钮添加新行',
    tablePreviewDesc5: '使用每行的删除按钮删除行',
    outputFormat: '输出格式选择：',
    outputFormatDesc1: '选择输出标签（CSV、JSON、Markdown、HTML、TeX）',
    outputFormatDesc2: '配置格式特定选项',
    outputFormatDesc3: '使用"复制"按钮复制到剪贴板',
    outputFormatDesc4: '使用"下载"按钮保存为文件',
    useCases: '使用案例',
    csvToMarkdown: 'CSV转换为Markdown',
    csvToMarkdownStep1: '将CSV数据粘贴到文本区域或上传CSV文件',
    csvToMarkdownStep2: '根据需要在表格预览中编辑数据',
    csvToMarkdownStep3: '在输出格式标签中选择"Markdown"',
    csvToMarkdownStep4: '复制生成的Markdown代码用于GitHub README等',
    jsonToHtml: '从JSON创建HTML表格',
    jsonToHtmlStep1: '将JSON数据粘贴到文本区域',
    jsonToHtmlStep2: '在表格预览中查看和编辑数据',
    jsonToHtmlStep3: '在输出格式标签中选择"HTML"',
    jsonToHtmlStep4: '配置表格类名和ID',
    jsonToHtmlStep5: '复制生成的HTML代码嵌入网页',
  },

  // Input Area
  input: {
    title: '表格数据输入',
    placeholder: '在此输入表格数据或拖放文件...',
    detectedFormat: '检测到的格式：',
    dropFile: '拖放文件到此处',
    dragOrClick: '拖放文件或点击选择',
    supportedFormats: '支持格式：CSV、JSON、Markdown、HTML',
    inputFormat: '输入格式',
  },

  // Table Preview
  table: {
    title: '表格预览',
    addRow: '添加行',
    deleteRow: '删除行',
    noData: '没有表格数据。请输入数据。',
    rowsColumns: '{{rows}} 行 × {{columns}} 列',
  },

  // Output Area
  output: {
    title: '输出格式',
    outputTitle: '{{format}} 输出',
    noData: '没有表格数据。请输入数据。',
    error: '生成输出时发生错误。',
  },

  // Options
  options: {
    inputOptions: '输入选项',
    outputOptions: '输出选项',
    delimiter: '分隔符',
    comma: '逗号 (,)',
    semicolon: '分号 (;)',
    tab: '制表符',
    hasHeader: '将第一行作为标题',
    encoding: '编码',
    utf8: 'UTF-8',
    utf8Bom: 'UTF-8（带BOM）',
    shiftJis: 'Shift-JIS',
    indent: '缩进',
    includeLineBreaks: '包含换行',
    tableClass: '表格类名',
    tableClassPlaceholder: '例如：table table-striped',
    tableId: '表格ID',
    tableIdPlaceholder: '例如：myTable',
    includeTheadTbody: '包含thead/tbody标签',
    includeVerticalLines: '包含垂直线',
    includeHorizontalLines: '包含水平线',
  },

  // Language
  language: {
    label: '语言',
    ja: '日本語',
    en: 'English',
    zh: '中文',
  },
};
