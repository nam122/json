import React, {useState, useEffect} from 'react'
import {Container, Table} from 'reactstrap';

const ShowAllForm = (props) => {

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

    const data = {"customer": "123"}

    async function datatransmission() {

        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:5000/getalldata/', Options)
        response
            .json()
            .then(response => (
                setFulldataback(response),
                    setMessage(response.message),
                    setBill(response.data)))
    }

    useEffect(() => {
        datatransmission()
    }, 1000)

    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <th>orderNo</th>
                    <th>order item code</th>
                    <th>order item name</th>
                    <th>quantity</th>
                    <th>customer</th>
                    <th>address</th>
                    <th>date</th>
                    <th>time</th>
                </tr>
                </thead>
                <tbody>
                {!fulldataback ?
                    <h1>No order now</h1> :
                    <div>
                        json:<br/>
                        {JSON.stringify(fulldataback)}<br/><br/>
                        information<br/><br/>
                        {Object.keys(bill).map((item, i) => (
                            <tr>
                                <th scope="row">{bill[item].orderNo}</th>
                                <td>{bill[item].orderItemCode}</td>
                                <td>{bill[item].quantity}</td>
                                <td>{bill[item].customer}</td>
                                <td>{bill[item].address}</td>
                                <td>{bill[item].date}</td>
                                <td>{bill[item].time}</td>

                            </tr>

                        ))}
                    </div>
                }
                </tbody>
            </Table>
        </Container>
    )
}


export default ShowAllForm;