import Link from "next/link";
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
import Context from '@/Context.js'
import getDatosUsuario from "@/hooks/Perfil/getDatosUsuario";
import getPeliculasLista from "@/hooks/Perfil/getPeliculasLista";
import { useCookies } from "react-cookie";
import { Modal } from "@mui/material";


export default function PeliculasLista(){

    const router = useRouter()
    const {id,idLista} = router.query
    const {user, setUser} = useContext(Context)
    const {datosUsuario,isLoadingDatos} = getDatosUsuario(id)
    const {peliculas,setPeliculas, isLoadingPeliculas} = getPeliculasLista(idLista)
    const [cookies,setCookies,removeCookies] = useCookies()
    const [isOpen, setOpen] = useState(false);
    const [todasPeliculas,setTodasPeliculas] = useState([])
    const [isLoadingTodasPeliculas,setIsLoadingTodasPeliculas] = useState(false)
    const [peliculasFiltradas,setPeliculasFiltradas] = useState([])
    
    useEffect(()=>{
      fetch('/api/Peliculas/TodasPeliculas', {
        method: 'GET',
        headers: { 'Content-type': 'application/json'}
    },setIsLoadingTodasPeliculas(true))
    .then(res => res.json())
    .then(data => {
      setTodasPeliculas(data)
      setIsLoadingTodasPeliculas(false)
    })
    },[])

    const filtrarPeliculas = (value)=>{
      if(isLoadingTodasPeliculas) return
      if(value.trim(" ") == ""){
        setPeliculasFiltradas([])
        return
      }
      const newFiltradas = [...todasPeliculas].filter(p=>p.titulo.toLowerCase().includes(value.toLowerCase()))
      setPeliculasFiltradas(newFiltradas)
    }

    console.log(peliculas)
    const anadirPelicula=(p)=>{
      const pelicula = {idPelicula:p.id,idLista:idLista}
      fetch('https://moviebox.1.us-1.fl0.io/Contiene/AnadirPeliculaLista', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        },
        body : JSON.stringify(pelicula)
      })
      .then(res => res.json())
      .then(data => {
        const newPeliculas = {...peliculas}
        newPeliculas.incluye.push(p)
        const newTodasPeliculas = [...todasPeliculas].filter(peli=>peli.id!=p.id)
        const newPeliculasFiltradas = [...peliculasFiltradas].filter(peli=>peli.id!=p.id)
        setTodasPeliculas(newTodasPeliculas)
        setPeliculasFiltradas(newPeliculasFiltradas)
        setPeliculas(newPeliculas)
      })
    }

    const logOut = () =>{
      setUser(null)
      removeCookies('jwt',{ path: '/' })
      sessionStorage.removeItem("jwt")
      router.push('/');
    }

    var typingTimerLocal = null

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
              {user && user.id == id ? (
                <div className="flex gap-5 ">
                  <button
                    onClick={logOut}
                    type="submit"
                    className="text-sm md:text-lg md:w-36 rounded-lg p-2 bg-gray-100 text-black"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : null}
            </section>
            
            
            <section className='p-10'>
            <div className='flex justify-between border-b-2 px-3'>
                <p className="text-xl">{peliculas.titulo}</p>
                {user && user.id == id ?
                <button onClick={()=>setOpen(true)} className="text-4xl">+</button>:null}
            </div>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3 md:grid-cols-7 gap-5 py-10">
              {isLoadingPeliculas ? null : peliculas.incluye && peliculas.incluye.map((pelicula)=>{
                  return(<Link key={pelicula.id} href={`/pelicula/${pelicula.id}`}><img className='w-32 h-36 md:w-52 md:h-80 rounded-xl' src={pelicula.imagen} alt="" /></Link>)
                }) }
              </div>
              {/* <div>
                <button className="transition duration-300 w-16 h-16 rounded-full border font-extrabold text-green-800 hover:bg-green-800 hover:text-blue-950 border-green-800 text-center" > 
                  +
                </button>
              </div> */}
            </div>
            <Modal
              open={isOpen}
              onClose={()=>setOpen(!isOpen)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="flex flex-col items-center md:flex-row bg-blue-950 rounded-xl gap-5 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-5 p-5">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-extrabold text-xl text-center">BUSCAR PELICULAS</h1>
                    <input className="bg-transparent border-b-2 focus:outline-none text-center p-2" required  type="text" onChange={(input)=>{
                        clearTimeout(typingTimerLocal)
                        typingTimerLocal= setTimeout(()=>filtrarPeliculas(input.target.value),2000)}}/>
                  </div>
                  <div className="flex flex-col items-center gap-5 h-72 overflow-auto">
                    
                        {peliculasFiltradas && peliculasFiltradas.map((p)=>{
                          return (
                            <div key={p.titulo+ "-" +p.i} className="flex items-center justify-between w-72 gap-5">
                              <div className="flex items-center gap-2">
                                <img className="w-16 h-24 rounded-md" src={p.imagen}/>
                                <p className="text-sm">{p.titulo}</p>
                              </div>
                              <div>
                              <button
                                onClick={()=>anadirPelicula(p)}
                                className="w-9 h-9 rounded-full bg-transparent border-2 text-white text-xl"
                              >
                                +
                              </button>
                              </div>
                            </div>
                          )
                        }
                        )}
                    
                  </div>
                </div>
              </div>
            </Modal>
        </section>
      </>
    )
}