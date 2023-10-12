import Link from "next/link";
import Usuario from "../components/Usuario";
import { useEffect, useState } from "react";

export default function TodosUsuarios(){

  const [usuarios,setUsuarios] = useState([])
  const [isLoading,setIsLoading] = useState(false)


  useEffect(()=>{
      fetch('/api/Usuarios/TodosUsuarios', {
        method: 'GET',
        headers: { 'Content-type': 'application/json'}
    },setIsLoading(true))
    .then(res => res.json())
    .then(data => {
      setUsuarios(data)
      setIsLoading(false)
    })
    },[])

    return (
        <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3'>
          <p>TODAS LOS USUARIOS</p>
        </div>
        <div className="flex md:justify-center pl-5 md:pl-0">
            <div className="grid md:grid-cols-3 gap-10 py-10 gap-x-64">
            {isLoading ? null :
            usuarios.map((usuario)=>{
              return <Usuario usuario={usuario}/>
            })
            }
            </div>
        </div>
      </section>
    )
}