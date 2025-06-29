import { Link } from 'react-router-dom'
import Button from './Button'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          Task Manager
        </Link>
        <div className="flex items-center space-x-4">
          <Button onClick={toggleDarkMode} variant="secondary">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar