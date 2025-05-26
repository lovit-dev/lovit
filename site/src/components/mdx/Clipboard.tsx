import { ReactNode, useEffect } from 'react';

function Clipboard({ children }: { children: ReactNode }) {
  useEffect(() => {
    const figures = document.querySelectorAll('[data-rehype-pretty-code-figure]');
    const buttons: { button: HTMLButtonElement; onClick: () => void }[] = [];

    for (const figure of figures) {
      // Skip if it's a package manager tabs code block
      if (figure.closest('.package-manager-tabs')) {
        continue;
      }

      if (figure.querySelector('.copy-button')) {
        continue;
      }

      const code = figure.querySelector('pre code');
      const codeText = code?.textContent || '';

      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy Code';

      const onClick = createOnClickHandler(codeText, button);

      button.addEventListener('click', onClick);
      figure.insertBefore(button, figure.firstChild);

      buttons.push({ button, onClick });
    }

    return () => {
      for (const { button, onClick } of buttons) {
        button.removeEventListener('click', onClick);
      }
    };
  }, [children]);

  return children;
}

function handleCopy(codeText: string, button: HTMLButtonElement) {
  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      button.textContent = 'Copied';

      setTimeout(() => {
        button.textContent = 'Copy Code';
      }, 2000);
    })
    .catch(() => {
      alert('Failed to copy');
    });
}

function createOnClickHandler(codeText: string, button: HTMLButtonElement) {
  return () => handleCopy(codeText, button);
}

export default Clipboard;
