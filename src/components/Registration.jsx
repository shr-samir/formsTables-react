import React, { useState, useEffect } from "react";
import DataForm from "./DataForm";
import DataTable from "./DataTable";

const Registration = () => {
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // Load data from local storage
  useEffect(() => {
   const storedEntries = JSON.parse(localStorage.getItem("formData")) || [];
   setEntries(storedEntries);
 }, []);

  const addEntry = (formData) => {
    if (editIndex >= 0) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = formData;
      setEntries(updatedEntries);
      localStorage.setItem("formData", JSON.stringify(updatedEntries)); // Update local storage
      setEditIndex(-1); // Reset edit mode
    } else {
      const updatedEntries = [...entries, formData];
      setEntries(updatedEntries);
      localStorage.setItem("formData", JSON.stringify(updatedEntries));
    }
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("formData", JSON.stringify(updatedEntries));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    // set form data to edited version
   //  DataForm.setFormData(entries[index]);
  };

  return (
    <div>
      <DataForm addEntry={addEntry} formData={entries[editIndex]} />
      <DataTable
        entries={entries}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Registration;
