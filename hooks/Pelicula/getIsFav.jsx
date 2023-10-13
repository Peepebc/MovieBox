import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function getIsFav({idPelicula}){
    
    const [isFav,setIsFav] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const router = useRouter()

      useEffect(()=>{
        if(!router.isReady) return
        if(sessionStorage.getItem("jwt")){
            fetch("/api/Favs/isFav/"+idPelicula,{
                method: 'GET',
                headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem("jwt") },
                credentials: 'same-origin'
            },setLoading(true)
            ).then(res => res.json()).then(datos => {
                console.log(datos)
                setIsFav(datos)
                setLoading(false)
            })
          }
      },[router.isReady])

      return {isFav,setIsFav,isLoading}
}
