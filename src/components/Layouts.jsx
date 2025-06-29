import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout