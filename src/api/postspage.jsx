import { useState, useEffect } from 'react'
import { fetchPosts, searchPosts } from '../api/posts'
import Card from '../components/Card'
import Button from '../components/Button'

const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        const data = searchQuery 
          ? await searchPosts(searchQuery) 
          : await fetchPosts(page)
        setPosts(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [page, searchQuery])

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Posts</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      {loading && <p className="text-center py-4 dark:text-white">Loading...</p>}
      {error && <p className="text-red-500 py-4">{error}</p>}
      
      <div className="space-y-4">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="p-4 border rounded dark:border-gray-600 dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold dark:text-white">{post.title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{post.body}</p>
          </div>
        ))}
      </div>
      
      {!searchQuery && (
        <div className="flex justify-between mt-6">
          <Button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="self-center dark:text-white">Page {page}</span>
          <Button 
            onClick={() => setPage(p => p + 1)}
            disabled={posts.length < 10}
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  )
}

export default PostsPage