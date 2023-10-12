import Link from "next/link";
import Lista from "../components/Lista";
import { useEffect, useState } from "react";
export default function TodasListas(){


  const [listas,setListas] = useState([])
  const [isLoading,setLoading] = useState(false)

  useEffect(()=>{
    fetch('/api/Listas/TodasListas', {
      method: 'GET',
      headers: { 'Content-type': 'application/json'}
  },setLoading(true))
  .then(res => res.json())
  .then(data => {
    setListas(data)
    setLoading(false)
  })
  },[])
    return (
        <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3'>
          <p>TODAS LAS LISTAS</p>
        </div>
        <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 py-10 gap-x-64">
              {isLoading ? null : listas.map((lista)=>{console.log(lista)
                return <Lista key={lista.id} lista={lista}/>
              })}
            </div>
        </div>
      </section>
    )
}