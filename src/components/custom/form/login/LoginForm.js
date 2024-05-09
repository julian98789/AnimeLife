'use client'
import { useForm } from "react-hook-form"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import useStore from "@/hook/useSession.js";
import Swal from "sweetalert2";

const LoginForm = () => {
    const { login } = useStore();


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const enviarDatos = async (dataUser) => {   // Define una función asíncrona llamada "enviarDatos" que toma un objeto "dataUser" como parámetro.

        const options = {   // Define las opciones para la solicitud, incluyendo el método POST, las cabeceras y el cuerpo de la solicitud.
            method: 'POST',  // Define el método de la solicitud como POST.
            header: {   // Define las cabeceras de la solicitud.
                'Content-Type': 'application/json'   // Establece el tipo de contenido de la solicitud como JSON.
            },
            body: JSON.stringify(dataUser)   // Convierte el objeto "dataUser" a una cadena JSON y lo asigna como cuerpo de la solicitud.
        }
        await fetch("/api/login", options)  // Realiza una solicitud HTTP POST a la ruta "/api/login" utilizando las opciones definidas.
            .then(res => res.json())    // Convierte la respuesta a formato JSON.
            .then(data => processData(data))


    }
    const error = () => {
        Swal.fire({
            position: 'top-center',
            title: 'Error',
            text: 'No se ha podido iniciar sesion',
            icon: 'error',
            showConfirmButton: false,
            timer: 2500
        })
    }
    const success = () => {
        Swal.fire({
            position: 'top-center',
            title: 'Exito',
            text: 'Inicio  exitoso',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
        })
    }

    const processData = (data) => {
        if (data.length == 1) {
            login(data[0].rol)
            switch (data[0].rol) {
                case 'admin':
                    success()
                    window.location.href = "/admin"
                    break;
                case 'cliente':
                    success()
                    window.location.href = "/client"
                    break;
                default:
                    success()
                    window.location.href = "/moderator"
                    break;
            }
        } else {
            error()
        }

    }

    return <form
        onSubmit={handleSubmit(enviarDatos)}

        className="w-full max-w-[350px] h-auto bg-[#1d2028] rounded-xl flex flex-col justify-center items-center gap-2 ">

        <div className=" py-7">
            <img className="h-28 w-auto  " src="/otaku.png" alt="your company" />
        </div>
        <div className="flex flex-col gap-5">


            <div className=" relative ">
                <input {...register("user", { required: true })} autoComplete="off" className=" rounded w-full outline-none h-9  pl-10 text-black" placeholder="Ingrese su usuario" />
                <FaUser className="text-neutral-900 w-7 absolute top-[10px] left-1" />
            </div>
            {errors.user && <span className="text-[#ff0000] text-xs ">Este espacio es requerido</span>}

            <div className="  relative">
                <input {...register("pass", { required: true })} type="password" className=" rounded w-full h-9 outline-none pl-10 text-black" placeholder="Ingrese su contraseña" />
                <RiLockPasswordFill className="text-neutral-900 w-7 absolute top-[10px] left-1" />
            </div>
            {errors.pass && <span className="text-[#ff0000] text-xs  ">Este espacio es requerido</span>}

        </div>

        <button className="w-full h-9 mt-4 max-w-[260px] bg-red-600 rounded text-white mb-7 hover:transition transition-transform hover:scale-105 duration-400 shadow-2xl" type="submit">
            Ingresar
        </button>

    </form>
}
export default LoginForm

