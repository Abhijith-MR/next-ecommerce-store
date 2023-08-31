"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import { useState, useEffect } from "react";

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({
  data
}) => {

  const cart = useCart();

  const [servicibility, setServicibility] = useState<{ provider: string; deliveryETA: string; description: string }[]>([]);


  const onAddCart = () => {
    cart.addItem(data);
  }

  const axios = require('axios');

  const checkServicebility = async () => {

    const requestData = {
      pickup_postcode: 110030,
      delivery_postcode: 122002,
      // Add other required fields here
    };

    try {
      // const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
      //     params: requestData,
      //     // Add headers or any other configurations if needed
      // });

      const response = {
        "company_auto_shipment_insurance_setting": false,
        "covid_zones": {
          "delivery_zone": null,
          "pickup_zone": null
        },
        "currency": "INR",
        "data": {
          "available_courier_companies": [
            {
              "courier_name": "Kerry Indev Express",
              "description": "Will Deliver Soon",
              "estimated_delivery_days": "3",
            },


          ],
        },
      }

      const courierCompanies = response.data.available_courier_companies;
      const serviceProviders = courierCompanies.map(company => ({
        provider: company.courier_name,
        deliveryETA: company.estimated_delivery_days,
        description: company.description
      }));
      setServicibility(serviceProviders);
      // Log the response data to the console
      console.log(response.data);
    } catch (error) {
      // Handle errors here
      console.error('An error occurred:', error);
    }
  };

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");



  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>
            {data?.size?.value}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
      <div className="font-semibold text-black pt-6">
        Delivery
        <div className="mt-4">
          <input
           type="number"
           placeholder="Enter Delivery Pincode"
           value={pincode}
           onChange={(e) => setPincode(e.target.value)}
           className={`border rounded-md px-3 py-2 mr-2 ${pincodeError ? "border-red-500" : ""}`}
          />
          {pincodeError && <p className="text-red-500">{pincodeError}</p>}
          <button onClick={() => {
             if (pincode.length !== 6 ) {
              setPincodeError("Pincode must be exactly 6 digits");
            } else {
              setPincodeError("");
              checkServicebility();
            }
          }}

            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Check
          </button>

          <ul>
            {servicibility.map((service, index) => (
              <li key={index}>
                Service Provider: {service.provider},<br/>
                Delivery ETA: {service.deliveryETA} days,<br/>
                Description: {service.description}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Info;