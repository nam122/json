import React,{ useState,useEffect } from 'react'

function DeleteForm() {

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
          method: 'DELETE',
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
    </div>
  )
}


export default DeleteForm;
