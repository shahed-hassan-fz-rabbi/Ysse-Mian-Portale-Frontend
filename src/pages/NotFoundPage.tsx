import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found')

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container-site text-center py-16">
        <p className="text-6xl font-bold text-primary/20 mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
          Page Not Found
        </h1>
        <p className="text-muted max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved. Please
          check the URL or navigate back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
