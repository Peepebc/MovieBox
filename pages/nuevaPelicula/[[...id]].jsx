import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/resources/moviebox.png';
import peliculas from '../../public/resources/peliculas.png';
import { useForm } from "react-hook-form";
import { useRouter  } from 'next/router';
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import getDatosPelicula from "@/hooks/Pelicula/getDatosPelicula";

export default function NuevaPelicula(){

const {user} = useContext(Context)
const { register, handleSubmit} = useForm();
const router = useRouter();
const {id} = router.query
const [urlImagen,setUrlImagen] = useState(null)
const { pelicula, isLoadingPelicula } = getDatosPelicula(id);

async function onSubmit (data) {
    
    var formData = new FormData()
    formData.append("Titulo",data.Titulo ? data.Titulo :pelicula.titulo )
    formData.append("Director",data.Director ? data.Director :pelicula.director)
    formData.append("Generos",data.Generos ? data.Generos :pelicula.generos)
    formData.append("Fecha",data.Fecha ? data.Fecha :pelicula.fecha)
    formData.append("Descripcion",data.Descripcion ? data.Descripcion :pelicula.descripcion)
    if(id){
        formData.append("Id",id)
        formData.append("Puntuacion",pelicula.puntuacion)
    }else{
        formData.append("Imagen",data.Imagen[0],data.Imagen[0].name)
        formData.append("Puntuacion",0)
    }
    const nuevaPeli = await fetch('/api/Peliculas/AnadirPelicula', {
        method: 'POST',
        headers: { Authorization: "Bearer " + sessionStorage.getItem("jwt") },
        body:formData
    }).then(res => {return res.json()})
    .then(data => {return data})
    if(nuevaPeli.succes) router.push(`/`)
}
    return (
        <>
        <div className="flex md:justify-center items-center ">
            <div className=" md:flex flex-row shadow-2xl shadow-black rounded-lg">
                <div className="rounded-lg p-10  h-auto" style={{backgroundColor: "#1F2E55"}}>
                    <h1 className="text-4xl text-center">{id ? "EDITAR PELICULA": "AÑADIR PELICULA"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="user">Titulo</label>
                            <input {...register('Titulo')} defaultValue={id && pelicula.titulo} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="text"/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="user">Director</label>
                            <input {...register('Director')} defaultValue={id && pelicula.director} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="text"/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="user">Generos</label>
                            <input {...register('Generos')} defaultValue={id && pelicula.generos} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="text"/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="user">Fecha</label>
                            <input {...register('Fecha')} defaultValue={id && pelicula.fecha && pelicula.fecha.split("T")[0]} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="date"/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="pass">Descripcion</label>
                            <textarea rows={10} cols={40} {...register('Descripcion')} defaultValue={id && pelicula.descripcion} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2" ></textarea>
                        </div>
                        {id? null :
                        <div className="flex flex-row py-3 gap-3 items-center">
                            {urlImagen && <img className="w-20 h-32 object-contain" src={urlImagen}/>}
                            <div className="flex flex-col">
                                <label  htmlFor="pass">Imagen</label>
                                <input rows={10} cols={40} {...register('Imagen')} onChange={(value)=>{setUrlImagen(URL.createObjectURL(value.target.files[0]))}} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="file"/>
                            </div>
                        </div>}
                        <div className="flex justify-center py-4">
                            <button type="submit" className="rounded-lg p-2 bg-gray-100 text-black">
                            {id ? "EDITAR PELICULA": "AÑADIR PELICULA"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
