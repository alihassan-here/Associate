import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterAssociate = () => {
    const navigate = useNavigate();
    const [associate, setAssociate] = useState({
        country: "",
        name: "",
        address: "",
        contactperson: "",
        telno: "",
        mobile: "",
        fax: "",
        email: "",
        website: "",

    })
    const handleAssociate = (e) => {
        const { name, value } = e.target;
        setAssociate({
            ...associate,
            [name]: value
        })

    }
    const addAssociate = () => {
        const { country, name, address, contactperson, telno, mobile, fax, email, website } = associate;
        if (!name || !country) {
            alert("please fill the data")
        }
        else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/add`, associate, {
                headers: {
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token"))
                }
            }).then((res) => {
                alert(res.data.message)

                navigate("/")
            })
        }

    }
    return (
        <div className='register_associate container mt-4'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Associate Country:</label>
                        <input type='text' className='form-control' name='country' value={associate.country} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Assocciate Name:</label>
                        <input type='text' className='form-control' name='name' value={associate.name} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Address:</label>
                        <input type='text' className='form-control' name='address' value={associate.address} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Contact Person:</label>
                        <input type='text' className='form-control' name='contactperson' value={associate.contactperson} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Tell No:</label>
                        <input type='text' className='form-control' name='telno' value={associate.telno} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Mobile:</label>
                        <input type='text' className='form-control' name='mobile' value={associate.mobile} onChange={handleAssociate} />
                    </div>
                </div>

                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Fax:</label>
                        <input type='text' className='form-control' name='fax' value={associate.fax} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input type='text' className='form-control' name='email' value={associate.email} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Website Link:</label>
                        <input type='text' className='form-control' name='website' value={associate.website} onChange={handleAssociate} />
                    </div>
                </div>

            </div>
            <div className='d-flex justify-content-center mt-3'>
                <button className='login' onClick={addAssociate}>Add Assocciate</button>
            </div>



        </div>
    )
}

export default RegisterAssociate