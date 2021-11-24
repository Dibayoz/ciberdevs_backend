const { Console } = require('console')
const { AutoEncryptionLoggerLevel } = require('mongodb')
const mongoose = require('mongoose')
require('dotenv').config();
console.log(process.env)

const url= process.env.mongo_uri
mongoose.connect(url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
.then( ()=> console.log('CONECTADO A MONGO'))
.catch( (e)=> console.log('El error de conexión es: ' + e))

// Los esquemas se escriben en minúscula por convención
const usersSchema = mongoose.Schema({
    user_name: String,
    cc: Number,
    age: String,
    profession: String,
    email: String,
    password: String,
    rol: String,
    active: Boolean,
    validation: Boolean
},{versionKey:false}) 

// Los modelos se escriben en minúscula por convención 
const UsersModel = mongoose.model('users', usersSchema)

// Mostrar -- Definir nuestra función de mostrar los registros
const mostrar = async ()=>{
    const users = await UsersModel.find()
    console.log(users)
}

//mostrar()

// Crear
const crear = async ()=>{
    const users = new UsersModel({
        user_name:  'Cosme Fulanita',
        cc: '0111111111',
        age: 10,
        gender: 'female',
        profession: 'teacher',
        email: 'teacher_test@gmail.com',
        password: 'super_Clav9',
        rol: 'Adminsitrador',
        active: true,
        validation: true
    })

    const resultado = await users.save()
    console.log(resultado)

}
// llamamos los procedimientos 

crear()

//Editar

const actualizar =  async(id) =>{
    const persona = await UsersModel.updateOne({_id:id},
    {
        $set:{
            user_name:  'Perengano perencejo',
            cc: '1000000000',
            age: 99,
            gender: 'female',
            profession: 'scientist',
            email: 'prueba@gmail.com',
            password: 'super_Clav0',
            rol: 'Adminsitrador',
            active: false,
            validation: true
        }

    })
}

actualizar('619d8470e8c349d1d7c8a79a')

//Borrar

const eliminar = async(id)=>{
    const users = await UsersModel.deleteOne({_id:id})
    console.log(users)
}

eliminar('619c0da0c5ed72389a0d2c0a')


