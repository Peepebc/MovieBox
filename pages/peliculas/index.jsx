import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Context from "../Context";
import { ImCross } from 'react-icons/im';
import {FaPen} from 'react-icons/fa'
import {  Modal } from "@mui/material";


export default function TodasPeliculas(){

    const [peliculas,setPeliculas] = useState([])
    const [isLoadingPeliculas,setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const {user} = useContext(Context)
    const [isOpen, setOpen] = useState(false);
    const [id,setId] = useState(null)

   async function eliminarPelicula (){
      const res = await fetch('https://moviebox.1.us-1.fl0.io/Peliculas/EliminarPelicula/'+id, {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json',
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),}
      })
      .then(res => res.json())
      .then(data => {return data })

      if(res.succes) {
        const newPeliculas = [...peliculas].filter(p => p.id!=id)
        setPeliculas(newPeliculas)
        setOpen(!isOpen)
        setId(null)
      }
    }

      useEffect(()=>{
        fetch('/api/Peliculas/TodasPeliculas', {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
      },setLoading(true))
      .then(res => res.json())
      .then(data => {
        setPeliculas(data)
        setLoading(false)
      })
      },[])

    return (
        <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3 py-2 items-center'>
          <p>TODAS LAS PELICULAS</p>
          {user && user.rol==1 ? <button onClick={()=>setIsEditing(!isEditing)} className={isEditing ? "rounded-lg p-2 bg-red-400 text-black" : "rounded-lg p-2 bg-gray-100 text-black"}>{isEditing?"DEJAR DE EDITAR":"EDITAR"}</button>:null }
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 md:grid-cols-7 gap-5 py-10">
          {isLoadingPeliculas ? 
              <CircularProgress color="success" /> : peliculas.map((pelicula)=>{
              return(<div key={pelicula.id} className="flex flex-col"><Link  className="relative" href={`/pelicula/${pelicula.id}`}><img className='w-32 h-44 md:w-52 md:h-80 rounded-xl hover:border-green-600 hover:border-2 hover:scale-110' src={pelicula.imagen} alt="" /></Link>
              {isEditing ? <div className=" flex gap-2 justify-center p-2">
                <button onClick={()=>{setId(pelicula.id),setOpen(!isOpen)}}  className="flex bg-red-500 w-10 h-10 justify-center items-center rounded-xl"><ImCross/></button>
                <Link href={'/nuevaPelicula/'+pelicula.id} className="flex bg-green-500 w-10 h-10 justify-center items-center rounded-xl"><FaPen/></Link>
              </div> : null}</div>)
            })}
          </div>
        </div>
        <Modal
        open={isOpen}
        onClose={()=>setOpen(!isOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col w-96 items-center md:flex-row bg-blue-950 rounded-xl gap-5 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-xl">¿ESTA SEGURO DE QUE QUIERE ELIMINAR LA PELICULA?</h1>
            <div className="flex items-center justify-between gap-5">
              <button
              onClick={eliminarPelicula}
                className="w-36 rounded-lg p-2 bg-red-500 text-black"
              >
                ELIMINAR
              </button>
              <button
              onClick={()=>setOpen(!isOpen)}
                className="w-36 rounded-lg p-2 bg-gray-100 text-black"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </Modal>
      </section>
    )
}