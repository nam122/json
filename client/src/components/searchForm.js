import React, {useState, useEffect} from 'react'
import {Container, Input, InputGroup, InputGroupAddon, Button, Table, ModalBody} from 'reactstrap';

const SearchForm = (props) => {

    const [billNo, setBillNo] = useState('');
    const [fulldataback, setFulldataback] = useState('');
    const [message, setMessage] = useState('');
    const [bill, setBill] = useState('');
    const [submit, setSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        datatransmission()
        setSubmit(true)
    }

    const data = {"orderNo": billNo}

    async function datatransmission() {

        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:5000/getdata/', Options)
        response
            .json()
            .then(response => (
                setFulldataback(response),
                    setMessage(response.message),
                    setBill(response.data)))
    }

    return (
        <Container>
            <h2 style={{marginTop: '20%'}}>Search Order By Order No.</h2>
            <InputGroup>
                <Input name="orderNo" type="text" onChange={(e) => setBillNo(e.target.value)} value={billNo}/>
                <InputGroupAddon addonType="append"><Button onSubmit={handleSubmit}>Search</Button></InputGroupAddon>
            </InputGroup>

            {submit &&

            <div>
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Info</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">order No.</th>
                        <td>{bill['orderNo']}</td>
                    </tr>
                    <tr>
                        <th scope="row">order item code</th>
                        <td>{bill['orderItemCode']}</td>
                    </tr>
                    <tr>
                        <th scope="row">order item name</th>
                        <td>{bill['description']}</td>
                    </tr>
                    <tr>
                        <th scope="row">quantity</th>
                        <td>{bill['quantity']}</td>
                    </tr>
                    <tr>
                        <th scope="row">custome:</th>
                        <td>{bill['customer']}</td>
                    </tr>
                    <tr>
                        <th scope="row">address</th>
                        <td>{bill['address']}</td>
                    </tr>
                    <tr>
                        <th scope="row">date</th>
                        <td>{bill['date']}</td>
                    </tr>
                    <tr>
                        <th scope="row">time</th>
                        <td>{bill['time']}</td>
                    </tr>
                    </tbody>
                </Table>
                json : <br/>
                {JSON.stringify(fulldataback)}<br/>
                {message}<br/>
            </div>
            }
        </Container>
    )
}

export default SearchForm;