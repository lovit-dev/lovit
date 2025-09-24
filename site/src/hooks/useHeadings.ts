import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HEADING_H2 = 'H2';
const HEADING_H3 = 'H3';
const HEADING_DEFAULT_TITLE = 'Unknown';

export interface HeadingItem {
  id: string;
  title: string;
}

interface Heading {
  id: string;
  title: string;
  items: HeadingItem[];
}

export const useHeadings = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const location = useLocation();

  useEffect(() => {
    const headingElements = [...document.querySelectorAll('h2, h3')] as HTMLHeadingElement[];
    const nestedHeadings = getNestedHeadings(headingElements);
    setHeadings(nestedHeadings);
  }, [location.pathname]);

  return headings;
};

const getNestedHeadings = (headingElements: HTMLHeadingElement[]) => {
  const headings: Heading[] = [];

  for (const heading of headingElements) {
    const { id, textContent, nodeName } = heading;
    const title = textContent ?? HEADING_DEFAULT_TITLE;

    if (nodeName === HEADING_H2) {
      headings.push({ id, title, items: [] });
    } else if (nodeName === HEADING_H3 && headings.length > 0) {
      headings.at(-1)?.items.push({ id, title });
    }
  }

  return headings;
};
