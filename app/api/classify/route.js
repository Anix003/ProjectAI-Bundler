import { NextResponse } from 'next/server'

// Configure the external API endpoint
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || 'http://localhost:8000'
const CLASSIFY_ENDPOINT = '/classify'

/**
 * POST /api/classify
 * Proxies classification requests to external endpoint
 * Expects: FormData with 'message' and optional 'attachments'
 */
export async function POST(request) {
  try {
    // Get the content type to handle form data properly
    const contentType = request.headers.get('content-type')

    let body

    // Handle FormData with attachments
    if (contentType?.includes('multipart/form-data')) {
      body = await request.formData()
    }
    // Handle JSON requests
    else {
      body = await request.json()
    }

    // Build the external API URL
    const externalUrl = `${EXTERNAL_API_URL}${CLASSIFY_ENDPOINT}`

    // Prepare headers for external request
    const externalHeaders = {
      'Content-Type': contentType || 'application/json',
    }

    // Add authorization header if provided
    if (process.env.EXTERNAL_API_KEY) {
      externalHeaders['Authorization'] = `Bearer ${process.env.EXTERNAL_API_KEY}`
    }

    // Make request to external API
    const externalResponse = await fetch(externalUrl, {
      method: 'POST',
      headers: externalHeaders,
      body: contentType?.includes('multipart/form-data') ? body : JSON.stringify(body),
      timeout: 30000, // 30 second timeout
    })

    // Check if external API responded successfully
    if (!externalResponse.ok) {
      const errorData = await externalResponse.text()
      console.error('External API error:', {
        status: externalResponse.status,
        statusText: externalResponse.statusText,
        body: errorData,
      })

      return NextResponse.json(
        {
          error: 'External service error',
          status: externalResponse.status,
          message: errorData,
        },
        { status: externalResponse.status }
      )
    }

    // Parse response from external API
    const responseData = await externalResponse.json()

    // Return the response to frontend
    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Classification error:', error)

    // Handle timeout errors
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return NextResponse.json(
        {
          error: 'Request timeout',
          message: 'The external service took too long to respond',
        },
        { status: 504 }
      )
    }

    // Handle network errors
    if (error instanceof TypeError) {
      return NextResponse.json(
        {
          error: 'Network error',
          message: 'Unable to connect to external service',
        },
        { status: 503 }
      )
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/classify
 * Handle CORS preflight requests
 */
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
