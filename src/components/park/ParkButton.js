import React,{useState,useEffect} from "react";
import Button from 'react-bootstrap/Button'
import './ParkButton.css';

const ParkButton = (props)=>{
    const [park,setPark] = useState(props.park);
    const [color,setColor] = useState();

    const changeStatus = ()=>{
        let modPark = park;
        modPark.isEmpty = !park.isEmpty;
        setPark(modPark);
        correctColor();
    }

    const correctColor = ()=>{
        if(park.isEmpty)setColor('success');
        else setColor('danger');
    }

    useEffect(()=>{
        correctColor();
    });



    return(
        <div className="ParkButton">
            <Button id={park.codeNumber} type='button' variant={color}
             onClick={changeStatus}> {park.codeNumber} </Button>
        </div>
    )

}

export default ParkButton;