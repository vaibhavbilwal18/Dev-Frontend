import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';


const Premium = () => {
    const handleBuyClick = async (type) => {
        const order = await axios.post(
             BASE_URL + "/payment/create",
            {
               memberShipType:  type,

            },
            { withCredentials: true } 
        );
        
        const { amount , keyId , currency , orderId , notes } = order.data;

        const options = {
        key : keyId, // Replace with your Razorpay key_id
        amount,
        currency,
        name: "Dev-Cord Premium",
        description: "Upgrade to " + type + " Membership",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

          const rzp = new window.Razorpay(options);
          rzp.open();
    };
  return (
     <div className='m-10'> 
    <div className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className='font-bold text-3xl'>Silver MemberShip</h1>
    <ul>
        <li>Access to exclusive channels</li>
        <li>Priority support</li>
        <li>Custom emojis</li>
        <li>Ad-free experience</li>
    </ul>
    <button onClick={() => handleBuyClick("gold")} className="btn btn-primary mt-2">Upgrade Now</button>
  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className='font-bold text-3xl'> Gold MemberShip</h1>
    <ul>
        <li>All Silver benefits</li>
        <li>Early access to new features</li>
        <li>Exclusive events and giveaways</li>
        <li>Enhanced profile customization</li>
    </ul>
    <button onClick={() => handleBuyClick("gold")} className="btn btn-primary mt-2">Upgrade Now</button>
  </div>
</div>
</div>
    
  )
}

export default Premium; 