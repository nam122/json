import React, {useState, useEffect} from 'react'
import {Container, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';

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
            <InputGroup style={{marginTop:'20%'}}>
                <Input name="orderNo" type="text" onChange={(e) => setBillNo(e.target.value)} value={billNo}/>
                <InputGroupAddon addonType="append"><Button onSubmit={handleSubmit}>Search</Button></InputGroupAddon>
            </InputGroup>

            {submit &&
            <div>
                json : <br/>
                {JSON.stringify(fulldataback)}<br/>
                {message}<br/>
                information<br/>
                order no : {bill['orderNo']}<br/>
                order item code : {bill['orderItemCode']}<br/>
                order item name : {bill['description']}<br/>
                quantity : {bill['quantity']}<br/>
                customer : {bill['customer']}<br/>
                address : {bill['address']}<br/>
                date : {bill['date']}<br/>
                time : {bill['time']}<br/>
            </div>
            }
        </Container>
    )
}

export default SearchForm;