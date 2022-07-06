import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Home = ({ setLoginUser }) => {

  const navigate = useNavigate();

  const [data, setData] = useState([])

  const [search, setSearch] = useState("")
  const getData = async () => {


    axios.get("http://localhost:9002/getdata", {
      headers: {
        authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token"))
      }
    }).then((res) => {
      setData(res.data)
    }).catch((err) => {
      navigate("/login")
      // alert("errpr   ======="+err)
    })
  }
  useEffect(() => {
    getData()
  }, []);

  const handleChage=e=>{
    setSearch(e.target.value);
  }


  const filteredPosts = data?.filter(
    el => {
        return (
            el.name.toLowerCase().includes(search.toLowerCase()) ||   el.country.toLowerCase().includes(search.toLowerCase())
        );
    }
);
 

  const deleteUser = (id) => {

    axios.delete(`http://localhost:9002/deleteuser/${id}`, {
      headers: {
        authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token"))
      }
    }).then((res) => {
      //    
      alert("Associate Deleted")
      getData()

    }).catch((err) => {
      navigate("/login")
      //  alert(err)
    })
  }
  return (


    <div className='container'>
     
      <div className='d-flex justify-content-between my-4'>
        <div className='search_wrapper d-flex'>

          <input className="form-control me-2 _input" type="text" name='search' placeholder="Search" onChange={handleChage} />
          <button className="btn login" type="submit" >Search</button>

        </div>

        <NavLink to='/register_' className='login'>Add Associate </NavLink>
      </div>

      {/* Associate data  */}
      <div className='associate_data'>

        <div className="table-responsive">

          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Country</th>
                <th className='d-flex justify-content-between'>Action</th>
              </tr>
            </thead>
            <tbody >
              {filteredPosts.map((elem, id) => {
                return (

                  <tr key={id}>
                    <td scope="row">{id + 1}</td>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td >{elem.address}</td>
                    <td>{elem.country}</td>
                    <td scope='col ' className='d-flex justify-content-between actions'>
                      <NavLink to={`/view/${elem._id}`}> <i className="fa-solid fa-eye"></i></NavLink>
                      <NavLink to={`/edit/${elem._id}`}>  <i className="fa-solid fa-user-pen"></i> </NavLink>
                      <i className="fa-solid fa-trash-can" onClick={() => {
                        deleteUser(elem._id)
                      }}></i>
                    </td>
                  </tr>
                )
              })}



            </tbody>
          </table>
        </div>
      </div>

    </div>

  )
}

export default Home