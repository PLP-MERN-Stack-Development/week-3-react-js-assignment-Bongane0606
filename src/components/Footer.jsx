const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-sm py-4">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Task Manager App
      </div>
    </footer>
  )
}

export default Footer
