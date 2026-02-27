import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },

  totalStock: {
    type: Number,
    required: true,
    min: 0,
  },

  available: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.totalStock;
      },
      message: "Available cannot exceed total stock",
    },
  },

  reserved: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value + this.available <= this.totalStock;
      },
      message: "Reserved + Available cannot exceed total stock",
    },
  },
});

export default mongoose.model("Inventory", inventorySchema);

