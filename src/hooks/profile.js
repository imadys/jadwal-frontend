import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import toast, { Toaster } from 'react-hot-toast';

export const Profile = ({ isLoading, id } = {}) => {

    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const router = useRouter();

    const post = async ({ setErrors, setIsError, ...props }) => {
        await csrf()

        setErrors([]);
        setIsError(false);
        axios
            .post('/api/profile', props)
            .then((resp) => {
                setIsError(false);
                setTimeout(() => {
                    router.push("/profile");
                }, 1000);
            })
            .catch(error => {
                setIsError(true);
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }
    const appointmentPost = async ({ setErrors, setIsError , setLoading, ...props }) => {
        await csrf()

        setErrors([]);
        // setIsError(false);
        axios
            .post('/api/appointments', props)
            .then((resp) => {
                setLoading(false);
                setIsError(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);                
            })
            .catch(error => {
                // setIsError(true);
                if (error.response.status !== 422) throw error
                setLoading(true);
                setIsError(true);

                setErrors(error.response.data.errors)
            })
    }    
    const put = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .put(`/api/profile/${props.serviceId}`, props)
            .then(() => {
                mutate();
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors);

            })
    }

    return {
        post,
        appointmentPost
    }
}
