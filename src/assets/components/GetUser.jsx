const GetUser = ({ usuario, setUsuarioSeleccionado, removeUser }) => {
    const { id, nombre, email } = usuario;
    return (
        <>
            <article className='flex flex-col items-center gap-6 p-3 rounded-2xl border-2'>
                <span className='text-2xl font-medium'>
                    {nombre}
                </span>
                <span className='text-sm text-sky-500'>
                    {email}
                </span>
                <div className="flex justify-between gap-4">
                    <button
                        className="font-semibold text-sm text-white bg-purple-600 p-2 rounded-lg cursor-pointer hover:bg-purple-900"
                        onClick={() => setUsuarioSeleccionado(usuario)}
                    >
                        Editar
                    </button>
                    <button
                        className="font-semibold text-sm text-white bg-red-600 p-2 rounded-lg cursor-pointer hover:bg-red-900"
                        onClick={() => removeUser(id)}
                    >
                        Eliminar
                    </button>
                </div>
            </article>
        </>
    )
}
export default GetUser