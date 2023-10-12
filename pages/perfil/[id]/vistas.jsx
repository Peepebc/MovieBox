import Link from "next/link";
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react";
import Context from '../../Context.js'
import getVistasUsuario from "@/hooks/Perfil/getVistasUsuario.jsx";
import getDatosUsuario from "@/hooks/Perfil/getDatosUsuario.jsx";
import { useCookies } from "react-cookie";


export default function Vistas(){

    const router = useRouter()
    const {id} = router.query
    const {user, setUser} = useContext(Context)
    const {peliculas, isLoadingPeliculas} = getVistasUsuario(id)
    const {datosUsuario,isLoadingDatos} = getDatosUsuario(id)

    const [cookies,setCookies,removeCookies] = useCookies()
    
    const logOut = () =>{
      setUser(null)
      removeCookies('jwt',{ path: '/' })
      sessionStorage.removeItem("jwt")
      router.push('/');
    }

    return (
        <>
            <section className="flex flex-row md:p-10 md:pl-24 items-center justify-evenly md:justify-between p-0 md:px-14">
            <Link href={"/perfil/"+id} className="flex  md:flex-row flex-col items-center gap-5">
                {isLoadingDatos ? null : (
                  <>
                  <img className='rounded-full w-16 h-16 md:w-32 md:h-32 shadow-black shadow-lg' src={datosUsuario.imagen} alt="" />
                  <p className='md:text-4xl font-bold'>{datosUsuario.user}</p>
                </>
                )}
              </Link>
              {user && user.id==id ?
              <div className="flex gap-5 ">
                <button onClick={logOut} type="submit" className="text-sm md:text-lg md:w-36 rounded-lg p-2 bg-gray-100 text-black">
                    LOGOUT
                </button>
              </div>
              :null}
            </section>
            
            
            <section className='p-10'>
            <div className='flex justify-between border-b-2 px-3'>
            <p className="text-xl">Peliculas Vistas</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 md:grid-cols-7 gap-5 py-10">
                  {isLoadingPeliculas ? null : peliculas.length>0 && peliculas.map((pelicula)=>{
                  return(<Link href={`/pelicula/${pelicula.id}`}><img className='w-32 h-36 md:w-52 md:h-80 rounded-xl' src={pelicula.imagen} alt="" /></Link>)
                }) }
                </div>
                {/* <div>
                    <button className="transition duration-300 w-16 h-16 rounded-full border font-extrabold text-green-800 hover:bg-green-800 hover:text-blue-950 border-green-800 text-center" > 
                    +
                    </button>
                </div> */}
            </div>
        </section>
      </>
    )
}