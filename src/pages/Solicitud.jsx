import React from 'react'
import { useForm } from 'react-hook-form'
export default function Solicitud() {
const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit= async(data)=>{
    alert("se ha iniciado su tramite con exito")
    console.log(data)
}


  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-8 mt-10 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Solicitud de certificado de Nacimiento</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre completo del nacido
          </label>
          <input
            type="text"
            placeholder='Ingrese el nombre completo del nacido'
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("Nombre",{
              required:{value:true, message:"El nombre es un dato rquerido"},
             
            },
          )} 
          />
          {errors.Nombre && <span className="text-left text-red-700 block mt-0 text-sm">{errors.Nombre.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("FechaNacimiento",{
                required:{value:true, message:"fecha de nacimiento requerida "}
            })}
          />
          {errors.FechaNacimiento && <span className="text-left text-red-700 block mt-0 text-sm">{errors.FechaNacimiento.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lugar de nacimiento
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
         {...register("LugarNacimiento",{
            required:{value:true, message:"Luegar de nacimiento requerido"}
         })}
         >
            <option value=""  disabled selected >Seleccione un lugar de nacimiento </option>
            <option value="Bocas del Toro">Bocas del Toro</option>
            <option value="Coclé">Coclé</option>
            <option value="Colón">Colón</option>
            <option value="Chiriquí">Chiriquí</option>
            <option value="Darién">Darién</option>
            <option value="Herrera">Herrera</option>
            <option value="Los Santos">Los Santos</option>
            <option value="Panamá">Panamá</option>
            <option value="Panamá Oeste">Panamá Oeste</option>
            <option value="Veraguas">Veraguas</option>
            <option value="Guna Yala">Guna Yala</option>
            <option value="Ngäbe-Buglé">Ngäbe-Buglé</option>
            <option value="Emberá-Wounaan">Emberá-Wounaan</option>
            <option value="Madugandí">Madugandí</option>
            <option value="Wargandí">Wargandí</option>
          </select>
          {errors.LugarNacimiento && <span className='text-left text-red-700 block mt-0 text-sm'>{errors.LugarNacimiento.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del padre 
          </label>
          <input
            type="text"
            placeholder='ingrese el nombre del padre'
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          {...register("NombrePadre",{
            required:{value:true, message:"Nombre del padre requerido"}
          })}
          />
          {errors.NombrePadre && <span className="text-left text-red-700 block mt-0 text-sm">{errors.NombrePadre.message}</span>}
        </div>
<div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la madre
          </label>
          <input
            type="text"
            placeholder='ingrese el nombre de la madre'
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
         {...register("NombreMadre",{
            required:{value: true, message:"nombre de la madre querido"}
         })}
         />
         {errors.NombreMadre && <span className="text-left text-red-700 block mt-0 text-sm" >{errors.NombreMadre.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          {...register("Genero",{
            required:{value:true, message:"el Genero es requerido"}
          })}
          >
           
            <option value="" disabled selected>Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            
          </select>
           {errors.Genero && <span className='text-left text-red-700 block mt-0 text-sm'>{errors.Genero.message}</span>}
        </div>

        
<div>
  <label className="block text-sm font-medium text-gray-700">
    Adjuntar cédula (PDF o JPG)
  </label>

  <input
    type="file"
    accept=".pdf, .jpg, .jpeg, .png"
    className="mt-1 block w-full text-sm text-gray-700 file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 file:border-none file:cursor-pointer"
{...register("Documentos",{
required:{value:true, message:"se requiere enviar la cedula para confirmar la informacion"}
})}
 />
 {errors.Documentos && <span className='text-left text-red-700 block mt-0 text-sm'>{errors.Documentos.message}</span>}
</div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Solicitar
          </button>
        </div>
      </form>
    </div>
  )
}
