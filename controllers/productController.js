import expressAsyncHandler from "express-async-handler";
import Product from "../models/Products.js";
import Category from "../models/Categories.js";

// function: create new product
// endpoint: POST /api/v1/products/create
// access: private(admin)
export const createProduct = expressAsyncHandler(async(req, res) => {
  const {name, description, category, brand, sizes, colors, userId, price, totalQty} = req.body;
  
  const categoryFound = await Category.findOne({name: category});
  if (!categoryFound) {
    throw new Error("Category not found when creating the product.")
  }

  // create product
  const product = await Product.create({
    name,
    description,
    category,
    brand,
    sizes,
    colors,
    user: userId,
    price,
    totalQty,
  });
  // push the product into the category
  categoryFound.products.push(product._id);
  await categoryFound.save();
  // send resposne
  res.json({
    status: "success",
    message: "Product created successfully",
    data: product,
  });
});


// function: get all products
// endpoint: POST /api/v1/products/get-all
// access: public
export const getAllProducts = expressAsyncHandler(async(req, res)=>{
  let productQuery = Product.find();
  // filter products by name
  productQuery = filterByName(req, productQuery);
  productQuery = filterByBrand(req, productQuery);
  productQuery = filterByCategory(req, productQuery);
  productQuery = filterByColor(req, productQuery);
  productQuery = filterBySize(req, productQuery);
  productQuery = filterByPriceRange(req, productQuery);
  
  // pagination 
  const page = parseInt(req.query.page) ? parseInt(req.query.page): 1; // condition ? expr1 : expr2
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit): 20;
  const startIndex = (page-1) * limit; // indices start from 1
  const endIndex = page * limit;
  const total = await Product.countDocuments();
  
  productQuery = productQuery.skip(startIndex).limit(limit);
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  // wait for the results to be returned before proceeding
  const products = await productQuery;
  res.json({
    status: "success",
    message: "Products fetched successfully.",
    data: products,
    result: products.length,
    pagination:pagination,
  });
}
);

// function: get a single product by ID
// endpoint: /api/v1/products/:id (i.e. /api/v1/products/123456789)
// access: public
export const getProductById = expressAsyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id);
  if(!product) {
    throw new Error("Product id is not found.")
  } 
  res.json({
    status: "success",
    message: "Product is fetched successfully.",
    data: product,
  });
});

// function: update a single product by ID
// endpoint: PUT /api/v1/products/:id (i.e. /api/v1/products/123456789)
// access: private
export const updateProduct = expressAsyncHandler(async(req, res)=>{
  const {name, description, brand, category, sizes, colors, user, price, totalQty} = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, 
  {name, description, brand, category, sizes, colors, user, price, totalQty}, 
  {new: true});

  if (!product) {
    throw new Error("Product is not found.")
  }

  res.json({
    status: "success",
    message: "Product is updated successfully.",
    data: product,
  });
});

// function: delete a single product by ID
// endpoint: DELETE /api/v1/products/:id (i.e. /api/v1/products/123456789)
// access: private
export const deleteProduct = expressAsyncHandler(async(req, res)=>{
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new Error("Product is not found.")
  }
  res.json({
    status: "success",
    message: "Product is deleted successfully.",
  });
  //Note: also delete the product in the Category model.
});

const filterByName = (req, productQuery) => {
  // filter products by name
  if (req.query.name) {
      productQuery = productQuery.find({
      // the conditions applied to name attribute; i specifies a case-insensitive search
      name: {$regex: req.query.name, $options: "i"},
    });
  } 
  return productQuery;
};

const filterByBrand = (req, productQuery) => {
  if (req.query.brand) {
      productQuery = productQuery.find({
      brand: {$regex: req.query.brand, $options: "i"},
    });
  } 
  return productQuery;
};

const filterByCategory = (req, productQuery) => {
  if (req.query.category) {
      productQuery = productQuery.find({
      category: {$regex: req.query.category, $options: "i"},
    });
  } 
  return productQuery;
};

const filterByColor = (req, productQuery) => {
  if (req.query.color) {
      productQuery = productQuery.find(
        {colors: req.query.color}
      );
  } 
  return productQuery;
};

const filterBySize = (req, productQuery) => {
  if (req.query.size) {
      productQuery = productQuery.find(
        {sizes: req.query.size}
      );
  } 
  return productQuery;
};

const filterByPriceRange = (req, productQuery) => {
  if (req.query.price) {
      const priceRange = req.query.price.split("-");
      const min = priceRange[0];
      const max = priceRange[1];
      productQuery = productQuery.find(
        // gte: greater than or equal to; lte: less than or equal to
        {price: {$gte: min, $lte: max}}
      );
  } 
  return productQuery;
};
