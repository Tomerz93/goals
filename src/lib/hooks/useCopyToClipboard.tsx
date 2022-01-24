import { useState, useCallback } from 'react';

type CopyStatus = 'Copied!' | 'Failed to copy' | 'unset';

export const useCopyToClipBoard = (text: string) => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('unset');
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator?.clipboard?.writeText(text);
      setCopyStatus('Copied!');
    } catch {
      setCopyStatus('Failed to copy');
    }
  }, [text]);
  return { copyToClipboard, copyStatus };
};
