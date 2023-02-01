import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faLink, faPerson } from "@fortawesome/free-solid-svg-icons";

const Card = ({ disabled = false, className, appointment }) => (
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <div className="card-actions items-center">
                <div className={appointment.service.color + ' p-1 rounded-lg text-xs'}>{appointment.service.name}</div>
            </div>
            <h2 className="card-title">{appointment.service.name + ' with ' + appointment.name}</h2>
            <p>{appointment.start_date}</p>
            <div className="card-actions justify-end mt-10">
                {appointment.meeting_url != 'Meeting in person' &&
                    <a className="link link-hover mr-auto flex gap-2 items-center" href={appointment.meeting_url}><FontAwesomeIcon icon={faLink} /> Meeting URL</a>
                }
                {appointment.meeting_url == 'Meeting in person' &&
                    <div className=" mr-auto flex gap-2 items-center" ><FontAwesomeIcon icon={faPerson} /> Meeting in person</div>
                }

            </div>
        </div>
    </div>
)

export default Card
