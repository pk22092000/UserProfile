import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([]);
  const [usersGender, setUsersGender] = useState([]);
  const [gender, setGender] = useState("")
  const [isSort, setSort] = useState({
    title: "",
    count: 0
  });
  useEffect(() => {
    axios.get("https://randomuser.me/api?results=10")
      .then(response => {
        const data = response.data.results;
        setUsers(data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    var results = users.filter(user => user.gender === gender ? user : '')
    setUsersGender(results)
  }, [gender])

  console.log(isSort);
  console.log(gender)
  console.log(users)

  return (
    <div className="grid-container">
      <header>
        <select name='gender' onChange={e => setGender(e.target.value)}>
          <option value={"all"}>All</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th abbr='title' onClick={e => {
                let title = e.target.abbr
                console.log(e.target.abbr)
                console.log(isSort.count)
                console.log(isSort.title)
                console.log(isSort.title !== title || isSort.count >= 2)
                setSort((isSort.title !== title || isSort.count >= 2) ? { title: title, count: 0 } : { title: title, count: isSort.count + 1 })
              }}>Title</th>
              <th abbr='FullName' onClick={e => {
                let title = e.target.abbr
                console.log(e.target.abbr)
                console.log(isSort.count)
                console.log(isSort.title)
                console.log(isSort.title !== title || isSort.count >= 2)
                setSort((isSort.title !== title || isSort.count >= 2) ? { title: title, count: 0 } : { title: title, count: isSort.count + 1 })
              }}>Full Name</th>
              <th abbr='Email'>Email</th>
              <th abbr=''>Cell</th>
              <th abbr=''>Gender</th>
              <th abbr=''>Avatar URL</th>
              <th abbr=''>Birthyear</th>
              <th abbr=''>Username</th>
              <th abbr=''>Postcode</th>
              <th abbr=''>Country</th>
              <th abbr=''>State</th>
              <th abbr=''>City</th>
              <th abbr=''>Street</th>
              <th abbr=''>Timezone</th>
              <th abbr=''>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {
              !isSort.count ? (
                (gender === "all" || gender === "") ? (
                  users.map((user, index) =>
                    <tr key={index}>
                      <td > {user.name.title} </td>
                      <td> {user.name.first} {user.name.last} </td>
                      <td> {user.email} </td>
                      <td> {user.cell} </td>
                      <td> {user.gender} </td>
                      <td> <a href={user.picture.large}> {user.picture.large} </a> </td>
                      <td> {user.dob.date.slice(0, 4)} </td>
                      <td> {user.login.username} </td>
                      <td> {user.location.postcode} </td>
                      <td> {user.location.country} </td>
                      <td> {user.location.state} </td>
                      <td> {user.location.city} </td>
                      <td> {user.location.street.number} {user.location.street.name} </td>
                      <td> {user.location.timezone.offset} </td>
                      <td> {user.nat} </td>
                    </tr>
                  )
                ) : (
                  usersGender.map((user, index) =>
                    <tr key={index}>
                      <td > {user.name.title} </td>
                      <td> {user.name.first} {user.name.last} </td>
                      <td> {user.email} </td>
                      <td> {user.cell} </td>
                      <td> {user.gender} </td>
                      <td> <a href={user.picture.large}> {user.picture.large} </a> </td>
                      <td> {user.dob.date.slice(0, 4)} </td>
                      <td> {user.login.username} </td>
                      <td> {user.location.postcode} </td>
                      <td> {user.location.country} </td>
                      <td> {user.location.state} </td>
                      <td> {user.location.city} </td>
                      <td> {user.location.street.number} {user.location.street.name} </td>
                      <td> {user.location.timezone.offset} </td>
                      <td> {user.nat} </td>
                    </tr>
                  )
                )                
              ) : isSort.count === 1 ? (
                users.map((user, index) =>
            <tr key={index}>
              <td> {user.name.title} </td>
              <td> {user.name.first} {user.name.last} </td>
              <td> {user.email} </td>
              <td> {user.cell} </td>
              <td> {user.gender} </td>
              <td> <a href={user.picture.large}> {user.picture.large} </a> </td>
              <td> {user.dob.date.slice(0, 4)} </td>
              <td> {user.login.username} </td>
              <td> {user.location.postcode} </td>
              <td> {user.location.country} </td>
              <td> {user.location.state} </td>
              <td> {user.location.city} </td>
              <td> {user.location.street.number} {user.location.street.name} </td>
              <td> {user.location.timezone.offset} </td>
              <td> {user.nat} </td>
            </tr>
            ).reverse()
            ) : isSort.count === 2 ? (
                users.map((user, index) =>
            <tr key={index}>
              <td > {user.name.title} </td>
              <td> {user.name.first} {user.name.last} </td>
              <td>  </td>
              <td> {user.cell} </td>
              <td> {user.gender} </td>
              <td> <a href={user.picture.large}> {user.picture.large} </a> </td>
              <td> {user.dob.date.slice(0, 4)} </td>
              <td> {user.login.username} </td>
              <td> {user.location.postcode} </td>
              <td> {user.location.country} </td>
              <td> {user.location.state} </td>
              <td> {user.location.city} </td>
              <td> {user.location.street.number} {user.location.street.name} </td>
              <td> {user.location.timezone.offset} </td>
              <td> {user.nat} </td>
            </tr>
            )
            ) : (
            ""
            )
            }
          </tbody>
        </table>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
