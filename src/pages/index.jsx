import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
      <>
        <Head>
          <title>Jadwal</title>
        </Head>

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Welcome to Jadwal</h1>
              <p className="py-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iste beatae eveniet voluptate a, earum blanditiis laborum minus omnis quisquam!</p>
              <Link href="/login" className="btn btn-primary">Go To Login</Link>
            </div>
          </div>
        </div>
      </>
    );
}
