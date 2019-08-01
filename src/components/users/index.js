import React from "react";



const Users = () => {

  return (
    <form>
      <input 
        placeholder="Username" 
        name="username" 
      />

      <input 
        placeholder="Password" 
        name="password" 
      />

    <select>
      <option value="admin">Research</option>
      <option value="senior">Research Asst</option>
      <option value="assistant">User</option>
    </select>

      <input type="submit" value="Create User" />
    </form>
  );
};

export default Users;
