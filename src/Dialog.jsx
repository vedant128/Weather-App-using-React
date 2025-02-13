import React, { useState } from 'react'

export default function 
() {

  let [city,setcityname]=useState('');
  let [wdetails,setwdetails]=useState();

  let getdata=(event)=>{
    const API_KEY = "  #paste here  ";  //your-api-key-here 
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((finalres) => {
      console.log(finalres)
      setwdetails(finalres)
    })
    setcityname('');
      event.preventDefault();
      
  }

  return (
    <div className='weatherdiv'>
<h1>Simple Weather App</h1>
<form onSubmit={getdata}>
      <div className="search-box">
        <input
          type="text" 
          value={city}
          onChange={(e)=>setcityname(e.target.value)}
          placeholder="City Name"/>
        <button>Submit</button>
      </div>
</form>
      <div className="weather-card">
  
  {wdetails!=undefined&&wdetails.cod!="404"
  ?
  <>
        <label>
          {wdetails.city.name} <span className="country-code">{wdetails.city.country}</span>
        </label>
        <div className="temperature">{wdetails.list[0].main.temp}</div>
        <div>
          <span className="weather-icon">🌫️</span>
          <label className="weather-condition">{wdetails.list[0].weather[0].description}</label>
        </div>
   </>
    :
    "No Data Found"
  }
</div>
    </div>
  )
}
