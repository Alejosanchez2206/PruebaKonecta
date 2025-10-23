import { useState } from "react";
import "./tabla-ventas.css";

const TablaVentas = ({ dataventas, editarventas, eliminarventas }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const filasPorPagina = 8;

    // Datos paginados
    const indiceUltimaFila = paginaActual * filasPorPagina;
    const indicePrimeraFila = indiceUltimaFila - filasPorPagina;
    const ventasPaginadas = dataventas.slice(indicePrimeraFila, indiceUltimaFila);
    const totalPaginas = Math.ceil(dataventas.length / filasPorPagina);

    // Navegación de páginas
    const irAPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const irAPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    // Confirmación antes de eliminar
    const handleEliminar = (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta venta?")) {
            eliminarventas(id);
        }
    };

    const handleEditar = (id) => {
        editarventas(id);
    };

    return (
        <>
            <div className="tabla-content">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Cupo Solicitado</th>
                            <th>Franquicia</th>
                            <th>Tasa (%)</th>
                            <th>Fecha Creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasPaginadas.length > 0 ? (
                            ventasPaginadas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>
                                        <span className="id-badge">{venta.id}</span>
                                    </td>
                                    <td>{venta.producto}</td>
                                    <td>
                                        $ {typeof venta.cupo_solicitado === 'number' || !isNaN(Number(venta.cupo_solicitado))
                                            ? new Intl.NumberFormat('de-DE').format(Number(venta.cupo_solicitado))
                                            : venta.cupo_solicitado || '-'}
                                    </td>
                                    <td>{venta.franquicia || "-"}</td>
                                    <td>{venta.tasa || "-"}</td>
                                    <td>
                                        {new Date(venta.fecha_creacion).toLocaleString()}
                                    </td>
                                    <td>
                                        <button
                                            className="btn-editar"
                                            onClick={() => handleEditar(venta.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => handleEliminar(venta.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    No hay ventas registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINACIÓN */}
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button
                        className="btn-paginacion"
                        onClick={irAPaginaAnterior}
                        disabled={paginaActual === 1}
                    >
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

                    <button
                        className="btn-paginacion"
                        onClick={irAPaginaSiguiente}
                        disabled={paginaActual === totalPaginas}
                    >
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
            )}
        </>
    );
};

export default TablaVentas;
