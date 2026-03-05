import { useState } from "react";
import "../../styles/CreateBookingPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InventoryRow from "../../components/InventoryRow";
import SearchBar from "../../components/SearchBar";
import { BsPersonFill } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import { IoCalendarClear } from "react-icons/io5";

const CreateBookingsPage = () => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [inventorySearch, setInventorySearch] = useState("");

  const [booking, setBooking] = useState({
    customer: null,
    items: [],
    pickupDate: null,
    returnDate: null,
    paymentMethod: "card",
    paymentStatus: "pending",
  });

  const bookingTotal = booking.items.reduce(
    (sum, item) => sum + item.quantity * item.days * item.inventory.pricePerDay,
    0,
  );

  const addInventory = (inventory) => {
    if (booking.items.some((i) => i.inventory._id === inventory._id)) return;

    setBooking((prev) => ({
      ...prev,
      items: [...prev.items, { inventory, quantity: 1, days: 1 }],
    }));
  };

  const updateItem = (updatedItem) => {
    setBooking((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.inventory._id === updatedItem.inventory._id ? updatedItem : item,
      ),
    }));
  };

  const removeItem = (id) => {
    setBooking((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.inventory._id !== id),
    }));
  };

  return (
    <div className="create-bookings-page">
      <div className="create-bookings-header">
        <h2 className="create-bookings-title">Create Booking</h2>
        <p className="create-bookings-subtitle">
          Define a new customer booking.
        </p>
      </div>

      <div className="create-bookings-grid">
        {/* LEFT SIDE */}
        <div className="create-bookings-main">
          {/* CUSTOMER */}
          <div className="create-bookings-card">
            <h3 className="create-bookings-card-title">
              <BsPersonFill /> Customer
            </h3>

            <SearchBar
              value={customerSearch}
              onChange={setCustomerSearch}
              selectedItem={booking.customer}
              onSelect={(customer) =>
                setBooking((prev) => ({ ...prev, customer }))
              }
              onClear={() =>
                setBooking((prev) => ({ ...prev, customer: null }))
              }
              searchType="customers"
            />
          </div>

          {/* DATES */}
          <div className="create-bookings-card">
            <h3 className="create-bookings-card-title">
              <IoCalendarClear /> Dates
            </h3>

            <div className="create-bookings-date-group">
              <DatePicker
                className="create-bookings-date-picker"
                selected={booking.pickupDate}
                onChange={(date) =>
                  setBooking((prev) => ({ ...prev, pickupDate: date }))
                }
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
              />

              <DatePicker
                className="create-bookings-date-picker"
                selected={booking.returnDate}
                onChange={(date) =>
                  setBooking((prev) => ({ ...prev, returnDate: date }))
                }
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
              />
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="create-bookings-card">
            <h3 className="create-bookings-card-title">
              <FaBox /> Products
            </h3>

            <SearchBar
              value={inventorySearch}
              onChange={setInventorySearch}
              onSelect={(inventory) => {
                addInventory(inventory);
                setInventorySearch("");
              }}
              searchType="inventory"
            />

            {booking.items.map((item) => (
              <InventoryRow
                key={item.inventory._id}
                item={item}
                onUpdate={updateItem}
                onRemove={removeItem}
              />
            ))}

            {booking.items.length > 0 && (
              <div className="create-bookings-total">
                Total: ${bookingTotal.toFixed(2)}
              </div>
            )}
          </div>

          <button className="primary-btn">Save Booking</button>
        </div>

        {/* RIGHT SIDE PREVIEW */}
        <div className="booking-preview">
          <div className="inventory-preview-header">
            <h3>Booking Preview</h3>
            <span>Live</span>
          </div>

          <div className="inventory-preview-body">
            <div className="inventory-preview-icon">📅</div>

            <div className="inventory-preview-row name-row">
              <div className="preview-label">Customer</div>
              <div className="preview-name">
                {booking.customer ? booking.customer.name : "-"}
              </div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Pickup</div>
              <div className="preview-value">
                {booking.pickupDate
                  ? booking.pickupDate.toLocaleDateString()
                  : "-"}
              </div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Return</div>
              <div className="preview-value">
                {booking.returnDate
                  ? booking.returnDate.toLocaleDateString()
                  : "-"}
              </div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Items</div>
              <div className="preview-value">{booking.items.length}</div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Total</div>
              <div className="preview-value">${bookingTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookingsPage;
