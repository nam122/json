import React,{ useState,useEffect } from 'react'

const SearchForm = (props) => {

    const [billNo,setBillNo] = useState('');
    const [fulldataback,setFulldataback] = useState('');
    const [message,setMessage] = useState('');
    const [bill,setBill] = useState('');
    const [submit,setSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        datatransmission()
        setSubmit(true)
    }

    const data = {"orderNo":billNo}

    async function datatransmission() {

        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        <div>
        <form onSubmit={handleSubmit}>
            <label>order bill number</label><br/>
            <input name="orderNo" type="text" onChange={(e) => setBillNo(e.target.value)} value={billNo}/><br/>
            <input type="submit" value="submit"/>
        </form><br/>
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
        </div>
    )
}

export default SearchForm;