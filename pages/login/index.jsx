import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/resources/moviebox.png';
import peliculas from '../../public/resources/peliculas.png';
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useRouter  } from 'next/router';
import LayoutNoNav from "../../components/LayoutNoNav";
import { parseCookies } from "@/helpers";
import { useEffect, useState } from "react";


Login.getLayout = function(page) {
    return <LayoutNoNav>{page}</LayoutNoNav>;
  };

export default function Login(){

const { register, handleSubmit} = useForm();
const router = useRouter();
const [cookies,setCookies,removeCookies] = useCookies()
const [mensaje,setMensaje] = useState("")
async function onSubmit (datos) {
    var login 

    try{
        login = await fetch('https://moviebox.1.us-1.fl0.io/Usuarios/Login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(datos),
        }).then(res => res.json()).then(data => {return data})
    }catch(error){
        console.log(error)
    }
    
    if(login.success) {
        setCookies('jwt',login.jwt,{ path: '/' })
        sessionStorage.setItem("jwt",login.jwt)
        router.push(`/perfil/${login.id}`);
    }else{
        setMensaje(login.error)
    }
}

    return (
        <>
        <div className="flex justify-center items-center min-h-screen">
            <div className=" md:flex flex-row shadow-2xl shadow-black rounded-lg">
                <div className="rounded-lg p-10 md:pr-32  w-auto h-auto" style={{backgroundColor: "#1F2E55"}}>
                    <Link href={'/'}>
                        <Image className="inline-block" src={logo} alt="logo"/>
                    </Link>
                    <h1 className="text-4xl">LOGIN</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="user">Usuario</label>
                            <input {...register('usuario')} required className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="text"/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label  htmlFor="pass">Contraseña</label>
                            <input {...register('password')} required className="focus:outline-none rounded-lg border border-gray-100 bg-transparent p-2"  type="password"/>
                        </div>
                        {mensaje && <div className="bg-red-400 p-3 text-center text-black rounded-lg">{mensaje}</div>}
                        <div className="flex py-4 gap-2">
                            <input className="w-5 rounded-xl"  type="checkbox" name="remember" id="remember"/>
                            <label htmlFor="pass">Recuerdame</label>
                        </div>
                        <div className="flex flex-row justify-between py-4">
                            <button type="submit" className="w-36 rounded-lg p-2 bg-gray-100 text-black">
                                LOGIN
                            </button>
                            <Link href={'/register'} className="w-36 rounded-lg p-2 bg-gray-100 text-black text-center">
                                REGISTER
                            </Link>
                        </div>
                        <Link href={'/forgotPassword'}>
                            ¿Has olvidado la contraseña?
                        </Link>
                    </form>
                </div>
                <Image className="hidden md:block" src={peliculas} alt="peliculas" width={400} height={500}/>
            </div>
        </div>
        </>
    )
}
