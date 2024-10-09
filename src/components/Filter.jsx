"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    
    // Set or remove the filter based on value
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name); // Remove filter if no value
    }
    
    // Replace the current URL with new search params
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="second flex justify-center h-[10vh] mt-6">
      <div className="base w-[90%] h-full grid grid-cols-1 sm:flex justify-between items-center gap-5">
        <div className="option flex h-6 gap-7">
          <select name="type" className="rounded-lg" onChange={handleFilterChange}>
            <option value="">Type</option>
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            name="min"
            className="w-24 rounded-lg"
            onChange={handleFilterChange}
          />

          <input
            type="number"
            placeholder="Max Price"
            name="max"
            className="w-24 rounded-lg"
            onChange={handleFilterChange}
          />

          <select name="categories" className="rounded-lg" onChange={handleFilterChange}>
            <option value="">Categories</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Popular">Popular</option>
          </select>

          <select name="filters" className="rounded-lg" onChange={handleFilterChange}>
            <option value="">All Filters</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        <div className="sort w-[16vw]">
          <select
            name="sort"
            className="rounded-lg w-[11vw] h-9"
            onChange={handleFilterChange}
          >
            <option value="">Sort By</option>
            <option value="asc price">Price (low to high)</option>
            <option value="desc price">Price (high to low)</option>
            <option value="asc lastUpdated">Newest</option>
            <option value="desc lastUpdated">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
