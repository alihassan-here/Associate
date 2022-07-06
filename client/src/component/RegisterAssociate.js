import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterAssociate = () => {
    const navigate = useNavigate();
    const [associate,setAssociate]=useState({
        name:"",
        email:"",
        landline:"",
        mobile:"",
        country:"",
        account:"",
        address:""
    })
    const handleAssociate=(e)=>{
        const {name,value}=e.target;
        setAssociate({
                ...associate,
                [name]:value
            })
      
        }
        const addAssociate=()=>{
            const{name,email,landline,mobile,country,account,address}=associate;
            if(!email || !name || !mobile || !country){
                alert("please fill the data")
            }
            else {
                axios.post("http://localhost:9002/add",associate,{
                    headers:{
                        authorization: 'Bearer '+JSON.parse(localStorage.getItem("token"))
                    }
                }).then((res)=>{
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
                        <label>Associate Name</label>
                        <input type='text' className='form-control' name='name' value={associate.name} onChange={handleAssociate} />
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Associate Email</label>
                        <input type='text' className='form-control' name='email' value={associate.email}  onChange={handleAssociate}/>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Associate's Land Line No.</label>
                        <input type='number' className='form-control' name='landline' value={associate.landline}  onChange={handleAssociate}/>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Associate's Mobile No.</label>
                        <input type='number' className='form-control' name='mobile' value={associate.mobile}  onChange={handleAssociate}/>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Associate's Bank Account</label>
                        <input type='number' className='form-control' name='account' value={associate.account}  onChange={handleAssociate}/>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <label>Associate Country</label>
                        <input type='text' className='form-control' name='country' value={associate.country}  onChange={handleAssociate}/>
                    </div>
                </div>
               
                <div className='col-12 col-md-12'>
                    <div className='form-group'>
                        <label>Associate Address</label>
                        <input type='text' className='form-control' name='address' value={associate.addressadd}  onChange={handleAssociate}/>
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