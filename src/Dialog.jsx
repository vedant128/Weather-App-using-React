import React, { useEffect, useState } from 'react'

export default function 
() {

  let [city,setcityname]=useState('');
  let [wdetails,setwdetails]=useState();
  let [isloading,setisloading]=useState(false);

  let getdata=(event)=>{
    if (!city.trim()) return;
    setisloading(true)

    const API_KEY = process.env.REACT_APP_API_KEY;  //your-api-key-here 
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((finalres) => {
      console.log(finalres)
      setwdetails(finalres)
      setisloading(false)
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

      <img src='https://cdn.dribbble.com/userupload/25690596/file/original-a628cc108a176d65c7e02252f04ec4a7.gif' className={`${isloading?'image':'hidee'}`} />
  
  {wdetails!=undefined&&wdetails.cod!="404"&&wdetails.city.name!=' '
  ?
  <>

        <label>
          {wdetails.city.name} <span className="country-code">{wdetails.city.country}</span>
        </label>
        <div className="temperature">{wdetails.list[0].main.temp}</div>
        <div className='weather_icon'>
          <span className="weather-icon"><img src={`http://openweathermap.org/img/w/${wdetails.list[0].weather[0].icon}.png`}></img></span>
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
