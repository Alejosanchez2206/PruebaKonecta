import { useState } from "react"
import "./tabla-usuarios.css"

const TablaUsuarios = ({ dataUser, editarUser, eliminarUser }) => {

    // Estado para paginación
    const [paginaActual, setPaginaActual] = useState(1)
    const filasPorPagina = 8

    // Cálculo de datos para la página actual
    const indiceUltimaFila = paginaActual * filasPorPagina
    const indicePrimeraFila = indiceUltimaFila - filasPorPagina
    const usuariosPaginados = dataUser.slice(indicePrimeraFila, indiceUltimaFila)
    const totalPaginas = Math.ceil(dataUser.length / filasPorPagina)

    // Funciones de navegación
    const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1)
        }
    }

    const irAPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1)
        }
    }

    const eliminarUsuario = (id) => {
        confirm('¿Estás seguro de eliminar este usuario?')
        if (confirm) {
            eliminarUser(id)
        }
    }

    const editarUsuario = (id) => {
        editarUser(id)
    }

    return (
        <>
            <div className="tabla-content">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Ciudad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosPaginados.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>
                                    <span className="id-badge">{usuario.id}</span>
                                </td>
                                <td >{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    {usuario.phone}
                                </td>
                                <td>
                                    <span className="ciudad-tag">{usuario.address}</span>
                                </td>
                                <td>
                                    <button
                                        className="btn-editar"
                                        onClick={() => editarUsuario(usuario.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-eliminar"
                                        onClick={() => eliminarUsuario(usuario.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="paginacion">
                <button className="btn-paginacion" onClick={irAPaginaAnterior} disabled={paginaActual === 1}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M12.5 15L7.5 10L12.5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Anterior
                </button>

                <div className="paginacion-info">
                    <span className="pagina-actual">{paginaActual}</span>
                    <span className="separador">/</span>
                    <span className="total-paginas">{totalPaginas}</span>
                </div>

                <button className="btn-paginacion" onClick={irAPaginaSiguiente} disabled={paginaActual === totalPaginas}>
                    Siguiente
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M7.5 15L12.5 10L7.5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </>

    )
}

export default TablaUsuarios
