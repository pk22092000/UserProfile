import React from 'react'

export default function UsersList(props) {
  const { users, gender } = props;
  return (
    <tbody>
      {
        gender === "" || gender === "all" ? (
          users.map((user, index) => (
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
          ))
        ) : (
          users.filter(user => user.gender === gender ? user : '').map((user, index) => (
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
          ))
        )
      }
    </tbody>
  )
}
