import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MultiStepRegistrationForm = () => {
  const navigate = useNavigate();

  // State to hold all form data
  const [formData, setFormData] = useState({
    // Client Info
    fullName: "",
    email: "",
    phoneNumber: "",
    institution: "",
    // Project Info
    projectDescription: "",
    techStack: "",
    expectedDeadline: "",
    supportingDocuments: "",
    additionalInformation: "",
    selectedServices: [],
  });

  // State to track the current step
  const [step, setStep] = useState(1); // 1: Client Info, 2: Project Info

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for submission message
  const [message, setMessage] = useState({ text: "", type: "" });

  // Load data from sessionStorage on initial mount
  useEffect(() => {
    const savedData = {};
    const keys = [
        "fullName",
        "email",
        "phoneNumber",
        "institution",
        "projectDescription",
        "techStack",
        "expectedDeadline",
        "supportingDocuments",
        "additionalInformation",
        "selectedServices", // Handle potential stringified array
      ];
    

    keys.forEach((key) => {
      const value = sessionStorage.getItem(key);
      if (value) {
        try {
          // Attempt to parse if it might be an array (selectedServices)
          savedData[key] = key === "selectedServices" ? JSON.parse(value) : value;
        } catch (e) {
          // If parsing fails, keep it as string
          savedData[key] = value;
        }
      }
    });

    setFormData((prev) => ({ ...prev, ...savedData }));

    // Determine the initial step based on saved data presence (basic check)
    // If client info is present, assume user might be on step 2
    if (sessionStorage.getItem("fullName") && sessionStorage.getItem("email") && sessionStorage.getItem("institution")) {
        // Simple logic: if client info is mostly filled, start on step 2 if project info is also started
         setStep(sessionStorage.getItem("projectDescription") ? 2 : 1);
    } else {
        setStep(1); // Always start on step 1 if client info is incomplete
    }


  }, []); // Empty dependency array ensures this runs only once on mount

  // Save data to sessionStorage whenever formData changes
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
        // Handle saving arrays correctly
      sessionStorage.setItem(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });
  }, [formData]);


  // Generic input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the specific error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));
    // Clear submission message on interaction
    setMessage({ text: "", type: "" });
  };

  // Handler for checkbox changes
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      selectedServices: checked
        ? [...prev.selectedServices, value]
        : prev.selectedServices.filter((v) => v !== value),
    }));
    // Clear the specific error for this field
    setErrors((prev) => ({ ...prev, selectedServices: "" }));
     // Clear submission message on interaction
     setMessage({ text: "", type: "" });
  };

  // Basic email format validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validation for Step 1 (Client Info)
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.institution.trim()) newErrors.institution = "Institution is required";
    return newErrors;
  };

  // Validation for Step 2 (Project Info)
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.projectDescription.trim()) newErrors.projectDescription = "Project description is required.";
    if (formData.selectedServices.length === 0) newErrors.selectedServices = "Please select at least one service.";
    if (!formData.techStack.trim()) newErrors.techStack = "Preferred Tech Stack is required.";
    if (!formData.expectedDeadline.trim()) newErrors.expectedDeadline = "Expected Deadline is required.";
    if (!formData.supportingDocuments.trim()) newErrors.supportingDocuments = "Supporting Documents link is required.";
     if (!formData.additionalInformation.trim()) newErrors.additionalInformation = "Additional Information is required.";
    return newErrors;
  };

  // Handle 'Next' button click (from Step 1 to Step 2)
  const handleNext = (e) => {
    e.preventDefault();
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
    } else {
      setErrors({}); // Clear previous errors
      setStep(2); // Move to the next step
    }
  };

  // Handle 'Back' button click (from Step 2 to Step 1)
  const handleBack = () => {
    setStep(1);
    setErrors({}); // Clear errors when going back
     setMessage({ text: "", type: "" }); // Clear message when going back
  };

  // Handle 'Submit' button click (from Step 2, final submission)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Clear previous message

    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return; // Stop if there are errors in step 2
    }

    // Combine all data for submission (already in formData state)
    const combinedData = { ...formData };

    // Save final submission data before sending
    sessionStorage.setItem("finalSubmission", JSON.stringify(combinedData));

    try {
      // Replace with your actual API endpoint
      const res = await fetch("http://localhost:3001/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      });

      const data = await res.json();

      const keys = [
        "fullName",
        "email",
        "phoneNumber",
        "institution",
        "projectDescription",
        "techStack",
        "expectedDeadline",
        "supportingDocuments",
        "additionalInformation",
        "selectedServices", // Handle potential stringified array
      ];

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Server error during submission");
      }

      keys.forEach((key) => {
        const value = sessionStorage.getItem(key);
        if (value) {
          try {
            // Attempt to parse if it might be an array (selectedServices)
            sessionStorage.removeItem(key); // Clear the item after saving
          } catch (e) {
            // If parsing fails, keep it as string
            console.error(`Failed to parse ${key} from sessionStorage:`, e);
          }
        }
      });      // Save submission result
      sessionStorage.setItem("submissionResult", JSON.stringify(data));

      setMessage({
        text: "Your project request has been submitted successfully!",
        type: "success",
      });

      // Optional: Clear session storage after successful submission
       // sessionStorage.clear();

      // Navigate to estimate page or a success page
      navigate("/estimate"); // Or wherever the next step is

    } catch (err) {
      console.error("Submission error:", err);
      setMessage({
        text: "There was an error submitting your request. Please try again later.",
        type: "error",
      });
    }
  };

  // Helper function to render the progress indicator
  const renderProgress = () => (
    <div className="flex justify-center items-center mb-5 gap-2">
      <div className={`border-2 border-white px-4 py-2 rounded-md ${step === 1 ? 'bg-orange-500' : ''}`}>Company Information</div>
      <div className="flex-grow h-px bg-white max-w-[15%]"></div>
      <div className={`border-2 border-white px-4 py-2 rounded-md ${step === 2 ? 'bg-orange-500' : ''}`}>Project Information</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-customGray text-white font-jakarta flex flex-col items-center pt-20">
      <h2 className="pt-20 text-sm">OmahTI UGM</h2>
      <h1 className="text-2xl font-bold mb-8">
        {step === 1 ? "Client Registration Form" : "Project Information Form"}
      </h1>

      {renderProgress()}

      <div className="bg-customGrayLight border border-white rounded-lg w-[90%] max-w-3xl p-10">
        {step === 1 && (
          <>
            <p className="text-center text-l mb-8">
              Let's get started with your project. Fill in your company details first.
            </p>
            <form onSubmit={handleNext} className="flex flex-col gap-4">
              {[
                { label: "Full Name", name: "fullName", placeholder: "Satya Wira" },
                { label: "Email", name: "email", placeholder: "satyaaw@ugm.ac.id", type: "email" },
                { label: "Phone Number", name: "phoneNumber", placeholder: "+62 812-3456-7890", type: "tel" },
                { label: "Institution, Company, or Organization", name: "institution", placeholder: "Universitas Gadjah Mada" },
              ].map(({ label, name, placeholder, type = "text" }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-semibold mb-1">{label}</label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="px-3 py-2 rounded-md text-black text-sm"
                    required // HTML required is secondary to JS validation here but can be helpful
                  />
                  {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
                </div>
              ))}

              {/* Added Back button and changed justification */}
              <div className="flex justify-between mt-6">
                <button
                  type="button" // Use type="button" to prevent form submission
                  onClick={() => navigate('/')} // Navigate to the root path
                  className="bg-customGray text-white px-6 py-2 rounded-md border-white border-2"
                >
                  Back
                </button>
                <button
                  type="submit" // This will trigger handleNext because it's onSubmit of the form
                  className="bg-orange-500 text-white px-6 py-2 rounded-md border-white border-2"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <div>
              <label className="font-semibold mb-1 block">Project Description</label>
              <textarea
                name="projectDescription"
                rows={4}
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe your project..."
                className="w-full p-3 rounded-md text-black text-sm"
                required
              />
              {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription}</p>}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Selected Service(s)</label>
              <div className="flex flex-col gap-2">
                {["company website", "e-commerce website", "mobile app", "ui/ux", "data science", "other"].map((service) => (
                  <label key={service} className="flex items-center gap-2 capitalize">
                    <input
                      type="checkbox"
                      value={service}
                      checked={formData.selectedServices.includes(service)}
                      onChange={handleCheckbox}
                      className="w-4 h-4 accent-orange-500"
                    />
                    {service}
                  </label>
                ))}
              </div>
              {errors.selectedServices && <p className="text-red-500 text-sm">{errors.selectedServices}</p>}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Preferred Tech Stack</label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="React, Laravel, etc."
                className="w-full p-3 rounded-md text-black text-sm"
                required
              />
              {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack}</p>}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Expected Deadline</label>
              <input
                type="date"
                name="expectedDeadline"
                value={formData.expectedDeadline}
                onChange={handleChange}
                className="w-full p-3 rounded-md text-black text-sm"
                required
              />
              {errors.expectedDeadline && <p className="text-red-500 text-sm">{errors.expectedDeadline}</p>}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Supporting Documents (e.g. Google Drive link)</label>
              <input
                type="text"
                name="supportingDocuments"
                value={formData.supportingDocuments}
                onChange={handleChange}
                placeholder="Google Drive or Dropbox link"
                className="w-full p-3 rounded-md text-black text-sm"
                required
              />
              {errors.supportingDocuments && <p className="text-red-500 text-sm">{errors.supportingDocuments}</p>}
            </div>

            <div>
              <label className="font-semibold mb-1 block">Additional Information</label>
              <textarea
                name="additionalInformation"
                rows={4}
                value={formData.additionalInformation}
                onChange={handleChange}
                placeholder="Any other details…"
                className="w-full p-3 rounded-md text-black text-sm"
                required
              />
              {errors.additionalInformation && <p className="text-red-500 text-sm">{errors.additionalInformation}</p>}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack} // Go back to step 1
                className="bg-customGray text-white px-6 py-2 rounded-md border-white border-2"
              >
                Back
              </button>
              <button
                type="submit" // This will trigger handleSubmit
                className="bg-orange-500 text-white px-6 py-2 rounded-md border-white border-2"
              >
                Submit
              </button>
            </div>

            {message.text && (
              <p className={`text-center mt-4 text-${message.type === "success" ? "green" : "red"}-500`}>
                {message.text}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MultiStepRegistrationForm;