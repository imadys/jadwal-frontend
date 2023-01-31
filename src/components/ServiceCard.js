import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faLink, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Link from 'next/link';
import { Services } from '@/hooks/services';
const Card = ({service}) => (

    <>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="card-actions items-center">               
                    <div className={(service.status == 1 ? 'bg-primary' : 'bg-accent') + ' rounded-md p-1 text-xs text-white'}>
                        {service.status == 1 ? 'Active' : 'Deactivated'}
                    </div>
                    <Link href={`/services/${service.id}`} className="btn btn-square btn-sm ml-auto">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>

                </div>
                <h2 className="card-title">{service.name}</h2>
                <div className='text-sm'><span className='font-bold'>Duration:</span> {service.duration} min.</div>
                <div className='text-sm'><span className='font-bold'>Location:</span>: {service.location == 1 ? `Zoom` : 'In Person'}</div>
                <div className="card-actions justify-end mt-10">
                    {/* <a className="link link-hover mr-auto flex gap-2 items-center" href={appointment.meeting_url}><FontAwesomeIcon icon={faLink} /> Meeting URL</a> */}
                    {/* <a className="link link-hover flex gap-2 items-center" href={appointment.meeting_url}><FontAwesomeIcon icon={faShare} /> Share</a> */}
                </div>
            </div>
        </div>
    </>

)

export default Card
