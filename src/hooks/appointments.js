import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const Appointments = ({ middleware, redirectIfAuthenticated } = {}) => {
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    
    const { data: get, error, mutate } = useSWR('/api/appointments', () =>
        axios
            .get('/api/appointments')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )



    return {
        get
    }
}
