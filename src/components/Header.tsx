import React from 'react';
import { FaTable, FaGithub } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaTable className="text-2xl text-blue-400" />
          <h1 className="text-xl font-bold">TableConv</h1>
          <span className="text-sm text-slate-400">テーブル形式変換ツール</span>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/kumanorihjkl/table_conv"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
            title="GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
