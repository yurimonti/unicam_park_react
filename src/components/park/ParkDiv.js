import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import './ParkDiv.css';
import Alert from 'react-bootstrap/Alert';
import ParkButton from './ParkButton';



function ParkDiv() {
  const [parks, setParks] = useState([]);
  /**
   * render a number of buttons equals at number of parks
   * @returns renderized buttons
   */
  const renderButton = () => {
    return parks.map(park => {
      return (
        <ParkButton park={park} key={park.codeNumber} />
        )
    })
  }

  /**<Button backgroundcolor={color} id={park.codeNumber} variant='info' type='button' key={park.codeNumber} onClick={()=>changeButton(park.codeNumber)}>
          {park.codeNumber}</Button> */

  /* const changeButton = (codeNumber)=>{
    let park = parks.find((park)=>park.codeNumber===codeNumber);
    let button = document.getElementById(codeNumber);
    if(park.isEmpty){
      button.style.backgroundColor ='#ff0000';
      park.isEmpty = false;
    }
    else{
      button.style.backgroundColor ='#32CD32';
      park.isEmpty = true;
    }
  } */

  const alertParks = ()=>{
    return parks.map(park=>{
      return (<Alert key={park.codeNumber} variant='success' > {JSON.stringify(park)} </Alert>)
    })
  }

  /* const alertParks = ()=>{
    parks.forEach(park => {
      alert(JSON.stringify(park));
    });
  } */

  /**
   * caricare i parcheggi
   */
  useEffect(()=>{
    let parcheggi = [];
    for (let index = 0; index < 20; index++) {
      parcheggi.push({
        codeNumber:index+1,
        info: 'park with code '+ (index+1),
        isEmpty:true
      }); 
    }
    parcheggi.push({
      codeNumber:21,
      info: 'park with code '+ 21,
      isEmpty:false
    });
    setParks(parcheggi.sort((first,second)=>first.codeNumber-second.codeNumber));
  },[]);
  /**
   * load parks from the server 
   */
 /*  useEffect(() => {
    axios.get('http://localhost:4000/prova/parks', {
        responseType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      .then(res => {
        let parks2 = res.data;
        setParks(parks2.sort((previous,next)=>previous.codeNumber - next.codeNumber));
      })
      .catch(err => {
        console.log(err)
      })
  },[]); */

  /**
   * rendering phase
   */
  return (
  <div className='ParkDiv'>
    <div className='ParkDiv-Buttons'>
      {renderButton()}
    </div>
    <button id='bottoneAlert' type='button' onClick={()=>{alert(JSON.stringify(parks))}}> alert</button>
  </div>
  )
}

export default ParkDiv
