// import React, { useState } from "react";

// const PackageContent = () => {
//   const [formData, setFormData] = useState({
//     contentName: "",
//     inclusions: [""],
//     exclusions: [""],
//   });

//   // Content Name
//   const handleContentName = (e) => {
//     setFormData({
//       ...formData,
//       contentName: e.target.value,
//     });
//   };

//   // Inclusion Change
//   const handleInclusionChange = (index, value) => {
//     const updated = [...formData.inclusions];
//     updated[index] = value;

//     setFormData({
//       ...formData,
//       inclusions: updated,
//     });
//   };

//   // Exclusion Change
//   const handleExclusionChange = (index, value) => {
//     const updated = [...formData.exclusions];
//     updated[index] = value;

//     setFormData({
//       ...formData,
//       exclusions: updated,
//     });
//   };

//   // Add Inclusion
//   const addInclusion = () => {
//     setFormData({
//       ...formData,
//       inclusions: [...formData.inclusions, ""],
//     });
//   };

//   // Add Exclusion
//   const addExclusion = () => {
//     setFormData({
//       ...formData,
//       exclusions: [...formData.exclusions, ""],
//     });
//   };

//   // Remove Inclusion
//   const removeInclusion = (index) => {
//     if (formData.inclusions.length === 1) return;

//     if (!window.confirm("Remove this inclusion?")) return;

//     const updated = formData.inclusions.filter((_, i) => i !== index);

//     setFormData({
//       ...formData,
//       inclusions: updated,
//     });
//   };

//   // Remove Exclusion
//   const removeExclusion = (index) => {
//     if (formData.exclusions.length === 1) return;

//     if (!window.confirm("Remove this exclusion?")) return;

//     const updated = formData.exclusions.filter((_, i) => i !== index);

//     setFormData({
//       ...formData,
//       exclusions: updated,
//     });
//   };

//   // Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(formData);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-700">
//         Package Content
//       </h2>

//       <form onSubmit={handleSubmit}>

//         {/* Content Name */}
//         <div className="mb-6">
//           <label className="block mb-2 font-medium text-gray-600">
//             Content Name
//           </label>

//           <input
//             type="text"
//             value={formData.contentName}
//             onChange={handleContentName}
//             placeholder="Enter content name"
//             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//         </div>

//         {/* Inclusions */}
//         <div className="mb-6">
//           <label className="block mb-3 font-medium text-gray-600">
//             Inclusions
//           </label>

//           {formData.inclusions.map((item, index) => (
//             <div key={index} className="flex gap-3 mb-3">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) =>
//                   handleInclusionChange(index, e.target.value)
//                 }
//                 placeholder="Enter inclusion"
//                 className="flex-1 border border-gray-300 rounded-lg p-3"
//               />

//               <button
//                 type="button"
//                 onClick={() => removeInclusion(index)}
//                 className="bg-red-100 text-red-600 px-4 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addInclusion}
//             className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
//           >
//             Add Inclusion
//           </button>
//         </div>

//         {/* Exclusions */}
//         <div className="mb-6">
//           <label className="block mb-3 font-medium text-gray-600">
//             Exclusions
//           </label>

//           {formData.exclusions.map((item, index) => (
//             <div key={index} className="flex gap-3 mb-3">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) =>
//                   handleExclusionChange(index, e.target.value)
//                 }
//                 placeholder="Enter exclusion"
//                 className="flex-1 border border-gray-300 rounded-lg p-3"
//               />

//               <button
//                 type="button"
//                 onClick={() => removeExclusion(index)}
//                 className="bg-red-100 text-red-600 px-4 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addExclusion}
//             className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
//           >
//             Add Exclusion
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-3 rounded-lg"
//         >
//           Save Content
//         </button>

//       </form>
//     </div>
//   );
// };

// export default PackageContent;





// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const createEmptyForm = () => ({
//   contentName: "",
//   inclusionLabel: "",
//   exclusionLabel: "",
//   inclusions: [{ id: crypto.randomUUID(), value: "" }],
//   exclusions: [{ id: crypto.randomUUID(), value: "" }],
// });

// const PackageContent = () => {
//   const [formData, setFormData] = useState(createEmptyForm());
//   const [contents, setContents] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   // Fetch Data
//   const getContents = async () => {
//     const { data } = await supabase
//       .from("package_content")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setContents(data || []);
//   };

//   useEffect(() => {
//     getContents();
//   }, []);

//   // Main field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Inclusion change
//   const handleInclusionChange = (id, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       inclusions: prev.inclusions.map((item) =>
//         item.id === id ? { ...item, value } : item
//       ),
//     }));
//   };

//   // Exclusion change
//   const handleExclusionChange = (id, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       exclusions: prev.exclusions.map((item) =>
//         item.id === id ? { ...item, value } : item
//       ),
//     }));
//   };

//   // Add Inclusion
//   const addInclusion = () => {
//     setFormData((prev) => ({
//       ...prev,
//       inclusions: [
//         ...prev.inclusions,
//         { id: crypto.randomUUID(), value: "" },
//       ],
//     }));
//   };

//   // Add Exclusion
//   const addExclusion = () => {
//     setFormData((prev) => ({
//       ...prev,
//       exclusions: [
//         ...prev.exclusions,
//         { id: crypto.randomUUID(), value: "" },
//       ],
//     }));
//   };

//   // Remove Inclusion
//   const removeInclusion = (id) => {
//     if (formData.inclusions.length === 1) return;

//     setFormData((prev) => ({
//       ...prev,
//       inclusions: prev.inclusions.filter((item) => item.id !== id),
//     }));
//   };

//   // Remove Exclusion
//   const removeExclusion = (id) => {
//     if (formData.exclusions.length === 1) return;

//     setFormData((prev) => ({
//       ...prev,
//       exclusions: prev.exclusions.filter((item) => item.id !== id),
//     }));
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.contentName.trim()) {
//       alert("Content Name mandatory hai");
//       return;
//     }

//     const payload = {
//       content_name: formData.contentName.trim(),
//       inclusion_label: formData.inclusionLabel.trim(),
//       exclusion_label: formData.exclusionLabel.trim(),
//       inclusions: formData.inclusions
//         .map((item) => item.value)
//         .filter((item) => item.trim() !== ""),
//       exclusions: formData.exclusions
//         .map((item) => item.value)
//         .filter((item) => item.trim() !== ""),
//     };

//     if (editingId) {
//       await supabase.from("package_content").update(payload).eq("id", editingId);
//       alert("Content updated successfully");
//     } else {
//       await supabase.from("package_content").insert([payload]);
//       alert("Content saved successfully");
//     }

//     setFormData(createEmptyForm());
//     setEditingId(null);
//     getContents();
//   };

//   // Edit
//   const handleEdit = (item) => {
//     setEditingId(item.id);

//     setFormData({
//       contentName: item.content_name || "",
//       inclusionLabel: item.inclusion_label || "",
//       exclusionLabel: item.exclusion_label || "",
//       inclusions: item.inclusions?.length
//         ? item.inclusions.map((val) => ({
//             id: crypto.randomUUID(),
//             value: val,
//           }))
//         : [{ id: crypto.randomUUID(), value: "" }],
//       exclusions: item.exclusions?.length
//         ? item.exclusions.map((val) => ({
//             id: crypto.randomUUID(),
//             value: val,
//           }))
//         : [{ id: crypto.randomUUID(), value: "" }],
//     });
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Kya aap is content ko delete karna chahte hain?")) return;

//     await supabase.from("package_content").delete().eq("id", id);
//     getContents();
//   };

//   // Cancel
//   const handleCancel = () => {
//     setFormData(createEmptyForm());
//     setEditingId(null);
//   };

//   return (
//     <div className="bg-slate-50 p-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10">

//         <h2 className="text-3xl font-bold text-slate-700 mb-8">
//           Package Content
//         </h2>

//         <form onSubmit={handleSubmit}>

//           <input
//             name="contentName"
//             value={formData.contentName}
//             onChange={handleChange}
//             placeholder="Content Name *"
//             className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//           />

//           <input
//             name="inclusionLabel"
//             value={formData.inclusionLabel}
//             onChange={handleChange}
//             placeholder="Inclusion Label"
//             className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//           />

//           {formData.inclusions.map((item, index) => (
//             <div key={item.id} className="flex gap-3 mb-3">
//               <input
//                 value={item.value}
//                 onChange={(e) =>
//                   handleInclusionChange(item.id, e.target.value)
//                 }
//                 placeholder={`Inclusion ${index + 1}`}
//                 className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//               />

//               {formData.inclusions.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeInclusion(item.id)}
//                   className="bg-red-50 hover:bg-red-100 text-red-500 px-4 rounded-xl"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addInclusion}
//             className="mb-6 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl"
//           >
//             + Add Inclusion
//           </button>

//           <input
//             name="exclusionLabel"
//             value={formData.exclusionLabel}
//             onChange={handleChange}
//             placeholder="Exclusion Label"
//             className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//           />

//           {formData.exclusions.map((item, index) => (
//             <div key={item.id} className="flex gap-3 mb-3">
//               <input
//                 value={item.value}
//                 onChange={(e) =>
//                   handleExclusionChange(item.id, e.target.value)
//                 }
//                 placeholder={`Exclusion ${index + 1}`}
//                 className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
//               />

//               {formData.exclusions.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeExclusion(item.id)}
//                   className="bg-red-50 hover:bg-red-100 text-red-500 px-4 rounded-xl"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addExclusion}
//             className="mb-6 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl"
//           >
//             + Add Exclusion
//           </button>

//           <div className="flex gap-3">
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
//             >
//               {editingId ? "Update" : "Save"}
//             </button>

//             {editingId && (
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         <div className="mt-10 grid gap-4">
//           {contents.length === 0 ? (
//             <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
//               No Content Created Yet
//             </div>
//           ) : (
//             contents.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded-xl p-4 flex justify-between items-center"
//               >
//                 <h4 className="font-semibold text-gray-700">
//                   {item.content_name}
//                 </h4>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PackageContent;













import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const createEmptyForm = () => ({
  contentName: "",
  inclusionLabel: "",
  exclusionLabel: "",
  inclusions: [{ id: crypto.randomUUID(), value: "" }],
  exclusions: [{ id: crypto.randomUUID(), value: "" }],
});

const PackageContent = () => {
  const [formData, setFormData] = useState(createEmptyForm());
  const [contents, setContents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch
  const getContents = async () => {
    const { data } = await supabase
      .from("package_content")
      .select("*")
      .order("created_at", { ascending: false });

    setContents(data || []);
  };

  useEffect(() => {
    getContents();
  }, []);

  // Main change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Inclusion change
  const handleInclusionChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      inclusions: prev.inclusions.map((item) =>
        item.id === id ? { ...item, value } : item
      ),
    }));
  };

  // Exclusion change
  const handleExclusionChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      exclusions: prev.exclusions.map((item) =>
        item.id === id ? { ...item, value } : item
      ),
    }));
  };

  // Add Inclusion
  const addInclusion = () => {
    setFormData((prev) => ({
      ...prev,
      inclusions: [...prev.inclusions, { id: crypto.randomUUID(), value: "" }],
    }));
  };

  // Add Exclusion
  const addExclusion = () => {
    setFormData((prev) => ({
      ...prev,
      exclusions: [...prev.exclusions, { id: crypto.randomUUID(), value: "" }],
    }));
  };

  // Remove Inclusion
  const removeInclusion = (id) => {
    if (formData.inclusions.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((item) => item.id !== id),
    }));
  };

  // Remove Exclusion
  const removeExclusion = (id) => {
    if (formData.exclusions.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      exclusions: prev.exclusions.filter((item) => item.id !== id),
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.contentName.trim()) {
      alert("Content Name mandatory hai");
      return;
    }

    const payload = {
      content_name: formData.contentName.trim(),
      inclusion_label: formData.inclusionLabel.trim(),
      exclusion_label: formData.exclusionLabel.trim(),
      inclusions: formData.inclusions
        .map((item) => item.value)
        .filter((item) => item.trim() !== ""),
      exclusions: formData.exclusions
        .map((item) => item.value)
        .filter((item) => item.trim() !== ""),
    };

    if (editingId) {
      await supabase.from("package_content").update(payload).eq("id", editingId);
      alert("Content updated successfully");
    } else {
      await supabase.from("package_content").insert([payload]);
      alert("Content saved successfully");
    }

    setFormData(createEmptyForm());
    setEditingId(null);
    setShowForm(false);
    getContents();
  };

  // Edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setShowForm(true);

    setFormData({
      contentName: item.content_name || "",
      inclusionLabel: item.inclusion_label || "",
      exclusionLabel: item.exclusion_label || "",
      inclusions: item.inclusions?.length
        ? item.inclusions.map((val) => ({
            id: crypto.randomUUID(),
            value: val,
          }))
        : [{ id: crypto.randomUUID(), value: "" }],
      exclusions: item.exclusions?.length
        ? item.exclusions.map((val) => ({
            id: crypto.randomUUID(),
            value: val,
          }))
        : [{ id: crypto.randomUUID(), value: "" }],
    });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap is content ko delete karna chahte hain?")) return;

    await supabase.from("package_content").delete().eq("id", id);
    getContents();
  };

  // Cancel
  const handleCancel = () => {
    setFormData(createEmptyForm());
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">
            Package Content
          </h2>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Add Package Content
            </button>
          )}
        </div>

        {/* List */}
        <div className="grid gap-4 mb-8">
          {contents.length === 0 ? (
            !showForm && (
              <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
                No Content Created Yet
              </div>
            )
          ) : (
            contents.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <h4 className="font-semibold text-gray-700">
                  {item.content_name}
                </h4>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit}>

            <input
              name="contentName"
              value={formData.contentName}
              onChange={handleChange}
              placeholder="Content Name *"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />

            <input
              name="inclusionLabel"
              value={formData.inclusionLabel}
              onChange={handleChange}
              placeholder="Inclusion Label"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />

            {formData.inclusions.map((item, index) => (
              <div key={item.id} className="flex gap-3 mb-3">
                <input
                  value={item.value}
                  onChange={(e) =>
                    handleInclusionChange(item.id, e.target.value)
                  }
                  placeholder={`Inclusion ${index + 1}`}
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />

                {formData.inclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInclusion(item.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-500 px-4 rounded-xl"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addInclusion}
              className="mb-6 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl"
            >
              + Add Inclusion
            </button>

            <input
              name="exclusionLabel"
              value={formData.exclusionLabel}
              onChange={handleChange}
              placeholder="Exclusion Label"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />

            {formData.exclusions.map((item, index) => (
              <div key={item.id} className="flex gap-3 mb-3">
                <input
                  value={item.value}
                  onChange={(e) =>
                    handleExclusionChange(item.id, e.target.value)
                  }
                  placeholder={`Exclusion ${index + 1}`}
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />

                {formData.exclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExclusion(item.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-500 px-4 rounded-xl"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addExclusion}
              className="mb-6 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl"
            >
              + Add Exclusion
            </button>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                {editingId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default PackageContent;