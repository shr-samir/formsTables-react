import React from "react";

const DataTable = ({ entries, onDelete, onEdit }) => {
  console.log("Entries:", entries); // Log entries for debugging

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">City</th>
            <th scope="col">District</th>
            <th scope="col">Province</th>
            <th scope="col">Country</th>
            <th scope="col">Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries && entries.length > 0 ? (
            entries.map((entry, index) => (
              <tr key={entry.id || index}>
                <td>{entry.fullName}</td>
                <td>{entry.email}</td>
                <td>{entry.phoneNumber}</td>
                <td>{entry.dob}</td>
                <td>{entry.city}</td>
                <td>{entry.district}</td>
                <td>{entry.province}</td>
                <td>{entry.country}</td>
                <td>
                  {entry.profilePic ? (
                    <img
                      src={entry.profilePic}
                      alt={`Profile of ${entry.fullName}`}
                      style={{ width: "50px", height: "50px", marginTop: "10px" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>
                  <button onClick={() => onEdit(index)}>Edit</button>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default DataTable;
