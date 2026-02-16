import Navbar from '../Navbar'
import './index.css'
import FunctionHall from '../FunctionHall'





const Home = (props) => {
    const {halls} = props
    return (
        <div className='home'>
            <Navbar />

            <div className='home-bottom-container'>
                {halls.map((each) => {
                    return <FunctionHall object={each} key={each.id} />
                })}
            </div>


        </div>
    )
}

export default Home