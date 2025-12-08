'use client'

import React from 'react'
import { Paperclip, X } from 'lucide-react'

const AttachmentItem = ({ attachment, onRemove, isSubmitting, getFileIcon }) => {
  return (
    <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="shrink-0 text-gray-400">{getFileIcon(attachment)}</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-800">{attachment.name}</p>
          <p className="text-xs text-gray-500">{attachment.size}</p>
        </div>
      </div>

      {/* Progress Bar */}
      {attachment.progress > 0 && attachment.progress < 100 && (
        <div className="mx-2 h-1 w-20 shrink-0 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${attachment.progress}%` }}
          />
        </div>
      )}

      {/* Error Message */}
      {attachment.error && (
        <div className="mx-2 shrink-0 text-xs text-red-500">{attachment.error}</div>
      )}

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(attachment.id)}
        className="shrink-0 p-1 text-gray-400 transition-colors hover:text-red-500"
        disabled={isSubmitting}
        title="Remove attachment"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default AttachmentItem
