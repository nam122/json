import React,{ useState,useEffect } from 'react'

const ShowAllForm = (props) => {

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

    const data = {"customer":"123"}

    async function datatransmission() {

        const Options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
    },1000)

    return (
        <div>
        {!fulldataback ?
        <h1>No order now</h1>:
          <div>
              json:<br/>
              {JSON.stringify(fulldataback)}<br/><br/>
              information<br/><br/>
              {Object.keys(bill).map((item, i) => (
                <div>
                    order {i}
                    <li>orderNo : {bill[item].orderNo}</li>
                    <li>order item code : {bill[item].orderItemCode}</li>
                    <li>order item name : {bill[item].description}</li>
                    <li>quantity : {bill[item].quantity}</li>
                    <li>customer : {bill[item].customer}</li>
                    <li>address : {bill[item].address}</li>
                    <li>date : {bill[item].date}</li>
                    <li>time : {bill[item].time}</li>
                    <br/>
                </div>
                ))}
          </div>
        }
        </div>
    )
}

export default ShowAllForm;