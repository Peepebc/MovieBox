import React from 'react';
import Link from 'next/link';
export default function Favortias() {
  return (
    <section className='p-10'>
      <div className='flex justify-between border-b-2 px-3'>
        <p>PELICULAS FAVORITAS</p>
        <Link href={'/peliculas'}> VER TODAS</Link>
      </div>
        <div className="flex flex-wrap md:flex-nowrap gap-5 py-5 justify-evenly">
          <Link href={'/listas'}><img className='w-36 h-52 md:w-52 md:h-80 rounded-xl' src="https://moviebox-pelis.s3.us-east-005.backblazeb2.com/Peliculas/1580999639_454991_1581001437_album_normal.jpg" alt="" /></Link>
          <Link href={'/listas'}><img className='w-36 h-52 md:w-52 md:h-80 rounded-xl' src="https://moviebox-pelis.s3.us-east-005.backblazeb2.com/Peliculas/a9ea6ae2cb7ebcd433d2eef5616f2d01.jpg" alt="" /></Link>
          <Link href={'/listas'}><img className='w-36 h-52 md:w-52 md:h-80 rounded-xl' src="https://moviebox-pelis.s3.us-east-005.backblazeb2.com/Peliculas/A1JVqNMI7UL._SL1500_.jpg" alt="" /></Link>
          <Link href={'/listas'}><img className='w-36 h-52 md:w-52 md:h-80 rounded-xl' src="https://Moviebox-Pelis.s3.us-east-005.backblazeb2.com/Peliculas/4aa709fb827464c325ee3c63f07b8a6c.jpg" alt="" /></Link>
          <Link href={'/listas'}><img className='w-36 h-52 md:w-52 md:h-80 rounded-xl' src="https://Moviebox-Pelis.s3.us-east-005.backblazeb2.com/Peliculas/17a2822cc31817347eb10959d0bb9163.jpg" alt="" /></Link>
          <Link href={'/listas'}><img className='w-36 h-52 md:w-52 md:h-80 rounded-xl' src="https://Moviebox-Pelis.s3.us-east-005.backblazeb2.com/Peliculas/893f6e44aec5d6da46eb42e016b0287e.jpg" alt="" /></Link>
         </div>
    </section>
  );
}
