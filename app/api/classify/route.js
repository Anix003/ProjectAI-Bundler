// app/api/classify/route.js

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export async function POST(req) {
  try {
    const body = await req.json()
    const query = body?.query
    console.log('query', query)

    if (!query || !query.trim()) {
      return Response.json({ error: 'Query is required' }, { status: 400 })
    }

    // Prepare form-data for FastAPI
    const formData = new FormData()
    formData.append('user_query', query)

    const res = await fetch(`${BACKEND_URL}/classify`, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    return Response.json(data, { status: res.status })
  } catch (err) {
    console.error('Error in /api/classify:', err)
    return Response.json({ error: 'Internal API error' }, { status: 500 })
  }
}
