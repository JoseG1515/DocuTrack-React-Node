import React from 'react';
import { useForm } from 'react-hook-form';
import {Link,useNavigate}from 'react-router-dom'


const Login = () => {
    const navigate=useNavigate();
  //uso de atributos de react-hook-form para la captura y validacion de campos del formulario
  const { register, handleSubmit, formState: { errors } } = useForm();
  //evento onsubmit y llamado de la funcion para envio al backend  
const onSubmit=async(data)=>{
  console.log(data)
 sendData(data);
}
 //funcion que envia los datos al backend
 const sendData= async (dataForm)=>{
  try{
const response= await fetch('http://localhost:3001/api/login',{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(dataForm),
credentials: 'include', 
});
const result=await response.json();
console.log(result)

if(response.ok){
    //localStorage.setItem('token', result.token) 
    localStorage.setItem('user', JSON.stringify(result.user))

    const user=JSON.parse(localStorage.getItem('user'))

    user.type===2?navigate('/HomeUser'): navigate('/HomeAdmin')
}

//response.ok?alert('Usuario registrado con éxito'): alert('Error: ' + result.message);
  }catch(error){
alert('Error al conectar con el servidor');
      console.error(error);
  }
 }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-0 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          
          <label className="text-left block mb-1">Email</label>
          <input
            type="email"
            placeholder="Ingrese su Email"
            className="w-full px-4 py-2 border rounded"
            {...register("Email",{
              required:{value:true, message:"el Correo es requerido"},
              pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"el correo no es valido"}
            },
          )}
          />
{errors.Email && <span className="text-left text-red-700 block mt-0 text-sm">{errors.Email.message}</span>}
          <label className="text-left block mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="Escriba una Contraseña"
            className="w-full px-4 py-2 border rounded"
            {...register("password",{required:{value: true,message:"contraseña requerida"}})}
          />
{errors.password && <span className="text-left text-red-700 block mt-0 text-sm">{errors.password.message}</span>}
          
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-400"
          >
            Logear
          </button>
          <p>¿No tienes una cuenta? <Link to="/register"  className="text-blue-500 underline underline-offset-2">Resgistrate ahora!</Link>.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
