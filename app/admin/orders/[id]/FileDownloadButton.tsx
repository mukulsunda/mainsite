'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface FileDownloadButtonProps {
  fileName: string;
  filePath: string;
  className?: string;
}

export default function FileDownloadButton({ fileName, filePath, className = '' }: FileDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!filePath) {
      alert('No file path available for this order');
      return;
    }

    setIsDownloading(true);
    
    try {
      // If the file is stored in Supabase storage, we'd need to get a signed URL
      // For now, we'll show an alert since the actual file upload isn't implemented yet
      
      if (filePath.startsWith('http')) {
        // Direct URL - open in new tab
        window.open(filePath, '_blank');
      } else {
        // Placeholder for when file upload is implemented
        alert(`File download coming soon!\n\nFile: ${fileName}\nPath: ${filePath || 'Not uploaded yet'}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading}
      className={`flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 ${className}`}
    >
      {isDownloading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      {isDownloading ? 'Downloading...' : 'Download Model'}
    </button>
  );
}
