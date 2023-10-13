import logo from '../../public/resources/moviebox.png';
import Link from "next/link";
import Image from 'next/image';
import { useContext, useEffect, useState } from "react";
import Context from '../Context.js';
import { CiUser, CiSearch } from 'react-icons/ci';


export default function Navigation(){

    const {user,setUser} = useContext(Context)
    const [isOpen,setIsOpen] = useState(false)


    useEffect(() => {
      if(sessionStorage.getItem("jwt")){
        fetch("https://moviebox.1.us-1.fl0.io/Usuarios/Validame",{
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem("jwt") },
            credentials: 'same-origin'
        }).then(res => res.json()).then(datos => {
            setUser(datos)
        })
      }
    }, []);

    return (
<nav className="flex items-center justify-between flex-wrap md:flex-nowrap p-6">
     <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Link href={'/'}>
       <Image src={logo} height={70} className='object-fill' alt="Logo" />
      </Link> 
     </div>
     <div className="block md:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
       >
         <svg
           className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
         </svg>
       </button>
     </div>
     <div
       className={`block md:flex md:items-center w-auto ${isOpen ? "block" : "hidden"}`}
     >
       <div className="flex text-sm flex-col md:flex-row md:items-center gap-3">
        {user && user.rol && user.rol==1 ?
          <Link href={'/nuevaPelicula'} className="block mt-4 md:inline-block  md:mt-0 text-white-200 mr-4 hover:border-b">
           AÑADIR PELICULA
          </Link>
          :null}
          <Link href={'/peliculas'} className="block mt-4 md:inline-block  md:mt-0 text-white-200 mr-4 hover:border-b">
            PELICULAS
          </Link>
          <Link href={'/resenas'} className="block mt-4 md:inline-block  md:mt-0 text-white-200 mr-4 hover:border-b">
            RESEÑAS
          </Link>
          <Link href={'/listas'} className="block mt-4 md:inline-block  md:mt-0 text-white-200 mr-4 hover:border-b">
            LISTAS
          </Link>
          <Link href={'/usuarios'} className="block mt-4 md:inline-block  md:mt-0 text-white-200 mr-4 hover:border-b">
            USUARIOS
          </Link>
         <div className='flex flex-col md:flex-row gap-3 md:w-80'>
            <div className="relative flex order-last md:order-first items-center rounded-3xl border border-white overflow-hidden ">
                <input
                className="bg-transparent p-2 w-72 focus:outline-none focus:p-3 duration-200"
                type="text"
                id="search"
                placeholder="Search..." /> 
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <CiSearch className='text-2xl'/>
                </div>
            </div>
        </div>
        {user ? <Link href={`/perfil/${user.id}`}><img src={user.imagen} className='inline-flex rounded-full w-12' alt="logo"/></Link> : <Link href={'/login'}><CiUser className='inline-flex text-4xl'/></Link>}    
       </div>
       <div>

       </div>
     </div>
   </nav>
    )
}