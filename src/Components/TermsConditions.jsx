import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../../supabaseClient";

const createEmptyForm = () => ({
  termsName: "",
  termsContent: "",
});

// ─── SunEditor CDN Loader ─────────────────────────────────────────────────────
const loadSunEditor = () => {
  return new Promise((resolve) => {
    if (window.SUNEDITOR) return resolve(window.SUNEDITOR);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js";
    script.onload = () => resolve(window.SUNEDITOR);
    document.head.appendChild(script);
  });
};

// ─── SunEditor Component ──────────────────────────────────────────────────────
const SunEditorField = ({ value, onChange, editorKey }) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    loadSunEditor().then((SUNEDITOR) => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      editorRef.current = SUNEDITOR.create(textareaRef.current, {
        toolbarItem: [
          ["bold", "underline", "italic"],
          ["list", "align"],
          ["link"],
          ["undo", "redo"],
        ],
        height: 250,
        defaultStyle: "font-size: 14px;",
      });

      if (value) editorRef.current.setContents(value);

      editorRef.current.onChange = (contents) => {
        onChange(contents);
      };
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [editorKey]);

  return <textarea ref={textareaRef} style={{ display: "none" }} />;
};

const TermsConditions = () => {
  const [formData, setFormData] = useState(createEmptyForm());
  const [termsList, setTermsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getTerms = async () => {
    const { data, error } = await supabase
      .from("terms_conditions")
      .select("*");

    if (error) { console.log(error); return; }

    setTermsList(data || []);
  };

  useEffect(() => {
    getTerms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsName.trim()) {
      alert("Terms Name mandatory hai");
      return;
    }

    const payload = {
      terms_name: formData.termsName,
      terms_content: formData.termsContent,
    };

    if (editingId) {
      await supabase
        .from("terms_conditions")
        .update(payload)
        .eq("id", editingId);

      alert("Updated successfully");
    } else {
      await supabase.from("terms_conditions").insert([payload]);
      alert("Saved successfully");
    }

    setFormData(createEmptyForm());
    setEditingId(null);
    setShowForm(false);
    getTerms();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setShowForm(true);

    setFormData({
      termsName: item.terms_name,
      termsContent: item.terms_content,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete karna hai?")) return;

    await supabase.from("terms_conditions").delete().eq("id", id);
    getTerms();
  };

  const handleCancel = () => {
    setFormData(createEmptyForm());
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">
            Terms & Conditions
          </h2>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Add Terms
            </button>
          )}
        </div>

        <div className="grid gap-4 mb-8">
          {termsList.length === 0 ? (
            !showForm && (
              <div className="text-center py-10 bg-gray-100 rounded-xl text-gray-500">
                No Terms Created Yet
              </div>
            )
          ) : (
            termsList.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <h4 className="font-semibold text-gray-700">
                  {item.terms_name}
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

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              value={formData.termsName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  termsName: e.target.value,
                })
              }
              placeholder="Terms Name *"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Terms & Conditions
              </label>

            <SunEditorField
                key={editingId || "new"}
                editorKey={editingId || "new"}
                value={formData.termsContent}
                onChange={(content) =>
                  setFormData({ ...formData, termsContent: content })
                }
              />
            </div>

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

export default TermsConditions;
