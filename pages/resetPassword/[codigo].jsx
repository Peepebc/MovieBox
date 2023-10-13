import Link from "next/link";
import LayoutNoNav from "../../components/LayoutNoNav";
import { useState } from "react";
import { useRouter } from "next/router";

ResetPassword.getLayout = function(page) {
    return <LayoutNoNav>{page}</LayoutNoNav>;
  };



export default function ResetPassword(){

    const [contrasena,setContrasena] = useState("")
    const [repetirContrasena,setRepetirContrasena] = useState("")
    const [mensaje,setMensaje] = useState("")
    const [success,setSuccess] = useState(false)
    const [clase,setClase]= useState("")
    const router = useRouter();
    const { codigo } = router.query;

    const enviarDatos =()=>{

        if(contrasena.trim("")=="") return
        if(contrasena != repetirContrasena) {
            setClase("bg-red-400 p-3 text-center text-black rounded-lg")
            setMensaje("Las contraseñas deben coincidir")
            return
        }

        const cambiarContraseña = {nuevaContrasena:contrasena, codigo:codigo}

        
        fetch('https://moviebox.1.us-1.fl0.io/Usuarios/CambiarContraseña', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(cambiarContraseña),
            }).then(res => res.json()).then(data => {
                console.log(data)
                if(data.success) {
                    setMensaje("Su contraseña se ha restablecido correctamente")
                    setClase("bg-green-400 p-3 text-center text-black rounded-lg")
                    setSuccess(true)
                }else{
                    setMensaje(data.error)
                    setClase("bg-red-400 p-3 text-center text-black rounded-lg")
                }
                 return data})

    }

    return (
        <div>
            <img src="" alt="" />
            <div className="flex justify-center align-middle items-center min-h-screen">
                <div className="rounded-lg p-10 shadow-2xl shadow-black" style={{backgroundColor: "#1F2E55"}}>
                        <h1 className="text-4xl text-center">RESETEO DE CONTRASEÑA</h1>
                        {success? <div className={clase}>{mensaje}</div> :<>
                            <div className="flex flex-col py-3">
                                <label  htmlFor="user">Nueva Contraseña</label>
                                <input onChange={e => setContrasena(e.target.value)} required className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="password" name="user" id="user"/>
                            </div>
                            <div className="flex flex-col py-3">
                                <label  htmlFor="user">Confirmar Contraseña</label>
                                <input onChange={e => setRepetirContrasena(e.target.value)} required className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="password" name="user" id="user"/>
                            </div>
                            
                            {mensaje && <div className={clase} >{mensaje}</div>}
                            <div className="flex flex-row py-4">
                                <button onClick={enviarDatos} className="w-32 rounded-lg p-2 bg-gray-100 text-black">
                                    ENVIAR
                                </button>
                            </div>
                            </>}
                            <Link href={'/'}>VOLVER</Link>
                </div>
            </div>
        </div>
    )
}
