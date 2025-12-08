'use client'

import React from 'react'
import SubmitWithAttachments from '@/components/ui/SubmitWithAttachments'

export default function Home() {
  const handleSubmit = async (data) => {
    console.log('Form submitted:', {
      message: data.message,
      attachments: data.attachments,
    })

    // Example API call
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: data.formData,
    // })
    // const result = await response.json()
    // console.log('Response:', result)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Share Your Problem</h1>
          <p className="text-gray-600">Send messages with file attachments</p>
        </div>
        <SubmitWithAttachments onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
