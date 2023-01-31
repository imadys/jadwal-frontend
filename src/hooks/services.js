import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast';

export const Services = ({ isLoading, id } = {}) => {

    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const router = useRouter();


    const { data: get, error, mutate } = useSWR('/api/services', () =>
        axios
            .get('/api/services')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    const post = async ({ setErrors, setIsError, ...props }) => {
        await csrf()

        setErrors([]);
        setIsError(false);
        axios
            .post('/api/services', props)
            .then((resp) => {
                setIsError(false);
                setTimeout(() => {
                    router.push("/services");
                }, 1000);
            })
            .catch(error => {
                setIsError(true);
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }
    const put = async ({ setErrors, setIsError, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .put(`/api/services/${props.serviceId}`, props)
            .then((resp) => {
                setIsError(false);
            })
            .catch(error => {
                setIsError(true);
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)

            })
    }

    return {
        post,
        put,
        get
    }
}
