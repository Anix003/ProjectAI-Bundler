'use client'

import React from 'react'
import { Paperclip } from 'lucide-react'

const DropZone = ({
  onDrop,
  onDragOver,
  onDragLeave,
  isDragging,
  dropZoneRef,
  fileInputRef,
  isSubmitting,
  onFileSelect,
}) => {
  return (
    <div
      ref={dropZoneRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all duration-200 ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={(e) => onFileSelect(e.target.files)}
        className="hidden"
        disabled={isSubmitting}
      />

      <div className="flex flex-col items-center gap-2">
        <Paperclip
          size={24}
          className={`transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <div className="text-sm">
          <p className="cursor-pointer font-medium text-gray-700 hover:text-blue-600">
            Click to upload
          </p>
          <p className="text-gray-500">or drag and drop files here</p>
        </div>
        <p className="mt-2 text-xs text-gray-400">Max 50MB per file, 200MB total</p>
      </div>
    </div>
  )
}

export default DropZone
