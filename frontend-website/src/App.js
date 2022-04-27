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

  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (loadMore) {
      axios.get("https://randomuser.me/api?results=30")
        .then(response => {
          const data = response.data.results;
          setUsers([...users, ...data])
          setUsersSort([...usersSort, ...data])
          setLoadMore(false)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [loadMore, usersSort, users])

  useEffect(() => {
    const table = document.getElementById('table-users')
    if (props.scrollable) {
      table.addEventListener('scroll', (e) => {
        const el = e.target;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= table.clientHeight + table.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  }, [props.scrollable]);

  useEffect(() => {
    const table = document.getElementById('table-users');

    if (table.clientHeight <= window.innerHeight && table.clientHeight) {
      setLoadMore(true);
    }
  }, [users]);
  const handleSort = (e) => {
    if (header === e.target.title) {
      count++;
    } else {
      count = 1
      header = e.target.title
    }
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
              <th title='name.title' onClick={handleSort} >Title</th>
              <th title='name.first' onClick={handleSort} >Full Name</th>
              <th title='email' onClick={handleSort} >Email</th>
              <th title='cell' className='none-click'>Cell</th>
              <th title='gender' onClick={handleSort} >Gender</th>
              <th title='picture.large' className='none-click'>Avatar URL</th>
              <th title='dob.date' onClick={handleSort} >Birthyear</th>
              <th title='login.username' onClick={handleSort} >Username</th>
              <th title='location.postcode' onClick={handleSort} >Postcode</th>
              <th title='location.country' onClick={handleSort} >Country</th>
              <th title='location.state' onClick={handleSort} >State</th>
              <th title='location.city' onClick={handleSort} >City</th>
              <th title='location.street' className='none-click'>Street</th>
              <th title='location.timezone' className='none-click'>Timezone</th>
              <th title='nat' onClick={handleSort}>Nationality</th>
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


