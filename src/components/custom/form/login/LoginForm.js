'use client'
import { useForm } from "react-hook-form"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const LoginForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    return <form

        className="w-full max-w-[350px] h-auto bg-[#1d2028] rounded-xl flex flex-col justify-center items-center gap-2 ">

        <div className=" py-7">
           <img className="h-28 w-auto  " src="/otaku.png" alt="your company" />
        </div>
        <div className="flex flex-col gap-5">


            <div className=" relative ">
                <input {...register("user", { required: true })} autoComplete="off" className=" rounded w-full outline-none h-9  pl-10 text-black" placeholder="Ingrese su usuario" />
                <FaUser className="text-neutral-900 w-7 absolute top-[10px] left-1"/>
            </div>
            {errors.user && <span className="text-[#ff0000] text-xs ">Este espacio es requerido</span>}

            <div className="  relative">
                <input {...register("pass", { required: true })} type="password" className=" rounded w-full h-9 outline-none pl-10 text-black" placeholder="Ingrese su contraseña" />
                <RiLockPasswordFill className="text-neutral-900 w-7 absolute top-[10px] left-1"/>
            </div>
            {errors.pass && <span className="text-[#ff0000] text-xs  ">Este espacio es requerido</span>}

        </div>

        <button className="w-full h-9 mt-4 max-w-[260px] bg-red-600 rounded text-white mb-7 hover:transition transition-transform hover:scale-105 duration-400 shadow-2xl" type="submit">
            Ingresar
        </button>

    </form>
}
export default LoginForm

