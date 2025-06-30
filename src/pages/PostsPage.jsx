import { useState, useEffect } from 'react'
import { fetchPosts } from '../api/jsonplaceholder'
import Card from '../components/Card'
import Button from '../components/Button'

const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts()
        setPosts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Posts from API</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map(post => (
          <div 
            key={post.id} 
            className="p-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default PostsPage
