import React from 'react'
export default function UsersList(props) {
  const { user, setModalShow, position, setPosition } = props;
  return (
    user && (
      <tr>
        <td className='text-capitalize'> {user.name.title} </td>
        <td
          className='text-capitalize' 
          onClick={(e) => {
            setPosition(position)
            setModalShow(true)
          }} > {user.name.first} {user.name.last} </td>
        <td> {user.email} </td>
        <td> {user.cell} </td>
        <td className='text-capitalize'> {user.gender} </td>
        <td> <a href={user.picture.large}> {user.picture.large} </a> </td>
        <td> {user.dob.date.slice(0, 4)} </td>
        <td> {user.login.username} </td>
        <td className='text-uppercase'> {user.location.postcode} </td>
        <td className='text-capitalize'> {user.location.country} </td>
        <td className='text-capitalize'> {user.location.state} </td>
        <td className='text-capitalize'> {user.location.city} </td>
        <td className='text-capitalize'> {user.location.street.number} {user.location.street.name} </td>
        <td> {user.location.timezone.offset} </td>
        <td className='text-uppercase'> {user.nat} </td>
      </tr>
    )
  )
}
