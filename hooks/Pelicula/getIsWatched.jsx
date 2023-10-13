import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getIsWatched({idPelicula}){
    
    const [isWatched,setIsWatched] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()
      useEffect(()=>{
        if(!router.isReady) return
        if(sessionStorage.getItem("jwt")){
            fetch("/api/Ver/isWatched/"+idPelicula,{
                method: 'GET',
                headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem("jwt") },
                credentials: 'same-origin'
            },setLoading(true)
            ).then(res => res.json()).then(datos => {
                setIsWatched(datos)
                setLoading(false)
            })
          }
      },[router.isReady])

      return {isWatched,setIsWatched,isLoading}
}
