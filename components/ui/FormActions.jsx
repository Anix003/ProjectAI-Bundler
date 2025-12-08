'use client'

import React from 'react'
import { Paperclip, Send } from 'lucide-react'

const FormActions = ({ isSubmitting, canSubmit, fileInputRef }) => {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        title="Add attachments"
      >
        <Paperclip size={18} />
        Attach
      </button>

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <Send size={18} />
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}

export default FormActions
