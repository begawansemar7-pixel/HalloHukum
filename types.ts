import React from 'react';

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface RelatedContentItem {
  type: 'blog' | 'faq';
  title: string;
  description: string;
  link?: string;
}

export interface Benefit {
  // FIX: Relaxed type from React.ReactElement<React.SVGProps<SVGSVGElement>> to React.ReactElement to allow for function component elements.
  icon: React.ReactElement;
  title: string;
  description: string;
}

export interface ServiceOption {
  slug: string;
  title: string;
  description: string;
  features: string[];
  bestFor: string;
  isPopular?: boolean;
  detailedContent: {
    longDescription: string;
    useCases: { title: string; description: string }[];
    requirements: string[];
  };
}
