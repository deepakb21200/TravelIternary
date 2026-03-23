// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const VehicleDetails = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const [formData, setFormData] = useState({
//     vehicleType: "",
//     modelName: "",
//     seatingCapacity: "",
//     acType: "",
//     notes: "",
//   });

//   useEffect(() => {
//     getVehicles();
//   }, []);

//   const getVehicles = async () => {
//     const { data, error } = await supabase
//       .from("vehicle_details")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log(error);
//       return;
//     }

//     setVehicles(data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.vehicleType ||
//       !formData.modelName ||
//       !formData.seatingCapacity ||
//       !formData.acType
//     ) {
//       alert("Required fields fill karo");
//       return;
//     }

//     if (editingIndex !== null) {
//       const vehicleId = vehicles[editingIndex].id;

//       const { error } = await supabase
//         .from("vehicle_details")
//         .update({
//           vehicle_type: formData.vehicleType,
//           model_name: formData.modelName,
//           seating_capacity: formData.seatingCapacity,
//           ac_type: formData.acType,
//           notes: formData.notes,
//         })
//         .eq("id", vehicleId);

//       if (error) {
//         console.log(error);
//         return;
//       }

//       alert("Vehicle updated successfully");
//     } else {
//       const { error } = await supabase.from("vehicle_details").insert([
//         {
//           vehicle_type: formData.vehicleType,
//           model_name: formData.modelName,
//           seating_capacity: formData.seatingCapacity,
//           ac_type: formData.acType,
//           notes: formData.notes,
//         },
//       ]);

//       if (error) {
//         console.log(error);
//         return;
//       }

//       alert("Vehicle added successfully");
//     }

//     getVehicles();
//     handleCancel();
//   };

//   const handleEdit = (index) => {
//     const vehicle = vehicles[index];

//     setFormData({
//       vehicleType: vehicle.vehicle_type,
//       modelName: vehicle.model_name,
//       seatingCapacity: vehicle.seating_capacity,
//       acType: vehicle.ac_type,
//       notes: vehicle.notes || "",
//     });

//     setEditingIndex(index);
//     setShowForm(true);
//   };

//   const handleDelete = async (index) => {
//     if (!window.confirm("Delete vehicle?")) return;

//     const vehicleId = vehicles[index].id;

//     const { error } = await supabase
//       .from("vehicle_details")
//       .delete()
//       .eq("id", vehicleId);

//     if (error) {
//       console.log(error);
//       return;
//     }

//     getVehicles();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingIndex(null);

//     setFormData({
//       vehicleType: "",
//       modelName: "",
//       seatingCapacity: "",
//       acType: "",
//       notes: "",
//     });
//   };

//   return (
//     <div className="bg-slate-50 p-8">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-200">

//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-slate-700">Vehicle Details</h2>

//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl"
//             >
//               Add Vehicle
//             </button>
//           )}
//         </div>

//         {vehicles.length === 0 ? (
//           <div className="text-center py-10 bg-slate-100 rounded-xl text-slate-500">
//             No Vehicles Added Yet
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {vehicles.map((vehicle, index) => (
//               <div
//                 key={vehicle.id}
//                 className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex justify-between items-center"
//               >
//                 <div>
//                   <h4 className="font-semibold text-lg text-slate-700">
//                     {vehicle.vehicle_type}
//                   </h4>
//                   <p className="text-slate-500">{vehicle.model_name}</p>
//                   <p className="text-sm text-slate-400">
//                     {vehicle.seating_capacity} Seats | {vehicle.ac_type}
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEdit(index)}
//                     className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-lg text-white"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {showForm && (
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
//             <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative">

//               <button
//                 onClick={handleCancel}
//                 className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl font-bold text-slate-700 mb-6">
//                 {editingIndex !== null ? "Edit Vehicle" : "Add Vehicle"}
//               </h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-6">

//                   <input
//                     type="text"
//                     name="vehicleType"
//                     value={formData.vehicleType}
//                     onChange={handleChange}
//                     placeholder="Vehicle Type"
//                     className="border border-slate-300 rounded-xl px-4 py-3"
//                   />

//                   <input
//                     type="text"
//                     name="modelName"
//                     value={formData.modelName}
//                     onChange={handleChange}
//                     placeholder="Model / Name"
//                     className="border border-slate-300 rounded-xl px-4 py-3"
//                   />

//                   <input
//                     type="number"
//                     name="seatingCapacity"
//                     value={formData.seatingCapacity}
//                     onChange={handleChange}
//                     placeholder="Seating Capacity"
//                     className="border border-slate-300 rounded-xl px-4 py-3"
//                   />

//                   <select
//                     name="acType"
//                     value={formData.acType}
//                     onChange={handleChange}
//                     className="border border-slate-300 rounded-xl px-4 py-3"
//                   >
//                     <option value="">Select AC Type</option>
//                     <option value="AC">AC</option>
//                     <option value="Non-AC">Non-AC</option>
//                   </select>

//                   <textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleChange}
//                     placeholder="Notes (Optional)"
//                     className="border border-slate-300 rounded-xl px-4 py-3 md:col-span-2"
//                     rows="4"
//                   ></textarea>

//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl"
//                 >
//                   {editingIndex !== null ? "Update Vehicle" : "Save Vehicle"}
//                 </button>
//               </form>

//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default VehicleDetails;
































import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const VehicleDetails = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    vehicleType: "",
    modelName: "",
    seatingCapacity: "",
    acType: "",
    notes: "",
  });

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const { data, error } = await supabase
      .from("vehicle_details")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setVehicles(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateVehicle = async () => {
    const { error } = await supabase
      .from("vehicle_details")
      .update({
        vehicle_type: formData.vehicleType,
        model_name: formData.modelName,
        seating_capacity: formData.seatingCapacity,
        ac_type: formData.acType,
        notes: formData.notes,
      })
      .eq("id", editingId);

    if (error) {
      console.log(error);
      return;
    }

    alert("Vehicle updated successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.vehicleType ||
      !formData.modelName ||
      !formData.seatingCapacity ||
      !formData.acType
    ) {
      alert("Required fields fill karo");
      return;
    }

    if (editingId) {
      await updateVehicle();
    } else {
      const { error } = await supabase.from("vehicle_details").insert([
        {
          vehicle_type: formData.vehicleType,
          model_name: formData.modelName,
          seating_capacity: formData.seatingCapacity,
          ac_type: formData.acType,
          notes: formData.notes,
        },
      ]);

      if (error) {
        console.log(error);
        return;
      }

      alert("Vehicle added successfully");
    }

    getVehicles();
    handleCancel();
  };

  const handleEdit = (vehicle) => {
    setFormData({
      vehicleType: vehicle.vehicle_type,
      modelName: vehicle.model_name,
      seatingCapacity: vehicle.seating_capacity,
      acType: vehicle.ac_type,
      notes: vehicle.notes || "",
    });

    setEditingId(vehicle.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete vehicle?")) return;

    const { error } = await supabase
      .from("vehicle_details")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    getVehicles();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);

    setFormData({
      vehicleType: "",
      modelName: "",
      seatingCapacity: "",
      acType: "",
      notes: "",
    });
  };

  return (
    <div className="bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-200">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">Vehicle Details</h2>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-xl"
            >
              Add Vehicle
            </button>
          )}
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-10 bg-slate-100 rounded-xl text-slate-500">
            No Vehicles Added Yet
          </div>
        ) : (
          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-lg text-slate-700">
                    {vehicle.vehicle_type}
                  </h4>
                  <p className="text-slate-500">{vehicle.model_name}</p>
                  <p className="text-sm text-slate-400">
                    {vehicle.seating_capacity} Seats | {vehicle.ac_type}
                  </p>
                  {vehicle.notes && (
                    <p className="text-sm text-slate-400 mt-1">
                      {vehicle.notes}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-lg text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative">

              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-slate-700 mb-6">
                {editingId ? "Edit Vehicle" : "Add Vehicle"}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    placeholder="Vehicle Type"
                    className="border border-slate-300 rounded-xl px-4 py-3"
                  />

                  <input
                    type="text"
                    name="modelName"
                    value={formData.modelName}
                    onChange={handleChange}
                    placeholder="Model / Name"
                    className="border border-slate-300 rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                    placeholder="Seating Capacity"
                    className="border border-slate-300 rounded-xl px-4 py-3"
                  />

                  <select
                    name="acType"
                    value={formData.acType}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl px-4 py-3"
                  >
                    <option value="">Select AC Type</option>
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notes (Optional)"
                    rows="4"
                    className="border border-slate-300 rounded-xl px-4 py-3 md:col-span-2"
                  ></textarea>

                </div>

                <button
                  type="submit"
                  className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl"
                >
                  {editingId ? "Update Vehicle" : "Save Vehicle"}
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VehicleDetails;