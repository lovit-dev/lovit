import React, { useEffect, useState } from 'react';

interface PackageManager {
  id: string;
  label: string;
  icon: string;
  commandTemplate: string;
}

interface PackageManagerTabsProps extends React.ComponentPropsWithoutRef<'pre'> {
  packageName?: string;
  customPackageManagers?: PackageManager[];
}

const defaultPackageManagers: PackageManager[] = [
  {
    id: 'npm',
    label: 'npm',
    icon: '/icons/npm.png',
    commandTemplate: 'npm install {package}'
  },
  {
    id: 'yarn',
    label: 'yarn',
    icon: '/icons/yarn.png',
    commandTemplate: 'yarn add {package}'
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    icon: '/icons/pnpm.png',
    commandTemplate: 'pnpm add {package}'
  },
  {
    id: 'bun',
    label: 'bun',
    icon: '/icons/bun.png',
    commandTemplate: 'bun add {package}'
  }
];

const STORAGE_KEY = 'preferred-package-manager';

const PackageManagerTabs: React.FC<PackageManagerTabsProps> = ({
  packageName = 'lovit',
  customPackageManagers,
  ...props
}) => {
  const packageManagers = customPackageManagers || defaultPackageManagers;

  const [activeTab, setActiveTab] = useState(() => {
    if (globalThis.window !== undefined) {
      return globalThis.window.localStorage.getItem(STORAGE_KEY) || packageManagers[0].id;
    }
    return packageManagers[0].id;
  });
  const [copied, setCopied] = useState(false);

  const activePackageManager = packageManagers.find((pm) => pm.id === activeTab);
  const activeCommand = activePackageManager
    ? activePackageManager.commandTemplate.replace('{package}', packageName)
    : '';

  useEffect(() => {
    globalThis.window.localStorage.setItem(STORAGE_KEY, activeTab);
  }, [activeTab]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const renderCommand = (command: string) => {
    const [pkgManager, ...rest] = command.split(' ');
    return (
      <>
        <span className='package-manager'>{pkgManager}</span>
        <span className='command-rest'>{' ' + rest.join(' ')}</span>
      </>
    );
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
            <span className='icon'>
              <img src={`/icons/${pm.id}.png`} alt={`${pm.label} icon`} width={16} height={16} />
            </span>
            {pm.label}
          </button>
        ))}
      </div>
      <div className='code-block-wrapper'>
        <pre {...props} className='code-block'>
          <code>{renderCommand(activeCommand)}</code>
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
