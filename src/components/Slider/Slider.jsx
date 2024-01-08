/* eslint-disable react/prop-types */

const Slider = ({ name, min, max, step, defaultValue, handleChange }) => {
  return (
    <div className="flex flex-col mb-2 gap-2">
      <label className="text-gray-500 text-sm ">{name}</label>
      <input
        id={name}
        type="range"
        className="w-full h-1 bg-gray-600 [&::-webkit-slider-thumb]:bg-red-200   appearance-none"
        min={min || 0}
        max={max || 1000}
        step={step || 10}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Slider;
