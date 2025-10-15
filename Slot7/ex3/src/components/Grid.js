import React from 'react';

function Grid() {
  return (
    <div className="container">
      <div className="row text-center bg-secondary text-white mt-4">
        <div className="col border">First col</div>
        <div className="col border">Second col</div>
      </div>
      <div className="row text-center bg-secondary text-white">
        <div className="col border">col</div>
        <div className="col border">col</div>
        <div className="col border">col</div>
      </div>
      <div className="row text-center bg-secondary text-white mb-3">
        <div className="col border">col</div>
        <div className="col border">col</div>
        <div className="col border">col</div>
      </div>
    </div>
  );
}

export default Grid;
