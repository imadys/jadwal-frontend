import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import Head from 'next/head'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
      <>
        <Head>
          <title>Reset - Jadwal</title>
        </Head>
        <div className="hero min-h-screen bg-base-200">
          {/* Session Status */}
          <AuthSessionStatus className="mb-4" status={status} />
          <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={submitForm}>
              {/* Email Address */}
              <div className="form-control">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" value={email} className="input input-bordered" onChange={(event) => setEmail(event.target.value)} required autoFocus />

                <InputError messages={errors.email} className="mt-2" />
              </div>

              <div className="">
                <button className="btn btn-primary">Email Password Reset Link</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default ForgotPassword
