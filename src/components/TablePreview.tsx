import React, { useState } from 'react';
import { TableData, TableColumn, TableRow } from '../types';
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaPlus, FaPen } from 'react-icons/fa';

interface TablePreviewProps {
  tableData: TableData;
  onTableDataChange: (tableData: TableData) => void;
}

const TablePreview: React.FC<TablePreviewProps> = ({
  tableData,
  onTableDataChange,
}) => {
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    columnId: string;
    value: string;
  } | null>(null);
  
  const [editingColumnName, setEditingColumnName] = useState<{
    columnId: string;
    name: string;
  } | null>(null);
  
  const [sortConfig, setSortConfig] = useState<{
    columnId: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Handle cell click for editing
  const handleCellClick = (rowIndex: number, columnId: string, value: string) => {
    setEditingCell({ rowIndex, columnId, value });
  };

  // Handle cell value change
  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingCell) return;
    
    setEditingCell({
      ...editingCell,
      value: e.target.value,
    });
  };

  // Handle cell edit save
  const handleCellBlur = () => {
    if (!editingCell) return;
    
    const { rowIndex, columnId, value } = editingCell;
    
    // Update the table data
    const updatedRows = [...tableData.rows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      cells: {
        ...updatedRows[rowIndex].cells,
        [columnId]: {
          ...updatedRows[rowIndex].cells[columnId],
          value,
        },
      },
    };
    
    onTableDataChange({
      ...tableData,
      rows: updatedRows,
    });
    
    setEditingCell(null);
  };

  // Handle column header click for editing
  const handleColumnHeaderClick = (columnId: string, name: string) => {
    setEditingColumnName({ columnId, name });
  };

  // Handle column name change
  const handleColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingColumnName) return;
    
    setEditingColumnName({
      ...editingColumnName,
      name: e.target.value,
    });
  };

  // Handle column name edit save
  const handleColumnNameBlur = () => {
    if (!editingColumnName) return;
    
    const { columnId, name } = editingColumnName;
    
    // Update the table data
    const updatedColumns = tableData.columns.map(column => {
      if (column.id === columnId) {
        return { ...column, name };
      }
      return column;
    });
    
    onTableDataChange({
      ...tableData,
      columns: updatedColumns,
    });
    
    setEditingColumnName(null);
  };

  // Handle sort
  const handleSort = (columnId: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.columnId === columnId) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ columnId, direction });
    
    // Sort the rows
    const sortedRows = [...tableData.rows].sort((a, b) => {
      const valueA = a.cells[columnId]?.value || '';
      const valueB = b.cells[columnId]?.value || '';
      
      // Try to sort numerically if both values are numbers
      const numA = Number(valueA);
      const numB = Number(valueB);
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return direction === 'asc' ? numA - numB : numB - numA;
      }
      
      // Otherwise sort alphabetically
      return direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    
    // Update row indices
    const updatedRows = sortedRows.map((row, index) => ({
      ...row,
      index,
      cells: Object.fromEntries(
        Object.entries(row.cells).map(([key, cell]) => [
          key,
          { ...cell, row: index }
        ])
      ),
    }));
    
    onTableDataChange({
      ...tableData,
      rows: updatedRows,
    });
  };

  // Handle row delete
  const handleDeleteRow = (rowIndex: number) => {
    const updatedRows = tableData.rows.filter((_, index) => index !== rowIndex)
      .map((row, index) => ({
        ...row,
        index,
        cells: Object.fromEntries(
          Object.entries(row.cells).map(([key, cell]) => [
            key,
            { ...cell, row: index }
          ])
        ),
      }));
    
    onTableDataChange({
      ...tableData,
      rows: updatedRows,
    });
  };

  // Handle add new row
  const handleAddRow = () => {
    const newRowIndex = tableData.rows.length;
    const newRowId = Math.random().toString(36).substring(2, 9);
    
    const cells: Record<string, any> = {};
    
    tableData.columns.forEach(column => {
      cells[column.id] = {
        value: '',
        row: newRowIndex,
        col: column.index,
      };
    });
    
    const newRow: TableRow = {
      id: newRowId,
      index: newRowIndex,
      cells,
    };
    
    onTableDataChange({
      ...tableData,
      rows: [...tableData.rows, newRow],
    });
  };

  // Render sort icon
  const renderSortIcon = (columnId: string) => {
    if (!sortConfig || sortConfig.columnId !== columnId) {
      return <FaSort className="text-slate-400" />;
    }
    
    return sortConfig.direction === 'asc' ? (
      <FaSortUp className="text-blue-600" />
    ) : (
      <FaSortDown className="text-blue-600" />
    );
  };

  // If no data, show a message
  if (tableData.columns.length === 0) {
    return (
      <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200 text-center">
        <p className="text-slate-500">
          テーブルデータがありません。データを入力してください。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">テーブルプレビュー</h2>
        <button
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center space-x-1 hover:bg-blue-200 transition-colors"
          onClick={handleAddRow}
        >
          <FaPlus size={12} />
          <span>行を追加</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              {tableData.columns.map(column => (
                <th
                  key={column.id}
                  className="border border-slate-200 px-4 py-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleColumnHeaderClick(column.id, column.name)}
                    >
                      {editingColumnName && editingColumnName.columnId === column.id ? (
                        <input
                          type="text"
                          value={editingColumnName.name}
                          onChange={handleColumnNameChange}
                          onBlur={handleColumnNameBlur}
                          autoFocus
                          className="border border-blue-400 px-1 py-0.5 rounded w-full"
                        />
                      ) : (
                        <div className="flex items-center space-x-1">
                          <span>{column.name}</span>
                          <FaPen size={10} className="text-slate-400 opacity-50" />
                        </div>
                      )}
                    </div>
                    <button
                      className="ml-2 focus:outline-none"
                      onClick={() => handleSort(column.id)}
                    >
                      {renderSortIcon(column.id)}
                    </button>
                  </div>
                </th>
              ))}
              <th className="border border-slate-200 px-2 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-slate-50">
                {tableData.columns.map(column => (
                  <td
                    key={`${row.id}-${column.id}`}
                    className="border border-slate-200 px-4 py-2"
                    onClick={() =>
                      handleCellClick(
                        rowIndex,
                        column.id,
                        row.cells[column.id]?.value || ''
                      )
                    }
                  >
                    {editingCell &&
                    editingCell.rowIndex === rowIndex &&
                    editingCell.columnId === column.id ? (
                      <input
                        type="text"
                        value={editingCell.value}
                        onChange={handleCellChange}
                        onBlur={handleCellBlur}
                        autoFocus
                        className="border border-blue-400 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      row.cells[column.id]?.value || ''
                    )}
                  </td>
                ))}
                <td className="border border-slate-200 px-2 py-2 text-center">
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => handleDeleteRow(rowIndex)}
                    title="行を削除"
                  >
                    <FaTrash size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-sm text-slate-500">
        <p>
          {tableData.rows.length} 行 × {tableData.columns.length} 列
        </p>
      </div>
    </div>
  );
};

export default TablePreview;
