import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getResenasPelicula(idPelicula){
    
    const [resenas,setResenas] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()

      useEffect(()=>{
        if(!router.isReady) return
        fetch(`/api/Resenas/${idPelicula}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setResenas(data)
        setLoading(false)
      })
      },[router.isReady])

      return {resenas,setResenas,isLoading}
}
