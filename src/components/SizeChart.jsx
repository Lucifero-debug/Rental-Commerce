import React, { useState } from 'react';

const SizeChart = ({selectedTab}) => {
  const tableClass = "min-w-screen border border-gray-300 text-sm w-full";
  const thClass = "border border-gray-300 p-4 text-left text-gray-700 text-lg"; // Header cell class
  const tdClass = "border border-gray-300 p-4 text-left text-gray-800 text-md"; // Data cell class

  const womenSizeTable = (
    <table className={tableClass}>
      <thead className="bg-gray-200">
        <tr>
          <th className={thClass}>Size</th>
          <th className={thClass}>Bust (inches)</th>
          <th className={thClass}>Waist (inches)</th>
          <th className={thClass}>Hip (inches)</th>
          <th className={thClass}>Shoulder (inches)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>S</td>
          <td className={tdClass}>34.5</td>
          <td className={tdClass}>27</td>
          <td className={tdClass}>37</td>
          <td className={tdClass}>14.5</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>M</td>
          <td className={tdClass}>36.5</td>
          <td className={tdClass}>29</td>
          <td className={tdClass}>39</td>
          <td className={tdClass}>15</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>L</td>
          <td className={tdClass}>38.5</td>
          <td className={tdClass}>31</td>
          <td className={tdClass}>41</td>
          <td className={tdClass}>16.5</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>XL</td>
          <td className={tdClass}>40.5</td>
          <td className={tdClass}>33</td>
          <td className={tdClass}>43</td>
          <td className={tdClass}>17</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>XXL</td>
          <td className={tdClass}>42.5</td>
          <td className={tdClass}>35</td>
          <td className={tdClass}>45</td>
          <td className={tdClass}>17.5</td>
        </tr>
        {/* Other sizes omitted for brevity */}
      </tbody>
    </table>
  );

  const menSizeTable = (
    <table className={tableClass}>
      <thead className="bg-gray-200">
        <tr>
          <th className={thClass}>Size</th>
          <th className={thClass}>Chest (inches)</th>
          <th className={thClass}>Waist (inches)</th>
          <th className={thClass}>Hip (inches)</th>
          <th className={thClass}>Shoulders (inches)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>S</td>
          <td className={tdClass}>38</td>
          <td className={tdClass}>32</td>
          <td className={tdClass}>37-38</td>
          <td className={tdClass}>17.5</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>M</td>
          <td className={tdClass}>40</td>
          <td className={tdClass}>34</td>
          <td className={tdClass}>39-40</td>
          <td className={tdClass}>18</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>L</td>
          <td className={tdClass}>42</td>
          <td className={tdClass}>36</td>
          <td className={tdClass}>41-42</td>
          <td className={tdClass}>18.5</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>XL</td>
          <td className={tdClass}>44</td>
          <td className={tdClass}>38</td>
          <td className={tdClass}>43-44</td>
          <td className={tdClass}>19</td>
        </tr>
        <tr className="hover:bg-gray-100 transition-colors">
          <td className={tdClass}>XXL</td>
          <td className={tdClass}>46</td>
          <td className={tdClass}>40</td>
          <td className={tdClass}>45-46</td>
          <td className={tdClass}>19.5</td>
        </tr>
        {/* Other sizes omitted for brevity */}
      </tbody>
    </table>
  );

  return (
    <>
      {selectedTab === 'women' ? womenSizeTable : menSizeTable}
    </>
  );
};

export default SizeChart;
