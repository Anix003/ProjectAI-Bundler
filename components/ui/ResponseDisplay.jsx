'use client'

import React from 'react'
import { AlertCircle, CheckCircle, Clock, Tag, FileText, Calendar, Zap } from 'lucide-react'

const ResponseDisplay = ({ data }) => {
  if (!data) return null

  // Get badge color based on status
  const getStatusBadgeColor = (status) => {
    const statusMap = {
      Open: 'bg-red-100 text-red-800 border-red-200',
      'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Closed: 'bg-green-100 text-green-800 border-green-200',
      Pending: 'bg-blue-100 text-blue-800 border-blue-200',
    }
    return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Get priority badge color
  const getPriorityBadgeColor = (priority) => {
    const priorityMap = {
      High: 'bg-red-100 text-red-800 border-red-200',
      Medium: 'bg-orange-100 text-orange-800 border-orange-200',
      Low: 'bg-green-100 text-green-800 border-green-200',
    }
    return priorityMap[priority] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'Closed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-blue-200 bg-linear-to-r from-blue-50 to-blue-100 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-blue-900">
          <FileText className="h-5 w-5" />
          Classification Result
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-6 p-6">
        {/* Category & Department */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.category && (
            <div>
              <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Category
              </label>
              <p className="mt-1 text-sm font-medium text-gray-900">{data.category}</p>
            </div>
          )}

          {data.department && (
            <div>
              <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Department
              </label>
              <p className="mt-1 text-sm font-medium text-gray-900">{data.department}</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {data.summary && (
          <div>
            <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Summary
            </label>
            <p className="mt-2 rounded border border-gray-200 bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
              {data.summary}
            </p>
          </div>
        )}

        {/* Details */}
        {data.details && (
          <div>
            <label className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Details
            </label>
            <p className="mt-2 rounded border border-gray-200 bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
              {data.details}
            </p>
          </div>
        )}

        {/* Status, Priority, Date */}
        <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 md:grid-cols-3">
          {data.status && (
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                <Clock className="h-3 w-3" />
                Status
              </label>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                    data.status
                  )}`}
                >
                  {getStatusIcon(data.status)}
                  {data.status}
                </span>
              </div>
            </div>
          )}

          {data.priority && (
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                <Zap className="h-3 w-3" />
                Priority
              </label>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityBadgeColor(
                    data.priority
                  )}`}
                >
                  {data.priority}
                </span>
              </div>
            </div>
          )}

          {data.date && (
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                <Calendar className="h-3 w-3" />
                Date
              </label>
              <p className="mt-2 text-sm font-medium text-gray-900">
                {new Date(data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        {/* Additional Fields */}
        {Object.keys(data).some(
          (key) =>
            ![
              'category',
              'department',
              'summary',
              'details',
              'status',
              'priority',
              'date',
            ].includes(key)
        ) && (
          <div className="border-t border-gray-200 pt-4">
            <label className="mb-3 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Additional Information
            </label>
            <div className="space-y-2">
              {Object.keys(data).map((key) => {
                if (
                  [
                    'category',
                    'department',
                    'summary',
                    'details',
                    'status',
                    'priority',
                    'date',
                  ].includes(key)
                ) {
                  return null
                }

                return (
                  <div
                    key={key}
                    className="flex items-start justify-between rounded border border-gray-200 bg-gray-50 p-2"
                  >
                    <span className="text-xs font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-xs font-medium text-gray-900">
                      {typeof data[key] === 'object'
                        ? JSON.stringify(data[key])
                        : String(data[key])}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-3">
        <p className="text-xs text-gray-500">Classification processed successfully</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Submit Another
        </button>
      </div>
    </div>
  )
}

export default ResponseDisplay
