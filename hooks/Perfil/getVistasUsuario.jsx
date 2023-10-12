import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getVistasUsuario(id){
    
    const [peliculas,setPeliculas] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
    
      useEffect(()=>{
        if(!router.isReady) return

        fetch(`/api/Peliculas/TodasVistasUsuario/${id}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setPeliculas(data)
        setLoading(false)
      })
      },[id,router.isReady])

      return {peliculas,isLoading}
}
