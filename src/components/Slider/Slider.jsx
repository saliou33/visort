/* eslint-disable react/prop-types */

const Slider = ({ name, min, max, step, defaultValue, handleChange }) => {
  return (
    <div className="flex flex-col mb-2 gap-2">
      <label className="text-white dark:text-gray-200 text-sm [&::-webkit-slider-thumb]:bg-red-200  ">
        {name}
      </label>
      <input
        id={name}
        type="range"
        className="w-full h-1 bg-blue-100 appearance-none"
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
