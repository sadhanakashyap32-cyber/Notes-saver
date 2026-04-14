import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { query } = req.body
  if (!query) {
    return res.status(400).json({ message: 'Query is required' })
  }

  try {
    // Assuming Firecrawl API endpoint for job search
    // Note: Adjust the URL and parameters based on actual Firecrawl API documentation
    const response = await fetch('https://api.firecrawl.com/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ message: 'Error fetching jobs', error: error.message })
  }
}