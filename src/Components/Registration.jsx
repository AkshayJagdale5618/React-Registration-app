import React, { useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import './Registration.css'

function Registration() {
    const [show, setShow] = useState(true);
    const [allData, setAllData] = useState([{}]);
    const [buttonState, setButtonState] = useState(true);
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState({
        Fullname : "",
        Email : "",
        Password : "",
        Moblienumber : ""
    })

    function getInputData(e) {
        let target = e.target;
        let value = target.value;
        let key = target.name;
        // console.log(key,":",value);
        return (
            setInput((old)=>{
                return{
                    ...old,
                    [key] : value
                }
            })
        )
    }

    let temp = {}  // Blank object

    const getFormData = (e) => {
        e.preventDefault();
        let form = e.target;
        // console.log(form);

        let formData = new FormData(form);
        // console.log(formData);

        // console.log(formData.get("Fullname"));
        // console.log(formData.get("Email"));
        // console.log(formData.get("Password"));
        // console.log(formData.get("Moblienumber"));
        // console.log(formData.get("Profile"));
        //  OR    

        for (let data of formData.entries()) {
            // console.log(data);
            let key = data[0];
            let value = data[1];
            // console.log(value);
            // console.log(typeof(value));
            if (typeof (value) == 'object') {
                value = URL.createObjectURL(value);
            }
            // console.log(value);
            temp[key] = value;
            // console.log(temp);
        }
        
    }

    function insertData(e) {
        e.preventDefault();
        // alert("Insert data")
        getFormData(e);
        return (
            setAllData((old) => {
                return [
                    ...old,
                    temp
                ]
            }),
            setShow(false),
            setInput({
                Fullname : "",
                Email : "",
                Password : "",
                Moblienumber : ""
            })
        )
        
    }

    function updateData(e) {
        e.preventDefault();
        // alert("Update data")
        // alert(index)
        getFormData(e);
        // console.log(temp)
        const tempData = [...allData];
        // console.log(tempData)
        tempData[index] = temp;
        // console.log(tempData)
        return(
            setShow(false),
            setAllData(tempData)
        )
    }

    function editData(item) {
        // console.log(item);
        // alert(item.index);
        return (
            setShow(true),
            setInput(item),
            setButtonState(false),
            setIndex(item.index)
        )
    }

    function deleteUser(index){
        // console.log(index);
        let tempdata = [...allData];
        // console.log(tempdata);
        tempdata.splice(index,1);
        // window.alert("Ae u want to delete data");
        // console.log(tempdata);
        return(
            setAllData(tempdata)
        )
    }

    function addButton(){
        return(
            setShow(true),
            setInput({
                Fullname : "",
                Email : "",
                Password : "",
                Moblienumber : ""
            }),
            setButtonState(true)
        )
    }

    function Tr({item}) {
        // console.log(item.index);
        return (
            <>
                <tr className='text-center'>
                    <td>{item.index+1}</td>
                    <td><img src={item.Profile} alt="" width={50} height={50} className='rounded-circle' /></td>
                    <td>{item.Fullname}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password} </td>
                    <td>{item.Moblienumber}</td>
                    
                    <td>
                        <Button className='me-2' onClick={()=> editData(item)} >
                            <i className="fa fa-edit" ></i>
                        </Button>
                        <Button variant="danger" onClick={()=>{deleteUser(item.index)}}>
                            <i className="fa fa-trash" ></i>
                        </Button>
                    </td>
                </tr>
            </>
        )
    }

    return (
        <>
            <h1 className='text-center text-red' >Registration Details </h1>
            <Button className='position-absolute bottom-0 end-0 mb-4 m-4 rounded-circle' 
                onClick={addButton}>
                <i className='fa fa-plus'></i>
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Registration </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={buttonState ? insertData : updateData}>
                        <Form.Group>
                            <Form.Label>Full Name :-</Form.Label>
                            <Form.Control 
                                type='text'
                                name='Fullname' 
                                placeholder='Full Name' 
                                onChange={getInputData} 
                                value={input.Fullname}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email :-</Form.Label>
                            <Form.Control 
                                type='email' 
                                name='Email' 
                                placeholder='Email ID' 
                                onChange={getInputData} 
                                value={input.Email}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password :-</Form.Label>
                            <Form.Control 
                                type='password' 
                                name='Password' 
                                placeholder='Password'
                                onChange={getInputData}
                                value={input.Password}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Moblie Number :-</Form.Label>
                            <Form.Control 
                                type='tel' 
                                name='Moblienumber' 
                                placeholder='Moblie Number'
                                onChange={getInputData}
                                value={input.Moblienumber}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Image :-</Form.Label>
                            <Form.Control type='file' name='Profile' placeholder='Insert Your Image ... 'gi  />
                        </Form.Group>
                        <br />
                        {
                            buttonState ? <Button type='submit' variant='primary' className='me-3'> <i className='fa fa-check'></i> Submit </Button> :
                            <Button type='submit' variant='success' className='me-3'> <i className='fa fa-check'></i> Update</Button>
                        }
                        <Button type='reset' variant='danger' onClick={() => setShow(false)}><i className='fa fa-close'></i> Cancel</Button>
                    </Form>
                    {/* <p>{JSON.stringify(input)}</p> */}
                </Modal.Body>
                {/* <Modal.Footer>
                <Button variant='danger' onClick={()=>setShow(false)}>
                    Close <i className='fa fa-close'></i>
                </Button>
                </Modal.Footer> */}
            </Modal>
            {/* <p>{JSON.stringify(allData)}</p> */}
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Sl.No </th>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item, index) => {
                                item['index'] = index;
                                return <Tr item={item} key={index} />
                            })
                        }


                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Registration