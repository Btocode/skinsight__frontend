import React, { useState } from 'react';

const TestComponent = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <h1>Hello, world!{clicked ? ' (clicked)' : ''}</h1>
      <button onClick={() => setClicked(true)}>Click me</button>
    </div>
  );
};

export default TestComponent;