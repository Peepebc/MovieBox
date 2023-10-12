import Link from "next/link";

export default function Lista({lista}){
    return (
        <Link href={`/perfil/${lista.user}/listas/${lista.id}`}>
            <div className='flex flex-col md:flex-row px-2 py-5 md:py-5 '>
                <div className="flex flex-row md:w-96">
                    {lista.poster.length>0 ?
                    <>
                        {lista.poster[0] && <img className='h-52 w-40 md:h-64 md:w-52 rounded-xl shadow-black shadow-lg relative -right-5' src={lista.poster[0]} alt="" />}
                        {lista.poster[1] && <img className='h-52 w-40 md:h-64 md:w-52 rounded-xl shadow-black shadow-lg relative right-10 -z-10' src={lista.poster[1]} alt="" />}
                        {lista.poster[2] && <img className='h-52 w-40 md:h-64 md:w-52 rounded-xl shadow-black shadow-lg relative right-32 -z-20' src={lista.poster[2]} alt="" />}
                    </>:
                    <div className='flex items-center justify-center h-52 w-40 bg-slate-700 md:h-64 md:w-52 rounded-xl shadow-black shadow-lg relative -right-5'>
                        <h1>NO HAY PELICULAS</h1>
                    </div>   
                    }
                </div>
                <div className='flex flex-col text-center md:text-start p-3 '>
                    <p className="text-xl">{lista.nombre}</p>
                    <p className="">{lista.count}</p>
                </div>
            </div>
        </Link>
    )
}