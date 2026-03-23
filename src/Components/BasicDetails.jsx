// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const BasicDetails = () => {
//   const [packages, setPackages] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const [formData, setFormData] = useState({
//     packageName: "",
//     shortName: "",
//     bannerImage: null,
//     footerImage: null,
//     image1: null,
//     image2: null,
//   });

//   useEffect(() => {
//     getPackages();
//   }, []);

//   const getPackages = async () => {
//     const { data, error } = await supabase
//       .from("basic_details")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log(error);
//       return;
//     }

//     setPackages(data);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const uploadImage = async (file) => {
//     const fileName = `${Date.now()}-${file.name}`;

//     const { error } = await supabase.storage
//       .from("package-images") 
//       .upload(fileName, file);

//     if (error) {
//       console.log(error.message);
//       return null;
//     }

//     const { data } = supabase.storage
//       .from("package-images")
//       .getPublicUrl(fileName);

//     return data.publicUrl;
//   };

//   console.log(packages);
  
//   const handleSubmit = async (e) => {
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

//     const bannerUrl = await uploadImage(formData.bannerImage);
//     const footerUrl = await uploadImage(formData.footerImage);
//     const image1Url = await uploadImage(formData.image1);
//     const image2Url = await uploadImage(formData.image2);

//     if (editingIndex !== null) {
//       const packageId = packages[editingIndex].id;

//       const { error } = await supabase
//         .from("basic_details")
//         .update({
//           package_name: formData.packageName,
//           short_name: formData.shortName,
//           banner_image: bannerUrl,
//           footer_image: footerUrl,
//           image1: image1Url,
//           image2: image2Url,
//         })
//         .eq("id", packageId);

//       if (error) {
//         console.log(error);
//         return;
//       }

//       alert("Package updated successfully");
//     } else {
//       const { error } = await supabase.from("basic_details").insert([
//         {
//           package_name: formData.packageName,
//           short_name: formData.shortName,
//           banner_image: bannerUrl,
//           footer_image: footerUrl,
//           image1: image1Url,
//           image2: image2Url,
//         },
//       ]);

//       if (error) {
//         console.log(error);
//         return;
//       }

//       alert("Package saved successfully");
//     }

//     getPackages();

//     setFormData({
//       packageName: "",
//       shortName: "",
//       bannerImage: null,
//       footerImage: null,
//       image1: null,
//       image2: null,
//     });

//     setEditingIndex(null);
//     setShowForm(false);
//   };

//   const handleEdit = (index) => {
//     const pkg = packages[index];

//     setFormData({
//       packageName: pkg.package_name,
//       shortName: pkg.short_name,
//       bannerImage: pkg.banner_image,
//       footerImage: pkg.footer_image,
//       image1: pkg.image1,
//       image2: pkg.image2,
//     });

//     setEditingIndex(index);
//     setShowForm(true);
//   };

//   const handleDelete = async (index) => {
//     const packageId = packages[index].id;

//     const { error } = await supabase
//       .from("basic_details")
//       .delete()
//       .eq("id", packageId);

//     if (error) {
//       console.log(error);
//       return;
//     }

//     getPackages();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingIndex(null);

//     setFormData({
//       packageName: "",
//       shortName: "",
//       bannerImage: null,
//       footerImage: null,
//       image1: null,
//       image2: null,
//     });
//   };

//   return (
//     <div className="bg-gray-50 p-8">
//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-700">
//             Basic Package Details
//           </h2>

//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
//             >
//               Add Package
//             </button>
//           )}
//         </div>

//         {/* Created Packages */}
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-6">
//             Created Packages
//           </h3>

//           {packages.length === 0 ? (
//             <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
//               No Package Created Yet
//             </div>
//           ) : (
//             // <div className="grid gap-4">
//             //   {packages.map((pkg, index) => (
//             //     <div
//             //       key={pkg.id}
//             //       className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
//             //     >
//             //       <div>
//             //         <h4 className="font-semibold text-lg text-gray-700">
//             //           {pkg.package_name}
//             //         </h4>
//             //         <p className="text-gray-500">{pkg.short_name}</p>
//             //       </div>

//             //       <div className="flex gap-3">
//             //         <button
//             //           onClick={() => handleEdit(index)}
//             //           className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
//             //         >
//             //           Edit
//             //         </button>

//             //         <button
//             //           onClick={() => handleDelete(index)}
//             //           className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
//             //         >
//             //           Delete
//             //         </button>
//             //       </div>
//             //     </div>
//             //   ))}
//             // </div>


//             <div className="grid gap-4">
//   {packages.map((pkg, index) => (
//     <div
//       key={pkg.id}
//       className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
//     >
//       <div className="flex items-center gap-4">

//         <img
//           src={pkg.banner_image}
//           alt={pkg.package_name}
//           className="w-24 h-20 object-cover rounded-lg border border-gray-200"
//         />

//         <div>
//           <h4 className="font-semibold text-lg text-gray-700">
//             {pkg.package_name}
//           </h4>
//           <p className="text-gray-500">{pkg.short_name}</p>
//         </div>

//       </div>

//       <div className="flex gap-3">
//         <button
//           onClick={() => handleEdit(index)}
//           className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
//         >
//           Edit
//         </button>

//         <button
//           onClick={() => handleDelete(index)}
//           className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   ))}
// </div>
//           )}
//         </div>

//         {/* Popup Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
//             <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative">

//               <button
//                 onClick={handleCancel}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl font-bold text-gray-700 mb-6">
//                 {editingIndex !== null ? "Edit Package" : "Add Package"}
//               </h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-6">

//                   <input
//                     type="text"
//                     name="packageName"
//                     value={formData.packageName}
//                     onChange={handleChange}
//                     placeholder="Package Name"
//                     className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
//                   />

//                   <input
//                     type="text"
//                     name="shortName"
//                     value={formData.shortName}
//                     onChange={handleChange}
//                     placeholder="Short Name"
//                     className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
//                   />

//                   <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                     <label className="block text-slate-700 font-medium mb-2">
//                       Banner Image
//                     </label>
//                     <input type="file" name="bannerImage" onChange={handleChange} />
//                   </div>

//                   <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                     <label className="block text-slate-700 font-medium mb-2">
//                       Footer Image
//                     </label>
//                     <input type="file" name="footerImage" onChange={handleChange} />
//                   </div>

//                   <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
//                     <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                       <label className="block text-slate-700 font-medium mb-2">
//                         Other Image 1
//                       </label>
//                       <input type="file" name="image1" onChange={handleChange} />
//                     </div>

//                     <div className="border-2 border-dashed border-indigo-200 rounded-xl p-5 bg-indigo-50">
//                       <label className="block text-slate-700 font-medium mb-2">
//                         Other Image 2
//                       </label>
//                       <input type="file" name="image2" onChange={handleChange} />
//                     </div>
//                   </div>

//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
//                 >
//                   {editingIndex !== null ? "Update Package" : "Save Package"}
//                 </button>
//               </form>

//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BasicDetails;


















// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const BasicDetails = () => {
//   const [packages, setPackages] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const [formData, setFormData] = useState({
//     packageName: "",
//     shortName: "",
//     // File objects (nai upload ke liye)
//     bannerImage: null,
//     footerImage: null,
//     image1: null,
//     image2: null,
//     // Existing URLs (edit mode preview ke liye)
//     bannerImageUrl: "",
//     footerImageUrl: "",
//     image1Url: "",
//     image2Url: "",
//   });

//   useEffect(() => {
//     getPackages();
//   }, []);

//   const getPackages = async () => {
//     const { data, error } = await supabase
//       .from("basic_details")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log(error);
//       return;
//     }
//     setPackages(data);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const uploadImage = async (file) => {
//     const fileName = `${Date.now()}-${file.name}`;

//     const { error } = await supabase.storage
//       .from("package-images")
//       .upload(fileName, file);

//     if (error) {
//       console.log(error.message);
//       return null;
//     }

//     const { data } = supabase.storage
//       .from("package-images")
//       .getPublicUrl(fileName);

//     return data.publicUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Add mode mein sab mandatory, edit mode mein sirf text mandatory
//     if (!formData.packageName || !formData.shortName) {
//       alert("Package Name aur Short Name mandatory hain");
//       return;
//     }

//     if (
//       editingIndex === null &&
//       (!formData.bannerImage || !formData.footerImage || !formData.image1 || !formData.image2)
//     ) {
//       alert("Add karte waqt saari images mandatory hain");
//       return;
//     }

//     // Nai file hai toh upload karo, warna purani URL rakho
//     const bannerUrl = formData.bannerImage
//       ? await uploadImage(formData.bannerImage)
//       : formData.bannerImageUrl;

//     const footerUrl = formData.footerImage
//       ? await uploadImage(formData.footerImage)
//       : formData.footerImageUrl;

//     const image1Url = formData.image1
//       ? await uploadImage(formData.image1)
//       : formData.image1Url;

//     const image2Url = formData.image2
//       ? await uploadImage(formData.image2)
//       : formData.image2Url;

//     if (editingIndex !== null) {
//       const packageId = packages[editingIndex].id;

//       const { error } = await supabase
//         .from("basic_details")
//         .update({
//           package_name: formData.packageName,
//           short_name: formData.shortName,
//           banner_image: bannerUrl,
//           footer_image: footerUrl,
//           image1: image1Url,
//           image2: image2Url,
//         })
//         .eq("id", packageId);

//       if (error) {
//         console.log(error);
//         return;
//       }

//       alert("Package updated successfully");
//     } else {
//       const { error } = await supabase.from("basic_details").insert([
//         {
//           package_name: formData.packageName,
//           short_name: formData.shortName,
//           banner_image: bannerUrl,
//           footer_image: footerUrl,
//           image1: image1Url,
//           image2: image2Url,
//         },
//       ]);

//       if (error) {
//         console.log(error);
//         return;
//       }

//       alert("Package saved successfully");
//     }

//     getPackages();
//     handleCancel();
//   };

//   const handleEdit = (index) => {
//     const pkg = packages[index];

//     setFormData({
//       packageName: pkg.package_name,
//       shortName: pkg.short_name,
//       // File objects null rakhte hain
//       bannerImage: null,
//       footerImage: null,
//       image1: null,
//       image2: null,
//       // Existing URLs preview ke liye
//       bannerImageUrl: pkg.banner_image,
//       footerImageUrl: pkg.footer_image,
//       image1Url: pkg.image1,
//       image2Url: pkg.image2,
//     });

//     setEditingIndex(index);
//     setShowForm(true);
//   };

//   const handleDelete = async (index) => {
//     if (!window.confirm("Kya aap is package ko delete karna chahte hain?")) return;

//     const packageId = packages[index].id;

//     const { error } = await supabase
//       .from("basic_details")
//       .delete()
//       .eq("id", packageId);

//     if (error) {
//       console.log(error);
//       return;
//     }

//     getPackages();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingIndex(null);
//     setFormData({
//       packageName: "",
//       shortName: "",
//       bannerImage: null,
//       footerImage: null,
//       image1: null,
//       image2: null,
//       bannerImageUrl: "",
//       footerImageUrl: "",
//       image1Url: "",
//       image2Url: "",
//     });
//   };

//   // Image field reusable component
 
//   const ImageField = ({ label, fieldName, urlField }) => {
//   const previewUrl = formData[fieldName]
//     ? URL.createObjectURL(formData[fieldName])
//     : formData[urlField] || null;

//   return (
//     <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-indigo-50">
//       <label className="block text-slate-700 font-medium mb-2">{label}</label>

//       {previewUrl && (
//         <div className="mb-3">
//           <img
//             src={previewUrl}
//             alt={label}
//             className="w-full h-28 object-cover rounded-lg border border-indigo-200"
//           />
//           {formData[urlField] && !formData[fieldName] && (
//             <p className="text-xs text-slate-400 mt-1">
//               Nai image choose karo tabhi replace hogi
//             </p>
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

//   return (
//     <div className="bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-700">Basic Package Details</h2>

//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
//             >
//               Add Package
//             </button>
//           )}
//         </div>

//         {/* Package List */}
//         <div>
         

//           {packages.length === 0 ? (
//             <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
//               No Package Created Yet
//             </div>
//           ) : (
//             <div className="grid gap-4">
//               {packages.map((pkg, index) => (
//                 <div
//                   key={pkg.id}
//                   className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={pkg.banner_image}
//                       alt={pkg.package_name}
//                       className="w-24 h-20 object-cover rounded-lg border border-gray-200"
//                     />
//                     <div>
//                       <h4 className="font-semibold text-lg text-gray-700">
//                         {pkg.package_name}
//                       </h4>
//                       <p className="text-gray-500">{pkg.short_name}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleEdit(index)}
//                       className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(index)}
//                       className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

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
//                 {editingIndex !== null ? "Edit Package" : "Add Package"}
//               </h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="grid md:grid-cols-2 gap-6">

//                   <input
//                     type="text"
//                     name="packageName"
//                     value={formData.packageName}
//                     onChange={handleChange}
//                     placeholder="Package Name"
//                     className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
//                   />

//                   <input
//                     type="text"
//                     name="shortName"
//                     value={formData.shortName}
//                     onChange={handleChange}
//                     placeholder="Short Name"
//                     className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300"
//                   />

//                   <ImageField
//                     label="Banner Image"
//                     fieldName="bannerImage"
//                     urlField="bannerImageUrl"
//                   />

//                   <ImageField
//                     label="Footer Image"
//                     fieldName="footerImage"
//                     urlField="footerImageUrl"
//                   />

//                   <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
//                     <ImageField
//                       label="Other Image 1"
//                       fieldName="image1"
//                       urlField="image1Url"
//                     />
//                     <ImageField
//                       label="Other Image 2"
//                       fieldName="image2"
//                       urlField="image2Url"
//                     />
//                   </div>

//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
//                 >
//                   {editingIndex !== null ? "Update Package" : "Save Package"}
//                 </button>
//               </form>

//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default BasicDetails;












import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const BasicDetails = () => {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    packageName: "",
    shortName: "",
    bannerImage: null,
    footerImage: null,
    image1: null,
    image2: null,
    bannerImageUrl: "",
    footerImageUrl: "",
    image1Url: "",
    image2Url: "",
  });

  useEffect(() => {
    getPackages();
  }, []);

  const getPackages = async () => {
    const { data, error } = await supabase
      .from("basic_details")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setPackages(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.packageName || !formData.shortName) {
      alert("Package Name aur Short Name mandatory hain");
      return;
    }

    if (
      !editingId &&
      (!formData.bannerImage ||
        !formData.footerImage ||
        !formData.image1 ||
        !formData.image2)
    ) {
      alert("Add karte waqt saari images mandatory hain");
      return;
    }

    const bannerUrl = formData.bannerImage
      ? await uploadImage(formData.bannerImage)
      : formData.bannerImageUrl;

    const footerUrl = formData.footerImage
      ? await uploadImage(formData.footerImage)
      : formData.footerImageUrl;

    const image1Url = formData.image1
      ? await uploadImage(formData.image1)
      : formData.image1Url;

    const image2Url = formData.image2
      ? await uploadImage(formData.image2)
      : formData.image2Url;

    if (editingId) {
      const { error } = await supabase
        .from("basic_details")
        .update({
          package_name: formData.packageName,
          short_name: formData.shortName,
          banner_image: bannerUrl,
          footer_image: footerUrl,
          image1: image1Url,
          image2: image2Url,
        })
        .eq("id", editingId);

      if (error) {
        console.log(error);
        return;
      }

      alert("Package updated successfully");
    } else {
      const { error } = await supabase.from("basic_details").insert([
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
        return;
      }

      alert("Package saved successfully");
    }

    getPackages();
    handleCancel();
  };

  const handleEdit = (pkg) => {
    setFormData({
      packageName: pkg.package_name,
      shortName: pkg.short_name,
      bannerImage: null,
      footerImage: null,
      image1: null,
      image2: null,
      bannerImageUrl: pkg.banner_image,
      footerImageUrl: pkg.footer_image,
      image1Url: pkg.image1,
      image2Url: pkg.image2,
    });

    setEditingId(pkg.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap is package ko delete karna chahte hain?"))
      return;

    const { error } = await supabase
      .from("basic_details")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    getPackages();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);

    setFormData({
      packageName: "",
      shortName: "",
      bannerImage: null,
      footerImage: null,
      image1: null,
      image2: null,
      bannerImageUrl: "",
      footerImageUrl: "",
      image1Url: "",
      image2Url: "",
    });
  };

  const ImageField = ({ label, fieldName, urlField }) => {
    const previewUrl = formData[fieldName]
      ? URL.createObjectURL(formData[fieldName])
      : formData[urlField] || null;

    return (
      <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 bg-indigo-50">
        <label className="block text-slate-700 font-medium mb-2">
          {label}
        </label>

        {previewUrl && (
          <div className="mb-3">
            <img
              src={previewUrl}
              alt={label}
              className="w-full h-28 object-cover rounded-lg border border-indigo-200"
            />
          </div>
        )}

        <input
          type="file"
          name={fieldName}
          accept="image/*"
          onChange={handleChange}
          className="text-sm text-slate-600"
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">
            Basic Package Details
          </h2>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
            >
              Add Package
            </button>
          )}
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
            No Package Created Yet
          </div>
        ) : (
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={pkg.banner_image}
                    alt={pkg.package_name}
                    className="w-24 h-20 object-cover rounded-lg border border-gray-200"
                  />

                  <div>
                    <h4 className="font-semibold text-lg text-gray-700">
                      {pkg.package_name}
                    </h4>
                    <p className="text-gray-500">{pkg.short_name}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-gray-700 mb-6">
                {editingId ? "Edit Package" : "Add Package"}
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

                  <ImageField
                    label="Banner Image"
                    fieldName="bannerImage"
                    urlField="bannerImageUrl"
                  />

                  <ImageField
                    label="Footer Image"
                    fieldName="footerImage"
                    urlField="footerImageUrl"
                  />

                  <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                    <ImageField
                      label="Other Image 1"
                      fieldName="image1"
                      urlField="image1Url"
                    />

                    <ImageField
                      label="Other Image 2"
                      fieldName="image2"
                      urlField="image2Url"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  {editingId ? "Update Package" : "Save Package"}
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

