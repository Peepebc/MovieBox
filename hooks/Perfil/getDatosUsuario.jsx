import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getDatosUsuario(id){
    
    const [datosUsuario,setDatosUsuario] = useState([])
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
    
      useEffect(()=>{
        
        if(!router.isReady) return
        fetch(`/api/Usuarios/DatosUsuario/${id}`, {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setDatosUsuario(data)
        setLoading(false)
      })
      },[id,router.isReady])

      return {datosUsuario,isLoading}
}
