const express = require('express'); // Importa el framework Express para crear el servidor web
const cors = require('cors');       // Importa el middleware CORS para permitir peticiones cross-origin
const pool = require('./conexion'); // Importa la configuración de conexión a PostgreSQL desde otro archivo
const app = express();              // Crea una instancia de la aplicación Express
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // aqui Extrae la extensión del documento extraido por el usuario
    const ext = path.extname(file.originalname); 
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.use(cookieParser()); 
require('dotenv').config();
app.use(cors({origin: 'http://localhost:5173', 
  credentials: true,       }));                   // Habilita CORS para todas las rutas y orígenes
app.use(express.json());           // Permite que la app entienda peticiones con cuerpo JSON

const jwtSecret = process.env.JWT_SECRET;
//Login
app.post('/api/login', async (req, res) => {
  const { Email, password } = req.body;
console.log('Datos recibidos:', req.body); 
  if (!Email || !password) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }
 const query = `
      SELECT * FROM "Users"
      WHERE correo = $1 AND contraseña = crypt($2, contraseña)
    `;
  try {
    const result = await pool.query(query, [Email, password]);


    if (result.rows.length > 0) {
    const user= result.rows[0]

    //creando el toque JWT
    const token=jwt.sign(
      {id: user.id, email:user.correo, type:user.type, nombre: user.nombre},
      jwtSecret,
      {expiresIn:'1m'}
    );

     res.cookie('token', token, {
        httpOnly: true,       // No accesible desde JS frontend
        secure: false,        // Cambiar a true en producción con HTTPS
        sameSite: 'lax',      // Previene CSRF básico
        maxAge: 60 * 1000, // 2 horas
      });
    //devolviendo datos al frondend sin token
    return res.status(200).json({
      message:'Login exitoso desde el token',
      user:{
        id: user.id,
        type: user.type,
        nombre: user.nombre,
        email: user.correo

      }
    })

      //return res.status(200).json({ message: 'Login exitoso' });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});



// Define la ruta POST /api/register para registrar nuevos usuarios
app.post('/api/register', async (req, res) => {
  const { Nombre, Email, password } = req.body;  // Extrae los datos enviados en el cuerpo JSON
  console.log('Datos recibidos:', req.body);    // Muestra en consola los datos recibidos

  // Validaciones para asegurarse que se envían todos los campos necesarios
  if (!Nombre || !Email || !password) {
    return res.status(400).json({ message: 'Faltan datos requeridos' }); // Si falta algo, responde error 400
  }

  try {
    
    // El password se cifra usando la función crypt y un salt generado con gen_salt('bf') (bcrypt)
    const query = `
      INSERT INTO "Users" (nombre, correo, contraseña)
      VALUES ($1, $2, crypt($3, gen_salt('bf')))
      RETURNING id, nombre, correo;
    `;
    // Valores para los placeholders $1, $2, $3
    const values = [Nombre, Email, password];  

    // Ejecuta la consulta en la base de datos de forma asíncrona
    const result = await pool.query(query, values);

    // responde con código 200 y datos del usuario registrado
    res.status(200).json({
      message: 'Usuario registrado correctamente',
      usuario: result.rows[0]
    });
// Muestra error en consola
  } catch (error) {
    console.error('Error al guardar usuario:', error); 

    // Si el error es código 23505, significa que el email ya está registrado (violación de clave única)
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Para cualquier otro error, responde error 500 (problema del servidor)
    res.status(500).json({ message: 'Error en el servidor' });
  }
});
 // Verifica sesión
app.get('/api/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return res.json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});

//  Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Sesión cerrada' });
});


//captura y envio de tramite a la bd 

app.post('/api/Solicitud', upload.single('Documentos'), async (req, res) => {
  // Aquí multer procesa el archivo y queda disponible en req.file
  const { usuarioId, tipo, fecha_solicitud, Nombre, FechaNacimiento, LugarNacimiento, NombrePadre, NombreMadre, Genero } = req.body;

  if (!Nombre || !FechaNacimiento || !LugarNacimiento || !Genero || !NombreMadre || !NombrePadre || !usuarioId) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const archivo = req.file; // multer guarda info del archivo subido
  if (!archivo) {
    return res.status(400).json({ message: 'Archivo adjuntado es obligatorio' });
  }
  try {
    
   
    const query = `
      INSERT INTO "tramites" (usuario_id, tipo, archivo_adjuntado,fecha_solicitud,nombre,fecha_nacimiento,lugar_nacimiento,nombre_padre,nombre_madre,genero)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )
    `;
    // Valores para los placeholders $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    const values = [usuarioId, tipo, archivo.filename, fecha_solicitud, Nombre, FechaNacimiento, LugarNacimiento, NombrePadre, NombreMadre, Genero ];  

    // Ejecuta la consulta en la base de datos de forma asíncrona
    const result = await pool.query(query, values);

    // Si todo sale bien, responde con código 200 y datos del usuario registrado
    res.status(200).json({
      message: 'Tramite registrado correctamente',
      usuario: result.rows[0]
    });
// Muestra error en consola
  } catch (error) {
    console.error('Error al guardar tramite:', error); 

    

    // Para cualquier otro error, responde error 500 (problema del servidor)
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// GET Para lista de tramites 
app.get('/api/ListaTramites', async (req, res) => {
  try {
    const estados = ['Recibido', 'En Validacion'];
const result = await pool.query(
  'SELECT * FROM tramites WHERE estado = $1 OR estado = $2',
  estados
);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los trámites:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


app.put('/api/ListaTramites/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await pool.query(
      'UPDATE tramites SET estado = $1 WHERE id = $2',
      [estado, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(3001, () => console.log('Servidor en http://localhost:3001'));