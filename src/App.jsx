import { useEffect, useState } from 'react'
import GetUser from "./assets/components/GetUser"
import api from "./assets/api/api"
import CreateUser from './assets/components/CreateUser';
import Loading from './assets/Loading';
import Swal from 'sweetalert2';

const App = () => {
  const [usuarios, setUsuarios] = useState([]) // Inicializamos el state
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)//state para actualizar usuario
  const [loading, setLoading] = useState(false);//agregamos un estado de loading

  useEffect(() => {
    setLoading(true); // inicio carga
    api.get('/getItems')
      .then(respuesta => {
        if ((respuesta.data.items).length != 0) {
          setUsuarios(respuesta.data.items);
        } else {
          console.log('no hay usuarios')
        }

      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      })
      .finally(() => {
        setLoading(false); // carga finalizada
      });
  }, []); // Evitamos que se vuelva a renderizar con []

  const createUser = (nombre, email) => {//usamos callback para evitar doble renderizado
    api.post('/setItem', { nombre, email })
      .then(respuesta => {
        const usuarioNuevo = respuesta.data.item;
        setUsuarios(prevUsuarios => [...prevUsuarios, usuarioNuevo]);
      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
        Swal.fire('Error', 'Error al crear el usuario', 'error');
      });
  }

  const editUser = (id, nombre, email) => {
    //console.log('editar usuario: ', id, nombre, email)
    api.put('/updateItem', { id, nombre, email })//editamos usuario de acuerdo a su id
      .then(respuesta => {
        //console.log(respuesta.data.item)
        const usuarioActualizado = respuesta.data.item;
        setUsuarios(prev =>
          prev.map(usuario => usuario.id === id ? usuarioActualizado : usuario)
        );
      })
      .catch(error => {
        console.error('Error al editar el usuario:', error);
        Swal.fire('Error', 'Error al editar el usuario', 'error');
      });
  }

  const removeUser = (id) => {
    Swal.fire({
      title: "Deseas borrar este usuario?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete('/deleteInsumo', { data: { id } })
          .then(() => {
            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
          })
          .catch(error => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          });
      }
    });
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-3xl m-4'>
        Lista de Usuarios
      </h1>
      <CreateUser
        createUser={createUser}
        editUser={editUser}
        usuarioSeleccionado={usuarioSeleccionado}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
      />
      {loading ?
        <div className="flex justify-center items-center">
          <Loading />
        </div>
        : usuarios.length === 0 ?
          <div className="text-center text-gray-500 col-span-full">
            No hay usuarios registrados
          </div>
          :
          <div className='grid grid-cols-2 md:grid-cols-6 gap-3'>
            {
              usuarios.map(usuario => (
                <GetUser
                  key={usuario.id}
                  usuario={usuario}
                  removeUser={removeUser}
                  setUsuarioSeleccionado={setUsuarioSeleccionado}
                />
              ))
            }
          </div>
      }
    </div>
  );
}

export default App
