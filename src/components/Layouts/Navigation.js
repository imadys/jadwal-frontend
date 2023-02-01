import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'

const Navigation = ({ user,ogUrl }) => {
    const router = useRouter()

    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <div className='bg-base-100'>
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Jadwal</a>
                    <ul className='menu menu-horizontal px-1 mr-auto'>
                        <li><a href='/dashboard' className={router.pathname === '/dashboard' ? 'bg-base-200' : ''}>Dashboard</a></li>
                        <li><a href='/services' className={router.pathname.startsWith('/services') ? 'bg-base-200' : ''}>Services</a></li>
                    </ul>                    
                </div>
                <div className="flex-none gap-2">

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full flex items-center justify-center bg-primary">
                                {user?.name[0]}
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(ogUrl + '/' + user?.username),
                                        toast.success("Link copied!")

                                }} >
                                    <FontAwesomeIcon icon={faShare} className="mr-2" />
                                    Copy profile URL
                                </button>
                            </li>
                            <li><Link href="/settings">Settings</Link></li>
                            <li><a onClick={logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
