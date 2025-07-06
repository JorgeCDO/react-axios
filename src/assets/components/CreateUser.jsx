import { useState, useEffect } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Swal from "sweetalert2"

const CreateUser = ({ createUser, editUser, usuarioSeleccionado, setUsuarioSeleccionado }) => {

    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => { //precargamos datos si es que existen
        if (usuarioSeleccionado) {
            setNombre(usuarioSeleccionado.nombre);
            setEmail(usuarioSeleccionado.email);
            setOpen(true);
        }
    }, [usuarioSeleccionado]);

    const cerrarModal = () => {
        setOpen(false);
        setNombre('');
        setEmail('');
        setUsuarioSeleccionado(null);
    };

    const submitAddUser = (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre.trim() || !email.trim()) {
            Swal.fire('Error', 'No puede haber campos vacios', 'error');
            return;
        }
        if (!regex.test(email)) {
            Swal.fire('Error', 'El correo no tiene un formato válido.', 'error');
            return;
        }

        if (usuarioSeleccionado) {
            editUser(usuarioSeleccionado.id, nombre, email);
        } else {
            createUser(nombre, email);
        }

        cerrarModal(); // limpia después de editar
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer mx-auto block mb-4"
            >
                Crear Usuario
            </button>

            <Dialog open={open} onClose={cerrarModal} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form
                                onSubmit={submitAddUser}
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle as="h3" className="text-center text-base font-semibold text-gray-900 pb-4">
                                                {
                                                    usuarioSeleccionado ? 'Editar usuario' : 'Crear nuevo usuario'
                                                }
                                            </DialogTitle>
                                            <div className="flex justify-between">
                                                <input
                                                    type="text"
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                    placeholder="Nombre"
                                                    className="text-center text-gray-500 outline-none shadow-md border-1 border-gray-300 rounded-2xl ps-2 py-1"
                                                />

                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email"
                                                    className="text-center text-gray-500 outline-none shadow-md border-1 border-gray-300 rounded-2xl ps-2 py-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    >
                                        {usuarioSeleccionado ? 'Editar' : 'Crear'}
                                    </button>

                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={cerrarModal}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-200 sm:mt-0 sm:w-auto"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog >
        </>
    )
}
export default CreateUser