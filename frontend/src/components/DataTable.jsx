import React from "react";
import "../styles/DataTable.css";

const DataTable = ({
  header,
  columns,
  data,
  handleRowClick,
  emptyMessage = "No data found.",
}) => {
  return (
    <div className="data-table-card">
      {header && <div className="data-table-header">{header}</div>}

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length == 0 ? (
            <tr>
              <td colSpan={columns.length} className="data-table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.key} onClick={() => handleRowClick(row)}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
