import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getResenasUsuario(id){
    
    const [resenas,setResenas] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
    
      useEffect(()=>{
        if(!router.isReady) return

        fetch(`/api/Resenas/TodasResenasUsuario/${id}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setResenas(data)
        setLoading(false)
      })
      },[id,router.isReady])

      return {resenas,isLoading}
}
