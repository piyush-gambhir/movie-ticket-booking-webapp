"use client";
import React, { useState } from "react";

const seatData = {
  premium: {
    price: 300,
    rows: {
      L: [7, 6, 5, 4, 3, 2, 1],
      K: [13, 12, 11, 10, 9, 8, 7, 6],
      J: [10, 9, 8, 7, 6, 5],
    },
  },
  executive: {
    price: 280,
    rows: {
      I: [12, 11, 10, 9, 8, 7, 6, 5],
      H: [17, 16, 15, 14, 13, 12, 11, 10],
      G: [17, 16, 15, 14, 13, 12, 11, 10],
      F: [14, 13, 12, 11, 10, 9, 8, 7],
      E: [14, 13, 12, 11, 10, 9, 8, 7],
      D: [14, 13, 12, 11, 10, 9, 8, 7],
      C: [14, 13, 12, 11, 10, 9, 8, 7],
    },
  },
  normal: {
    price: 260,
    rows: {
      B: [14, 13, 12, 11, 10, 9, 8, 7],
      A: [14, 13, 12, 11, 10, 9, 8, 7],
    },
  },
};

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (section, row, seatNumber) => {
    const seatId = `${section}-${row}${seatNumber}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderSeats = (section, rows) => {
    return (
      <div className="space-y-4">
        {Object.entries(rows).map(([row, seats]) => (
          <div
            key={row}
            className="grid grid-cols-[20px_minmax(0,_1fr)] items-center"
          >
            <span className="font-bold">{row}</span>
            <div className="flex space-x-2">
              {seats.map((seatNumber) => {
                const seatId = `${section}-${row}${seatNumber}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <div
                    key={seatId}
                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border text-sm ${isSelected ? "bg-primary text-white" : "border-primary bg-white text-primary"}`}
                    onClick={() => handleSeatClick(section, row, seatNumber)}
                  >
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const section = seatId.split("-")[0];
      return total + seatData[section].price;
    }, 0);
  };

  return (
    <div className="fixed top-0 flex h-screen w-screen justify-center bg-white">
      <div className="flex-flex-col no-scrollbar h-full w-full overflow-scroll p-8 md:max-w-[50vw]">
        {Object.entries(seatData).map(([section, { price, rows }]) => (
          <div key={section} className="mb-8">
            <h3 className="mb-2 text-sm font-medium text-gray-500">
              Rs. {price} {section.toUpperCase()}
            </h3>
            <div className="border-t border-t-gray-300 py-4">
              {renderSeats(section, rows)}
            </div>
          </div>
        ))}
        <div className="mt-8">
          <h4 className="text-xl font-semibold">
            Total: Rs. {calculateTotal()}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
