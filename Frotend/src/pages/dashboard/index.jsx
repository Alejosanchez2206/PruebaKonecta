import HeaderSimple from "../../component/header/HeaderSimple";
import "./index.css";
import { ventaService } from "../../service/ventas";
import { useEffect, useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Award } from "lucide-react";

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export default function DashboardPage() {
  const [ventas, setVentas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const data = await ventaService.informeDassboard();
      setVentas(data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseFloat(value));

  const formatNumber = (value) => new Intl.NumberFormat("es-CO").format(value);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (!ventas?.success) {
    return (
      <div className="dashboard-error">
        <p>Error al cargar los datos</p>
      </div>
    );
  }

  const { data, periodo } = ventas;
  const { resumenGeneral, ventasPorAsesor, cuposPorProducto } = data;

  const asesorChartData = ventasPorAsesor.map(a => ({
    nombre: a.asesor_nombre,
    ventas: a.total_ventas,
    cupos: parseFloat(a.total_cupos),
  }));

  const productoChartData = cuposPorProducto.map(p => ({
    name: p.producto,
    value: parseFloat(p.total_cupos),
  }));

  return (
    <div className="dashboard-page">
      <HeaderSimple icon="bi-app" title="Dashboard" />
      <div className="container-dashboard">      

        {/* Tarjetas resumen */}
        <div className="dashboard-cards">
          <div className="card card-indigo">
            <div className="card-icon"><ShoppingCart /></div>
            <p className="card-label">Total Ventas</p>
            <p className="card-value">{formatNumber(resumenGeneral.total_ventas)}</p>
          </div>
          <div className="card card-green">
            <div className="card-icon"><DollarSign /></div>
            <p className="card-label">Total Cupos</p>
            <p className="card-value">{formatCurrency(resumenGeneral.total_cupos)}</p>
          </div>
          <div className="card card-purple">
            <div className="card-icon"><Award /></div>
            <p className="card-label">Promedio Cupo</p>
            <p className="card-value">{formatCurrency(resumenGeneral.promedio_cupo)}</p>
          </div>
          <div className="card card-amber">
            <div className="card-icon"><TrendingUp /></div>
            <p className="card-label">Cupo Máximo</p>
            <p className="card-value">{formatCurrency(resumenGeneral.cupo_maximo)}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="dashboard-charts">
          <div className="chart-box">
            <h2>Ventas por Asesor</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={asesorChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h2>Distribución por Producto</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={productoChartData} dataKey="value" outerRadius={100} label>
                  {productoChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tablas */}
        <div className="dashboard-tables">
          <div className="table-box">
            <h2>Ranking de Asesores</h2>
            {ventasPorAsesor.map((a, i) => (
              <div key={a.asesor_id} className="table-row">
                <div className="table-rank">{i + 1}</div>
                <div className="table-info">
                  <p className="name">{a.asesor_nombre}</p>
                  <p className="detail">{a.total_ventas} ventas</p>
                </div>
                <div className="table-value">{formatCurrency(a.total_cupos)}</div>
              </div>
            ))}
          </div>

          <div className="table-box">
            <h2>Detalle de Productos</h2>
            {cuposPorProducto.map((p, i) => (
              <div key={i} className="table-row">
                <div className="table-info">
                  <p className="name">{p.producto}</p>
                  <p className="detail">{p.cantidad_ventas} ventas</p>
                </div>
                <div className="table-value">{formatCurrency(p.total_cupos)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
