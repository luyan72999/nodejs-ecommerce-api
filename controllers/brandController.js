import expressAsyncHandler from "express-async-handler";
import Brand from '../models/Brands.js'

// function create a brand
// endpoint: POST brand
// access: private (admin)
export const createBrand = expressAsyncHandler(async(req,res)=>{
  const {name} = req.body;
  const brandFound = await Brand.findOne({name});
  if (brandFound) {
    throw new Error('Brand already exists.');
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand created sucessfully",
    data: brand,
  })
})

// function get all brands
// endpoint: GET brand
// access: public
export const getAllBrands = expressAsyncHandler(async(req,res)=>{
  const brands = await Brand.find();
  res.json({
    status: "success",
    message: "All brands loaded sucessfully",
    data: brands,
  })
});

// function get a brand by id
// endpoint: GET brand/:id
// access: public
export const getSingleBrand = expressAsyncHandler(async(req,res)=>{
  const id = req.params.id;
  const brand = await Brand.findById(id);
  if (!brand) {
    throw new Error("brand id not found.");
  }
  res.json({
    status: "success",
    message: "Single brand loaded successfully.",
    data: brand,
  })
});

// function update a category
// endpoint: PUT brand/:id
// access: private (admin)
export const updateBrand = expressAsyncHandler(async(req,res)=>{
  const {name} = req.body;
  const brand = await Brand.findByIdAndUpdate(req.params.id, {name}, {new: true});
  if (!brand) {
    throw new Error("Brand id not found.");
  }
  res.json({
    status: "success",
    message: "Single brand updated successfully.",
    data: brand,
  })
});


// function delete a brand
// endpoint: DELETE brand/:id
// access: private (admin)
export const deleteBrand = expressAsyncHandler(async(req,res)=>{
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    throw new Error("Brand id not found.");
  }
  res.json({
    status: "success",
    message: "Single brand deleted successfully.",
    data: brand,
  })
});

