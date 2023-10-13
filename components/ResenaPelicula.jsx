import { Rating } from '@mui/material';
import Link from 'next/link';
export default function ResenaPelicula({resena}){
    return (
    <div className='flex flex-row gap-5 pl-10 px-2 md:py-5'>
        <div className='flex flex-col gap-3 w-full md:w-3/4'>
            <div className='flex flex-row items-center gap-3 border-b-2 py-3'>
                <Link href={"/perfil/"+resena.idUsuario} className='flex flex-row items-center gap-5'>
                    <img className='rounded-full w-10 h-10 shadow-black shadow-lg' src={resena.imagen} alt="" />
                    <p className='md:text-xl'>{resena.user}</p>
                </Link>
                <Rating className='!text-green-700 ' name="half-rating-read" defaultValue={resena.valoracion} precision={0.5} readOnly />
            </div>
            <div className='flex flex-row gap-3 md:gap-0'>
                <p className='text-sm md:text-lg'>{resena.descripcion}</p>
            </div>
      </div>
    </div>
    )
}