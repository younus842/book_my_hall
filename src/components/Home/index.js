import Navbar from '../Navbar'
import './index.css'
import FunctionHall from '../FunctionHall'





const Home = (props) => {
    const { halls, updatedDates } = props

    return (
        <div className='homes'>
            <Navbar />

            <div className='home-bottom-containers'>
                {halls.map((each) => {
                    return <FunctionHall object={each} key={each.id} updatedDates={updatedDates} />
                })}
            </div>


        </div>
    )
}

export default Home