import { useEffect, useState } from 'react';
import { defaultValues } from '../constants';
import { SelectChangeEvent } from '@mui/material/Select';

type FieldTypes =
  | 'cardClass'
  | 'spellName'
  | 'spellLevel'
  | 'spellCastTime'
  | 'spellRange'
  | 'spellDuration'
  | 'rangeUnit'
  | 'spellDescription';

const useCardData = () => {
  const [values, setValues] = useState(defaultValues);

  const [cardClass, setCardClass] = useState(defaultValues.cardClass);
  const [spellName, setSpellName] = useState(defaultValues.spellName);
  const [spellLevel, setSpellLevel] = useState(defaultValues.spellLevel);
  const [spellCastTime, setSpellCastTime] = useState(
    defaultValues.spellCastTime,
  );
  const [spellRange, setSpellRange] = useState(defaultValues.spellRange);
  const [spellComponents, setSpellComponents] = useState(
    defaultValues.spellComponents,
  );
  const [spellDuration, setSpellDuration] = useState(
    defaultValues.spellDuration,
  );
  const [rangeUnit, setRangeUnit] = useState(defaultValues.rangeUnit);
  const [spellDescription, setSpellDescription] = useState(
    defaultValues.spellDescription,
  );
  const [calculatedSpellRange, setCalculatedSpellRange] = useState('');

  const valueChange = (value: string, field: FieldTypes) => {
    const newValues = { ...values, field: values[field] };
    setValues(newValues);
  };

  const handleChange = (value: string, field: FieldTypes) => {
    switch (field) {
      case 'cardClass':
        setCardClass(value);
        break;
      case 'spellName':
        setSpellName(value);
        break;
      case 'spellLevel':
        setSpellLevel(value);
        break;
      case 'spellCastTime':
        setSpellCastTime(value);
        break;
      case 'spellRange':
        setSpellRange(value);
        break;
      case 'spellDuration':
        setSpellDuration(value);
        break;
      case 'rangeUnit':
        setRangeUnit(value);
        break;
      case 'spellDescription':
        setSpellDescription(value);
        break;
    }
  };

  const handleComponentsChange = (
    event: SelectChangeEvent<typeof spellComponents>,
  ) => {
    const {
      target: { value },
    } = event;
    const components = typeof value === 'string' ? value.split(',') : value;
    setSpellComponents(components.map(component => component.split('')[0]));
  };

  useEffect(() => {
    const range = parseInt(spellRange);

    if (isNaN(range)) {
      setCalculatedSpellRange(spellRange);
    } else {
      if (rangeUnit === 'f') {
        setCalculatedSpellRange(`${(range * 0.3048).toPrecision(2)} m`);
      } else {
        setCalculatedSpellRange(`${range} m`);
      }
    }
  }, [spellRange, rangeUnit]);

  return {
    values: {
      cardClass,
      spellName,
      spellLevel,
      spellCastTime,
      spellRange: calculatedSpellRange,
      spellComponents,
      spellDuration,
      rangeUnit,
      spellDescription,
    },
    handlers: {
      handleChange,
      handleComponentsChange,
    },
  };
};

export default useCardData;
