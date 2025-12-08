'use client'

import React, { useState, useRef } from 'react'
import MessageInput from './MessageInput'
import DropZone from './DropZone'
import AttachmentsList from './AttachmentsList'
import FormActions from './FormActions'
import { getFileIcon, processFiles } from './fileUtils'

const SubmitWithAttachments = ({ onSubmit = () => {} }) => {
  const [inputValue, setInputValue] = useState('')
  const [attachments, setAttachments] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const dropZoneRef = useRef(null)

  // Handle file selection
  const handleFileSelect = (files) => {
    const { valid } = processFiles(files, attachments)
    if (valid.length > 0) {
      setAttachments([...attachments, ...valid])
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Remove attachment
  const removeAttachment = (id) => {
    setAttachments(attachments.filter((att) => att.id !== id))
  }

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue.trim() && attachments.length === 0) {
      alert('Please enter a message or attach a file')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare form data with attachments
      const formData = new FormData()
      formData.append('message', inputValue)

      attachments.forEach((att) => {
        formData.append('attachments', att.file)
      })

      // Call the onSubmit callback
      await onSubmit({
        message: inputValue,
        attachments: attachments.map((att) => ({
          id: att.id,
          name: att.name,
          size: att.size,
          type: att.type,
        })),
        formData,
      })

      // Clear form
      setInputValue('')
      setAttachments([])
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = inputValue.trim() !== '' || attachments.length > 0

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message Input */}
        <MessageInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isSubmitting}
        />

        {/* Attachments Section */}
        <div className="space-y-3">
          {/* Drop Zone */}
          <DropZone
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            isDragging={isDragging}
            dropZoneRef={dropZoneRef}
            fileInputRef={fileInputRef}
            isSubmitting={isSubmitting}
            onFileSelect={handleFileSelect}
          />

          {/* Attachments List */}
          <AttachmentsList
            attachments={attachments}
            onRemove={removeAttachment}
            isSubmitting={isSubmitting}
            getFileIcon={getFileIcon}
          />
        </div>

        {/* Form Actions */}
        <FormActions
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
          fileInputRef={fileInputRef}
        />
      </form>
    </div>
  )
}

export default SubmitWithAttachments
