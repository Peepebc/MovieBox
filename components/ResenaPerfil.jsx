import { Rating } from '@mui/material';
import Link from 'next/link';
export default function ResenaPerfil({todasResenas=false, resena}){
    return (
        <div className='flex flex-row gap-5 px-2 md:py-5 md:w-1/3 w-full'>
          <Link href={`/pelicula/${resena.id}`}><img className='w-56 h-72 rounded-xl shadow-black shadow-lg hidden md:block' src={resena.imagen} alt="" /></Link>
          <div className='flex flex-col gap-3 md:w-2/3 w-full'>
            <div className='flex flex-wrap items-center gap-3 border-b-2 py-3 w-full'>
              <p className='text-xl'>{resena.titulo}</p>
              <Rating className='!text-green-700 ' name="half-rating-read" defaultValue={resena.valoracion} precision={0.5} readOnly />
            </div>
            <div className='flex flex-row gap-3 md:gap-0'>
                <Link className='w-auto' href={`/pelicula/${resena.id}`}><img className='h-36 w-28 rounded-xl shadow-black shadow-lg md:hidden' src={resena.imagen} alt="" /></Link>
                <p className={(todasResenas ? "" : "max-w-md ")+'text-sm md:text-xl w-2/3 md:w-auto'}>{resena.descripcion}</p>
            </div>
          </div>
        </div>
    )
}