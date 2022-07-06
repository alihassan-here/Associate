import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAssociate = () => {
    const navigate = useNavigate()
    // const[data,seData]=useState([])
    const { id } = useParams("")
    const [associate, setAssociate] = useState({
        name: "",
        email: "",
        landline: "",
        mobile: "",
        account: "",
        coutry: "",
        address: ""
    })
    const handleAssociate = (e) => {
        const { name, value } = e.target;
        setAssociate({
            ...associate,
            [name]: value
        })
    }



    const getData = async () => {


        axios.get(`https://cargoxperts.herokuapp.com/getuser/${id}`, {
            headers: {
                authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token"))
            }
        }).then((res) => {
            setAssociate(res.data)

        }).catch((err) => {
            alert(err)
        })
    }
    useEffect(() => {
        getData()
    }, [])

    const updateAssociate = () => {
        const { name, email, landline, mobile, account, country, address } = associate
        axios.patch(`https://cargoxperts.herokuapp.com/updateuser/${id}`, { name, email, landline, mobile, account, country, address }).then((res) => {
            //    setAssociate(res.data)
            alert("Associate Updated")
            navigate('/')

        }).catch((err) => {
            alert(err)
        })
    }
    return (
        <div className='register_associate container mt-4'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type='text' className='form-control' name='name' value={associate.name} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='text' className='form-control' name='email' value={associate.email} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Land Line No.</label>
                        <input type='number' className='form-control' name='landline' value={associate.landline} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Mobile No.</label>
                        <input type='number' className='form-control' name='mobile' value={associate.mobile} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Bank Account</label>
                        <input type='number' className='form-control' name='country' value={associate.account} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Country</label>
                        <input type='text' className='form-control' name='country' value={associate.country} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Address</label>
                        <input type='text' className='form-control' name='address' value={associate.address} onChange={handleAssociate} />
                    </div>
                </div>

            </div>
            <div className='d-flex justify-content-center mt-3'>
                <button className='login' onClick={updateAssociate}>Update Assocciate</button>
            </div>



        </div>
    )
}

export default EditAssociate