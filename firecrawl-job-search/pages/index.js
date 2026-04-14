import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
      if (!res.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await res.json()
      // Assuming the API returns { jobs: [{ title, company, link }, ...] }
      setJobs(data.jobs || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Firecrawl AI Job Search</h1>
      {!session ? (
        <div>
          <p>Please log in to search for jobs.</p>
          <button
            onClick={() => signIn('google')}
            style={{ padding: '10px 20px', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Login with Google
          </button>
        </div>
      ) : (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <button
            onClick={() => signOut()}
            style={{ padding: '10px 20px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
          >
            Logout
          </button>
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter job keywords (e.g., software engineer)"
              style={{ padding: '10px', width: '60%', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{ padding: '10px 20px', backgroundColor: loading ? '#ccc' : '#34a853', color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <div style={{ marginTop: '20px' }}>
            {jobs.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {jobs.map((job, index) => (
                  <li key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                    <h3 style={{ margin: '0 0 5px 0' }}>{job.title}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>{job.company}</p>
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#4285f4', textDecoration: 'none' }}
                    >
                      Apply Now
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && query && <p>No jobs found for "{query}".</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}