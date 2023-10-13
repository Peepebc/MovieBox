import Link from "next/link";
import LayoutNoNav from "../../components/LayoutNoNav";
import { useState } from "react";

ForgotPassword.getLayout = function(page) {
    return <LayoutNoNav>{page}</LayoutNoNav>;
  };



export default function ForgotPassword(){

    const [email,setEmail] = useState("")
    const [mensaje,setMensaje] = useState("")
    const [clase,setClase]= useState("")

    const enviarDatos =()=>{
        if(email.trim(" ") == "") return

        const forgot = fetch('https://moviebox.1.us-1.fl0.io/Usuarios/OlvidarContraseña', {
                method: 'POST',
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify(email),
            }).then(res => res.json()).then(data => {
                console.log(data)
                if(data.success) {
                    setMensaje("Hemos enviado un correo para reiniciar la contraseña")
                    setClase("bg-green-400 p-3 text-center text-black rounded-lg")
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
                        <h1 className="text-4xl text-center">HAS OLVIDADO LA CONTRASEÑA</h1>
                            <div className="flex flex-col py-3">
                                <label  htmlFor="user">Correo</label>
                                <input onChange={e => setEmail(e.target.value)} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2" required  type="email" name="user" id="user"/>
                            </div>
                            {mensaje && <div className={clase}>{mensaje}</div>}
                            <div className="flex flex-row py-4">
                                <button onClick={enviarDatos} className="w-32 rounded-lg p-2 bg-gray-100 text-black">
                                    ENVIAR
                                </button>
                            </div>
                </div>
            </div>
        </div>
    )
}
