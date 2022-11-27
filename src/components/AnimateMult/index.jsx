import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const sintomas = [
  { value: 1, label: "Tosse" },
  { value: 2, label: "Febre" },
  { value: 3, label: "Cansaço" },
  { value: 4, label: "Perda de paladar/olfato" },
  { value: 5, label: "Falta de ar" },
  { value: 6, label: "Diarréia" },
  { value: 7, label: "Dor de cabeça" },
];

const AnimatedMulti = ({ onChange }) => {
  return (
    <Select
      onChange={(choice) => onChange(choice)}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? 'grey' : 'green',
          fontSize: '1rem'
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: 'black',
          fontSize: '1rem'
        }),
      }}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={sintomas}
      placeholder="Selecione os sintomas"
    />
  );
}

export default AnimatedMulti;