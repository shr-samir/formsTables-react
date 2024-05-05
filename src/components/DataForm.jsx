import React, { useState, useEffect } from "react";
import axios from "axios";

const DataForm = ({ addEntry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error while fetching countries", error);
      });
  }, []);

  const initialFormData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    dob: "",

    city: "",
    district: "",
    province: "",
    country: "Nepal",

    profilePic: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [imageURL, setImageURL] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; //first file assuming single upload
    if (file && file.type === "image/png") {
      if (imageURL) URL.revokeObjectURL(imageURL); // Revoke the current URL
      const newUrl = URL.createObjectURL(file);
      setImageURL(newUrl);
      setFormData((prev) => ({ ...prev, profilePic: file }));
    } else {
      alert("Only png files are allowed");
    }
  };

  useEffect(() => {
    return () => {
      if (imageURL) URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({...formData, profilePic: imageURL});
    save(formData);
    setFormData(initialFormData);
    setImageURL(null);
  };

  const save = (data) => {
    localStorage.setItem("formData", JSON.stringify(data));
  };

  return (
    <section className="form__container">
      <h2>Fill the Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form__data">
          <div className="form__data--left">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form__data--right">
            <div className="form__data--address">
              Address
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="Province 1">Province 1</option>
                <option value="Province 2">Province 2</option>
                <option value="Province 3">Province 3</option>
                <option value="Province 4">Province 4</option>
                <option value="Province 5">Province 5</option>
                <option value="Province 6">Province 6</option>
                <option value="Province 7">Province 7</option>
              </select>
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="profilePic">Profile Picture</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept=".png"
              // value={formData.profilePic}
              onChange={handleFileChange}
            />

            {/* View Uploaded Image */}
            {formData.profilePic && (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Preview Uploaded Profile Image"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default DataForm;
