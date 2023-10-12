import { useRouter } from "next/router";
import { CircularProgress, Modal, Rating } from "@mui/material";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineStar,
} from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import ResenaPelicula from "../components/ResenaPelicula";
import getDatosPelicula from "@/hooks/Pelicula/getDatosPelicula.jsx";
import getResenasPelicula from "@/hooks/Pelicula/getResenasPelicula.jsx";
import getIsFav from "@/hooks/Pelicula/getIsFav";
import Context from "../Context";
import getIsWatched from "@/hooks/Pelicula/getIsWatched";



export default function Pelicula() {
  const [isOpen, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const { idPelicula } = router.query;
  const { pelicula, reviews, isLoadingPelicula } = getDatosPelicula(idPelicula);
  const { resenas, isLoadingResenas } = getResenasPelicula(idPelicula);
  const { isFav, setIsFav, isLoadingFav } = getIsFav({ idPelicula });
  const { isWatched, setIsWatched, isLoadingWatched } = getIsWatched({idPelicula });
  const { user, setUser } = useContext(Context);
  const [mensaje, setMensaje] = useState("");
  const [resenaModal, setResenaModal] = useState("");

  const fav = () => {
    const method = isFav ? "DELETE" : "GET";
    const url = isFav ? "EliminarFav/" : "AnadirFav/";
    if (user) {
      fetch("https://moviebox.1.us-1.fl0.io/Favs/" + url + idPelicula, {
        method: method,
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        },
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((datos) => {
          setIsFav(!isFav);
          setMensaje(datos);
        });
    } else router.push("/login");
  };

  const watch = () => {
    const method = isWatched ? "DELETE" : "GET";
    const url = isWatched ? "EliminarVer/" : "AnadirVer/";
    if (user) {
      fetch("https://moviebox.1.us-1.fl0.io/Ver/" + url + idPelicula, {
        method: method,
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        },
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((datos) => {
          setIsWatched(!isWatched);
          setMensaje(datos);
        });
    } else router.push("/login");
  };

  const hacerReview = () => {
    if (user) {
      const resenaRequest = { descripcion: resenaModal, valoracion: rating };

      fetch("https://moviebox.1.us-1.fl0.io/Resenas/AnadirResena/" + idPelicula, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        },
        credentials: "same-origin",
        body: JSON.stringify(resenaRequest),
      })
        .then((res) => res.json())
        .then((datos) => {
          window.location.reload();
        });
    } else router.push("/login");
  };
  const openModal = () => {
    setOpen(!isOpen);
    setRating(0);
  };
  
  return (
    <>
      {isLoadingPelicula ? (
        <CircularProgress color="success" />
      ) : (
        <section>
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start  md:justify-center py-10">
            <img
              className="w-72 h-96 rounded-xl"
              src={pelicula.imagen}
              alt=""
            />
            <div className="flex flex-col md:w-1/3 gap-5 p-5">
              <div className="flex flex-col gap-3">
                <p className="font-extrabold text-3xl">{pelicula.titulo}</p>
                <p className="text-lg">
                  {pelicula.fecha && pelicula.fecha.split("T")[0]}
                </p>
                <p className="text-lg">Director: {pelicula.director}</p>
              </div>
              <p className="text-lg">{pelicula.descripcion}</p>
              <p>GENEROS: {pelicula.generos}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg p-2 border-b-2">RATINGS</p>
              <div className="flex flex-col text-center items-center gap-5 py-5">
                <p className="text-4xl">{pelicula.puntuacion && pelicula.puntuacion.toFixed(2)}/5</p>
                <p className="text-xl font-thin">{reviews} Reviews</p>
                {pelicula.puntuacion >= 0 ? (
                  <Rating
                    className="!text-green-700"
                    name="half-rating-read"
                    size="large"
                    defaultValue={pelicula.puntuacion}
                    precision={0.5}
                    readOnly
                  />
                ) : null}
                <div className="flex flex-row gap-5 items-center">
                  <button
                    onClick={()=> {user ? openModal() : router.push("/login")}}
                    className="w-36 rounded-lg p-2 bg-gray-100 text-black"
                  >
                    REVIEW
                  </button>
                  {!isFav ? (
                    <AiOutlineHeart onClick={fav} className="text-4xl" />
                  ) : (
                    <AiFillHeart
                      onClick={fav}
                      className="text-4xl text-green-700"
                    />
                  )}
                  {!isWatched ? (
                    <AiOutlineEye onClick={watch} className="text-4xl" />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={watch}
                      className="text-4xl text-green-700"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="flex flex-col p-10 items-center">
        <div className="w-full md:w-3/4">
          <div className="flex justify-between border-b-2 px-3 mb-5">
            <p className="text-xl font-bold">RESEÑAS</p>
          </div>
          <div className="flex flex-col gap-5">
            {isLoadingResenas ? (
              <CircularProgress color="success" />
            ) : resenas.length > 0 ? (
              resenas.map((resena,index) => {
                return <ResenaPelicula key={index} resena={resena} />;
              })
            ) : null}
          </div>
          {resenas && resenas.length == 0 ? (
            <p className="text-center py-5">NO HAY RESEÑAS</p>
          ) : null}
        </div>
      </section>

      <Modal
        open={isOpen}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col md:w-1/3 items-center md:flex-row bg-blue-950 rounded-xl gap-5 p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="w-56 rounded-xl" src={pelicula.imagen} alt="" />
          <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-xl">{pelicula.titulo}</h1>
            <textarea
              onChange={(e) => {
                setResenaModal(e.target.value);
              }}
              className="p-3 text-black rounded-xl resize-none focus:outline-none"
              name="resena"
              rows={7}
              cols={30}
              id=""
              placeholder="Escriba su reseña"
            ></textarea>
            <div className="flex items-center justify-between gap-5">
              <Rating
                emptyIcon={<AiOutlineStar className="text-green-700" />}
                className="!text-green-700"
                name="half-rating-read"
                size="large"
                onChange={(_, value) => {
                  setRating(value);
                }}
                defaultValue={rating}
                precision={0.5}
              />
              <button
                onClick={hacerReview}
                className="w-36 rounded-lg p-2 bg-gray-100 text-black"
              >
                REVIEW
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
