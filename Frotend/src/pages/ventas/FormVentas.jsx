import { useState, useEffect } from "react";
import './index.css';

const FormVenta = ({ onSubmit, onCancel, isEditing, ventas, updateVenta }) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [form, setForm] = useState({
        producto: "",
        cupo_solicitado: "",
        franquicia: "",
        tasa: "",
        usuario_crea: user.id || null,
        usuario_actualiza: user.id || null,
        company_id: user.company_id || null,
    });

    const productos = [
        "Credito de Consumo",
        "Libranza Libre Inversión",
        "Tarjeta de Credito",
    ];

    const franquicias = ["AMEX", "VISA", "MASTERCARD"];

    useEffect(() => {
        if (isEditing && ventas) {
            setForm({
                ...ventas,
                usuario_actualiza: user.id || ventas.usuario_actualiza,
            });
        } else {
            setForm({
                producto: "",
                cupo_solicitado: "",
                franquicia: "",
                tasa: "",
                usuario_crea: user.id || null,
                usuario_actualiza: user.id || null,
                company_id: user.company_id || null,
            });
        }
    }, [isEditing, ventas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones dinámicas
        if (form.producto === "Tarjeta de Credito" && !form.franquicia) {
            alert("Debe seleccionar una franquicia para tarjetas de crédito");
            return;
        }

        if (
            (form.producto === "Credito de Consumo" ||
                form.producto === "Libranza Libre Inversión") &&
            !form.tasa
        ) {
            alert("Debe indicar una tasa para créditos de consumo o libranzas");
            return;
        }

        if (isEditing) {
            updateVenta(form.id, form);
        } else {
            onSubmit(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-user">
            <div className="form-group">
                <label>Producto</label>
                <select
                    name="producto"
                    value={form.producto}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un producto</option>
                    {productos.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Cupo Solicitado</label>
                <input
                    type="text"
                    name="cupo_solicitado"
                    value={form.cupo_solicitado}
                    onChange={handleChange}
                    placeholder="Ej: 1.000.000"
                    required
                />
            </div>

            {form.producto === "Tarjeta de Credito" && (
                <div className="form-group">
                    <label>Franquicia</label>
                    <select
                        name="franquicia"
                        value={form.franquicia}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una franquicia</option>
                        {franquicias.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {(form.producto === "Credito de Consumo" ||
                form.producto === "Libranza Libre Inversión") && (
                    <div className="form-group">
                        <label>Tasa (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="tasa"
                            value={form.tasa}
                            onChange={handleChange}
                            placeholder="Ej: 10.58"
                            required
                        />
                    </div>
                )}

            <div className="form-buttons">
                <button type="submit" className="btn-guardar">
                    {isEditing ? "Actualizar" : "Guardar"}
                </button>
            </div>
        </form>
    );
};

export default FormVenta;
