import Link from "next/link";
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react";
import Context from '../Context.js'
import Lista from "../components/Lista";
import getUltimasPeliculasUsuario from "@/hooks/Perfil/getUltimasPeliculasUsuario";
import getUltimasListasUsuario from "@/hooks/Perfil/getUltimasListasUsuario";
import getUltimasResenasUsuario from "@/hooks/Perfil/getUltimasResenasUsuario";
import getUltimasFavoritasUsuario from "@/hooks/Perfil/getUltimasFavoritasUsuario";
import getDatosUsuario from "@/hooks/Perfil/getDatosUsuario";
import ResenaPerfil from "../components/ResenaPerfil";
import { useCookies } from "react-cookie";


export default function Profile(){

    const router = useRouter()
    const {id} = router.query
    const {user, setUser} = useContext(Context)
    const {peliculas,isLoadingPeliculas} = getUltimasPeliculasUsuario(id)
    const {favoritas,isLoadingFavoritas} = getUltimasFavoritasUsuario(id)
    const {listas,isLoadingListas} = getUltimasListasUsuario(id)
    const {resenas,isLoadingResenas} = getUltimasResenasUsuario(id)
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
            <p>ULTIMAS PELICULAS</p>
            <Link href={id+'/vistas'}> VER TODAS</Link>
          </div>
            <div className="flex flex-wrap md:flex-nowrap gap-5 py-5 md:justify-start justify-center">
              {isLoadingPeliculas ? null : peliculas.length>0 && peliculas.map((pelicula)=>{
                return(<Link href={`/pelicula/${pelicula.id}`}><img className='w-32 h-44 md:w-52 md:h-80 rounded-xl' src={pelicula.imagen} alt="" /></Link>)
              }) }
            </div>
            {peliculas && peliculas.length==0 ? <p className="text-center py-5">NO HAY PELICULAS VISTAS</p> :null}
        </section>

        <section className='p-10'>
          <div className='flex justify-between border-b-2 px-3'>
            <p>PELICULAS FAVORITAS</p>
            <Link href={id+'/favoritas'}> VER TODAS</Link>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-5 py-5 md:justify-start justify-center">
              {isLoadingFavoritas ? null : favoritas.length>0 && favoritas.map((pelicula)=>{
                return(<Link href={`/pelicula/${pelicula.id}`}><img className='w-32 h-44 md:w-52 md:h-80 rounded-xl' src={pelicula.imagen} alt="" /></Link>)
              })}
            </div>
            {favoritas && favoritas.length==0 ? <p className="text-center py-5">NO HAY PELICULAS FAVORITAS</p> :null}
        </section>


        <section className='p-10'>
          <div className='flex justify-between border-b-2 px-3 mb-5'>
            <p>ULTIMAS RESEÑAS</p>
            <Link href={id+'/resenas'}> VER TODAS</Link>
          </div>
          <div className='flex flex-wrap md:px-10 gap-5 justify-evenly'>
            {isLoadingResenas ? null :resenas.length>0 && resenas.map((resena)=>{
              return <ResenaPerfil resena={resena}/>
            })}
          </div>
          {resenas && resenas.length==0 ? <p className="text-center py-5">NO HAY RESEÑAS</p> :null}
        </section>
        
        <section className='p-10'>
          <div className='flex justify-between border-b-2 px-3 mb-5'>
            <p>ULTIMAS LISTAS</p>
            <Link href={id+'/listas'}> VER TODAS</Link>
          </div>
          <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-8 py-10 gap-x-64">
                {isLoadingListas ? null : listas.length>0 && listas.map((lista)=>{
                  return <Lista lista={lista}/>
                })}
              </div>
          </div>
          {listas && listas.length==0 ? <p className="text-center ">NO HAY LISTAS</p> :null}
        </section>
      </>
    )
}
