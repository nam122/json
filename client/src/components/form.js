import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import {useForm} from "react-hook-form"

const Form = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [orderItemCode, setOrderItemCode] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fulldataback, setFulldataback] = useState('');
    const [message, setMessage] = useState('');
    const [bill, setBill] = useState('');

    const useStyles = makeStyles(theme => ({
        root: {
            position: 'relative',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '30%',
            padding: "20px",

        },
        formControl: {
            margin: theme.spacing(0),
            minWidth: 340,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        uploader: {
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '128px'
        },
        input: {
            display: 'none',
        },
        crop: {
            width: '300px',
            height: '300px'
        },
    }));

    const classes = useStyles();

    const {register, errors, handleSubmit} = useForm();
    const onSubmit = data => datatransmission()

    useEffect(() => {
        setDate(new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear())
        setTime(new Date().getHours() + ':' + new Date().getMinutes())
    })

    const data = {orderItemCode, description, quantity, customer, address, date, time}

    async function datatransmission() {

        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:5000/data/', Options)
        response
            .json()
            .then(response => (
                setFulldataback(response),
                    setMessage(response.message),
                    setBill(response.data)))
    }

    return (
        <div>

            {date} {time}
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
                <FormLabel component="legend" style={{fontSize: '24px'}}>Order Form</FormLabel><br/>
                <label>order item code</label><br/>
                <Input name="orderItemCode" type="text" onChange={(e) => setOrderItemCode(e.target.value)}
                       value={orderItemCode}/><br/>
                <label>order item name</label><br/>
                <Input name="description" type="text" onChange={(e) => setDescription(e.target.value)}
                       value={description}/><br/>
                <label>quantity</label><br/>
                <Input style={{minWidth: '170'}} id="standard-basic" label="quantity" name="quantity" type="int"
                       onChange={(e) => setQuantity(e.target.value)} value={quantity}/><br/>
                {errors.quantity && "Quantity is required"}
                <label>company name</label><br/>
                <Input name="customer" type="text" onChange={(e) => setCustomer(e.target.value)} value={customer}/><br/>
                <label>address</label><br/>
                <Input name="address" type="text" onChange={(e) => setAddress(e.target.value)} value={address}/><br/>
                <br/><Button type="submit"
                             style={{position: 'relative'}}
                             fullwidth variant="contained" color="primary">Submit</Button>
            </form>
            <br/>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Result</ModalHeader>
                <ModalBody>
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
                    {JSON.stringify(fulldataback)}<br/><br/>
                    {message}<br/><br/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>


    )
}

export default Form;
