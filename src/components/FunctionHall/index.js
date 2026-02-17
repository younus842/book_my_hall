import BookingCalendar from '../BookingCalendar'
import './index.css'

const FunctionHall = (props) => {
    const { object, updatedDates } = props

    const { image_url, name, address, hall_package, bookedDates, id } = object
    return (
        <div className='function_hall_object'>
            <div className='left-obj'><img src={image_url} alt={name} className='hall_image' />
                <p className='hall_name'> {name} function hall</p>
            </div>
            <div className='right-obj'>
                <p className='package'>Per Day Package: Rs. <span className='package-cost'>{hall_package}</span></p>
                <BookingCalendar id={id} bookedDates={bookedDates} updatedDates={updatedDates} />
                <button className='hall-button'>Book Now</button>
            </div>
        </div>
    )
}

export default FunctionHall