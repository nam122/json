import React,{ useState,useEffect } from 'react'

function Show() {

  const [fulldataback,setFulldataback] = useState('');
  const [bill,setBill] = useState('');

  async function datatransmission() {

      const Options = {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
      };
  
      const response = await fetch('http://localhost:5000/getdata/', Options)
      response
          .json()
          .then(response => (
              setFulldataback(response),
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


export default Show;
