import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/resources/moviebox.png';
import peliculas from '../../public/resources/peliculas.png';
import { useState } from "react";
import LayoutNoNav from "../../components/LayoutNoNav";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

Register.getLayout = function(page) {
    return <LayoutNoNav>{page}</LayoutNoNav>;
  };

export default function Register(){

    const { register, handleSubmit} = useForm();
    const [urlImagen,setUrlImagen] = useState(null)
    const [error,setError] = useState(null)
    const [cookies,setCookies,removeCookies] = useCookies()
    const router = useRouter();
    const [mensaje,setMensaje] = useState("")

    async function onSubmit (data) {
        setMensaje("")
        setError("")

        if(data.Contrasena != data.ConfirmarContrasena) {
            setError("Las contrasenas deben coincidir")
            return
        }
        var formData = new FormData()
    
        formData.append("usuario",data.Usuario)
        formData.append("email",data.Email)
        formData.append("nombre",data.Nombre)
        formData.append("apellidos",data.Apellidos)
        formData.append("fechaNac",data.Fecha)
        formData.append("password",data.Contrasena)
        formData.append("Imagen",data.Pfp[0],data.Pfp[0].name)
    
        const register = await fetch('https://moviebox.1.us-1.fl0.io/Usuarios/Register', {
            method: 'POST',
            body:formData,
        }).then(res => res.json()).then(data => {return data})
    
        if(register.succes) {
            const datos = {usuario:data.Usuario, password:data.Contrasena}

            const login = await fetch('https://moviebox.1.us-1.fl0.io/Usuarios/Login', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json'},
                    body: JSON.stringify(datos),
                }).then(res => res.json()).then(data => {return data})
            
            if(login.success) {
                setCookies('jwt',login.jwt,{ path: '/' })
                sessionStorage.setItem("jwt",login.jwt)
                router.push(`/perfil/${login.id}`);
            }
        }else{
            setMensaje(register.error)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen py-5">
            <div className=" md:flex flex-row shadow-2xl shadow-black rounded-lg">
                <div className="rounded-lg p-10 md:pr-32" style={{backgroundColor: "#1F2E55"}}>
                    <Link href={'/'}>
                        <Image className="inline-block" src={logo} alt="logo"/>
                    </Link>
                    <h1 className="text-4xl py-5">REGISTER</h1>
                    
                    {mensaje && <div className="bg-red-400 p-3 text-center text-black rounded-lg">{mensaje}</div>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="user">Usuario</label>
                            <input {...register('Usuario')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="text" required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="email">Email</label>
                            <input {...register('Email')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="email" required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="nombre">Nombre</label>
                            <input {...register('Nombre')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="nombre" required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="apellidos">Apellidos</label>
                            <input {...register('Apellidos')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="text" required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="fechaNac">Fecha Nacimiento</label>
                            <input {...register('Fecha')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="date" required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="pass">Contraseña</label>
                            <input {...register('Contrasena')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="password" required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="confPass">Confirmar Contraseña</label>
                            <input {...register('ConfirmarContrasena')} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="password" required/>
                        </div>
                        {error ? <div className="flex flex-col py-3 text-center bg-red-300 text-black rounded-lg">
                            <p>{error}</p>
                        </div>:null}
                        <div className="flex flex-row py-3 gap-3 items-center">
                            {urlImagen && <img className="w-16 h-16 object-contain" src={urlImagen}/>}
                            <div className="flex flex-col">
                                <label  htmlFor="pass">Imagen</label>
                                <input rows={10} cols={40} {...register('Pfp')} onChange={(value)=>{setUrlImagen(URL.createObjectURL(value.target.files[0]))}} className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="file"/>
                            </div>
                        </div>
                        <div className="flex flex-col py-4">
                            <button type="submit" className="rounded-lg p-2 bg-gray-100 text-black">
                                REGISTRARSE
                            </button>
                        </div>
                    </form>
                </div>
                <Image className="hidden md:block" src={peliculas} alt="peliculas" width={650} height={700}/>
            </div>
        </div>
    )
}
