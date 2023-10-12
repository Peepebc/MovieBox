
import ResenaPerfil from "@/pages/components/ResenaPerfil";
import { useRouter } from 'next/router'
import { useContext, useEffect } from "react";
import Context from '../../Context.js'
import getDatosUsuario from "@/hooks/Perfil/getDatosUsuario.jsx";
import getResenasUsuario from "@/hooks/Perfil/getResenasUsuario.jsx";
import Link from "next/link.js";
import { useCookies } from "react-cookie";



export default function Resenas(){

    const router = useRouter()
    const {id} = router.query
    const {user, setUser} = useContext(Context)
    const {datosUsuario,isLoadingDatos} = getDatosUsuario(id)
    const {resenas,isLoadingResenas} = getResenasUsuario(id)
    
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
                <p className="text-xl">Reseñas</p>
            </div>
            <div className="flex flex-col md:pl-10 gap-5 py-3">
              {isLoadingResenas ? null :resenas.length>0 &&  resenas.map((resena)=>{
                return <ResenaPerfil todasResenas={true} resena={resena}/>
              })}
            </div>
        </section>
      </>
    )
}