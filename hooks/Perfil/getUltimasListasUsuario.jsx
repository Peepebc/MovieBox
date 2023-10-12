import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getUltimasListasUsuario(id){
    
    const [listas,setListas] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
    
      useEffect(()=>{
        if(!router.isReady) return

        fetch(`/api/Listas/UltimasListasUsuario/${id}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setListas(data)
        setLoading(false)
      })
      },[id,router.isReady])

      return {listas,isLoading}
}
