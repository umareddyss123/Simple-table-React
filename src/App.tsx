import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  enum sortOptionsEnum {
    no = "no", name = "name", address = "address", number = "number", email = "email"
  };
  const Data = [
    {
      no:"1",
      name: "Uma",
      address: "Water food road",
      number: "1-333-500032",
      email: "reddy.uma@gmail.com",
    },
    {
      no:"2",
      name: "latha",
      address: "sec-bad",
      number: "5000032",
      email: "reddy.latha@gmail.com",
    },
    {
      no:"3",
      name: "priya",
      address: "Main road",
      number: "222-500032",
      email: "reddy.priya@gmail.com",
    },
  ];
  const sortOptions = ["no","name","address","number","email"];
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(sortOptionsEnum.no);
  const [searchKey, setSearchKey] = useState("");
  const [filterBy, setFilterBy] = useState<sortOptionsEnum>(sortOptionsEnum.no);
  const [users, setUsers] = useState(Data);

  const handleSort = (e: any) => {
    const selectedSortBy: sortOptionsEnum = e.target.value;
    setSortBy(selectedSortBy);
    const usersSort = Data;
    usersSort.sort(function(a, b) {
      const nameA = a[selectedSortBy].toUpperCase(); // ignore upper and lowercase
      const nameB = b[selectedSortBy].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })
    setUsers(usersSort);
  }

  const filterIt = (e: any) => {
    setSearchKey(e.target.value);
    const filterData = Data.filter(user => user[filterBy].toLowerCase().indexOf(e.target.value.toLowerCase())>-1);
    setUsers(filterData);
  }

  const usersInfo = users.map(user => {
    return <tr>
    <td>{user.no}</td>
    <td>{user.name}</td>
    <td>{user.address}</td>
    <td>{user.number}</td>
    <td>{user.email}</td>
  </tr>
  });
  return (
   <table>
     <thead>
       <tr>
         <th>No</th>
         <th>Name</th>
         <th>Address</th>
         <th>Phone Number</th>
         <th>Email</th>
       </tr>
     </thead>
     <tbody>
       {usersInfo}
      <tr>
        <td>
        <h5>Sort By</h5>
        <select style={{width:"100%",borderRadius: "2px",height:"35px"}} onChange={handleSort} value={sortBy}> 
        {
          sortOptions.map(opt => <option value={opt}>{opt}</option>)
        }

        </select>
        </td>
        <td> <h5>Filter By</h5> 
        <select style={{width:"100%",borderRadius: "2px",height:"35px"}} onChange={(e) => setFilterBy(e.target.value as sortOptionsEnum)} value={filterBy}> 
        {
          sortOptions.map(opt => <option value={opt}>{opt}</option>)
        }

        </select>
        </td>
        <td>
        <input value={searchKey} onChange={filterIt} placeholder="Key"/>
        </td>
      </tr>
     </tbody>
   </table>
  );
}

export default App;
