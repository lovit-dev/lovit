import React, { useState } from 'react';

const packageManagers = [
  { id: 'npm', label: 'npm', icon: '📦', command: 'npm install lovit' },
  { id: 'yarn', label: 'yarn', icon: '🧶', command: 'yarn add lovit' },
  { id: 'pnpm', label: 'pnpm', icon: '📦', command: 'pnpm add lovit' },
  { id: 'bun', label: 'bun', icon: '🍞', command: 'bun add lovit' }
];

const PackageManagerTabs: React.FC<React.ComponentPropsWithoutRef<'pre'>> = (props) => {
  const [activeTab, setActiveTab] = useState(packageManagers[0].id);
  const [copied, setCopied] = useState(false);
  const activeCommand = packageManagers.find((pm) => pm.id === activeTab)?.command || '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className='package-manager-tabs'>
      <div className='tabs'>
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            className={`tab ${activeTab === pm.id ? 'active' : ''}`}
            onClick={() => setActiveTab(pm.id)}
          >
            <span className='icon'>{pm.icon}</span> {pm.label}
          </button>
        ))}
      </div>
      <div className='code-block-wrapper'>
        <pre {...props} className='code-block'>
          <code>{activeCommand}</code>
        </pre>
        <button className='copy-button' onClick={() => void handleCopy()} title='Copy to clipboard'>
          {copied ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
              <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PackageManagerTabs;
