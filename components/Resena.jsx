import { Rating } from '@mui/material';
import Link from 'next/link';
export default function Resena({resena}){
    return (
    <div className='flex flex-row gap-5 px-5 md:py-5 md:w-1/3'>
      <Link href={`/pelicula/${resena.idPelicula}`}><img className='w-52  h-64 rounded-xl shadow-black shadow-lg hidden md:block' src={resena.poster} alt="" /></Link>
      <div className='flex flex-col gap-3 md:w-2/3'>
        <div className='flex items-center gap-3 border-b-2 py-3'>
        <Link href={`/perfil/${resena.idUsuario}`} className='flex flex-row gap-5 items-center'>
          <img className='rounded-full w-10 h-10 shadow-black shadow-lg' src={resena.imagen} alt="" />
          <p className='md:text-xl'>{resena.user}</p>
        </Link>
          <Rating className='!text-green-700 ' name="half-rating-read" defaultValue={resena.valoracion} precision={0.5} readOnly />
        </div>
        <div className='w-96 flex flex-row gap-3 md:gap-0'>
            <Link className='w-1/3 md:w-auto' href={`/pelicula/${resena.idPelicula}`}><img  className='w-28  h-40 rounded-xl shadow-black shadow-lg md:hidden' src={resena.poster} alt="" /></Link>
            <p className='w-2/3 md:w-auto text-sm md:text-lg'>{resena.descripcion}</p>
        </div>
      </div>
    </div>
    )
}