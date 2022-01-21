import axios from 'axios'
import React from 'react'
import Button from 'react-bootstrap/Button'
import '../styles/Form.css'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      parks: [],
      buttons: []
    }
    this.callParks = this.getParks.bind(this);
  }

  getParks(){
    axios
      .get('http://localhost:4000/prova/parks', {
        responseType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      .then(res => {
        let parks = res.data
        this.setState({ parks: parks })
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderButtons() {
    return this.state.parks.map((park)=>{
      return <Button variant='info' key={park.codeNumber} >{park.codeNumber}</Button>
    })
  }

  componentDidMount () {
    this.callParks()
  }

  componentWillUnmount () {
    this.setState({
      parks: []
    })
  }

  render () {
    return (
      <div className='Form'>
        <label htmlFor='date'>date:</label>
        <input type={'date'} name='date' id='date'></input>
        <button onClick={this.alertPark}>click</button>
        <div className='Form-Buttons'>
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}

export default Form

/*   check() {
    let payload = {
      date: new Date(document.getElementById('date').value)
    }
    axios
      .post('http://localhost:4000/prova', payload, {
        responseType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      .then(res => {
        let date = new Date(res.data)
        alert(date)
      })
      .catch(err => {
        console.log(err)
      })
  } */
