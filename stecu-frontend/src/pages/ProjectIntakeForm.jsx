import React, { useState } from "react";

const ProjectIntakeForm = () => {
  const [form, setForm] = useState({
    description: "",
    tech: "",
    deadline: "",
    additional: "",
    services: [],
    files: [],
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((v) => v !== value),
    }));
    setErrors((prev) => ({ ...prev, services: "" }));
  };

  const handleFiles = (e) => {
    setForm((prev) => ({ ...prev, files: Array.from(e.target.files) }));
    setErrors((prev) => ({ ...prev, files: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = "This field is required.";
    if (form.services.length === 0) newErrors.services = "Please select at least one service.";
    if (!form.tech.trim()) newErrors.tech = "This field is required.";
    if (!form.deadline.trim()) newErrors.deadline = "This field is required.";
    if (!form.additional.trim()) newErrors.additional = "This field is required.";
    if (form.files.length === 0) newErrors.files = "Please upload at least one file.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("description", form.description);
    formData.append("tech", form.tech);
    formData.append("deadline", form.deadline);
    formData.append("additional", form.additional);
    form.services.forEach((s) => formData.append("services[]", s));
    form.files.forEach((file) => formData.append("files[]", file));

    ["fullName", "email", "phone", "institution"].forEach((key) => {
      const val = sessionStorage.getItem(key);
      if (val) formData.append(key, val);
    });

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      setMessage({ text: "Your project request has been submitted successfully!", type: "success" });
      setForm({ description: "", tech: "", deadline: "", additional: "", services: [], files: [] });
    } catch (err) {
      console.error(err);
      setMessage({ text: "There was an error submitting your request. Please try again later.", type: "error" });
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white p-6 font-sans">
      <button onClick={() => window.history.back()} className="ml-24 mt-8 px-4 py-2 border border-white rounded-md">
        Back
      </button>
      <h2 className="text-center text-sm mt-12">OmahTI UGM</h2>
      <h1 className="text-center text-2xl font-bold mb-8">Client Registration Form</h1>
      <div className="flex justify-center items-center mb-5 gap-2">
        <div className="border-2 border-white px-4 py-2 rounded-md">Company Information</div>
        <div className="flex-grow h-px bg-white max-w-[15%]"></div>
        <div className="border-2 border-white px-4 py-2 rounded-md bg-orange-500">Project Information</div>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-800 border border-white rounded-lg w-[65%] max-w-3xl mx-auto p-10 flex flex-col gap-6">
        <div>
          <label className="font-semibold block mb-2">Project Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Type your project description…"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-black"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <p className="font-semibold mb-2">Which service(s) do you need for this project?</p>
          <div className="flex flex-col gap-2">
            {["Website", "Mobile Application", "UI/UX Design/Mockup", "Data Science", "Game Development", "Other"].map((label) => {
              const value = label.toLowerCase().split("/")[0].replace(" ", "");
              return (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={value}
                    checked={form.services.includes(value)}
                    onChange={handleCheckbox}
                    className="w-4 h-4 rounded border border-gray-300 accent-orange-500"
                  />
                  {label}
                </label>
              );
            })}
          </div>
          {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}
        </div>

        <div>
          <label className="font-semibold block mb-2">Is there any specific tech stacks that you need in developing this project?</label>
          <input
            type="text"
            name="tech"
            value={form.tech}
            onChange={handleChange}
            placeholder="React Native, Django, etc."
            className="w-full p-3 rounded-md text-black"
          />
          {errors.tech && <p className="text-red-500 text-sm">{errors.tech}</p>}
        </div>

        <div>
          <label className="font-semibold block mb-2">Expected Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-black"
          />
          {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
        </div>

        <div>
          <label className="font-semibold block mb-2">Supporting Documents (design, mockup, requirements, etc)</label>
          <label className="inline-block bg-orange-500 px-4 py-2 rounded-md cursor-pointer text-white">
            Upload
            <input type="file" multiple onChange={handleFiles} className="hidden" />
          </label>
          <p className="mt-2 text-sm">{form.files.map((f) => f.name).join(", ")}</p>
          {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
        </div>

        <div>
          <label className="font-semibold block mb-2">Additional Information</label>
          <textarea
            name="additional"
            rows={4}
            placeholder="Any other details…"
            value={form.additional}
            onChange={handleChange}
            className="w-full p-3 rounded-md text-black"
          />
          {errors.additional && <p className="text-red-500 text-sm">{errors.additional}</p>}
        </div>

        <button
          type="submit"
          className="self-end bg-orange-500 px-6 py-2 rounded-md border border-white"
        >
          Submit
        </button>

        {message.text && (
          <p className={`text-center mt-4 text-${message.type === "success" ? "green" : "red"}-500`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProjectIntakeForm;
