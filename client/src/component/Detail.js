import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const [data, seData] = useState([])
    const { id } = useParams("")

    function copyToClip() {
        let str = document.getElementById('foo').innerText
        console.log("str ============ ", str);
        function listener(e) {
            e.clipboardData.setData("text/html", str);
            e.clipboardData.setData("text/plain", str);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
        alert("data copied on clipboard")
    }


    const getData = async () => {


        axios.get(`${process.env.REACT_APP_BASE_URL}/getuser/${id}`, {
            headers: {
                authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token"))
            }
        }).then((res) => {
            seData(res.data)

        }).catch((err) => {
            alert(err)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className='container associate_detail mt-5'>
                <p className='heading mr -4'>{data.name}</p>
                <div className='profile_wrapper my-3'>
                    <img src='/images/prom.png' />
                </div>
                <div className='row mt-4 details_info'>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i className="fa-solid fa-user"></i>Name:</p>
                            <p className='value'>{data.name}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i className="fa-solid fa-earth-africa"></i>Country:</p>
                            <p className='value'>{data.country}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i className="fa-solid fa-address-card"></i>Address:</p>
                            <p className='value'>{data.address}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i class="fa-solid fa-address-book"></i>Contact Person:</p>
                            <p className='value'>{data.contactperson}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i className="fa-solid fa-phone-flip"></i>Tell No:</p>
                            <p className='value'>{data.telno}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i className="fa-solid fa-mobile-screen-button"></i>Mobile:</p>
                            <p className='value'>{data.mobile}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i class="fa-solid fa-fax"></i>Fax:</p>
                            <p className='value'>{data.fax}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i className="fa-solid fa-envelope"></i>Email:</p>
                            <p className='value'>{data.email}</p>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='d-flex'>
                            <p className='heading'><i class="fa-solid fa-browser"></i>Website Link:</p>
                            <p className='value'>{data.website}</p>
                        </div>
                    </div>






                    <button type='button' className='login copyy' onClick={copyToClip}>
                        Copy on Clipboard
                    </button>

                </div>

            </div>
            <div id="foo" className=''>
                <ul className='clip_data'>
                    <li>
                        Country: {data.country}
                    </li>
                    <li>
                        Name: {data.name}
                    </li>
                    <li>
                        Address: {data.address}
                    </li>
                    <li>
                        Contact Person: {data.contactperson}
                    </li>
                    <li>
                        Tell No: {data.telno}
                    </li>
                    <li>
                        Mobile: {data.mobile}
                    </li>
                    <li>
                        Fax: {data.fax}
                    </li>
                    <li>
                        Email: {data.email}
                    </li>


                    <li>
                        Website Link: {data.website}
                    </li>



                </ul>
            </div>
        </>

    )
}

export default Detail