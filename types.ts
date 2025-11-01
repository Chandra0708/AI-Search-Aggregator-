import React from 'react';

export interface Source {
  uri: string;
  title: string;
}

export interface AIModel {
  id: string;
  name: string;
  logo: React.ElementType;
  systemPrompt: string;
}

export interface AIResult extends AIModel {
  response?: string;
  imageUrl?: string;
  isLoading: boolean;
  sources: Source[];
}

export interface UploadedFile {
    data: string; // base64 encoded
    mimeType: string;
    name: string;
}
