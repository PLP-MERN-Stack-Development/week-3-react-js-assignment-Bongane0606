import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

const HomePage = () => {
  return (
    <Card className="max-w-2xl mx-auto my-8 text-center">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Welcome to Task Manager</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        A simple application to manage your tasks and browse posts from JSONPlaceholder API.
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="/tasks">
          <Button>Go to Task Manager</Button>
        </Link>
        <Link to="/posts">
          <Button variant="secondary">Browse Posts</Button>
        </Link>
      </div>
    </Card>
  )
}

export default HomePage