import { useEffect, useState } from "react"

export default function getUltimasPeliculas(){
    
    const [peliculas,setPeliculas] = useState([])
    const [isLoading,setLoading] = useState(false)
    
      useEffect(()=>{
        fetch('/api/Peliculas/UltimasPeliculas', {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPeliculas(data)
        setLoading(false)
      })
      },[])

      return {peliculas,isLoading}
}
