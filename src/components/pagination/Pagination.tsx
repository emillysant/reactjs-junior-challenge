import React from "react";

function Pagination(_props: any) {
  return <div>
         {Array.from(Array(_props.pages), (item, index) => {
        return (
          <button
            key={index}
            value={index}
            onClick={(e) =>
                _props.setCurrentPage(Number((e.target as HTMLButtonElement).value))
            }
          >
            {index + 1}
          </button>
        );
      })}
  </div>;
}

export default Pagination;
