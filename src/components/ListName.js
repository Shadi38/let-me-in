import React from 'react';

function InputName() {
  const names = ["Liliana", "Halden", "Farnoosh"];

  return (
    <div className="inputName">
     
      <select>
        {names.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputName;
