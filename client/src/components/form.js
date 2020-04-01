import React,{ useState,useEffect } from 'react'

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

    useEffect(() => {
        setDate(new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear())
        setTime(new Date().getHours()+':'+new Date().getMinutes())
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setDate(new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear())
        setTime(new Date().getHours()+':'+new Date().getMinutes())
        datatransmission()
        setOrderItemCode('')
        setDescription('')
        setQuantity('')
        setCustomer('')
        setAddress('')
        setSubmit(true)
    }

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
        <form onSubmit={handleSubmit}>
            <label>order item code</label><br/>
            <input name="orderItemCode" type="text" onChange={(e) => setOrderItemCode(e.target.value)} value={orderItemCode}/><br/>
            <label>order item  name</label><br/>
            <input name="description" type="text" onChange={(e) => setDescription(e.target.value)} value={description}/><br/>
            <label>quantity</label><br/>
            <input name="quantity" type="text" onChange={(e) => setQuantity(e.target.value)} value={quantity}/><br/>
            <label>company name</label><br/>
            <input name="customer" type="text" onChange={(e) => setCustomer(e.target.value)} value={customer}/><br/>
            <label>address</label><br/>
            <input name="address" type="text" onChange={(e) => setAddress(e.target.value)} value={address}/><br/>
            <input type="submit" value="submit"/>
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