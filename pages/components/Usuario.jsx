import Link from "next/link";

export default function Usuario({usuario}){
    return(
        <Link href={'/perfil/'+usuario.id} className="flex items-center gap-5">
            <img className='rounded-full w-16 h-16 md:w-32 md:h-32 shadow-black shadow-lg' src={usuario.imagen} alt="" />
            <p className='md:text-4xl font-bold'>{usuario.user}</p>
          </Link>
    )
}