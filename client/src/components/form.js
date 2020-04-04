import React,{ useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useForm } from "react-hook-form"

const Form = (props) => {

    const [orderItemCode, setOrderItemCode] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fulldataback,setFulldataback] = useState('');
    const [message,setMessage] = useState('');
    const [bill,setBill] = useState('');
    const [submit,setSubmit] = useState(false);

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

    const { register, errors, handleSubmit } = useForm();
    const onSubmit = data => datatransmission()

    useEffect(() => {
        setDate(new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear())
        setTime(new Date().getHours()+':'+new Date().getMinutes())
    })

    const data = {orderItemCode,description,quantity,customer,address,date,time}

    async function datatransmission() {

        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            <FormLabel component="legend" style={{fontSize:'24px'}}>Order Form</FormLabel><br/>
            <label>order item code</label><br/>
            <input name="orderItemCode" type="text" onChange={(e) => setOrderItemCode(e.target.value)} value={orderItemCode}/><br/>
            <label>order item  name</label><br/>
            <input name="description" type="text" onChange={(e) => setDescription(e.target.value)} value={description}/><br/>
            <label>quantity</label><br/>
            <TextField style={{minWidth:'170'}} id="standard-basic" label="quantity" name="quantity" type="int"
            onChange={(e) => setQuantity(e.target.value)} value={quantity} />
            {errors.quantity && "Quantity is required"}
            <label>company name</label><br/>
            <input name="customer" type="text" onChange={(e) => setCustomer(e.target.value)} value={customer}/><br/>
            <label>address</label><br/>
            <input name="address" type="text" onChange={(e) => setAddress(e.target.value)} value={address}/><br/>
            <br/><br/><Button type="submit"
              style={{position:'relative'}}
              fullwidth variant="contained" color="primary">Submit</Button>
        </form><br/>
        {submit &&
            <div>
            json : <br/>
            {JSON.stringify(fulldataback)}<br/><br/>
            {message}<br/><br/>
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
        </div>
    )
}

export default Form;
