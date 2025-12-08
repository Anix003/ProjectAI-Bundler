'use client'

import React from 'react'

const MessageInput = ({ value, onChange, disabled }) => {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Type your message here..."
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        rows="4"
        disabled={disabled}
      />
    </div>
  )
}

export default MessageInput
