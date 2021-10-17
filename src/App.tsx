import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { componentsTypes } from './constants';
import { getBackgroundColor } from './helpers';

type Inputs = {
  cardClass: string;
  spellName: string;
  spellLevel: string;
  spellCastTime: string;
  spellRange: string;
  spellComponents: any;
};

function App() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [cardClass, setCardClass] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedComponents>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedComponents(typeof value === 'string' ? value.split(',') : value);
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    setCardClass(event.target.value as string);
  };

  useEffect(() => {
    setValue('spellComponents', selectedComponents);
    setValue('cardClass', cardClass);
  }, [selectedComponents, cardClass]);

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Klasa</InputLabel>
          <Select label="Klasa" value={cardClass} onChange={handleClassChange}>
            <MenuItem value="bard">Bard</MenuItem>
            <MenuItem value="paladin">Paladyn</MenuItem>
            <MenuItem value="wizard">Mag</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Nazwa czaru" {...register('spellName')} />
        <TextField label="Szkoła i krąg" {...register('spellLevel')} />
        <TextField label="Czas rzucania" {...register('spellCastTime')} />
        <TextField label="Zasięg" {...register('spellRange')} />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Komponenty</InputLabel>
          <Select
            multiple
            value={selectedComponents}
            onChange={handleChange}
            input={<OutlinedInput label="Komponenty" />}
            renderValue={selected => selected.join(', ')}
          >
            {componentsTypes.map(component => (
              <MenuItem key={component} value={component}>
                <Checkbox
                  checked={selectedComponents.indexOf(component) > -1}
                />
                <ListItemText primary={component} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Czas rzucania" />
        <Button type="submit">Zapisz kartę</Button>
      </Box>
      <Box
        sx={{
          bgcolor: getBackgroundColor(cardClass),
          width: 'calc(6.3cm - 20px )',
          maxWidth: '6.3cm',
          height: 'calc(8.9cm - 20px )',
          borderRadius: '10px',
          position: 'relative',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '10px',
            width: '100%',
            height: '100%',
          }}
        ></Box>
      </Box>
    </>
  );
}

export default App;
