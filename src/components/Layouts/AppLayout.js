import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="container mx-auto p-6">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main className='p-10'>{children}</main>
        </div>
    )
}

export default AppLayout
