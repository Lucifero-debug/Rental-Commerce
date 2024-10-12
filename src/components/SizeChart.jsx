import React from 'react';

const SizeChart = ({ selectedTab }) => {
  const tableClass = "min-w-full border border-gray-300 text-sm"; // Adjusted to min-w-full
  const thClass = "border border-gray-300 p-2 text-left text-gray-700 text-md"; // Adjusted padding and text size
  const tdClass = "border border-gray-300 p-2 text-left text-gray-800 text-sm"; // Adjusted padding and text size

  const womenSizeTable = (
    <div className="overflow-x-auto"> {/* Enables horizontal scrolling */}
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
          {["S", "M", "L", "XL", "XXL"].map((size, index) => (
            <tr className="hover:bg-gray-100 transition-colors" key={size}>
              <td className={tdClass}>{size}</td>
              <td className={tdClass}>{34 + index * 2}</td>
              <td className={tdClass}>{27 + index * 2}</td>
              <td className={tdClass}>{37 + index * 2}</td>
              <td className={tdClass}>{14.5 + index * 0.5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const menSizeTable = (
    <div className="overflow-x-auto"> {/* Enables horizontal scrolling */}
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
          {["S", "M", "L", "XL", "XXL"].map((size, index) => (
            <tr className="hover:bg-gray-100 transition-colors" key={size}>
              <td className={tdClass}>{size}</td>
              <td className={tdClass}>{38 + index * 2}</td>
              <td className={tdClass}>{32 + index * 2}</td>
              <td className={tdClass}>{37 + index * 1.5}</td>
              <td className={tdClass}>{17.5 + index * 0.5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {selectedTab === 'women' ? womenSizeTable : menSizeTable}
    </>
  );
};

export default SizeChart;
