import expressAsyncHandler from "express-async-handler";
import Category from '../models/Categories.js';

// function create a category
// endpoint: POST categories
// access: private (admin)
export const createCategory = expressAsyncHandler(async(req,res)=>{
  const {name} = req.body;
  const categoryFound = await Category.findOne({name});
  if (categoryFound) {
    throw new Error('Category already exists.');
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Category created sucessfully",
    data: category,
  })
})

// function get all categories
// endpoint: GET categories
// access: Private(admin)
export const getAllCategories = expressAsyncHandler(async(req,res)=>{
  const categories = await Category.find();
  res.json({
    status: "success",
    message: "Categories loaded sucessfully",
    data: categories,
  })
});

// function get a category by id
// endpoint: GET category/:id
// access: Private(admin)
export const getSingleCategory = expressAsyncHandler(async(req,res)=>{
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category id not found.");
  }
  res.json({
    status: "success",
    message: "Single category loaded successfully.",
    data: category,
  })
});

// function update a category
// endpoint: PUT category/:id
// access: private (admin)
export const updateCategory = expressAsyncHandler(async(req,res)=>{
  const {name} = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, {name}, {new: true});
  if (!category) {
    throw new Error("Category id not found.");
  }
  res.json({
    status: "success",
    message: "Single category updated successfully.",
    data: category,
  })
});


// function delete a category
// endpoint: DELETE category/:id
// access: private (admin)
export const deleteCategory = expressAsyncHandler(async(req,res)=>{
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new Error("Category id not found.");
  }
  res.json({
    status: "success",
    message: "Single category deleted successfully.",
    data: category,
  })
});


// function add products to a category
// endpoint: category/
// access: private (admin)


// function delete products to a category
// endpoint: category/
// access: private (admin)

// function retrieve all the products from a category
// endpoint: category/
// access: public









