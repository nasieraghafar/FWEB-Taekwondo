import { useState } from "react";
import { useNavigate } from "react-router";
import "../AddMember.css";

export default function AddMember() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    belt_level: "",
    year_of_study: "",
    profile_image: null, // Store the profile image here
    imageError: "", // Store image validation error message
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return {
        ...prev,
        ...value,
      };
    });
  }

  // Convert image to Base64, validate square, and check size
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25000) { // Check if the file size is more than 25KB
        updateForm({ imageError: "The image must not exceed 25KB." });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Check if the image is square
          if (img.width !== img.height) {
            updateForm({ imageError: "The image must be square." });
          } else {
            updateForm({ profile_image: reader.result, imageError: "" }); // Reset error if valid
          }
        };
        img.src = reader.result; // Set image source to the loaded file data
      };
      reader.readAsDataURL(file); // Convert the image to Base64
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.belt_level ||
      !form.year_of_study
    ) {
      window.alert("Please fill in all fields before submitting.");
      return;
    }

    // If there's an image error, prevent form submission
    if (form.imageError) {
      window.alert(form.imageError);
      return;
    }

    const newPerson = { ...form };

    // Send the form data to the backend
    await fetch("http://localhost:5050/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert("An error occurred: " + error.message);
      return;
    });

    setForm({
      name: "",
      email: "",
      password: "",
      belt_level: "",
      year_of_study: "",
      profile_image: null,
      imageError: "", // Reset image error
    });
    navigate("/admin-members");
  }

  return (
    <div className="add-member-card">
      <form onSubmit={onSubmit} className="add-member-form">
        <div className="form-container">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Belt Level</label>
              <select
                className="form-control"
                value={form.belt_level}
                onChange={(e) => updateForm({ belt_level: e.target.value })}
              >
                <option value="">Choose belt</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Black">Black</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <select
                className="form-control"
                value={form.year_of_study}
                onChange={(e) => updateForm({ year_of_study: e.target.value })}
              >
                <option value="">Choose year</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Type email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Type your password"
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
              />
            </div>

            {/* Image upload with error message */}
            <div className="form-group">
              <label>Update Profile Image</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {form.profile_image && (
                  <img
                    src={form.profile_image}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginLeft: "10px", // Image margin for spacing
                      marginTop: "10px",
                    }}
                  />
                )}
              </div>
              {form.imageError && <p style={{ color: "red" }}>{form.imageError}</p>}
            </div>
          </div>
        </div>

        {/* Add Member Button */}
        <div className="add-update-member-button-container">
          <button type="submit" className="btn btn-danger add-update-member-button">
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
}
