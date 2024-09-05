import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relavent");
  const [categoryIdMap, setCategoryIdMap] = useState({});
  const [subCategoryIdMap, setsubCategoryIdMap] = useState({});
  // Fetch categories and their IDs from the backend
  const fetchCategoryIds = async () => {
    try {
      const response = await axios.get('http://localhost:4000/category/getAllCategory');
      const categories = response.data.data; // Adjust based on your response structure

      const idMap = {};
      categories.forEach(category => {
        idMap[category.name] = category._id;
      });

      setCategoryIdMap(idMap);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const fetchsubCategoryIds = async () => {
    try {
      const response = await axios.get('http://localhost:4000/subCategory/getAllSubcategory');
      const subCategories = response.data.data || [];
      const idMap = {};

      subCategories.forEach(subCategory => {
        if (subCategory.subCategoryName && subCategory._id) {
          idMap[subCategory.subCategoryName] = subCategory._id;
        }
      });
      console.log("Subcategory ID Map:", idMap); 
      setsubCategoryIdMap(idMap);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
}
};
  useEffect(() => {
    fetchCategoryIds();
  }, []);
  useEffect(() => {
    fetchsubCategoryIds();
  }, []);
  const fetchProductsByCategory = async () => {
    try {
      if (category.length === 0) {
        // Fetch all products if no categories are selected
        const response = await axios.get(`http://localhost:4000/product/getAllProducts`);
        if (response.data.status === 1) {
          setFilterProducts(response.data.data);
        } else {
          setFilterProducts([]);
        }
      } else {
        // Convert category names to IDs
        console.log("categoryIdMap=======",categoryIdMap);
        const categoryIds = category.map(cat => categoryIdMap[cat]).filter(Boolean);
        const categoriesQuery = categoryIds.join(",");
        console.log("categoriesQuery=====",categoriesQuery);
        
        if (categoriesQuery) {
          const response = await axios.get(
            `http://localhost:4000/product/getProductsByCategory?categories=${categoriesQuery}`
          );
          if (response.data.status === 1) {
            setFilterProducts(response.data.data);
          } else {
            setFilterProducts([]);
          }
        } else {
          setFilterProducts([]);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setFilterProducts([]);
    }
  };
  const fetchProductsBysubCategory = async () => {
    try {
      if (subCategory.length === 0) {
        setFilterProducts(allProducts); // Show all products if no subcategory is selected
      } else {
        const subCategoryIds = subCategory.map(cat => subCategoryIdMap[cat]).filter(Boolean);
        console.log("subCategoryIds being sent:", subCategoryIds); 
        if (subCategoryIds.length > 0) {
          const subCategoriesQuery = subCategoryIds.join(",");
          const response = await axios.get(
            `http://localhost:4000/product/getSubcategory?subCategoryIds=${subCategoriesQuery}`
          );
          if (response.data.status === 1) {
            setFilterProducts(response.data.data);
          } else {
            setFilterProducts([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setFilterProducts([]);
}
};
  const toggleCategory = (e) => {
    console.log("+++", e.target.value);
    console.log("is it category coming======",category);
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((a) => a !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
    
  };
   
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((a) => a !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
     
      fetchProductsByCategory();
    }

    if (subCategory.length > 0) {
       fetchProductsBysubCategory()
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = async () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? " rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
                type="checkbox"
              />{" "}
              Men{" "}
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
                type="checkbox"
              />{" "}
              Women{" "}
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
                type="checkbox"
              />{" "}
              Kids{" "}
            </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
                type="checkbox"
              />{" "}
              Topwear{" "}
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
                type="checkbox"
              />{" "}
              Bottomwear{" "}
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
                type="checkbox"
              />{" "}
              Winterwear{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
            name=""
            id=""
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
