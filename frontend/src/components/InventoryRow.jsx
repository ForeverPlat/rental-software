import "../styles/InventoryRow.css";

const InventoryRow = ({ item, onUpdate, onRemove }) => {
  const { inventory, quantity, days } = item;

  const total = quantity * days * inventory.pricePerDay;

  return (
    <div className="inventory-row">
      <div className="inventory-row-info">
        <span className="inventory-row-name">{inventory.name}</span>

        <span className="inventory-row-available">
          {inventory.available} available
        </span>
      </div>

      <div className="inventory-row-controls">
        <input
          className="inventory-row-input"
          type="number"
          min={1}
          max={inventory.available}
          value={quantity}
          onChange={(e) =>
            onUpdate({
              ...item,
              quantity: Number(e.target.value),
            })
          }
        />

        <select
          className="inventory-row-select"
          value={days}
          onChange={(e) =>
            onUpdate({
              ...item,
              days: Number(e.target.value),
            })
          }
        >
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <option key={d} value={d}>
              {d} days
            </option>
          ))}
        </select>

        <div className="inventory-row-total">${total.toFixed(2)}</div>

        <button
          className="inventory-row-remove"
          onClick={() => onRemove(inventory._id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default InventoryRow;
