import { useState } from "react";
import Maquina from "./Maquina";

// Datos iniciales de las máquinas
function obtenerMaquinas() {
  return [
    { 
      nombre: "Cinta de Correr", 
      tipo: "Cardio", 
      descripcion: "Perfecta para mejorar resistencia.", 
      img: "https://www.puregym.com/media/3f1pvvkp/treadmill.jpg"
    },
    { 
      nombre: "Bicicleta Estática", 
      tipo: "Cardio", 
      descripcion: "Excelente para piernas y cardio.", 
      img: "https://www.technogym.com/wpress/wp-content/uploads/2022/11/exercise-bike.jpg"
    },
    { 
      nombre: "Máquina de Pecho", 
      tipo: "Fuerza", 
      descripcion: "Ideal para fortalecer pectorales.", 
      img: "https://fitnessexpostore.com/cdn/shop/products/chestpress.jpg"
    }
  ];
}

// Función que genera componentes a partir de los datos
function renderMaquinas(lista) {
  return lista.map((m, index) => (
    <Maquina 
      key={index}
      nombre={m.nombre} 
      tipo={m.tipo} 
      descripcion={m.descripcion} 
      img={m.img} 
    />
  ));
}

function MaquinasList() {
  const [maquinas, setMaquinas] = useState(obtenerMaquinas());

  // Estado del formulario
  const [nuevaMaquina, setNuevaMaquina] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    img: ""
  });

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Manejo de cambios en el formulario
  function manejarCambio(e) {
    const { name, value } = e.target;
    setNuevaMaquina({ ...nuevaMaquina, [name]: value });
  }

  // Agregar nueva máquina
  function agregarMaquina(e) {
    e.preventDefault();
    if (!nuevaMaquina.nombre || !nuevaMaquina.tipo) {
      Swal.fire({
        title: "Error",
        text: "Por favor completa al menos nombre y tipo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setMaquinas([...maquinas, nuevaMaquina]);
    setNuevaMaquina({ nombre: "", tipo: "", descripcion: "", img: "" });
  }

  // Filtrar máquinas según búsqueda
  const maquinasFiltradas = maquinas.filter(m => 
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Nuestras Máquinas</h2>

      {/* Formulario para agregar */}
      <form className="mb-4" onSubmit={agregarMaquina}>
        <div className="row g-2">
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nombre" 
              name="nombre"
              value={nuevaMaquina.nombre}
              onChange={manejarCambio}
            />
          </div>
          <div className="col-md-2">
            <select 
              className="form-select"
              name="tipo"
              value={nuevaMaquina.tipo}
              onChange={manejarCambio}
            >
              <option value="">Tipo...</option>
              <option value="Cardio">Cardio</option>
              <option value="Fuerza">Fuerza</option>
            </select>
          </div>
          <div className="col-md-4">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Descripción" 
              name="descripcion"
              value={nuevaMaquina.descripcion}
              onChange={manejarCambio}
            />
          </div>
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="URL de imagen" 
              name="img"
              value={nuevaMaquina.img}
              onChange={manejarCambio}
            />
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-primary">Agregar</button>
          </div>
        </div>
      </form>

      {/* Input de búsqueda */}
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Buscar por nombre o tipo" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Renderizado de las máquinas filtradas */}
      <div className="d-flex flex-wrap">
        {renderMaquinas(maquinasFiltradas)}
      </div>
    </div>
  );
}

export default MaquinasList;
