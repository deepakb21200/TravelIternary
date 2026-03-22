


// import React, { useState } from "react";

// const HotelDetails = () => {
//   const [hotels, setHotels] = useState([]);
//   const [showForm, setShowForm] = useState(false);


//   const [mealOptions, setMealOptions] = useState([
//   { id: crypto.randomUUID(), name: "Breakfast", isDefault: true },
//   { id: crypto.randomUUID(), name: "Lunch", isDefault: true },
//   { id: crypto.randomUUID(), name: "Dinner", isDefault: true },
//   { id: crypto.randomUUID(), name: "MAP", isDefault: true },
//   { id: crypto.randomUUID(), name: "CP", isDefault: true },
// ]);



//   const [roomOptions, setRoomOptions] = useState([
//   { id: crypto.randomUUID(), name: "Deluxe Room", isDefault: true },
//   { id: crypto.randomUUID(), name: "Super Deluxe", isDefault: true },
//   { id: crypto.randomUUID(), name: "Suite", isDefault: true },
//   { id: crypto.randomUUID(), name: "Family Room", isDefault: true },
//   { id: crypto.randomUUID(), name: "Standard Room", isDefault: true },
// ]);

//   const [customMeal, setCustomMeal] = useState("");
//   const [customRoom, setCustomRoom] = useState("");

//   const [formData, setFormData] = useState({
//     hotelName: "",
//     state: "",
//     city: "",
//     starRating: "3",
//     mealPlans: [],
//     roomTypes: [],
//     hotelImage: null,
//     similarOptions: "",
//   });

//   const toggleSelection = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].includes(value)
//         ? prev[field].filter((item) => item !== value)
//         : [...prev[field], value],
//     }));
//   };


//   const addCustomMeal = () => {
//   if (customMeal.trim()) {
//     setMealOptions([
//       ...mealOptions,
//       {
//         id: crypto.randomUUID(),
//         name: customMeal,
//         isDefault: false,
//       },
//     ]);
//     setCustomMeal("");
//   }
// };

//   const addCustomRoom = () => {
//     if (customRoom.trim() && !roomOptions.includes(customRoom)) {
//       setRoomOptions([...roomOptions, customRoom]);
//       setCustomRoom("");
//     }
//   };



//   const removeCustomMeal = (id) => {
//   setMealOptions(mealOptions.filter((item) => item.id !== id));
// };

//   const removeCustomRoom = (id) => {
//   setRoomOptions(roomOptions.filter((item) => item.id !== id));
// };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setHotels([...hotels, formData]);
//     setShowForm(false);
//   };

//   return (
//     <div className="bg-slate-50 p-8 min-h-screen">
//   <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-200">

//     <div className="flex justify-between items-center mb-8">
//       <h2 className="text-3xl font-bold text-slate-700">Hotel Details</h2>

//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl"
//         >
//           Add Hotel
//         </button>
//       )}
//     </div>

//     {showForm && (
//       <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl relative">

//           {/* Cross */}
//           <button
//             onClick={() => setShowForm(false)}
//             className="absolute top-4 right-4 text-xl text-slate-400 hover:text-red-500"
//           >
//             ✕
//           </button>

//           <form onSubmit={handleSubmit}>
//             <div className="grid md:grid-cols-2 gap-6">

//               <input
//                 type="text"
//                 name="hotelName"
//                 value={formData.hotelName}
//                 onChange={handleChange}
//                 placeholder="Hotel Name"
//                 className="border border-slate-300 rounded-xl px-4 py-3"
//               />

//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 placeholder="State"
//                 className="border border-slate-300 rounded-xl px-4 py-3"
//               />

//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="City"
//                 className="border border-slate-300 rounded-xl px-4 py-3"
//               />

//               <select
//                 name="starRating"
//                 value={formData.starRating}
//                 onChange={handleChange}
//                 className="border border-slate-300 rounded-xl px-4 py-3"
//               >
//                 <option value="3">3 Star</option>
//                 <option value="4">4 Star</option>
//                 <option value="5">5 Star</option>
//               </select>

//             </div>

//             {/* Meal Plans */}
//             <div className="mt-6">
//               <h4 className="font-semibold text-slate-700 mb-1">Meal Plans</h4>
//               <p className="text-sm text-slate-500 mb-3">
//                 Default meal plans available. Click to select or deselect.
//               </p>

//               <div className="flex flex-wrap gap-3 mb-4">
//                 {mealOptions.map((meal) => (
//                   <div key={meal.id} className="flex items-center gap-1">
//                     <button
//                       type="button"
//                       onClick={() => toggleSelection("mealPlans", meal.name)}
//                       className={`px-4 py-2 rounded-lg ${
//                         formData.mealPlans.includes(meal.name)
//                           ? "bg-rose-400 text-white"
//                           : "bg-rose-100 text-rose-700"
//                       }`}
//                     >
//                       {meal.name}
//                     </button>

//                     {!meal.isDefault && (
//                       <button
//                         type="button"
//                         onClick={() => removeCustomMeal(meal.id)}
//                         className="text-red-500 text-sm"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 <input
//                   value={customMeal}
//                   onChange={(e) => setCustomMeal(e.target.value)}
//                   placeholder="Custom Meal Plan"
//                   className="border border-slate-300 rounded-xl px-4 py-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={addCustomMeal}
//                   className="bg-rose-400 text-white px-4 rounded-xl"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {/* Room Types */}
//             <div className="mt-6">
//               <h4 className="font-semibold text-slate-700 mb-1">Room Types</h4>
//               <p className="text-sm text-slate-500 mb-3">
//                 Default room types available. Click to select or deselect.
//               </p>

//               <div className="flex flex-wrap gap-3 mb-4">
//                 {roomOptions.map((room) => (
//                   <div key={room.id} className="flex items-center gap-1">
//                     <button
//                       type="button"
//                       onClick={() => toggleSelection("roomTypes", room.name)}
//                       className={`px-4 py-2 rounded-lg ${
//                         formData.roomTypes.includes(room.name)
//                           ? "bg-amber-400 text-white"
//                           : "bg-amber-100 text-amber-700"
//                       }`}
//                     >
//                       {room.name}
//                     </button>

//                     {!room.isDefault && (
//                       <button
//                         type="button"
//                         onClick={() => removeCustomRoom(room.id)}
//                         className="text-red-500 text-sm"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 <input
//                   value={customRoom}
//                   onChange={(e) => setCustomRoom(e.target.value)}
//                   placeholder="Custom Room Type"
//                   className="border border-slate-300 rounded-xl px-4 py-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={addCustomRoom}
//                   className="bg-amber-400 text-white px-4 rounded-xl"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6">
//               <input
//                 type="file"
//                 name="hotelImage"
//                 onChange={handleChange}
//                 className="border border-slate-300 rounded-xl px-4 py-3 w-full"
//               />
//             </div>

//             <div className="mt-6">
//               <input
//                 type="text"
//                 name="similarOptions"
//                 value={formData.similarOptions}
//                 onChange={handleChange}
//                 placeholder="Similar Options"
//                 className="border border-slate-300 rounded-xl px-4 py-3 w-full"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-8 bg-indigo-400 text-white px-6 py-3 rounded-xl"
//             >
//               Save Hotel
//             </button>

//           </form>
//         </div>
//       </div>
//     )}
//   </div>
// </div>
//   );
// };

// export default HotelDetails;











// import React, { useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { supabase } from "../../supabaseClient";


// const defaultMealOptions = [
//   { id: crypto.randomUUID(), name: "Breakfast", isDefault: true },
//   { id: crypto.randomUUID(), name: "Lunch", isDefault: true },
//   { id: crypto.randomUUID(), name: "Dinner", isDefault: true },
//   { id: crypto.randomUUID(), name: "MAP", isDefault: true },
//   { id: crypto.randomUUID(), name: "CP", isDefault: true },
// ];

// const defaultRoomOptions = [
//   { id: crypto.randomUUID(), name: "Deluxe Room", isDefault: true },
//   { id: crypto.randomUUID(), name: "Super Deluxe", isDefault: true },
//   { id: crypto.randomUUID(), name: "Suite", isDefault: true },
//   { id: crypto.randomUUID(), name: "Family Room", isDefault: true },
//   { id: crypto.randomUUID(), name: "Standard Room", isDefault: true },
// ];

// const emptyForm = {
//   hotelName: "",
//   state: "",
//   city: "",
//   starRating: "3",
//   mealPlans: [],
//   roomTypes: [],
//   hotelImage: null,       // File object (only during upload)
//   hotelImageUrl: "",      // Supabase public URL (after upload)
//   similarOptions: "",
// };

// const HotelDetails = () => {
//   const [hotels, setHotels] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const [mealOptions, setMealOptions] = useState(defaultMealOptions);
//   const [roomOptions, setRoomOptions] = useState(defaultRoomOptions);
//   const [customMeal, setCustomMeal] = useState("");
//   const [customRoom, setCustomRoom] = useState("");

//   const [formData, setFormData] = useState(emptyForm);

//   // ─── Helpers ────────────────────────────────────────────────────────────────

//   const resetForm = () => {
//     setFormData(emptyForm);
//     setEditingIndex(null);
//     // Custom options ko reset karo (sirf defaults rakhein)
//     setMealOptions(defaultMealOptions);
//     setRoomOptions(defaultRoomOptions);
//     setCustomMeal("");
//     setCustomRoom("");
//   };

//   const openAdd = () => {
//     resetForm();
//     setShowForm(true);
//   };

//   const openEdit = (index) => {
//     const hotel = hotels[index];
//     setFormData({ ...hotel, hotelImage: null }); // file object dobara nahi rakhte
//     setEditingIndex(index);
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     resetForm();
//     setShowForm(false);
//   };

//   // ─── Field change ────────────────────────────────────────────────────────────

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData((prev) => ({ ...prev, hotelImage: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // ─── Toggle meal / room ──────────────────────────────────────────────────────

//   const toggleSelection = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].includes(value)
//         ? prev[field].filter((item) => item !== value)
//         : [...prev[field], value],
//     }));
//   };

//   // ─── Custom add ─────────────────────────────────────────────────────────────

//   const addCustomMeal = () => {
//     const trimmed = customMeal.trim();
//     if (!trimmed) return;
//     const alreadyExists = mealOptions.some(
//       (m) => m.name.toLowerCase() === trimmed.toLowerCase()
//     );
//     if (alreadyExists) return;
//     setMealOptions((prev) => [
//       ...prev,
//       { id: crypto.randomUUID(), name: trimmed, isDefault: false },
//     ]);
//     setCustomMeal("");
//   };

//   const addCustomRoom = () => {
//     const trimmed = customRoom.trim();
//     if (!trimmed) return;
//     const alreadyExists = roomOptions.some(
//       (r) => r.name.toLowerCase() === trimmed.toLowerCase()
//     );
//     if (alreadyExists) return;
//     setRoomOptions((prev) => [
//       ...prev,
//       { id: crypto.randomUUID(), name: trimmed, isDefault: false },
//     ]);
//     setCustomRoom("");
//   };

//   // ─── Custom remove ───────────────────────────────────────────────────────────

//   const removeCustomMeal = (id) => {
//     const meal = mealOptions.find((m) => m.id === id);
//     if (meal) {
//       setFormData((prev) => ({
//         ...prev,
//         mealPlans: prev.mealPlans.filter((name) => name !== meal.name),
//       }));
//     }
//     setMealOptions((prev) => prev.filter((m) => m.id !== id));
//   };

//   const removeCustomRoom = (id) => {
//     const room = roomOptions.find((r) => r.id === id);
//     if (room) {
//       setFormData((prev) => ({
//         ...prev,
//         roomTypes: prev.roomTypes.filter((name) => name !== room.name),
//       }));
//     }
//     setRoomOptions((prev) => prev.filter((r) => r.id !== id));
//   };

//   // ─── Supabase image upload ───────────────────────────────────────────────────

//   const uploadImage = async (file) => {
//     const ext = file.name.split(".").pop();
//     const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

//     const { error } = await supabase.storage
//       .from("hotel-images")
//       .upload(fileName, file, { cacheControl: "3600", upsert: false });

//     if (error) throw error;

//     const { data } = supabase.storage
//       .from("hotel-images")
//       .getPublicUrl(fileName);

//     return data.publicUrl;
//   };

//   // ─── Submit (Create + Update) ────────────────────────────────────────────────

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     try {
//       let imageUrl = formData.hotelImageUrl; // existing URL on edit

//       if (formData.hotelImage) {
//         imageUrl = await uploadImage(formData.hotelImage);
//       }

//       const hotelData = {
//         ...formData,
//         hotelImage: null,     // file object store nahi karte
//         hotelImageUrl: imageUrl,
//       };

//       if (editingIndex !== null) {
//         // ── UPDATE ──
//         setHotels((prev) => {
//           const updated = [...prev];
//           updated[editingIndex] = hotelData;
//           return updated;
//         });
//       } else {
//         // ── CREATE ──
//         setHotels((prev) => [...prev, hotelData]);
//       }

//       closeForm();
//     } catch (err) {
//       alert("Image upload failed: " + err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ─── Delete ──────────────────────────────────────────────────────────────────

//   const handleDelete = (index) => {
//     if (!window.confirm("Kya aap is hotel ko delete karna chahte hain?")) return;
//     setHotels((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ─── Render ──────────────────────────────────────────────────────────────────

//   return (
//     <div className="bg-slate-50 p-8 ">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-slate-700">Hotel Details</h2>
//           <button
//             onClick={openAdd}
//             className="bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl"
//           >
//             + Add Hotel
//           </button>
//         </div>

//         {/* ── Hotel List (READ) ── */}
//         <div className="space-y-4">
//           {hotels.length === 0 ? (
//             <div className="text-center py-10 bg-slate-100 rounded-xl text-slate-500">
//               Abhi koi hotel nahi hai. "Add Hotel" se shuru karein.
//             </div>
//           ) : (
//             hotels.map((hotel, index) => (
//               <div
//                 key={index}
//                 className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex justify-between items-center gap-4"
//               >
//                 {/* Image thumbnail */}
//                 {hotel.hotelImageUrl && (
//                   <img
//                     src={hotel.hotelImageUrl}
//                     alt={hotel.hotelName}
//                     className="w-20 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
//                   />
//                 )}

//                 {/* Info */}
//                 <div className="flex-1">
//                   <h4 className="font-semibold text-lg text-slate-700">
//                     {hotel.hotelName}{" "}
//                     <span className="text-sm text-amber-500">
//                       {"★".repeat(Number(hotel.starRating))}
//                     </span>
//                   </h4>
//                   <p className="text-slate-500 text-sm">
//                     {hotel.city}, {hotel.state}
//                   </p>
//                   {hotel.mealPlans.length > 0 && (
//                     <p className="text-xs text-slate-400 mt-1">
//                       Meals: {hotel.mealPlans.join(", ")}
//                     </p>
//                   )}
//                   {hotel.roomTypes.length > 0 && (
//                     <p className="text-xs text-slate-400">
//                       Rooms: {hotel.roomTypes.join(", ")}
//                     </p>
//                   )}
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3 flex-shrink-0">
//                   <button
//                     onClick={() => openEdit(index)}
//                     className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-lg text-white text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ── Modal Form (CREATE / UPDATE) ── */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">

//               {/* Close */}
//               <button
//                 onClick={closeForm}
//                 className="absolute top-4 right-4 text-xl text-slate-400 hover:text-red-500"
//               >
//                 ✕
//               </button>

//               <h3 className="text-xl font-bold text-slate-700 mb-6">
//                 {editingIndex !== null ? "Hotel Edit Karein" : "Naya Hotel Jodhein"}
//               </h3>

//               <form onSubmit={handleSubmit}>

//                 {/* Basic Fields */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     name="hotelName"
//                     value={formData.hotelName}
//                     onChange={handleChange}
//                     placeholder="Hotel Name *"
//                     required
//                     className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                   />
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                   />
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                   />
//                   <select
//                     name="starRating"
//                     value={formData.starRating}
//                     onChange={handleChange}
//                     className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                   >
//                     <option value="3">3 Star</option>
//                     <option value="4">4 Star</option>
//                     <option value="5">5 Star</option>
//                   </select>
//                 </div>

//                 {/* Meal Plans */}
//                 <div className="mt-6">
//                   <h4 className="font-semibold text-slate-700 mb-1">Meal Plans</h4>

//                   <div className="flex flex-wrap gap-3 mb-4">
//                     {mealOptions.map((meal) => (
//                       <div key={meal.id} className="flex items-center gap-1">
//                         <button
//                           type="button"
//                           onClick={() => toggleSelection("mealPlans", meal.name)}
//                           className={`px-4 py-2 rounded-lg transition-colors ${
//                             formData.mealPlans.includes(meal.name)
//                               ? "bg-rose-400 text-white"
//                               : "bg-rose-100 text-rose-700"
//                           }`}
//                         >
//                           {meal.name}
//                         </button>
//                         {!meal.isDefault && (
//                           <button
//                             type="button"
//                             onClick={() => removeCustomMeal(meal.id)}
//                             className="text-red-400 hover:text-red-600 text-sm font-bold"
//                           >
//                             ✕
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex gap-3">
//                     <input
//                       value={customMeal}
//                       onChange={(e) => setCustomMeal(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomMeal())}
//                       placeholder="Custom Meal Plan"
//                       className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={addCustomMeal}
//                       className="bg-rose-400 hover:bg-rose-500 text-white px-4 rounded-xl"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>

//                 {/* Room Types */}
//                 <div className="mt-6">
//                   <h4 className="font-semibold text-slate-700 mb-1">Room Types</h4>

//                   <div className="flex flex-wrap gap-3 mb-4">
//                     {roomOptions.map((room) => (
//                       <div key={room.id} className="flex items-center gap-1">
//                         <button
//                           type="button"
//                           onClick={() => toggleSelection("roomTypes", room.name)}
//                           className={`px-4 py-2 rounded-lg transition-colors ${
//                             formData.roomTypes.includes(room.name)
//                               ? "bg-amber-400 text-white"
//                               : "bg-amber-100 text-amber-700"
//                           }`}
//                         >
//                           {room.name}
//                         </button>
//                         {!room.isDefault && (
//                           <button
//                             type="button"
//                             onClick={() => removeCustomRoom(room.id)}
//                             className="text-red-400 hover:text-red-600 text-sm font-bold"
//                           >
//                             ✕
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex gap-3">
//                     <input
//                       value={customRoom}
//                       onChange={(e) => setCustomRoom(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRoom())}
//                       placeholder="Custom Room Type"
//                       className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={addCustomRoom}
//                       className="bg-amber-400 hover:bg-amber-500 text-white px-4 rounded-xl"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="mt-6">
//                   <h4 className="font-semibold text-slate-700 mb-2">Hotel Image</h4>

//                   {/* Existing image preview on edit */}
//                   {formData.hotelImageUrl && !formData.hotelImage && (
//                     <div className="mb-3">
//                       <p className="text-xs text-slate-400 mb-1">Current Image:</p>
//                       <img
//                         src={formData.hotelImageUrl}
//                         alt="Current"
//                         className="w-32 h-24 object-cover rounded-lg border border-slate-200"
//                       />
//                     </div>
//                   )}

//                   <input
//                     type="file"
//                     name="hotelImage"
//                     accept="image/*"
//                     onChange={handleChange}
//                     className="border border-slate-300 rounded-xl px-4 py-3 w-full"
//                   />
//                   <p className="text-xs text-slate-400 mt-1">
//                     {editingIndex !== null
//                       && "Nai image choose karo tabhi replace hogi, warna purani rahegi."
//                       }
//                   </p>
//                 </div>

//                 {/* Similar Options */}
//                 <div className="mt-6">
//                   <input
//                     type="text"
//                     name="similarOptions"
//                     value={formData.similarOptions}
//                     onChange={handleChange}
//                     placeholder="Similar Options (optional)"
//                     className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                   />
//                 </div>

//                 {/* Submit */}
//                 <div className="flex gap-4 mt-8">
//                   <button
//                     type="submit"
//                     disabled={uploading}
//                     className="bg-indigo-400 hover:bg-indigo-500 disabled:opacity-60 text-white px-6 py-3 rounded-xl"
//                   >
//                     {uploading
//                       ? "Upload ho raha hai..."
//                       : editingIndex !== null
//                       ? "Update Hotel"
//                       : "Save Hotel"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={closeForm}
//                     className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl text-slate-600"
//                   >
//                     Cancel
//                   </button>
//                 </div>

//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default HotelDetails;
































import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const defaultMealOptions = [
  { id: crypto.randomUUID(), name: "Breakfast", isDefault: true },
  { id: crypto.randomUUID(), name: "Lunch", isDefault: true },
  { id: crypto.randomUUID(), name: "Dinner", isDefault: true },
  { id: crypto.randomUUID(), name: "MAP", isDefault: true },
  { id: crypto.randomUUID(), name: "CP", isDefault: true },
];

const defaultRoomOptions = [
  { id: crypto.randomUUID(), name: "Deluxe Room", isDefault: true },
  { id: crypto.randomUUID(), name: "Super Deluxe", isDefault: true },
  { id: crypto.randomUUID(), name: "Suite", isDefault: true },
  { id: crypto.randomUUID(), name: "Family Room", isDefault: true },
  { id: crypto.randomUUID(), name: "Standard Room", isDefault: true },
];

const emptyForm = {
  hotelName: "",
  state: "",
  city: "",
  starRating: "3",
  mealPlans: [],
  roomTypes: [],
  hotelImage: null,
  hotelImageUrl: "",
  similarOptions: "",
};

const HotelDetails = () => {
  const [hotels, setHotels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // Supabase row id
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [mealOptions, setMealOptions] = useState(defaultMealOptions);
  const [roomOptions, setRoomOptions] = useState(defaultRoomOptions);
  const [customMeal, setCustomMeal] = useState("");
  const [customRoom, setCustomRoom] = useState("");

  const [formData, setFormData] = useState(emptyForm);

  // ─── Fetch on load ────────────────────────────────────────────────────────────

  useEffect(() => {
    getHotels();
  }, []);

  const getHotels = async () => {
    const { data, error } = await supabase
      .from("hotel_details")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      return;
    }
    setHotels(data);
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────────

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setMealOptions(defaultMealOptions);
    setRoomOptions(defaultRoomOptions);
    setCustomMeal("");
    setCustomRoom("");
    setImagePreview(""); // ← yeh add karo
  };

  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (hotel) => {
    console.log("image url:", hotel.hotel_image_url); // 
    setImagePreview(hotel.hotel_image_url || ""); // ← yeh add karo
    setFormData({
      hotelName: hotel.hotel_name,
      state: hotel.state,
      city: hotel.city,
      starRating: hotel.star_rating,
      mealPlans: hotel.meal_plans || [],
      roomTypes: hotel.room_types || [],
      hotelImage: null,
      hotelImageUrl: hotel.hotel_image_url || "",
      similarOptions: hotel.similar_options || "",
    });
    setEditingId(hotel.id);
    setShowForm(true);
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  // ─── Field change ─────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, hotelImage: files[0] }));
      setImagePreview(URL.createObjectURL(files[0])); // ← yeh add karo
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ─── Toggle meal / room ───────────────────────────────────────────────────────

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  // ─── Custom add ───────────────────────────────────────────────────────────────

  const addCustomMeal = () => {
    const trimmed = customMeal.trim();
    if (!trimmed) return;
    const alreadyExists = mealOptions.some(
      (m) => m.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return;
    setMealOptions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, isDefault: false },
    ]);
    setCustomMeal("");
  };

  const addCustomRoom = () => {
    const trimmed = customRoom.trim();
    if (!trimmed) return;
    const alreadyExists = roomOptions.some(
      (r) => r.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return;
    setRoomOptions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, isDefault: false },
    ]);
    setCustomRoom("");
  };

  // ─── Custom remove ────────────────────────────────────────────────────────────

  const removeCustomMeal = (id) => {
    const meal = mealOptions.find((m) => m.id === id);
    if (meal) {
      setFormData((prev) => ({
        ...prev,
        mealPlans: prev.mealPlans.filter((name) => name !== meal.name),
      }));
    }
    setMealOptions((prev) => prev.filter((m) => m.id !== id));
  };

  const removeCustomRoom = (id) => {
    const room = roomOptions.find((r) => r.id === id);
    if (room) {
      setFormData((prev) => ({
        ...prev,
        roomTypes: prev.roomTypes.filter((name) => name !== room.name),
      }));
    }
    setRoomOptions((prev) => prev.filter((r) => r.id !== id));
  };

  // ─── Supabase image upload ────────────────────────────────────────────────────

  const uploadImage = async (file) => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("hotel-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) throw error;

    const { data } = supabase.storage
      .from("hotel-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ─── CREATE ───────────────────────────────────────────────────────────────────

  const createHotel = async (imageUrl) => {
    const { error } = await supabase.from("hotel_details").insert([
      {
        hotel_name: formData.hotelName,
        state: formData.state,
        city: formData.city,
        star_rating: formData.starRating,
        meal_plans: formData.mealPlans,
        room_types: formData.roomTypes,
        hotel_image_url: imageUrl,
        similar_options: formData.similarOptions,
      },
    ]);

    if (error) throw error;
    alert("Hotel saved successfully!");
  };

  // ─── UPDATE ───────────────────────────────────────────────────────────────────

  const updateHotel = async (imageUrl) => {
    const { error } = await supabase
      .from("hotel_details")
      .update({
        hotel_name: formData.hotelName,
        state: formData.state,
        city: formData.city,
        star_rating: formData.starRating,
        meal_plans: formData.mealPlans,
        room_types: formData.roomTypes,
        hotel_image_url: imageUrl,
        similar_options: formData.similarOptions,
      })
      .eq("id", editingId);

    if (error) throw error;
    alert("Hotel updated successfully!");
  };

  // ─── Submit handler ───────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.hotelImageUrl;
      if (formData.hotelImage) {
        imageUrl = await uploadImage(formData.hotelImage);
      }

      if (editingId !== null) {
        await updateHotel(imageUrl);
      } else {
        await createHotel(imageUrl);
      }

      await getHotels();
      closeForm();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────────

  const handleDelete = async (hotel) => {
    if (!window.confirm("Kya aap is hotel ko delete karna chahte hain?")) return;

    const { error } = await supabase
      .from("hotel_details")
      .delete()
      .eq("id", hotel.id);

    if (error) {
      alert("Delete error: " + error.message);
      return;
    }

    await getHotels();
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-slate-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">Hotel Details</h2>
          <button
            onClick={openAdd}
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl"
          >
            + Add Hotel
          </button>
        </div>

        {/* ── Hotel List (READ) ── */}
        <div className="space-y-4">
          {hotels.length === 0 ? (
            <div className="text-center py-10 bg-slate-100 rounded-xl text-slate-500">
              Abhi koi hotel nahi hai. "Add Hotel" se shuru karein.
            </div>
          ) : (
            hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex justify-between items-center gap-4"
              >
                {hotel.hotel_image_url && (
                  <img
                    src={hotel.hotel_image_url}
                    alt={hotel.hotel_name}
                    className="w-20 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                  />
                )}

                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-slate-700">
                    {hotel.hotel_name}{" "}
                    <span className="text-sm text-amber-500">
                      {"★".repeat(Number(hotel.star_rating))}
                    </span>
                  </h4>
                  <p className="text-slate-500 text-sm">
                    {hotel.city}, {hotel.state}
                  </p>
                  {hotel.meal_plans?.length > 0 && (
                    <p className="text-xs text-slate-400 mt-1">
                      Meals: {hotel.meal_plans.join(", ")}
                    </p>
                  )}
                  {hotel.room_types?.length > 0 && (
                    <p className="text-xs text-slate-400">
                      Rooms: {hotel.room_types.join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => openEdit(hotel)}
                    className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-lg text-white text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel)}
                    className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Modal Form (CREATE / UPDATE) ── */}
        {showForm && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl relative max-h-[100vh] overflow-y-auto">

              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-xl text-slate-400 hover:text-red-500"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold text-slate-700 mb-6">
                {editingId !== null ? "Hotel Edit Karein" : "Naya Hotel Jodhein"}
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    placeholder="Hotel Name *"
                    required
                    className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                  <select
                    name="starRating"
                    value={formData.starRating}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>
                </div>

                {/* Meal Plans */}
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-700 mb-1">Meal Plans</h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {mealOptions.map((meal) => (
                      <div key={meal.id} className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleSelection("mealPlans", meal.name)}
                          className={`px-4 py-2 rounded-lg transition-colors ${formData.mealPlans.includes(meal.name)
                              ? "bg-rose-400 text-white"
                              : "bg-rose-100 text-rose-700"
                            }`}
                        >
                          {meal.name}
                        </button>
                        {!meal.isDefault && (
                          <button
                            type="button"
                            onClick={() => removeCustomMeal(meal.id)}
                            className="text-red-400 hover:text-red-600 text-sm font-bold"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <input
                      value={customMeal}
                      onChange={(e) => setCustomMeal(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomMeal())}
                      placeholder="Custom Meal Plan"
                      className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                    <button
                      type="button"
                      onClick={addCustomMeal}
                      className="bg-rose-400 hover:bg-rose-500 text-white px-4 rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Room Types */}
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-700 mb-1">Room Types</h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {roomOptions.map((room) => (
                      <div key={room.id} className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleSelection("roomTypes", room.name)}
                          className={`px-4 py-2 rounded-lg transition-colors ${formData.roomTypes.includes(room.name)
                              ? "bg-amber-400 text-white"
                              : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          {room.name}
                        </button>
                        {!room.isDefault && (
                          <button
                            type="button"
                            onClick={() => removeCustomRoom(room.id)}
                            className="text-red-400 hover:text-red-600 text-sm font-bold"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <input
                      value={customRoom}
                      onChange={(e) => setCustomRoom(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRoom())}
                      placeholder="Custom Room Type"
                      className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                    <button
                      type="button"
                      onClick={addCustomRoom}
                      className="bg-amber-400 hover:bg-amber-500 text-white px-4 rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                </div>

         
              
                {/* Image Upload */}
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-700 mb-2">Hotel Image</h4>

                  {imagePreview && (
                    <div className="mb-3">
                      <p className="text-xs text-slate-400 mb-1">Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-24 object-cover rounded-lg border border-slate-200"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    name="hotelImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="border border-slate-300 rounded-xl px-4 py-3 w-full"
                  />
                </div>

                {/* Similar Options */}
                <div className="mt-6">
                  <input
                    type="text"
                    name="similarOptions"
                    value={formData.similarOptions}
                    onChange={handleChange}
                    placeholder="Similar Options (optional)"
                    className="border border-slate-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-indigo-400 hover:bg-indigo-500 disabled:opacity-60 text-white px-6 py-3 rounded-xl"
                  >
                    {uploading
                      ? "Saving..."
                      : editingId !== null
                        ? "Update Hotel"
                        : "Save Hotel"}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HotelDetails;

