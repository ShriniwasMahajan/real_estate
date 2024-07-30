import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/listing-item";

const Search = () => {
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    )
      setSidebarData((data) => ({ ...data, type: e.target.id }));

    if (e.target.id === "searchTerm")
      setSidebarData((data) => ({ ...data, searchTerm: e.target.value }));

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    )
      setSidebarData((data) => ({
        ...data,
        [e.target.id]: e.target.checked || e.target.checked === "true",
      }));

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData((data) => ({ ...data, sort, order }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numListings = listings.length;
    const startIdx = numListings;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex", startIdx);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 9) setShowMore(false);
    setListings((lists) => [...lists, ...data]);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    )
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      if (data.length > 8) setShowMore(true);
      else setShowMore(false);

      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-b-0 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                checked={sidebarData.type === "all"}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={sidebarData.offer}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={sidebarData.parking}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={sidebarData.furnished}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort_order" className="font-semibold">
              Sort:
            </label>
            <select
              id="sort_order"
              onChange={handleChange}
              value={sidebarData.sort + "_" + sidebarData.order}
              className="border rounded-lg p-3 bg-white"
            >
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold p-3 text-slate-700 mt-5 md:border-b">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listings found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 w-full text-center">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
