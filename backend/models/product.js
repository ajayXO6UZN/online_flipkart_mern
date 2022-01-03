const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: [true, "Please Enter Brand Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    // maxLength: [8, "Price cannot exceed 8 characters"],
  },
  comparePrice: {
    type: Number,
    //  required: [true, "Please Enter product Price"],
    // maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  // productPictures: [
  //   { img: { type: String } }
  // ],
  images: [
    {
      public_id: {
        type: String,
       // required: true,
      },
      url: {
        type: String,
       // required: true,
      },
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
    // unique: true
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  status: {
    type: String,
    // required: [true, "Please Enter product Stock"],
    // maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 'Active',
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  deal_type: {
    type: mongoose.Schema.ObjectId,
    ref: "Product_deal",
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
