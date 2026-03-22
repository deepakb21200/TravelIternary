// export default function Sidebar() {
//   const sections = [
//     'Basic Details',
//     'Hotel Details',
//     'Vehicle Details',
//     'Service Details',
//     'Package Content',
//     'Terms & Conditions',
//   ];

//   return (
//     <div style={{ minHeight: '100vh' }} className="flex bg-slate-100 border-4 border-red-400">
//       <aside
//         style={{ width: '280px' }}
//         className="bg-white border-r border-slate-200 shadow-sm p-5"
//       >
//         <h2 className="text-xl font-semibold text-slate-800 mb-6">Package Setup</h2>

//         <div className="flex flex-col gap-3">
//           {sections.map((section, index) => (
//             <button
//               key={section}
//               style={{ transition: 'all 0.2s ease' }}
//               className={`text-left px-4 py-3 rounded-xl border font-medium text-sm ${
//                 index === 0
//                   ? 'bg-blue-600 text-white border-blue-600'
//                   : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
//               }`}
//             >
//               {section}
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* <main className="flex-1 p-8">
//         <div
//           style={{ minHeight: '85vh' }}
//           className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
//         >
//           <h1 className="text-2xl font-semibold text-slate-800 mb-4">Basic Details</h1>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Package Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter package name"
//                 style={{ outline: 'none' }}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Duration
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter duration"
//                 style={{ outline: 'none' }}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Description
//             </label>
//             <textarea
//               rows="6"
//               placeholder="Write package description..."
//               style={{ resize: 'none', outline: 'none' }}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm"
//             />
//           </div>
//         </div>
//       </main> */}
//     </div>
//   );
// }











import { NavLink } from "react-router-dom";

const sections = [
  { name: "Basic Details", path: "/" },
  { name: "Hotel Details", path: "/hotel-details" },
  { name: "Vehicle Details", path: "/vehicle-details" },
  { name: "Service Details", path: "/service-details" },
  { name: "Package Content", path: "/package-content" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
];


export default function PackageSidebar() {
  return (
    <aside className="bg-white border-r border-slate-200 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Package Sections
      </h2>

      <div className="flex flex-col gap-3">
       {sections.map((section) => (
          <NavLink
            key={section.name}
            to={section.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-xl border text-sm font-medium transition-all block ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`
            }
          >
            {section.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}