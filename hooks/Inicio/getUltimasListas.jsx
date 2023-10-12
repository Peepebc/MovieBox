import { useEffect, useState } from "react"

export default function getUltimasListas(){
    
    const [listas,setListas] = useState([])
    const [isLoading,setLoading] = useState(false)
    
      useEffect(()=>{
        fetch('/api/Listas/UltimasListas', {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setListas(data)
        setLoading(false)
      })
      },[])

      return {listas,isLoading}
}
