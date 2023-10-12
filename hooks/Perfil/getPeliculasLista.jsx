import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getPeliculasLista(idLista){
    
    const [peliculas,setPeliculas] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
    
      useEffect(()=>{
        if(!router.isReady) return

        fetch(`/api/Peliculas/TodasPeliculasLista/${idLista}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setPeliculas(data)
        setLoading(false)
      })
      },[idLista,router.isReady])

      return {peliculas,setPeliculas,isLoading}
}
