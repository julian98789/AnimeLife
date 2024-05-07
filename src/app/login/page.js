import LoginForm from "@/components/custom/form/login/LoginForm";

const login = () =>{
    return<div className="w-full h-screen items-center bg-center bg-no-repeat bg-[url('/Fondo.jpeg')]">
        <div className="w-full h-screen  flex justify-center  "> 
            <div className=" w-80  flex justify-center items-center md:w-1/2">
                <LoginForm />
            </div>
        </div>

    </div>
        
}
export default login