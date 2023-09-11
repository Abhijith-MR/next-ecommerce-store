"use client";
import { ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product, Attribute } from "@/types";
import useCart from "@/hooks/use-cart";
import { useState } from "react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [servicibility, setServicibility] = useState<{
    provider: string;
    deliveryETA: string;
    description: string;
  }[]>([]);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  // Helper function to get color option from attributes
  const colorOption1 = data?.attributes.find(attr => attr.name === 'Color')?.options[0] || '';
  const colorOption2 = data?.attributes.find(attr => attr.name === 'Color')?.options[1] || '';
  const colorOption3 = data?.attributes.find(attr => attr.name === 'Color')?.options[2] || '';

  const colorOptions = ['colorOption1', 'colorOption2', 'colorOption3']

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Function to handle color selection
  const handleColorClick = (color: string) => {
    // Update the selected color state when a color is clicked
    setSelectedColor(color);
  };

  console.log('Selected Color:', selectedColor);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Dimensions:</h3>
          <div className="font-semibold text-black">
            Length: {data.dimensions.length} cm<br />
            Width: {data.dimensions.width} cm<br />
            Height: {data.dimensions.height} cm
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="flex items-center gap-x-4">
            <div
              className={`h-6 w-6 rounded-full border border-gray-600 cursor-pointer ${selectedColor === colorOption1 ? 'selected' : '' // Apply a selected class if colorOption1 is selected
                }`}
              style={{ backgroundColor: colorOption1 }}
              onClick={() => handleColorClick(colorOption1)} // Call handleColorClick on click
            />
            <div
              className={`h-6 w-6 rounded-full border border-gray-600 cursor-pointer ${selectedColor === colorOption2 ? 'selected' : '' // Apply a selected class if colorOption2 is selected
                }`}
              style={{ backgroundColor: colorOption2 }}
              onClick={() => handleColorClick(colorOption2)} // Call handleColorClick on click
            />
            <div
              className={`h-6 w-6 rounded-full border border-gray-600 cursor-pointer ${selectedColor === colorOption3 ? 'selected' : '' // Apply a selected class if colorOption3 is selected
                }`}
              style={{ backgroundColor: colorOption3 }}
              onClick={() => handleColorClick(colorOption3)} // Call handleColorClick on click
            />
          </div>
        </div>

      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={() => cart.addItem(data)} className="flex items-center gap-x-2">
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
            if (pincode.length !== 6) {
              setPincodeError("Pincode must be exactly 6 digits");
            } else {
              setPincodeError("");
              // Call your serviceability function here
            }
          }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
            Check
          </button>
          <ul>
            {servicibility.map((service, index) => (
              <li key={index}>
                Service Provider: {service.provider},<br />
                Delivery ETA: {service.deliveryETA} days,<br />
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
