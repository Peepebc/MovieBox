import { useEffect, useState } from "react"

export default function getUltimasResenas(){
    
    const [resenas,setResenas] = useState([])
    const [isLoading,setLoading] = useState(false)
    
      useEffect(()=>{
        fetch('/api/UltimasResenas', {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setResenas(data)
        setLoading(false)
      })
      },[])

      return {resenas,isLoading}
}
