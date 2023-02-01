import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react';

const AppLayout = ({ header, children }) => {
    
    const { user } = useAuth({ middleware: 'auth' })

    const [ogUrl, setOgUrl] = useState("");

    useEffect(() => {
        const host = window.location.origin;
        const baseUrl = `${host}`;

        setOgUrl(`${baseUrl}`);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} ogUrl={ogUrl} />

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
