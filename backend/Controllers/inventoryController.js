import Inventory from "../Models/Inventory.js";
import { createError } from "../utils/createError.js";

// done
export const createInventory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name, pricePerDay, totalStock } = req.body;

    if (!name || !pricePerDay || totalStock == null) {
      return next(createError("All fields most be filled.", 400));
    }

    const newInventory = new Inventory({
      user: userId,
      name,
      pricePerDay,
      totalStock,
      available: totalStock,
      reserved: 0,
    });
    await newInventory.save();

    res.status(201).json({
      success: true,
      data: newInventory,
      message: `Inventory ${name} created successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

// done
export const getUserInventories = async (req, res, next) => {
  try {
    const { userId, username } = req.user;

    if (!userId) {
      return next(createError("All parameters most be filled.", 400));
    }

    const inventories = await Inventory.find({ user: userId });

    if (!inventories) {
      return next(createError("No inventories found.", 404));
    }

    res.status(200).json({
      success: true,
      message: `Inventories for ${username} was found.`,
      data: inventories,
    });
  } catch (error) {
    next(error);
  }
};

// done
export const getInventoryById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    if (!userId || !id) {
      return next(createError("All parameters most be filled.", 400));
    }

    const inventory = await Inventory.findOne({ _id: id, user: userId });

    if (!inventory) {
      return next(createError("Inventory not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: `Inventory ${id} was found.`,
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

// done
export const updateUserInventory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const allowedFields = ["name", "pricePerDay", "totalStock"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return next(createError("No valid fields provided.", 400));
    }

    const updatedInventory = await Inventory.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updates },
      { new: true },
    );

    if (!updatedInventory) {
      return next(createError("Inventory not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: updatedInventory,
    });
  } catch (error) {
    next(error);
  }
};

// done
export const deleteInventory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.param;

    if (!userId || !id) {
      return next(createError("All parameters most be filled.", 400));
    }

    const inventory = await Inventory.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!inventory) {
      return next(createError("Inventory not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: `Inventory ${id} was deleted.`,
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

// done
export const searchUserInventory = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { search } = req.query;

    if (!search) {
      return res.status(200).json({ success: true, data: [] });
    }

    const results = await Inventory.find({
      user: userId,
      name: { $regex: search, $options: "i" },
    }).limit(5);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// done
export const getLowStockInventories = async (req, res, next) => {
  try {
    const { userId, username } = req.user;
    const limit = parseInt(req.query.limit) || 3;
    const threshold = parseInt(req.query.threshold) || 10;

    if (!userId) {
      return next(createError("All parameters most be filled.", 400));
    }

    const lowStock = await Inventory.find({
      user: userId,
      available: { $lte: threshold },
    })
      .sort({ available: 1 })
      .limit(limit);

    if (!lowStock || lowStock.length === 0) {
      return next(createError("No low stock items found.", 404));
    }

    res.status(200).json({
      success: true,
      message: `Low stock inventories for ${username} retrieved.`,
      data: lowStock,
    });
  } catch (error) {
    next(error);
  }
};
