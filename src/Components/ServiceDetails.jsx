
// // import React, { useEffect, useState } from "react";
// // // import SunEditor from "suneditor-react";
// // import SunEditor from "suneditor-react";
// // import "suneditor/dist/css/suneditor.min.css";
// // import { supabase } from "../../supabaseClient";

// // const emptyService = {
// //   serviceType: "",
// //   description: "",
// //   image: null,
// //   imageUrl: "",
// // };

// // const ServiceDetails = () => {
// //   const [services, setServices] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingId, setEditingId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     from: "",
// //     to: "",
// //     locationImage: null,
// //     locationImageUrl: "",
// //     serviceTypes: [{ ...emptyService, id: crypto.randomUUID() }],
// //   });

// //   useEffect(() => {
// //     getServices();
// //   }, []);

// //   const getServices = async () => {
// //     const { data, error } = await supabase
// //       .from("service_details")
// //       .select("*")
// //       .order("created_at", { ascending: false });

// //     if (error) {
// //       console.log(error);
// //       return;
// //     }

// //     setServices(data || []);
// //   };

// //   const uploadImage = async (file, folder = "service-images") => {
// //     const fileName = `${Date.now()}-${file.name}`;

// //     const { error } = await supabase.storage
// //       .from(folder)
// //       .upload(fileName, file);

// //     if (error) throw error;

// //     const { data } = supabase.storage
// //       .from(folder)
// //       .getPublicUrl(fileName);

// //     return data.publicUrl;
// //   };

// //   const handleMainChange = (e) => {
// //     const { name, value, files } = e.target;

// //     if (files) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: files[0],
// //       }));
// //     } else {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: value,
// //       }));
// //     }
// //   };

// //   const handleServiceChange = (id, field, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       serviceTypes: prev.serviceTypes.map((item) =>
// //         item.id === id ? { ...item, [field]: value } : item
// //       ),
// //     }));
// //   };

// //   const addServiceType = () => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       serviceTypes: [
// //         ...prev.serviceTypes,
// //         {
// //           ...emptyService,
// //           id: crypto.randomUUID(),
// //         },
// //       ],
// //     }));
// //   };

// //   const removeServiceType = (id) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       serviceTypes: prev.serviceTypes.filter((item) => item.id !== id),
// //     }));
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       from: "",
// //       to: "",
// //       locationImage: null,
// //       locationImageUrl: "",
// //       serviceTypes: [{ ...emptyService, id: crypto.randomUUID() }],
// //     });

// //     setEditingId(null);
// //     setShowForm(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     let locationImageUrl = formData.locationImageUrl;

// //     if (formData.locationImage) {
// //       locationImageUrl = await uploadImage(formData.locationImage);
// //     }

// //     const updatedServiceTypes = await Promise.all(
// //       formData.serviceTypes.map(async (item) => {
// //         let imageUrl = item.imageUrl;

// //         if (item.image) {
// //           imageUrl = await uploadImage(item.image);
// //         }

// //         return {
// //           id: item.id,
// //           serviceType: item.serviceType,
// //           description: item.description,
// //           image: imageUrl,
// //         };
// //       })
// //     );

// //     const routeName = formData.to
// //       ? `${formData.from} to ${formData.to}`
// //       : formData.from;

// //     const payload = {
// //       from_location: formData.from,
// //       to_location: formData.to,
// //       route_name: routeName,
// //       location_image: locationImageUrl,
// //       service_types: updatedServiceTypes,
// //     };

// //     if (editingId) {
// //       await supabase
// //         .from("service_details")
// //         .update(payload)
// //         .eq("id", editingId);
// //     } else {
// //       await supabase
// //         .from("service_details")
// //         .insert([payload]);
// //     }

// //     getServices();
// //     resetForm();
// //   };

// //   const handleEdit = (service) => {
// //     setFormData({
// //       from: service.from_location,
// //       to: service.to_location,
// //       locationImage: null,
// //       locationImageUrl: service.location_image,
// //       serviceTypes: service.service_types.map((item) => ({
// //         ...item,
// //         image: null,
// //         imageUrl: item.image,
// //       })),
// //     });

// //     setEditingId(service.id);
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (id) => {
// //     const { error } = await supabase
// //       .from("service_details")
// //       .delete()
// //       .eq("id", id);

// //     if (error) {
// //       console.log(error);
// //       return;
// //     }

// //     getServices();
// //   };

// //   return (
// //     <div style={{ padding: "20px", background: "#f8fafc" }}>
// //       <button
// //         onClick={() => setShowForm(true)}
// //         style={{
// //           padding: "10px 20px",
// //           background: "#2563eb",
// //           color: "white",
// //           border: "none",
// //           borderRadius: "6px",
// //           cursor: "pointer",
// //         }}
// //       >
// //         Add Service
// //       </button>

// //       {showForm && (
// //         <form
// //           onSubmit={handleSubmit}
// //           style={{
// //             background: "white",
// //             padding: "20px",
// //             marginTop: "20px",
// //             borderRadius: "10px",
// //           }}
// //         >
// //           <input
// //             name="from"
// //             placeholder="From"
// //             value={formData.from}
// //             onChange={handleMainChange}
// //             required
// //           />

// //           <input
// //             name="to"
// //             placeholder="To"
// //             value={formData.to}
// //             onChange={handleMainChange}
// //           />

// //           <input
// //             type="file"
// //             name="locationImage"
// //             onChange={handleMainChange}
// //             required={!editingId}
// //           />

// //           {formData.serviceTypes.map((item) => (
// //             <div
// //               key={item.id}
// //               style={{
// //                 marginTop: "20px",
// //                 padding: "15px",
// //                 border: "1px solid #ddd",
// //                 borderRadius: "8px",
// //               }}
// //             >
// //               <input
// //                 placeholder="Service Type"
// //                 value={item.serviceType}
// //                 onChange={(e) =>
// //                   handleServiceChange(item.id, "serviceType", e.target.value)
// //                 }
// //                 required
// //               />

// //               <SunEditor
// //                 setContents={item.description}
// //                 onChange={(value) =>
// //                   handleServiceChange(item.id, "description", value)
// //                 }
// //               />

// //               <input
// //                 type="file"
// //                 onChange={(e) =>
// //                   handleServiceChange(item.id, "image", e.target.files[0])
// //                 }
// //               />

// //               <button
// //                 type="button"
// //                 onClick={() => removeServiceType(item.id)}
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}

// //           <button type="button" onClick={addServiceType}>
// //             Add More Service Type
// //           </button>

// //           <button type="submit">
// //             {editingId ? "Update" : "Save"}
// //           </button>

// //           <button type="button" onClick={resetForm}>
// //             Cancel
// //           </button>
// //         </form>
// //       )}

// //       <div style={{ marginTop: "30px" }}>
// //         {services.map((service) => (
// //           <div
// //             key={service.id}
// //             style={{
// //               background: "white",
// //               padding: "20px",
// //               marginBottom: "20px",
// //               borderRadius: "10px",
// //             }}
// //           >
// //             <h3>{service.route_name}</h3>

// //             <img
// //               src={service.location_image}
// //               alt=""
// //               width="180"
// //             />

// //             {service.service_types?.map((item) => (
// //               <div key={item.id}>
// //                 <h4>{item.serviceType}</h4>

// //                 <div
// //                   dangerouslySetInnerHTML={{
// //                     __html: item.description,
// //                   }}
// //                 />

// //                 {item.image && (
// //                   <img
// //                     src={item.image}
// //                     alt=""
// //                     width="120"
// //                   />
// //                 )}
// //               </div>
// //             ))}

// //             <button onClick={() => handleEdit(service)}>
// //               Edit
// //             </button>

// //             <button onClick={() => handleDelete(service.id)}>
// //               Delete
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServiceDetails;




// import React, { useEffect, useState, useRef } from "react";
// import { supabase } from "../../supabaseClient";

// // ─── SunEditor Loader ─────────────────────────────────────────────────────────
// const loadSunEditor = () => {
//   return new Promise((resolve) => {
//     if (window.SUNEDITOR) return resolve(window.SUNEDITOR);

//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css";
//     document.head.appendChild(link);

//     const script = document.createElement("script");
//     script.src = "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js";
//     script.onload = () => resolve(window.SUNEDITOR);
//     document.head.appendChild(script);
//   });
// };

// // ─── SunEditor Component ──────────────────────────────────────────────────────
// const SunEditorField = ({ value, onChange, placeholder }) => {
//   const textareaRef = useRef(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     loadSunEditor().then((SUNEDITOR) => {
//       if (editorRef.current) return;

//       editorRef.current = SUNEDITOR.create(textareaRef.current, {
//         toolbarItem: [
//           ["bold", "italic", "underline"],
//           ["list"],
//           ["removeFormat"],
//         ],
//         minHeight: "120px",
//         placeholder: placeholder || "Description likhein...",
//         defaultStyle: "font-size: 14px;",
//       });

//       if (value) editorRef.current.setContents(value);

//       editorRef.current.onChange = (contents) => {
//         onChange(contents);
//       };
//     });

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.destroy();
//         editorRef.current = null;
//       }
//     };
//   }, []);

//   // Reset when value cleared externally
//   useEffect(() => {
//     if (editorRef.current && value === "") {
//       editorRef.current.setContents("");
//     }
//   }, [value]);

//   return <textarea ref={textareaRef} style={{ display: "none" }} />;
// };

// // ─── Image Field ──────────────────────────────────────────────────────────────
// const ImageField = ({ label, fieldName, urlField, formData, handleChange, required }) => {
//   const previewUrl = formData[fieldName]
//     ? URL.createObjectURL(formData[fieldName])
//     : formData[urlField] || null;

//   return (
//     <div className="border-2 border-dashed border-sky-200 rounded-xl p-4 bg-sky-50">
//       <label className="block text-slate-600 font-medium mb-2 text-sm">
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>
//       {previewUrl && (
//         <div className="mb-3">
//           <img
//             src={previewUrl}
//             alt={label}
//             className="w-full h-28 object-cover rounded-lg border border-sky-200"
//           />
//           {formData[urlField] && !formData[fieldName] && (
//             <p className="text-xs text-slate-400 mt-1">Nai image choose karo tabhi replace hogi</p>
//           )}
//         </div>
//       )}
//       <input
//         type="file"
//         name={fieldName}
//         accept="image/*"
//         onChange={handleChange}
//         className="text-sm text-slate-600"
//       />
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ServiceDetails = () => {
//   const [services, setServices] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const emptyServiceType = {
//     serviceType: "",
//     description: "",
//     image: null,
//     imageUrl: "",
//   };

//   const [formData, setFormData] = useState({
//     fromLocation: "",
//     toLocation: "",
//     locationImage: null,
//     locationImageUrl: "",
//     serviceTypes: [{ ...emptyServiceType }],
//   });

//   useEffect(() => {
//     getServices();
//   }, []);

//   const getServices = async () => {
//     const { data, error } = await supabase
//       .from("service_details")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) { console.log(error); return; }
//     setServices(data);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleServiceTypeChange = (index, field, value) => {
//     const updated = [...formData.serviceTypes];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, serviceTypes: updated }));
//   };

//   const handleServiceTypeImageChange = (index, file) => {
//     const updated = [...formData.serviceTypes];
//     updated[index].image = file;
//     setFormData((prev) => ({ ...prev, serviceTypes: updated }));
//   };

//   const addServiceType = () => {
//     setFormData((prev) => ({
//       ...prev,
//       serviceTypes: [...prev.serviceTypes, { ...emptyServiceType }],
//     }));
//   };

//   const removeServiceType = (index) => {
//     if (formData.serviceTypes.length === 1) {
//       alert("Kam se kam ek service type hona chahiye");
//       return;
//     }
//     const updated = formData.serviceTypes.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, serviceTypes: updated }));
//   };

//   const uploadImage = async (file) => {
//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage.from("package-images").upload(fileName, file);
//     if (error) { console.log(error.message); return null; }
//     const { data } = supabase.storage.from("package-images").getPublicUrl(fileName);
//     return data.publicUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const from = formData.fromLocation.trim();
//     const to = formData.toLocation.trim();

//     if (!from && !to) {
//       alert("From ya To mein se kam se kam ek location zaroori hai");
//       return;
//     }

//     if (!formData.locationImage && !formData.locationImageUrl) {
//       alert("Location image mandatory hai");
//       return;
//     }

//     const routeName = from && to ? `${from} to ${to}` : from || to;

//     const locationImgUrl = formData.locationImage
//       ? await uploadImage(formData.locationImage)
//       : formData.locationImageUrl;

//     const processedServiceTypes = await Promise.all(
//       formData.serviceTypes.map(async (st) => {
//         let imgUrl = st.imageUrl || "";
//         if (st.image) imgUrl = await uploadImage(st.image);
//         return {
//           service_type: st.serviceType,
//           description: st.description,
//           image: imgUrl,
//         };
//       })
//     );

//     const payload = {
//       from_location: from || null,
//       to_location: to || null,
//       route_name: routeName,
//       location_image: locationImgUrl,
//       service_types: processedServiceTypes,
//     };

//     if (editingIndex !== null) {
//       const id = services[editingIndex].id;
//       const { error } = await supabase.from("service_details").update(payload).eq("id", id);
//       if (error) { console.log(error); return; }
//       alert("Service updated successfully");
//     } else {
//       const { error } = await supabase.from("service_details").insert([payload]);
//       if (error) { console.log(error); return; }
//       alert("Service saved successfully");
//     }

//     getServices();
//     handleCancel();
//   };

//   const handleEdit = (index) => {
//     const svc = services[index];
//     const types = (svc.service_types || []).map((st) => ({
//       serviceType: st.service_type || "",
//       description: st.description || "",
//       image: null,
//       imageUrl: st.image || "",
//     }));

//     setFormData({
//       fromLocation: svc.from_location || "",
//       toLocation: svc.to_location || "",
//       locationImage: null,
//       locationImageUrl: svc.location_image || "",
//       serviceTypes: types.length > 0 ? types : [{ ...emptyServiceType }],
//     });

//     setEditingIndex(index);
//     setShowForm(true);
//   };

//   const handleDelete = async (index) => {
//     if (!window.confirm("Kya aap is service ko delete karna chahte hain?")) return;
//     const id = services[index].id;
//     const { error } = await supabase.from("service_details").delete().eq("id", id);
//     if (error) { console.log(error); return; }
//     getServices();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingIndex(null);
//     setFormData({
//       fromLocation: "",
//       toLocation: "",
//       locationImage: null,
//       locationImageUrl: "",
//       serviceTypes: [{ ...emptyServiceType }],
//     });
//   };

//   return (
//     <div className="bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-700">Service Details</h2>
//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
//             >
//               Add Service
//             </button>
//           )}
//         </div>

//         {/* Service List */}
//         {services.length === 0 ? (
//           <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
//             No Service Created Yet
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {services.map((svc, index) => (
//               <div
//                 key={svc.id}
//                 className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={svc.location_image}
//                     alt={svc.route_name}
//                     className="w-24 h-20 object-cover rounded-lg border border-gray-200"
//                   />
//                   <div>
//                     <h4 className="font-semibold text-lg text-gray-700">{svc.route_name}</h4>
//                     <p className="text-gray-500 text-sm">
//                       {(svc.service_types || []).length} service type(s)
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEdit(index)}
//                     className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">

//               <button
//                 onClick={handleCancel}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl font-bold text-gray-700 mb-6">
//                 {editingIndex !== null ? "Edit Service" : "Add Service"}
//               </h3>

//               <form onSubmit={handleSubmit}>

//                 {/* From / To */}
//                 <div className="grid md:grid-cols-2 gap-4 mb-5">
//                   <div>
//                     <label className="block text-sm text-slate-600 font-medium mb-1">
//                       From Location
//                       <span className="text-gray-400 text-xs ml-1">(optional)</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="fromLocation"
//                       value={formData.fromLocation}
//                       onChange={handleChange}
//                       placeholder="e.g. Delhi"
//                       className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300 text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-600 font-medium mb-1">
//                       To Location
//                       <span className="text-gray-400 text-xs ml-1">(optional)</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="toLocation"
//                       value={formData.toLocation}
//                       onChange={handleChange}
//                       placeholder="e.g. Mathura"
//                       className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300 text-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Route live preview */}
//                 {(formData.fromLocation || formData.toLocation) && (
//                   <div className="mb-5 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2 text-sm text-sky-700">
//                     Route will be saved as: &nbsp;
//                     <span className="font-bold">
//                       {formData.fromLocation && formData.toLocation
//                         ? `${formData.fromLocation} to ${formData.toLocation}`
//                         : formData.fromLocation || formData.toLocation}
//                     </span>
//                   </div>
//                 )}

//                 {/* Location Image */}
//                 <div className="mb-5">
//                   <ImageField
//                     label="Location Image"
//                     fieldName="locationImage"
//                     urlField="locationImageUrl"
//                     formData={formData}
//                     handleChange={handleChange}
//                     required={true}
//                   />
//                 </div>

//                 {/* Service Types */}
//                 <div className="mb-4">
//                   <div className="flex justify-between items-center mb-3">
//                     <h4 className="text-gray-700 font-semibold text-base">Service Types</h4>
//                     <button
//                       type="button"
//                       onClick={addServiceType}
//                       className="bg-sky-100 hover:bg-sky-200 text-sky-700 text-sm px-4 py-1.5 rounded-lg border border-sky-300"
//                     >
//                       + Add Service Type
//                     </button>
//                   </div>

//                   <div className="grid gap-5">
//                     {formData.serviceTypes.map((st, index) => (
//                       <div
//                         key={index}
//                         className="border border-slate-200 rounded-xl p-5 bg-slate-50 relative"
//                       >
//                         {formData.serviceTypes.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeServiceType(index)}
//                             className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg leading-none"
//                           >
//                             ✕
//                           </button>
//                         )}

//                         <p className="text-xs font-semibold text-slate-400 uppercase mb-3 tracking-wide">
//                           Service Type #{index + 1}
//                         </p>

//                         {/* Service Type Name */}
//                         <div className="mb-3">
//                           <label className="block text-sm text-slate-600 font-medium mb-1">
//                             Service Type
//                           </label>
//                           <input
//                             type="text"
//                             value={st.serviceType}
//                             onChange={(e) =>
//                               handleServiceTypeChange(index, "serviceType", e.target.value)
//                             }
//                             placeholder="e.g. AC Bus, Tempo Traveller"
//                             className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-sky-300 text-sm bg-white"
//                           />
//                         </div>

//                         {/* Description — SunEditor */}
//                         <div className="mb-3">
//                           <label className="block text-sm text-slate-600 font-medium mb-1">
//                             Description
//                           </label>
//                           <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
//                             <SunEditorField
//                               value={st.description}
//                               onChange={(val) =>
//                                 handleServiceTypeChange(index, "description", val)
//                               }
//                               placeholder="Service description likhein..."
//                             />
//                           </div>
//                         </div>

//                         {/* Service Type Image */}
//                         <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-white">
//                           <label className="block text-slate-600 font-medium mb-2 text-sm">
//                             Image{" "}
//                             <span className="text-gray-400 text-xs">(optional)</span>
//                           </label>
//                           {(st.image ? URL.createObjectURL(st.image) : st.imageUrl) && (
//                             <div className="mb-3">
//                               <img
//                                 src={st.image ? URL.createObjectURL(st.image) : st.imageUrl}
//                                 alt="service"
//                                 className="w-full h-24 object-cover rounded-lg border border-slate-200"
//                               />
//                               {st.imageUrl && !st.image && (
//                                 <p className="text-xs text-slate-400 mt-1">
//                                   Nai image choose karo tabhi replace hogi
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                               handleServiceTypeImageChange(index, e.target.files[0])
//                             }
//                             className="text-sm text-slate-600"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
//                 >
//                   {editingIndex !== null ? "Update Service" : "Save Service"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;


























































































//  import React, { useEffect, useState, useRef } from "react";
// import { supabase } from "../../supabaseClient";

// // ─── SunEditor Loader ─────────────────────────────────────────────────────────
// const loadSunEditor = () => {
//   return new Promise((resolve) => {
//     if (window.SUNEDITOR) return resolve(window.SUNEDITOR);

//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css";
//     document.head.appendChild(link);

//     const script = document.createElement("script");
//     script.src = "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js";
//     script.onload = () => resolve(window.SUNEDITOR);
//     document.head.appendChild(script);
//   });
// };

// // ─── SunEditor Component ──────────────────────────────────────────────────────
// const SunEditorField = ({ value, onChange, placeholder }) => {
//   const textareaRef = useRef(null);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     loadSunEditor().then((SUNEDITOR) => {
//       if (editorRef.current) return;

//       editorRef.current = SUNEDITOR.create(textareaRef.current, {
//         toolbarItem: [
//           ["bold", "italic", "underline"],
//           ["list"],
//           ["removeFormat"],
//         ],
//         minHeight: "120px",
//         placeholder: placeholder || "Description likhein...",
//         defaultStyle: "font-size: 14px;",
//       });

//       if (value) editorRef.current.setContents(value);

//       editorRef.current.onChange = (contents) => {
//         onChange(contents);
//       };
//     });

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.destroy();
//         editorRef.current = null;
//       }
//     };
//   }, []);

//   // Reset when value cleared externally
//   useEffect(() => {
//     if (editorRef.current && value === "") {
//       editorRef.current.setContents("");
//     }
//   }, [value]);

//   return <textarea ref={textareaRef} style={{ display: "none" }} />;
// };

// // ─── Image Field ──────────────────────────────────────────────────────────────
// const ImageField = ({ label, fieldName, urlField, formData, handleChange, required }) => {
//   const previewUrl = formData[fieldName]
//     ? URL.createObjectURL(formData[fieldName])
//     : formData[urlField] || null;

//   return (
//     <div className="border-2 border-dashed border-sky-200 rounded-xl p-4 bg-sky-50">
//       <label className="block text-slate-600 font-medium mb-2 text-sm">
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>
//       {previewUrl && (
//         <div className="mb-3">
//           <img
//             src={previewUrl}
//             alt={label}
//             className="w-full h-28 object-cover rounded-lg border border-sky-200"
//           />
//           {formData[urlField] && !formData[fieldName] && (
//             <p className="text-xs text-slate-400 mt-1">Nai image choose karo tabhi replace hogi</p>
//           )}
//         </div>
//       )}
//       <input
//         type="file"
//         name={fieldName}
//         accept="image/*"
//         onChange={handleChange}
//         className="text-sm text-slate-600"
//       />
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ServiceDetails = () => {
//   const [services, setServices] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const emptyServiceType = {
//     serviceType: "",
//     description: "",
//     image: null,
//     imageUrl: "",
//   };

//   const [formData, setFormData] = useState({
//     fromLocation: "",
//     toLocation: "",
//     locationImage: null,
//     locationImageUrl: "",
//     serviceTypes: [{ ...emptyServiceType }],
//   });

//   useEffect(() => {
//     getServices();
//   }, []);

//   const getServices = async () => {
//     const { data, error } = await supabase
//       .from("service_details")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (error) { console.log(error); return; }
//     setServices(data);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleServiceTypeChange = (index, field, value) => {
//     const updated = [...formData.serviceTypes];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, serviceTypes: updated }));
//   };

//   const handleServiceTypeImageChange = (index, file) => {
//     const updated = [...formData.serviceTypes];
//     updated[index].image = file;
//     setFormData((prev) => ({ ...prev, serviceTypes: updated }));
//   };

//   const addServiceType = () => {
//     setFormData((prev) => ({
//       ...prev,
//       serviceTypes: [...prev.serviceTypes, { ...emptyServiceType }],
//     }));
//   };

//   const removeServiceType = (index) => {
//     if (formData.serviceTypes.length === 1) {
//       alert("Kam se kam ek service type hona chahiye");
//       return;
//     }
//     const updated = formData.serviceTypes.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, serviceTypes: updated }));
//   };

//   const uploadImage = async (file) => {
//     const fileName = `${Date.now()}-${file.name}`;
//     const { error } = await supabase.storage.from("package-images").upload(fileName, file);
//     if (error) { console.log(error.message); return null; }
//     const { data } = supabase.storage.from("package-images").getPublicUrl(fileName);
//     return data.publicUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const from = formData.fromLocation.trim();
//     const to = formData.toLocation.trim();

//     if (!from && !to) {
//       alert("From ya To mein se kam se kam ek location zaroori hai");
//       return;
//     }

//     if (!formData.locationImage && !formData.locationImageUrl) {
//       alert("Location image mandatory hai");
//       return;
//     }

//     const routeName = from && to ? `${from} to ${to}` : from || to;

//     const locationImgUrl = formData.locationImage
//       ? await uploadImage(formData.locationImage)
//       : formData.locationImageUrl;

//     const processedServiceTypes = await Promise.all(
//       formData.serviceTypes.map(async (st) => {
//         let imgUrl = st.imageUrl || "";
//         if (st.image) imgUrl = await uploadImage(st.image);
//         return {
//           service_type: st.serviceType,
//           description: st.description,
//           image: imgUrl,
//         };
//       })
//     );

//     const payload = {
//       from_location: from || null,
//       to_location: to || null,
//       route_name: routeName,
//       location_image: locationImgUrl,
//       service_types: processedServiceTypes,
//     };

//     if (editingId !== null) {
//       const { error } = await supabase.from("service_details").update(payload).eq("id", editingId);
//       if (error) { console.log(error); return; }
//       alert("Service updated successfully");
//     } else {
//       const { error } = await supabase.from("service_details").insert([payload]);
//       if (error) { console.log(error); return; }
//       alert("Service saved successfully");
//     }

//     getServices();
//     handleCancel();
//   };

//   const handleEdit = (svc) => {
//     const types = (svc.service_types || []).map((st) => ({
//       serviceType: st.service_type || "",
//       description: st.description || "",
//       image: null,
//       imageUrl: st.image || "",
//     }));

//     setFormData({
//       fromLocation: svc.from_location || "",
//       toLocation: svc.to_location || "",
//       locationImage: null,
//       locationImageUrl: svc.location_image || "",
//       serviceTypes: types.length > 0 ? types : [{ ...emptyServiceType }],
//     });

//     setEditingId(svc.id);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Kya aap is service ko delete karna chahte hain?")) return;
//     const { error } = await supabase.from("service_details").delete().eq("id", id);
//     if (error) { console.log(error); return; }
//     getServices();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setFormData({
//       fromLocation: "",
//       toLocation: "",
//       locationImage: null,
//       locationImageUrl: "",
//       serviceTypes: [{ ...emptyServiceType }],
//     });
//   };

//   return (
//     <div className="bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-700">Service Details</h2>
//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
//             >
//               Add Service
//             </button>
//           )}
//         </div>

//         {/* Service List */}
//         {services.length === 0 ? (
//           <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
//             No Service Created Yet
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {services.map((svc, index) => (
//               <div
//                 key={svc.id}
//                 className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={svc.location_image}
//                     alt={svc.route_name}
//                     className="w-24 h-20 object-cover rounded-lg border border-gray-200"
//                   />
//                   <div>
//                     <h4 className="font-semibold text-lg text-gray-700">{svc.route_name}</h4>
//                     <p className="text-gray-500 text-sm">
//                       {(svc.service_types || []).length} service type(s)
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEdit(svc)}
//                     className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(svc.id)}
//                     className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">

//               <button
//                 onClick={handleCancel}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl font-bold text-gray-700 mb-6">
//                 {editingId !== null ? "Edit Service" : "Add Service"}
//               </h3>

//               <form onSubmit={handleSubmit}>

//                 {/* From / To */}
//                 <div className="grid md:grid-cols-2 gap-4 mb-5">
//                   <div>
//                     <label className="block text-sm text-slate-600 font-medium mb-1">
//                       From Location
//                       <span className="text-gray-400 text-xs ml-1">(optional)</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="fromLocation"
//                       value={formData.fromLocation}
//                       onChange={handleChange}
//                       placeholder="e.g. Delhi"
//                       className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300 text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-600 font-medium mb-1">
//                       To Location
//                       <span className="text-gray-400 text-xs ml-1">(optional)</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="toLocation"
//                       value={formData.toLocation}
//                       onChange={handleChange}
//                       placeholder="e.g. Mathura"
//                       className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-300 text-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Route live preview */}
//                 {(formData.fromLocation || formData.toLocation) && (
//                   <div className="mb-5 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2 text-sm text-sky-700">
//                     Route will be saved as: &nbsp;
//                     <span className="font-bold">
//                       {formData.fromLocation && formData.toLocation
//                         ? `${formData.fromLocation} to ${formData.toLocation}`
//                         : formData.fromLocation || formData.toLocation}
//                     </span>
//                   </div>
//                 )}

//                 {/* Location Image */}
//                 <div className="mb-5">
//                   <ImageField
//                     label="Location Image"
//                     fieldName="locationImage"
//                     urlField="locationImageUrl"
//                     formData={formData}
//                     handleChange={handleChange}
//                     required={true}
//                   />
//                 </div>

//                 {/* Service Types */}
//                 <div className="mb-4">
//                   <div className="flex justify-between items-center mb-3">
//                     <h4 className="text-gray-700 font-semibold text-base">Service Types</h4>
//                     <button
//                       type="button"
//                       onClick={addServiceType}
//                       className="bg-sky-100 hover:bg-sky-200 text-sky-700 text-sm px-4 py-1.5 rounded-lg border border-sky-300"
//                     >
//                       + Add Service Type
//                     </button>
//                   </div>

//                   <div className="grid gap-5">
//                     {formData.serviceTypes.map((st, index) => (
//                       <div
//                         key={index}
//                         className="border border-slate-200 rounded-xl p-5 bg-slate-50 relative"
//                       >
//                         {formData.serviceTypes.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeServiceType(index)}
//                             className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg leading-none"
//                           >
//                             ✕
//                           </button>
//                         )}

//                         <p className="text-xs font-semibold text-slate-400 uppercase mb-3 tracking-wide">
//                           Service Type #{index + 1}
//                         </p>

//                         {/* Service Type Name */}
//                         <div className="mb-3">
//                           <label className="block text-sm text-slate-600 font-medium mb-1">
//                             Service Type
//                           </label>
//                           <input
//                             type="text"
//                             value={st.serviceType}
//                             onChange={(e) =>
//                               handleServiceTypeChange(index, "serviceType", e.target.value)
//                             }
//                             placeholder="e.g. AC Bus, Tempo Traveller"
//                             className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-sky-300 text-sm bg-white"
//                           />
//                         </div>

//                         {/* Description — SunEditor */}
//                         <div className="mb-3">
//                           <label className="block text-sm text-slate-600 font-medium mb-1">
//                             Description
//                           </label>
//                           <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
//                             <SunEditorField
//                               value={st.description}
//                               onChange={(val) =>
//                                 handleServiceTypeChange(index, "description", val)
//                               }
//                               placeholder="Service description likhein..."
//                             />
//                           </div>
//                         </div>

//                         {/* Service Type Image */}
//                         <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-white">
//                           <label className="block text-slate-600 font-medium mb-2 text-sm">
//                             Image{" "}
//                             <span className="text-gray-400 text-xs">(optional)</span>
//                           </label>
//                           {(st.image ? URL.createObjectURL(st.image) : st.imageUrl) && (
//                             <div className="mb-3">
//                               <img
//                                 src={st.image ? URL.createObjectURL(st.image) : st.imageUrl}
//                                 alt="service"
//                                 className="w-full h-24 object-cover rounded-lg border border-slate-200"
//                               />
//                               {st.imageUrl && !st.image && (
//                                 <p className="text-xs text-slate-400 mt-1">
//                                   Nai image choose karo tabhi replace hogi
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) =>
//                               handleServiceTypeImageChange(index, e.target.files[0])
//                             }
//                             className="text-sm text-slate-600"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
//                 >
//                   {editingId !== null ? "Update Service" : "Save Service"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;




















































































import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";


// ─────────────────────────────────────────────
// SunEditor Loader
// ─────────────────────────────────────────────
const loadSunEditor = () => {
  return new Promise((resolve) => {
    if (window.SUNEDITOR) return resolve(window.SUNEDITOR);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js";
    script.onload = () => resolve(window.SUNEDITOR);
    document.head.appendChild(script);
  });
};


// ─────────────────────────────────────────────
// SunEditor Field
// ─────────────────────────────────────────────
const SunEditorField = ({ value, onChange }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    loadSunEditor().then((SUNEDITOR) => {
      if (editorRef.current) return;

      editorRef.current = SUNEDITOR.create(textareaRef.current, {
        toolbarItem: [["bold", "italic", "underline"], ["list"]],
        minHeight: "120px",
      });

      editorRef.current.setContents(value || "");

      editorRef.current.onChange = (contents) => {
        onChange(contents);
      };
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContents(value || "");
    }
  }, [value]);

  return <textarea ref={textareaRef} style={{ display: "none" }} />;
};


// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const ServiceDetails = () => {
  const emptyServiceType = {
    serviceType: "",
    description: "",
    image: null,
    imageUrl: "",
  };

  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    locationImage: null,
    locationImageUrl: "",
    serviceTypes: [{ ...emptyServiceType }],
  });


  // ─────────────────────────────────────────────
  // Fetch Data
  // ─────────────────────────────────────────────
  const getServices = async () => {
    const { data, error } = await supabase
      .from("service_details")
      .select("*")
      .order("created_at", { ascending: false });
      console.log(data);
      

    if (!error) setServices(data);
  };

  useEffect(() => {
    getServices();
  }, []);


  // ─────────────────────────────────────────────
  // Upload Image
  // ─────────────────────────────────────────────
  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("package-images")
      .upload(fileName, file);

    if (error) return null;

    const { data } = supabase.storage
      .from("package-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };


  // ─────────────────────────────────────────────
  // Input Change
  // ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };


  // ─────────────────────────────────────────────
  // Service Type Change
  // ─────────────────────────────────────────────
  const handleServiceTypeChange = (index, field, value) => {
    const updated = [...formData.serviceTypes];
    updated[index][field] = value;

    setFormData({
      ...formData,
      serviceTypes: updated,
    });
  };


  const addServiceType = () => {
    setFormData({
      ...formData,
      serviceTypes: [...formData.serviceTypes, { ...emptyServiceType }],
    });
  };


const removeServiceType = (index) => {
  if (formData.serviceTypes.length === 1) return;

  const updated = formData.serviceTypes.filter((_, i) => i !== index);

  setFormData({
    ...formData,
    serviceTypes: updated,
  });
};


  // ─────────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const routeName =
      formData.fromLocation && formData.toLocation
        ? `${formData.fromLocation} to ${formData.toLocation}`
        : formData.fromLocation || formData.toLocation;

    const locationImageUrl = formData.locationImage
      ? await uploadImage(formData.locationImage)
      : formData.locationImageUrl;

    const serviceTypes = await Promise.all(
      formData.serviceTypes.map(async (item) => {
        let img = item.imageUrl;

        if (item.image) {
          img = await uploadImage(item.image);
        }

        return {
          service_type: item.serviceType,
          description: item.description,
          image: img,
        };
      })
    );

    const payload = {
      from_location: formData.fromLocation,
      to_location: formData.toLocation,
      route_name: routeName,
      location_image: locationImageUrl,
      service_types: serviceTypes,
    };

    if (editingId) {
      await supabase.from("service_details").update(payload).eq("id", editingId);
    } else {
      await supabase.from("service_details").insert([payload]);
    }

    handleCancel();
    getServices();
  };


  // ─────────────────────────────────────────────
  // Edit
  // ─────────────────────────────────────────────
  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      fromLocation: item.from_location || "",
      toLocation: item.to_location || "",
      locationImage: null,
      locationImageUrl: item.location_image || "",
      serviceTypes:
        item.service_types?.map((s) => ({
          serviceType: s.service_type,
          description: s.description,
          image: null,
          imageUrl: s.image,
        })) || [{ ...emptyServiceType }],
    });

    setShowForm(true);
  };


  // ─────────────────────────────────────────────
  // Delete
  // ─────────────────────────────────────────────
const handleDelete = async (id) => {
  if (!window.confirm("Delete this service?")) return;

  await supabase.from("service_details").delete().eq("id", id);
  getServices();
};

  // ─────────────────────────────────────────────
  // Cancel
  // ─────────────────────────────────────────────
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      fromLocation: "",
      toLocation: "",
      locationImage: null,
      locationImageUrl: "",
      serviceTypes: [{ ...emptyServiceType }],
    });

    setShowForm(false);
  };


  return (
    <div className="p-6">



      {!showForm && (
        <button
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      )}

      {/* LIST */}
      <div className="mt-6 grid gap-4">
        {services.map((item) => (
          <div key={item.id} className="border p-4 rounded flex justify-between">

            <div>
              <h3>{item.route_name}</h3>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>


      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-8 border p-6 rounded">

          <input
            name="fromLocation"
            value={formData.fromLocation}
            onChange={handleChange}
            placeholder="From"
            className="border p-2 w-full mb-3"
          />

          <input
            name="toLocation"
            value={formData.toLocation}
            onChange={handleChange}
            placeholder="To"
            className="border p-2 w-full mb-3"
          />

          <div className="mb-4">
            <label className="block mb-2 font-medium">Location Image</label>

            {(formData.locationImage || formData.locationImageUrl) && (
              <img
                src={
                  formData.locationImage
                    ? URL.createObjectURL(formData.locationImage)
                    : formData.locationImageUrl
                }
                alt="preview"
                className="w-40 h-28 object-cover rounded mb-3 border"
              />
            )}

            <input
              type="file"
              name="locationImage"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>


          {formData.serviceTypes.map((item, index) => (
            <div key={index} className="border p-4 mb-4 rounded">

              <input
                value={item.serviceType}
                onChange={(e) =>
                  handleServiceTypeChange(index, "serviceType", e.target.value)
                }
                placeholder="Service Type"
                className="border p-2 w-full mb-3"
              />

              <SunEditorField
                value={item.description}
                onChange={(val) =>
                  handleServiceTypeChange(index, "description", val)
                }
              />

              {(item.image || item.imageUrl) && (
                <img
                  src={
                    item.image
                      ? URL.createObjectURL(item.image)
                      : item.imageUrl
                  }
                  alt="preview"
                  className="w-32 h-24 object-cover rounded mb-3 border"
                />
              )}

              <input
                type="file"
                onChange={(e) =>
                  handleServiceTypeChange(index, "image", e.target.files[0])
                }
                className="mt-3"
              />

              <button
                type="button"
                onClick={() => removeServiceType(index)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>

            </div>
          ))}

          <button
            type="button"
            onClick={addServiceType}
            className="bg-gray-200 px-3 py-2 rounded"
          >
            Add Service Type
          </button>

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editingId ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

        </form>
      )}
    </div>
  );
};

export default ServiceDetails;