import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Card = ({ disabled = false, className, appointment }) => (
    <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{appointment.topic}</h2>
            <p>{appointment.start_date}</p>
            <div className="card-actions justify-end mt-10">
                <a className="link link-hover mr-auto" href={appointment.meeting_url}>Meeting URL</a>
                <a className="link link-hover" href={appointment.meeting_url}>Share</a>
                <FontAwesomeIcon icon="fa-solid fa-share-nodes" />
            </div>
        </div>
    </div>
)

export default Card
