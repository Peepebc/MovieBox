import { jwtVerify } from "jose";
import { NextResponse } from 'next/server';


export async function middleware(request){

    const jwt = request.cookies.get('jwt')
    if(request.nextUrl.pathname == '/login' && jwt!= undefined){
        return NextResponse.redirect(new URL('/',request.url))
    }  
    if(request.nextUrl.pathname == '/register' && jwt!= undefined){
        return NextResponse.redirect(new URL('/',request.url))
    }  

    if(request.nextUrl.pathname.includes('/nuevaPelicula')){
        if(jwt === undefined) return NextResponse.redirect(new URL('/',request.url))

        const datos = await fetch("/api/Usuarios/Validame",{
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + jwt.value },
            credentials: 'same-origin'
        }).then(res => res.json()).then(data => {return data })
        
        if(datos.rol ==1){
            return NextResponse.next()
        }else{
            return NextResponse.redirect(new URL('/',request.url))
        }
    }    

    return NextResponse.next()

}

