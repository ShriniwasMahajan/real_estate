import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
  getGeojson,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.get("/geojson", getGeojson);

export default router;
