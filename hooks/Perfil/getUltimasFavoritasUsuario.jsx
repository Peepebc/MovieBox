import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getUltimasFavoritasUsuario(id){
    
    const [favoritas,setFavoritas] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
    
      useEffect(()=>{
        
        if(!router.isReady) return
        fetch(`/api/Peliculas/UltimasFavoritasUsuario/${id}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setFavoritas(data)
        setLoading(false)
      })
      },[id,router.isReady])

      return {favoritas,isLoading}
}
