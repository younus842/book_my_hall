import { useState } from "react";
import "./index.css";

const FunctionHall = (props) => {
  const { object } = props;
  const { image_url, name, address, hall_package,booking } = object;
  const [selectDate,setVal] = useState("")
  const [dateList,setDate] = useState([])
  const onSelectDate= (e)=>{
    setVal(e.target.value)
    let dateSeleccted = e.target.value
    const is_it_booked = dateList.includes(dateSeleccted)
    if(!is_it_booked){
      setDate([...dateList,dateSeleccted])
    }
  }
  console.log(dateList)
  return (
   <div className="card p-3 mb-3 col-lg-8  col-sm-12 d-block d-xl-flex flex-xl-row align-items-xl-center">
      <div className="hall_picture">
        <img src={image_url} className=" hall_image " alt={name} />
      </div>

      <div className="card-body">
        <strong className="card-title">{name}</strong>
        <p className="card-text">{address}</p>
        <p className="card-text">Price : {hall_package}</p>
      
        <a className="btn btn-primary">Book Now !</a>
      </div>
    </div>
  );
};

export default FunctionHall;
