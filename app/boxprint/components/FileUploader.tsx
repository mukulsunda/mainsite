"use client";

import { useState, useRef, useCallback } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle, Box } from 'lucide-react';
import { ModelFile, SUPPORTED_FORMATS, MAX_FILE_SIZE } from '../types';

interface FileUploaderProps {
  onFileSelect: (file: ModelFile | null) => void;
  currentFile: ModelFile | null;
}

export default function FileUploader({ onFileSelect, currentFile }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!SUPPORTED_FORMATS.includes(extension)) {
      return `Unsupported format. Please upload: ${SUPPORTED_FORMATS.join(', ')}`;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    
    return null;
  };

  const processFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    
    const extension = file.name.split('.').pop()?.toUpperCase() || 'Unknown';
    
    // Create model file object
    const modelFile: ModelFile = {
      file,
      name: file.name,
      size: file.size,
      format: extension,
      // Dimensions and volume would be calculated by the 3D viewer
      dimensions: undefined,
      volume: undefined,
      estimatedWeight: undefined,
    };

    onFileSelect(modelFile);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleRemoveFile = useCallback(() => {
    onFileSelect(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFileSelect]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      {!currentFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer
            transition-all duration-300 group
            ${isDragging 
              ? 'border-neo-yellow bg-neo-yellow/10' 
              : 'border-neo-black/20 hover:border-neo-yellow hover:bg-neo-yellow/5'
            }
            ${error ? 'border-red-400 bg-red-50' : ''}
          `}
        >
          {/* Icon */}
          <div className={`
            w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center
            transition-all duration-300
            ${isDragging ? 'bg-neo-yellow scale-110' : 'bg-neo-light-gray group-hover:bg-neo-yellow group-hover:scale-105'}
          `}>
            <Upload size={28} className={isDragging ? 'text-neo-black' : 'text-neo-black/60 group-hover:text-neo-black'} />
          </div>
          
          {/* Text */}
          <h3 className="text-lg font-bold text-neo-black mb-2">
            {isDragging ? 'Drop your file here' : 'Upload your 3D model'}
          </h3>
          <p className="text-sm text-neo-black/60 mb-4">
            Drag and drop or <span className="text-neo-yellow font-semibold">browse</span> to choose a file
          </p>
          
          {/* Supported formats */}
          <div className="flex flex-wrap justify-center gap-2">
            {SUPPORTED_FORMATS.map((format) => (
              <span 
                key={format}
                className="px-2 py-1 bg-neo-black/5 rounded text-xs font-mono text-neo-black/60 uppercase"
              >
                {format}
              </span>
            ))}
          </div>
          
          <p className="text-xs text-neo-black/40 mt-3">
            Maximum file size: {MAX_FILE_SIZE / (1024 * 1024)}MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept={SUPPORTED_FORMATS.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        /* File Selected State */
        <div className="border border-neo-black/10 rounded-xl p-4 bg-white">
          <div className="flex items-start gap-4">
            {/* File Icon */}
            <div className="w-12 h-12 bg-neo-yellow rounded-lg flex items-center justify-center flex-shrink-0">
              <Box size={24} className="text-neo-black" />
            </div>
            
            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                <h4 className="font-bold text-neo-black truncate">{currentFile.name}</h4>
              </div>
              
              <div className="flex flex-wrap gap-3 text-xs text-neo-black/60">
                <span className="flex items-center gap-1">
                  <File size={12} />
                  {currentFile.format}
                </span>
                <span>{formatFileSize(currentFile.size)}</span>
                {currentFile.dimensions && (
                  <span>
                    {currentFile.dimensions.x.toFixed(1)} × {currentFile.dimensions.y.toFixed(1)} × {currentFile.dimensions.z.toFixed(1)} mm
                  </span>
                )}
                {currentFile.volume && (
                  <span>{currentFile.volume.toFixed(2)} cm³</span>
                )}
              </div>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={handleRemoveFile}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <X size={18} className="text-neo-black/40 group-hover:text-red-500" />
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
