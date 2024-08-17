import mongoose from "mongoose";
import dotenv from "dotenv";
import cities from "./cities.js";
import users from "./users.js";
import { descriptors, places } from "./titles.js";
import images from "./images.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

dotenv.config({ path: "../.env" });

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to the MongoDB"))
  .catch((err) => console.log(err));

const userIds = [];

const randomIdx = (l, r) => l + Math.floor(Math.random() * (r - l));

const random = (arr) => arr[randomIdx(0, arr.length)];

const randomBool = () => Math.random() < 0.5;

const tierPrices = [0, 1, 0.75, 0.5, 0.375];

const makeDescription = (
  furnished,
  type,
  cityIdx,
  bedrooms,
  bathrooms,
  parking
) =>
  `Discover this ${
    furnished ? "furnished" : "unfurnished"
  } property available for ${type} in the heart of ${
    cities[cityIdx].city
  }. This charming home offers ${bedrooms} bedroom${bedrooms > 1 ? "s" : ""}${
    bedrooms ? ` and ${bathrooms} bathroom${bathrooms > 1 ? "s" : ""}` : ""
  }, providing ample space for comfortable living. The property does${
    parking ? "" : " not"
  } include a parking spot, ensuring ${
    parking
      ? "won't need to worry about parking arrangements"
      : "have convenient parking options"
  }. Whether you're looking to settle down or make a smart investment, this residence in ${
    cities[cityIdx].city
  } offers a perfect balance of ${
    furnished ? "convenience and comfort" : "coziness and practicality"
  }. Don't miss the opportunity to make this property your next home.`;

const findPrice = (tier, bedrooms, bathrooms, furnished, parking, type) => {
  const lakh = 1e5;
  let price = 30;

  price += bedrooms * 15;
  price += bathrooms * 10;
  if (furnished) price += bedrooms * 10;
  if (!parking) price -= 5;

  price *= lakh;
  price *= tierPrices[tier];

  if (type === "rent") price /= 250;
  return price;
};

const assignImages = (numImg) => {
  const imgs = [];

  for (let i = 0; i < numImg; i++) imgs.push(random(images));

  return imgs;
};

const seedDB = async () => {
  await User.deleteMany({});
  await Listing.deleteMany({});

  for (let i = 0; i < 10; i++) {
    const { username, email, password } = users[i];
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user
      .save()
      .then((saved) => userIds.push(saved._id))
      .catch((err) => console.log("Error saving user:", err));
  }

  for (let i = 0; i < 175; i++) {
    const cityIdx = randomIdx(0, cities.length);
    const tier = cities[cityIdx].tier;
    const name = `${random(descriptors)} ${random(places)}`;

    const address = `${cities[cityIdx].city}, ${cities[cityIdx].state}`;
    const geometry = {
      type: "Point",
      coordinates: [cities[cityIdx].lng, cities[cityIdx].lat],
    };

    const userRef = random(userIds);
    const bedrooms = randomIdx(1, 11);
    const bathrooms = bedrooms - randomBool();
    const furnished = randomBool();
    const parking = randomBool();
    const offer = randomBool();
    const type = randomBool() ? "sale" : "rent";

    const description = makeDescription(
      furnished,
      type,
      cityIdx,
      bedrooms,
      bathrooms,
      parking
    );
    const regularPrice = findPrice(
      tier,
      bedrooms,
      bathrooms,
      furnished,
      parking,
      type
    );
    const discountPrice = regularPrice * 0.95;

    const numImg = randomIdx(1, 7);
    const imageUrls = assignImages(numImg);

    const property = new Listing({
      name,
      description,
      address,
      geometry,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      userRef,
    });
    await property.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
