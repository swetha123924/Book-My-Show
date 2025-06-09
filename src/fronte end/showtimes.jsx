import { useState, useEffect } from 'react';

export default function SeatLayout() {
  const rows = 10;
  const seatsPerRow = 12;
  const ticketPrice = 200;
  const showId = 1; 
  const userId = 1; 

  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, rows);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatAvailability, setSeatAvailability] = useState([]);

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    setSelectedSeats(savedSeats);

    const savedAvailability = JSON.parse(localStorage.getItem('seatAvailability'));
    if (savedAvailability) {
      setSeatAvailability(savedAvailability);
    } else {
      const newAvailability = Array.from({ length: rows }, () =>
        Array.from({ length: seatsPerRow }, () => Math.random() > 0.2)
      );
      setSeatAvailability(newAvailability);
      localStorage.setItem('seatAvailability', JSON.stringify(newAvailability));
    }
  }, []);

  const toggleSeatSelection = (row, col) => {
    const seatId = `${row}-${col}`;
    const updatedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId];
    setSelectedSeats(updatedSeats);
    localStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
  };

  const getSeatLabel = (row, col) => `${rowLabels[row]}${col + 1}`;

  const handleBooking = async () => {
    const totalPrice = selectedSeats.length * ticketPrice;
    
    console.log('Booking Data:', {
      user_id: userId,
      show_id: showId,
      seats: selectedSeats,
      total_price: totalPrice,
    });

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          show_id: showId,
          seats: selectedSeats,
          total_price: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const data = await response.json();
      alert('Booking successful!');
      console.log(data);
      setSelectedSeats([]);
      localStorage.removeItem('selectedSeats');
    } catch (err) {
      console.error('Booking Error:', err);
      alert('Booking failed');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Select Your Seats</h1>

      <div className="w-full max-w-4xl bg-black text-white py-2 text-center mb-4 rounded">SCREEN</div>

      <div className="flex flex-col items-center bg-white shadow p-4 rounded-md">
        {seatAvailability.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center mb-2">
            <span className="w-6 mr-2 text-lg font-medium">{rowLabels[rowIndex]}</span>
            {row.map((isAvailable, colIndex) => {
              const seatId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <button
                  key={colIndex}
                  onClick={() => isAvailable && toggleSeatSelection(rowIndex, colIndex)}
                  className={`w-10 h-10 mx-1 rounded-md font-semibold text-sm transition-all 
                    ${isAvailable
                      ? isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      : 'bg-red-500 text-white cursor-not-allowed'
                    }`}
                  disabled={!isAvailable}
                >
                  {colIndex + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">Selected Seats:</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat, idx) => {
              const [row, col] = seat.split('-').map(Number);
              return (
                <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                  {getSeatLabel(row, col)}
                </span>
              );
            })
          ) : (
            <span className="text-gray-500">No seats selected</span>
          )}
        </div>
        <p className="mt-4 text-xl font-bold">Total: ₹{selectedSeats.length * ticketPrice}</p>
      </div>

      <div className="mt-8">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg transition-all"
          disabled={selectedSeats.length === 0}
          onClick={handleBooking}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
