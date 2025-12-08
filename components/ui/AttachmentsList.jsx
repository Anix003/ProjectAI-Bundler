'use client'

import React from 'react'
import AttachmentItem from './AttachmentItem'

const AttachmentsList = ({ attachments, onRemove, isSubmitting, getFileIcon }) => {
  if (attachments.length === 0) return null

  return (
    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
      <p className="text-sm font-semibold text-gray-700">Attachments ({attachments.length})</p>

      <div className="space-y-2">
        {attachments.map((attachment) => (
          <AttachmentItem
            key={attachment.id}
            attachment={attachment}
            onRemove={onRemove}
            isSubmitting={isSubmitting}
            getFileIcon={getFileIcon}
          />
        ))}
      </div>
    </div>
  )
}

export default AttachmentsList
