import Lista from "@/pages/components/Lista";
import { useRouter } from 'next/router'
import { useContext, useState } from "react";
import Context from '@/pages/Context.js'
import getListasUsuario from "@/hooks/Perfil/getListasUsuario";
import getDatosUsuario from "@/hooks/Perfil/getDatosUsuario";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { Modal } from "@mui/material";


export default function Listas(){

    const router = useRouter()
    const {id} = router.query
    const {user, setUser} = useContext(Context)
    const {listas,isLoadingListas} = getListasUsuario(id)
    const {datosUsuario,isLoadingDatos} = getDatosUsuario(id)
    const [cookies,setCookies,removeCookies] = useCookies()
    const [isOpen, setOpen] = useState(false);
    const [nombreLista,setNombreLista] = useState("")

    const logOut = () =>{
      setUser(null)
      removeCookies('jwt',{ path: '/' })
      sessionStorage.removeItem("jwt")
      router.push('/');
    }

    async function crearLista (){
      const res = await fetch("https://moviebox.1.us-1.fl0.io/Listas/CrearLista/",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        },
        credentials: "same-origin",
        body: JSON.stringify(nombreLista),
      })
        .then((res) => res.json())
        .then((datos) => {
          console.log(datos)
          window.location.reload();
        });
        console.log(res)
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
            <div className='flex justify-between border-b-2 px-3 items-center'>
                <p className="text-xl">Listas</p>
                {user && user.id == id ?
                <button onClick={()=>setOpen(true)} className="text-4xl">+</button>:null}
            </div>
            <div className="flex justify-center">
                <div className="grid md:grid-cols-2 gap-8 py-10 gap-x-64">
                  {isLoadingListas ? null :listas.length>0 && listas.map((lista)=>{
                    return <Lista lista={lista}/>
                  })}
                </div>
            </div>
        </section>
        <Modal
        open={isOpen}
        onClose={()=>setOpen(!isOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col items-center md:flex-row bg-blue-950 rounded-xl gap-5 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-xl text-center">NOMBRE DE LA LISTA</h1>
            <div className="flex flex-col items-center justify-center gap-5">
              <input className="bg-transparent border-b-2 focus:outline-none text-center" required  type="text" onChange={(_)=>{setNombreLista(_.target.value)}}/>
              <button
                onClick={crearLista}
                className="w-36 rounded-lg p-2 bg-gray-100 text-black"
              >
                CREAR LISTA
              </button>
            </div>
          </div>
        </div>
      </Modal>
      </>
    )
}