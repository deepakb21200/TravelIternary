// import React, { useState } from "react";

// const BasicDetails = () => {
//     const [packages, setPackages] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [editingIndex, setEditingIndex] = useState(null);

//     const [formData, setFormData] = useState({
//         packageName: "",
//         shortName: "",
//         bannerImage: null,
//         footerImage: null,
//         image1: null,
//         image2: null,
//     });
//     const handleChange = (e) => {
//         const { name, value, files } = e.target;

//         setFormData({
//             ...formData,
//             [name]: files ? files[0] : value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (
//             !formData.packageName ||
//             !formData.shortName ||
//             !formData.bannerImage ||
//             !formData.footerImage ||
//             !formData.image1 ||
//             !formData.image2
//         ) {
//             alert("All fields are mandatory");
//             return;
//         }

//         if (editingIndex !== null) {
//             const updated = [...packages];
//             updated[editingIndex] = formData;
//             setPackages(updated);
//             setEditingIndex(null);
//         } else {
//             setPackages([...packages, formData]);
//         }

//         setFormData({
//             packageName: "",
//             shortName: "",
//             bannerImage: null,
//             footerImage: null,
//             image1: null,
//             image2: null,
//         });

//         setShowForm(false);
//     };

//     const handleEdit = (index) => {
//         setFormData(packages[index]);
//         setEditingIndex(index);
//         setShowForm(true);
//     };

//     const handleDelete = (index) => {
//         const updated = packages.filter((_, i) => i !== index);
//         setPackages(updated);
//     };

//     const handleCancel = () => {
//         setShowForm(false);
//         setEditingIndex(null);

//         setFormData({
//             packageName: "",
//             shortName: "",
//             footerImage: null,
//             image1: null,
//             image2: null,
//         });
//     };

//     return (
//         <div className=" g-gray-50 p-8">
//             <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

//                 {/* Header Buttons */}
//                 <div className="flex justify-between items-center mb-8">
//                     <h2 className="text-3xl font-bold text-gray-700">
//                         Basic Package Details
//                     </h2>

//                     {!showForm ? (
//                         <button
//                             onClick={() => setShowForm(true)}
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
//                         >
//                             Add Package
//                         </button>
//                     ) : (
//                         <button
//                             onClick={handleCancel}
//                             className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-xl shadow"
//                         >
//                             Cancel
//                         </button>
//                     )}
//                 </div>

//                 {/* Form */}
//                 {showForm && (
//                     <form
//                         onSubmit={handleSubmit}
//                         className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8"
//                     >
//                         <div className="grid md:grid-cols-2 gap-6">
//                             <input
//                                 type="text"
//                                 name="packageName"
//                                 value={formData.packageName}
//                                 onChange={handleChange}
//                                 placeholder="Package Name"
//                                 className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
//                             />

//                             <input
//                                 type="text"
//                                 name="shortName"
//                                 value={formData.shortName}
//                                 onChange={handleChange}
//                                 placeholder="Short Name"
//                                 className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
//                             />

//                             <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                                 <label className="block text-slate-700 font-medium mb-2">
//                                     Banner Image
//                                 </label>
//                                 <input type="file" name="bannerImage" onChange={handleChange} />
//                             </div>

//                             <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                                 <label className="block text-slate-700 font-medium mb-2">Footer Image</label>
//                                 <input type="file" name="footerImage" onChange={handleChange} />
//                             </div>

//                             <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
//                                 <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                                     <label className="block text-slate-700 font-medium mb-2">
//                                         Other Image 1
//                                     </label>
//                                     <input type="file" name="image1" onChange={handleChange} />
//                                 </div>

//                                 <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                                     <label className="block text-slate-700 font-medium mb-2">
//                                         Other Image 2
//                                     </label>
//                                     <input type="file" name="image2" onChange={handleChange} />
//                                 </div>
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
//                         >
//                             {editingIndex !== null ? "Update Package" : "Save Package"}
//                         </button>
//                     </form>
//                 )}

//                 {/* Package List */}
//                 <div>
//                     <h3 className="text-2xl font-semibold text-gray-700 mb-6">
//                         Created Packages
//                     </h3>

//                     {packages.length === 0 ? (
//                         <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
//                             No Package Created Yet
//                         </div>
//                     ) : (
//                         <div className="grid gap-4">
//                             {packages.map((pkg, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <h4 className="font-semibold text-lg text-gray-700">
//                                             {pkg.packageName}
//                                         </h4>
//                                         <p className="text-gray-500">{pkg.shortName}</p>
//                                     </div>

//                                     <div className="flex gap-3">
//                                         <button
//                                             onClick={() => handleEdit(index)}
//                                             className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             onClick={() => handleDelete(index)}
//                                             className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default BasicDetails;















//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !formData.packageName ||
//       !formData.shortName ||
//       !formData.bannerImage ||
//       !formData.footerImage ||
//       !formData.image1 ||
//       !formData.image2
//     ) {
//       alert("All fields are mandatory");
//       return;
//     }

//     if (editingIndex !== null) {
//       const updated = [...packages];
//       updated[editingIndex] = formData;
//       setPackages(updated);
//       setEditingIndex(null);
//     } else {
//       setPackages([...packages, formData]);
//     }

//     setFormData({
//       packageName: "",
//       shortName: "",
//       bannerImage: null,
//       footerImage: null,
//       image1: null,
//       image2: null,
//     });

//     setShowForm(false);
//   };









import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const BasicDetails = () => {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    packageName: "",
    shortName: "",
    bannerImage: null,
    footerImage: null,
    image1: null,
    image2: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };





const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.packageName ||
    !formData.shortName ||
    !formData.bannerImage ||
    !formData.footerImage ||
    !formData.image1 ||
    !formData.image2
  ) {
    alert("All fields are mandatory");
    return;
  }

  const bannerUrl = await uploadImage(formData.bannerImage);
  const footerUrl = await uploadImage(formData.footerImage);
  const image1Url = await uploadImage(formData.image1);
  const image2Url = await uploadImage(formData.image2);

  const { data, error } = await supabase.from("basic_details").insert([
    {
      package_name: formData.packageName,
      short_name: formData.shortName,
      banner_image: bannerUrl,
      footer_image: footerUrl,
      image1: image1Url,
      image2: image2Url,
    },
  ]);

  if (error) {
    console.log(error);
    alert("Error saving package");
    return;
  }

  alert("Package saved successfully");

  setFormData({
    packageName: "",
    shortName: "",
    bannerImage: null,
    footerImage: null,
    image1: null,
    image2: null,
  });

  setShowForm(false);
};
  const handleEdit = (index) => {
    setFormData(packages[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = packages.filter((_, i) => i !== index);
    setPackages(updated);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);

    setFormData({
      packageName: "",
      shortName: "",
      bannerImage: null,
      footerImage: null,
      image1: null,
      image2: null,
    });
  };



  const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await  supabase.storage
    .from("package-images")
    .upload(fileName, file);

  if (error) {
    console.log(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("package-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

  return (
    <div className="bg-gray-50 p-8  ">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">
            Basic Package Details
          </h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
          >
            Add Package
          </button>
        </div>

        {/* Created Packages FIRST */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            Created Packages
          </h3>

          {packages.length === 0 ? (
            <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
              No Package Created Yet
            </div>
          ) : (
            <div className="grid gap-4">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold text-lg text-gray-700">
                      {pkg.packageName}
                    </h4>
                    <p className="text-gray-500">{pkg.shortName}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popup Modal */}
        {showForm && (
        //   <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
       <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative">

              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-gray-700 mb-6">
                {editingIndex !== null ? "Edit Package" : "Add Package"}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    placeholder="Package Name"
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
                  />

                  <input
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    placeholder="Short Name"
                    className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
                  />

                  <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
                    <label className="block text-slate-700 font-medium mb-2">
                      Banner Image
                    </label>
                    <input type="file" name="bannerImage" onChange={handleChange} />
                  </div>

                  <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
                    <label className="block text-slate-700 font-medium mb-2">
                      Footer Image
                    </label>
                    <input type="file" name="footerImage" onChange={handleChange} />
                  </div>

                  <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
                      <label className="block text-slate-700 font-medium mb-2">
                        Other Image 1
                      </label>
                      <input type="file" name="image1" onChange={handleChange} />
                    </div>

                    <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
                      <label className="block text-slate-700 font-medium mb-2">
                        Other Image 2
                      </label>
                      <input type="file" name="image2" onChange={handleChange} />
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  {editingIndex !== null ? "Update Package" : "Save Package"}
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BasicDetails;