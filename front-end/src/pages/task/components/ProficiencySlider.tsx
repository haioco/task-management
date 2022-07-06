import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}
const ProficiencySlider = () => {
  return (
    <div>
      <Box className={' bg-gray-100 p-3 rounded-lg w-full'} style={{ width: '100%' }} >
        <div>
          سطح تسلط شما :
        </div>
        <div  style={{ width: '100%' }}>
          <Slider
            style={{ width: '100%' }}
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
        </div>

      </Box>
    </div>
  );
};

export default ProficiencySlider;
