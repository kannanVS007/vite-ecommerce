import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { inr } = useContext(ShopContext);

  // Constructing the correct image URL based on the backend's file storage path
  console.log("image========",image);
  const imageUrl = Array.isArray(image)
    ? `${image[0].replace(/^\/+/, "")}`
    : `${image.replace(/^\/+/, "")}`;
  console.log("================>>>>>", imageUrl);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={imageUrl}
          alt={name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {inr}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
