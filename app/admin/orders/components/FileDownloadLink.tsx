'use client';

import { Download } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface FileDownloadLinkProps {
  fileName: string;
  filePath: string;
  variant?: 'icon' | 'button';
}

export default function FileDownloadLink({ fileName, filePath, variant = 'icon' }: FileDownloadLinkProps) {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!filePath) {
      alert('No file available for this order');
      return;
    }

    try {
      // Check if it's already a full URL
      if (filePath.startsWith('http')) {
        // Direct URL - download directly
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Get public URL from Supabase Storage as fallback
        const supabase = createClient();
        const { data } = supabase.storage
          .from('storage')
          .getPublicUrl(filePath);
        
        if (data?.publicUrl) {
          // Download the file
          const link = document.createElement('a');
          link.href = data.publicUrl;
          link.download = fileName;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          throw new Error('Could not generate download URL');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleDownload}
        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        title="Download File"
        disabled={!filePath}
      >
        <Download size={16} className={filePath ? "text-neutral-600" : "text-neutral-300"} />
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={!filePath}
      className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download size={16} />
      Download Model
    </button>
  );
}
