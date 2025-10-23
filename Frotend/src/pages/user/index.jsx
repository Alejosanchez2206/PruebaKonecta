import Header from "../../component/header";
import TablaUsuarios from "./tabletUser";
import { useState, useEffect } from "react";
import { userService } from "../../service/user";
import FormUser from "./FormUser";
import { Modal } from "../../component/Modal";
import './index.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);



    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const company = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).company_id : null;
        if (!company) return;
        const data = await userService.getAllUsers(company);
        setUsers(data);
    };

    const handleSaveChanges = async (data) => {
        const response = await userService.createUser(data);
        if (response.success) {
            setShowModal(false);
            fetchUsers();
        } else {
            alert(response.message);
        };
    }

    const eliminarUser = async (id) => {
        const response = await userService.deleteUser(id);
        if (response.success) {
            fetchUsers();
        } else {
            alert(response.message);
        }
    }

    const updateUser = async (id, data) => {
        const response = await userService.updateUser(id, data);
        if (response.success) {
            cerraModal()
            fetchUsers();
        } else {
            alert(response.message);
        }
    }

    const editarUser = (id) => {
        setIsEditing(true);
        const user = users.find((user) => user.id === id);
        setSelectedUser(user);
        setShowModal(true);
    }

    const cerraModal = () => {
        setIsEditing(false);
        setSelectedUser(null);
        setShowModal(false);
    }



    return (
        <div className="user-page">
            <Modal
                isOpen={showModal}
                onClose={cerraModal}
                title="Nuevo Usuario"
            >
                <FormUser
                    onSubmit={(data) => handleSaveChanges(data)}
                    isEditing={isEditing}
                    user={selectedUser}
                    updateUser={(id, data) => updateUser(id, data)}
                />
            </Modal>
            <Header
                icon="bi-person"
                title="Usuarios"
                actionsNew={() => setShowModal(true)}
            />
            <div className="container-user">
                <TablaUsuarios
                    dataUser={users}
                    editarUser={(id) => editarUser(id)}
                    eliminarUser={(id) => eliminarUser(id)}
                />
            </div>
        </div>
    );
};

export default UserPage;