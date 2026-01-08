'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

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
      const supabase = createClient();
      
      // Check if it's already a full URL
      if (filePath.startsWith('http')) {
        // Direct URL - download directly
        const response = await fetch(filePath);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Create signed URL for private bucket access
        const { data, error } = await supabase.storage
          .from('storage')
          .createSignedUrl(filePath, 60); // 60 seconds expiry
        
        if (error) {
          console.error('Signed URL error:', error);
          // Fallback to public URL
          const { data: publicData } = supabase.storage
            .from('storage')
            .getPublicUrl(filePath);
          
          if (publicData?.publicUrl) {
            const response = await fetch(publicData.publicUrl);
            if (!response.ok) throw new Error('File not accessible');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            return;
          }
          throw new Error('Could not generate download URL');
        }
        
        if (data?.signedUrl) {
          // Fetch the file and download
          const response = await fetch(data.signedUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          throw new Error('Could not generate download URL');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please check if the file exists in storage.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading || !filePath}
      className={`flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isDownloading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      {isDownloading ? 'Downloading...' : filePath ? 'Download Model' : 'No File'}
    </button>
  );
}
