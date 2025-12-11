import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "../AddMember.css";

export default function EditMember() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    belt_level: "",
    year_of_study: "",
    password: "",
    profile_image: "", // Store the profile image here
    imageError: "", // Store image validation error message
  });
  const params = useParams();
  const navigate = useNavigate();

  // Fetch the current student data for editing
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5050/students/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/admin-members");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // Update form field values
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Update profile image (convert to Base64, validate square, and check size)
  function updateProfileImage(e) {
    const file = e.target.files[0];
    if (file) {
      // Check if the file size exceeds 25KB (25000 bytes)
      if (file.size > 25000) {
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

  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !form.name ||
      !form.email ||
      !form.belt_level ||
      !form.year_of_study ||
      !form.password
    ) {
      window.alert("Please fill in all fields before submitting.");
      return;
    }

    // If there's an image error, prevent form submission
    if (form.imageError) {
      window.alert(form.imageError);
      return;
    }

    const editedPerson = {
      name: form.name,
      email: form.email,
      belt_level: form.belt_level,
      year_of_study: form.year_of_study,
      password: form.password,
      profile_image: form.profile_image, // Add profile image data
    };

    await fetch(`http://localhost:5050/students/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
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
                  onChange={updateProfileImage}
                />
                {form.profile_image && (
                  <img
                    src={form.profile_image}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginTop: "10px",
                      marginLeft: "10px", // Image margin for spacing
                    }}
                  />
                )}
              </div>
              {form.imageError && <p style={{ color: "red" }}>{form.imageError}</p>}
            </div>
          </div>
        </div>

        {/* Update Member Button */}
        <div className="add-update-member-button-container">
          <button type="submit" className="btn btn-danger add-update-member-button">
            Update Member
          </button>
        </div>
      </form>
    </div>
  );
}
