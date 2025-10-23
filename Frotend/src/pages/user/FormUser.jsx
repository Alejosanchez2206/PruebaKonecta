import { useState, useEffect } from "react";
import { rolService } from "../../service/rol";
import './index.css';

const FormUser = ({ onSubmit, onCancel, isEditing, user, updateUser }) => {
    const [roles, setRoles] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rol_id: "",
        company_id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).company_id : null
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            isEditing ? updateUser(form.id, form) : onSubmit(form);
        };
    };

    useEffect(() => {
        const fetchRoles = async () => {
            const data = await rolService.getAllRoles();
            setRoles(data);
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        if (isEditing && user) {
            setForm(user);
        } else {
            setForm({
                name: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                rol_id: "",
                company_id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).company_id : null
            });
        }
    }, [isEditing, user]);


    return (
        <form onSubmit={handleSubmit} className="form-user">
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Correo</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Rol</label>
                <select
                    name="rol_id"
                    value={form.rol_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un rol</option>
                    {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                            {rol.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-buttons">
                <button type="submit" className="btn-guardar">
                    Guardar
                </button>

            </div>
        </form>
    );
};

export default FormUser;
