import React from 'react';

const ColorSelector = ({ setTheme }) => {
  const themes = ['default', 'blue-green', 'purple-pink', 'orange-red'];

  return (
    <div className="color-selector">
      {themes.map((theme) => (
        <button
          key={theme}
          className={`color-option ${theme}`}
          onClick={() => setTheme(theme)}
        />
      ))}
    </div>
  );
};

export default ColorSelector;