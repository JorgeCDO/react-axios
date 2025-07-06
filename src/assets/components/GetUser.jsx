const GetUser = ({ usuario, setUsuarioSeleccionado, removeUser }) => {
    const { id, nombre, email } = usuario;
    return (
        <>
            <article className='flex flex-col items-center gap-6 p-3 rounded-2xl border-2'>
                <span className='text-2xl font-medium'>
                    {nombre}
                </span>
                <span className='font-medium text-sky-500'>
                    {email}
                </span>
                <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setUsuarioSeleccionado(usuario)}
                >
                    Editar
                </button>
                <button
                    className="text-sm text-red-500 hover:underline"
                    onClick={() => removeUser(id)}
                >
                    Eliminar
                </button>
            </article>
        </>
    )
}
export default GetUser