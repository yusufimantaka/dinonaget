import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientRegistrationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!form.institution.trim()) newErrors.institution = "Institution is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to session storage
    Object.entries(form).forEach(([key, value]) =>
      sessionStorage.setItem(key, value)
    );

    // Navigate to the next page
    navigate('/project');
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white font-sans">
      <button
        className="mt-8 ml-24 px-4 py-2 border-2 border-white rounded-md"
        onClick={() => navigate("/")}>
          Back
      </button>
      <h2 className="text-center text-sm mt-12">OmahTI UGM</h2>
      <h1 className="text-center text-2xl font-bold mb-8">Client Registration Form</h1>

      <div className="flex justify-center items-center mb-5 gap-2">
        <div className="border-2 border-white px-4 py-2 rounded-md bg-orange-500">Company Information</div>
        <div className="flex-grow h-px bg-white max-w-[15%]"></div>
        <div className="border-2 border-white px-4 py-2 rounded-md">Project Information</div>
      </div>

      <div className="bg-zinc-800 border border-white rounded-lg w-[65%] max-w-3xl mx-auto p-10 mt-10">
        <p className="text-center text-sm mb-8">
          Let's get started with your project. Fill in your company details first.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: "Full Name", name: "name", placeholder: "Fill with your full name here" },
            { label: "Email", name: "email", placeholder: "fatimah@badr.co.id", type: "email" },
            { label: "Phone Number", name: "phone", placeholder: "+62 (555) 000-0000", type: "tel" },
            { label: "Institution, Company, or Organization", name: "institution", placeholder: "Universitas Gadjah Mada" },
          ].map(({ label, name, placeholder, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="font-semibold mb-1">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="px-3 py-2 rounded-md text-black text-sm"
                required
              />
              {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientRegistrationForm;
