import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faLink, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Link from 'next/link';
import { Services } from '@/hooks/services';
import { toast } from 'react-hot-toast';

const Card = ({ service, ogUrl, user }) => (

    <>
        <div className="card w-96 bg-base-100 shadow-xl">

            <div className="card-body">
                <div className="card-actions items-center">
                    <div className={(service.status == 1 ? 'bg-primary' : 'bg-accent') + ' rounded-md p-1 text-xs text-white'}>
                        {service.status == 1 ? 'Active' : 'Deactivated'}
                    </div>
                    <Link href={`/services/${service.id}`} className="btn btn-circle btn-sm ml-auto">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>

                </div>
                <h2 className="card-title">{service.name}</h2>
                <div className='text-sm'><span className='font-bold'>Duration:</span> {service.duration} min.</div>
                <div className='text-sm'><span className='font-bold'>Location:</span>: <span className='text-secondary'>{service.location == 1 ? `Zoom` : 'In Person'}</span></div>
                <div className="card-actions justify-end mt-10">
                    <button onClick={() => {
                        navigator.clipboard.writeText(ogUrl + '/' + user?.username + '/' + service.custom_link),
                        toast.success("Link copied!")

                    }} className="btn  btn-sm ml-auto">
                        <FontAwesomeIcon icon={faShare} className="mr-2" />
                        Copy share link
                    </button>
                </div>
            </div>
        </div>

        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <div className="modal-action">
                    <label htmlFor="my-modal-6" className="btn">Yay!</label>
                </div>
            </div>
        </div>

    </>

)

export default Card
