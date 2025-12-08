'use client'

import React, { useState } from 'react'
import SubmitWithAttachments from '@/components/ui/SubmitWithAttachments'
import ResponseDisplay from '@/components/ui/ResponseDisplay'

export default function Home() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (data) => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      console.log('Submitting to /api/classify:', {
        message: data.message,
        attachments: data.attachments,
      })

      // Call the classify API route
      const apiResponse = await fetch('/api/classify', {
        method: 'POST',
        body: data.formData, // FormData with message and attachments
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json()
        throw new Error(errorData.message || `API error: ${apiResponse.status}`)
      }

      const result = await apiResponse.json()
      console.log('API Response:', result)
      setResponse(result)
    } catch (err) {
      console.error('Submission error:', err)
      setError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Share Your Problem</h1>
          <p className="text-gray-600">Send messages with file attachments</p>
        </div>

        {/* Show form only if no response */}
        {!response && (
          <>
            <SubmitWithAttachments onSubmit={handleSubmit} />

            {/* Error Message */}
            {error && (
              <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-800">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="mx-auto mt-6 max-w-2xl text-center">
                <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
                  <span className="text-sm font-medium text-blue-700">Processing...</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Response Display */}
        {response && <ResponseDisplay data={response} />}
      </div>
    </div>
  )
}
