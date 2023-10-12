import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Resena from "../components/Resena";


export default function Resenas(){

    const [resenas,setResenas] = useState([])
    const [isLoading,setLoading] = useState(false)

      useEffect(()=>{
        fetch('/api/Resenas/TodasResenas', {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setResenas(data)
        setLoading(false)
      })
      },[])

    return (
        <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3 mb-5'>
          <p>TODAS RESEÑAS</p>
        </div>
        <div className='flex flex-wrap gap-5 justify-evenly md:justify-start md:gap-x-64'>
          {isLoading ? 
<CircularProgress color="success" /> : resenas.map((resena)=>{
            return <Resena key={resena.id} resena={resena}/>
          })}
        </div>
      </section>
    )
}