'use client'

import { File, Image as ImageIcon, Music, Video, FileText } from 'lucide-react'

// Get file icon based on type
export const getFileIcon = (file) => {
  const type = file.type
  if (type.startsWith('image/')) return <ImageIcon size={16} />
  if (type.startsWith('audio/')) return <Music size={16} />
  if (type.startsWith('video/')) return <Video size={16} />
  if (type.includes('pdf')) return <FileText size={16} />
  return <File size={16} />
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Validate and process files
export const processFiles = (files, existingAttachments = []) => {
  if (!files || files.length === 0) return { valid: [], invalid: [] }

  const newAttachments = Array.from(files).map((file) => ({
    id: Math.random().toString(36).substr(2, 9),
    file,
    name: file.name,
    size: formatFileSize(file.size),
    type: file.type,
    progress: 0,
    error: null,
  }))

  // Validate file size (max 50MB per file)
  const validAttachments = newAttachments.filter((att) => {
    if (att.file.size > 50 * 1024 * 1024) {
      att.error = 'File size exceeds 50MB limit'
      return false
    }
    return true
  })

  // Check total attachment size (max 200MB)
  const totalSize =
    existingAttachments.reduce((sum, att) => sum + att.file.size, 0) +
    validAttachments.reduce((sum, att) => sum + att.file.size, 0)

  if (totalSize > 200 * 1024 * 1024) {
    validAttachments.forEach((att) => {
      att.error = 'Total attachments exceed 200MB limit'
    })
  }

  const invalid = newAttachments.filter((att) => att.error)

  return { valid: validAttachments, invalid }
}
