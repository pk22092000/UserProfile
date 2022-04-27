import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import UsersList from './componets/UsersList'
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from './componets/UserProfile';

var count = 0;
var header = "";
function App(props) {
  const [users, setUsers] = useState([]);
  const [usersSort, setUsersSort] = useState([])
  const [gender, setGender] = useState("")
  const [modalShow, setModalShow] = useState(false);
  const [position, setPosition] = useState(0);
  // console.log(props)

  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (loadMore) {
      axios.get("https://randomuser.me/api?results=30")
        .then(response => {
          const data = response.data.results;
          setUsers([...users, ...data])
          setUsersSort([...usersSort, ...data])
          console.log("DATA: ", data)
          setLoadMore(false)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [loadMore])

  useEffect(() => {
    const table = document.getElementById('table-users')
    console.log(props.scrollable)
    if (props.scrollable) {
      table.addEventListener('scroll', (e) => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      console.log("scrollY: " + window.scrollY)
      console.log("innerHeight: " + window.innerHeight)
      console.log("client Height: " + table.clientHeight)
      console.log("offset top: " + table.offsetTop)

      window.addEventListener('scroll', () => {
        // 91 is margin + header + footer
        if (window.scrollY + window.innerHeight === table.clientHeight + table.offsetTop + 91) {
          setLoadMore(true);
        } 
      });
    }
  }, []); 

  useEffect(() => {
    const table = document.getElementById('table-users');

    if (table.clientHeight <= window.innerHeight && table.clientHeight) {
      setLoadMore(true);
    }
  }, [users]);

  const handleSort = (e) => {
    if (header === e.target.abbr) {
      count++;
    } else {
      count = 1
      header = e.target.abbr
    }
    // console.log("condition: " + count % 3)
    switch (count % 3) {
      case 0:
        var results = users.slice();
        setUsersSort(results)
        break;
      case 1:
        results = users.slice()
        results.sort((prev, next) => {
          var header1 = header.slice(0, header.indexOf("."));
          var header2 = header.slice(header.indexOf(".") + 1, header.length);
          var userPrev;
          var userNext;
          if (header.indexOf(".") === -1) {
            userPrev = prev[header].toString().toUpperCase();
            userNext = next[header].toString().toUpperCase();
          } else {
            userPrev = prev[header1][header2].toString().toUpperCase();
            userNext = next[header1][header2].toString().toUpperCase();
          }
          if (userPrev < userNext) {
            return -1;
          }
          if (userPrev > userNext) {
            return 1;
          }
          return 0;
        });
        setUsersSort(results)
        break;
      case 2:
        results = users.slice()
        results.sort((prev, next) => {
          var header1 = header.slice(0, header.indexOf("."));
          var header2 = header.slice(header.indexOf(".") + 1, header.length);
          var userPrev;
          var userNext;
          if (header.indexOf(".") === -1) {
            userPrev = prev[header].toString().toUpperCase();
            userNext = next[header].toString().toUpperCase();
          } else {
            userPrev = prev[header1][header2].toString().toUpperCase();
            userNext = next[header1][header2].toString().toUpperCase();
          }
          if (userPrev < userNext) {
            return -1;
          }
          if (userPrev > userNext) {
            return 1;
          }
          return 0;
        }).reverse();
        setUsersSort(results)
        break;
      default:
        break;
    }
  }

  return (
    <div className="grid-container">
      <header>

      </header>
      <main>
        <div className='filter-bar'>
          <div>
            <label>Gender: &nbsp;</label>
            <select name='gender' onChange={e => setGender(e.target.value)}>
              <option value={"all"}>All</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <a className='btn-primary btn mx-2' href={"https://randomuser.me/api/?format=csv"} >Download CVS</a>
        </div>
        <table id={"table-users"}> 
          <thead>
            <tr>
              <th abbr='name.title' onClick={handleSort} >Title</th>
              <th abbr='name.first' onClick={handleSort} >Full Name</th>
              <th abbr='email' onClick={handleSort} >Email</th>
              <th abbr='cell'>Cell</th>
              <th abbr='gender' onClick={handleSort} >Gender</th>
              <th abbr='picture.large'>Avatar URL</th>
              <th abbr='dob.date' onClick={handleSort} >Birthyear</th>
              <th abbr='login.username' onClick={handleSort} >Username</th>
              <th abbr='location.postcode' onClick={handleSort} >Postcode</th>
              <th abbr='location.country' onClick={handleSort} >Country</th>
              <th abbr='location.state' onClick={handleSort} >State</th>
              <th abbr='location.city' onClick={handleSort} >City</th>
              <th abbr='location.street'>Street</th>
              <th abbr='location.timezone'>Timezone</th>
              <th abbr='nat' onClick={handleSort}>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {
              usersSort && (
                gender === "" || gender === "all" ? (
                  usersSort.map((user, index) => (
                    <UsersList
                      key={index}
                      user={user}
                      setModalShow={value => setModalShow(value)}
                      position={index}
                      setPosition={value => setPosition(value)}
                    />
                  ))
                ) : (
                  usersSort.filter(user => user.gender === gender ? user : '').map((user, index) => (
                    <UsersList
                      key={index}
                      user={user}
                      setModalShow={value => setModalShow(value)}
                      position={index}
                      setPosition={value => setPosition(value)}
                    />
                  ))
                )
              )
            }

          </tbody>
        </table>

        {/* Modal */}
        <UserProfile user={users[position]} show={modalShow} onHide={() => setModalShow(false)}></UserProfile>

      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;


