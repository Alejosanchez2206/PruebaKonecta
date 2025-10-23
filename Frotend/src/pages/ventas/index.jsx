import Header from "../../component/header";
import { useState, useEffect } from "react";
import { Modal } from "../../component/Modal";
import './index.css';
import TablaVentas from "./tabletVentas";
import Formventas from "./FormVentas";
import { ventaService } from "../../service/ventas";



export default function Ventas() {
    const [showModal, setShowModal] = useState(false);
    const [selectedventas, setSelecteVentas] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [dataventas, setDataventas] = useState([]);


    const editarventas = (id) => {
        setIsEditing(true);
        const ventas = dataventas.find((ventas) => ventas.id === id);
        setSelecteVentas(ventas);
        setShowModal(true);
    }

    const cerraModal = () => {
        setIsEditing(false);
        setSelecteVentas(null);
        setShowModal(false);
    }

    const eliminarventas = async (id) => {
      const response = await ventaService.deleteVentas(id);
        if (response.success) {
            fetchventas();
        } else {
            alert(response.message);
        }
    }

    const handleSaveChanges = async (data) => {
        const response = await ventaService.createVentas(data);
        if (response.success) {
            setShowModal(false);
            fetchventas();
        } else {

            alert(response.message);
        };
    }

    const updateventas = async (id, data) => {
       const response = await ventaService.updateVentas(id, data);
        if (response.success) {
            cerraModal()
            fetchventas();
        } else {
            alert(response.message);
        }
    }

    const fetchventas = async () => {
        const data = await ventaService.getsVentas();
        if (data.success === false) return alert(data.message)
        setDataventas(data.data);
    };

    useEffect(() => {
        fetchventas();
    }, []);




    return (
        <div className="ventas-page">
            <Modal
                isOpen={showModal}
                onClose={cerraModal}
                title="Nueva Venta"
            >
                <Formventas
                    onSubmit={(data) => handleSaveChanges(data)}
                    isEditing={isEditing}
                    ventas={selectedventas}
                    updateVenta={(id, data) => updateventas(id, data)}
                />
            </Modal>
            <Header
                icon="bi-bag"
                title="Ventas"
                actionsNew={() => setShowModal(true)}
            />
            <div className="container-ventas">
                <TablaVentas
                    dataventas={dataventas}
                    editarventas={(id) => editarventas(id)}
                    eliminarventas={(id) => eliminarventas(id)}
                />
            </div>
        </div>
    );
}