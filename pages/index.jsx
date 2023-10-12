
import { useContext, useEffect, useState } from 'react'
import Context from './Context.js'
import Resena from './components/Resena.jsx'
import Lista from './components/Lista.jsx'
import Link from 'next/link';
import getUltimasPeliculas from '@/hooks/Inicio/getUltimasPeliculas.jsx';
import getUltimasResenas from '@/hooks/Inicio/getUltimasResenas.jsx';
import getUltimasListas from '@/hooks/Inicio/getUltimasListas.jsx';
import { CircularProgress } from '@mui/material';


export default function Home() {

  const {setUser} = useContext(Context)
  const {peliculas, isLoadingPeliculas} = getUltimasPeliculas()
  const {resenas, isLoadingResenas} = getUltimasResenas()
  const {listas, isLoadingListas} = getUltimasListas()


  return (
    <>
      <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3'>
          <p>ULTIMAS PELICULAS</p>
          <Link href={'/peliculas'}> VER TODAS</Link>
        </div>
          <div className="flex flex-wrap md:flex-nowrap gap-5 py-5 justify-evenly">
            {isLoadingPeliculas ? 
<CircularProgress color="success" /> : peliculas.map((pelicula)=>{
              return(<Link key={pelicula.id} href={`/pelicula/${pelicula.id}`}><img className='w-44 h-56 md:w-52 md:h-80 rounded-xl hover:border-green-600 hover:border-2 hover:scale-110' src={pelicula.imagen} alt="" /></Link>)
            })}
          </div>
      </section>


      <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3 mb-5'>
          <p>ULTIMAS RESEÑAS</p>
          <Link href={'/resenas'}> VER TODAS</Link>
        </div>
        <div className='flex flex-wrap gap-5 justify-evenly'>
          {isLoadingResenas ? 
<CircularProgress color="success" /> : resenas.map((resena)=>{
            return <Resena key={resena.id} resena={resena}/>
          })}
        </div>
      </section>


      <section className='p-10'>
        <div className='flex justify-between border-b-2 px-3 mb-5'>
          <p>ULTIMAS LISTAS</p>
          <Link href={'/listas'}> VER TODAS</Link>
        </div>
        <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 py-10 gap-x-72">
              {isLoadingListas ? 
<CircularProgress color="success" /> : listas.map((lista)=>{
                return <Lista key={lista.id} lista={lista}/>
              })}
            </div>
        </div>
      </section>
    </>
  )
}
