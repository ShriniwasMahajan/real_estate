import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import dotenv from "dotenv";

dotenv.config();
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

export const createListing = async (req, res, next) => {
  try {
    const geoData = await geocoder
      .forwardGeocode({ query: req.body.address, limit: 1 })
      .send();

    const listing = await Listing.create({
      ...req.body,
      geometry: geoData.body.features[0].geometry,
    });
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));

  if (req.user.id !== listing.userRef.toString())
    return next(errorHandler(401, "You can only delete your own listings!"));

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));

  if (req.user.id !== listing.userRef.toString())
    return next(errorHandler(401, "You can only update your own listings!"));

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIdx = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false")
      offer = { $in: [true, false] };

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false")
      furnished = { $in: [true, false] };

    let parking = req.query.parking;
    if (parking === undefined || parking === "false")
      parking = { $in: [true, false] };

    let type = req.query.type;
    if (type === undefined || type === "all") type = { $in: ["rent", "sale"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIdx);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getGeojson = async (req, res, next) => {
  try {
    const listings = await Listing.find({});

    const geojson = { features: [] };
    for (let i = 0; i < listings.length; i++) {
      const { geometry, name, description } = listings[i];

      geojson.features.push({
        geometry: geometry,
        properties: { name, description },
      });
    }

    res.status(200).json(geojson);
  } catch (error) {
    next(error);
  }
};
