import React from 'react'
export default function UsersList(props) {
  const { user, setModalShow, position,  setPosition } = props;
// console.log(user)
  return (
    user && (
      <tr>
        <td> {user.name.title} </td>
        <td onClick={(e) => {
          setPosition(position)
          setModalShow(true)
        }} > {user.name.first} {user.name.last} </td>
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
}
