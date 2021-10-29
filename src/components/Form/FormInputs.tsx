import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import OutlinedInput from '@mui/material/OutlinedInput';
import { componentsTypes } from '../../constants';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { UseFormRegister } from 'react-hook-form';
import { FormInputsTypes } from '../../types/FormInputsTypes';

type FormInputs = {
  register: UseFormRegister<FormInputsTypes>;
  cardClass: string;
  handleClassChange: (event: SelectChangeEvent) => void;
  selectedComponents: string[];
  handleComponentsChange: (event: SelectChangeEvent<string[]>) => void;
};

const FormInputs = ({
  register,
  cardClass,
  handleClassChange,
  selectedComponents,
  handleComponentsChange,
}: FormInputs) => {
  return (
    <>
      <Grid item xs={6}>
        <FormControl size="small" fullWidth color="primary">
          <InputLabel>Klasa</InputLabel>
          <Select
            label="Klasa"
            value={cardClass}
            onChange={handleClassChange}
            size="small"
          >
            <MenuItem value="bard">Bard</MenuItem>
            <MenuItem value="paladin">Paladyn</MenuItem>
            <MenuItem value="wizard">Mag</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Nazwa czaru"
          size="small"
          fullWidth
          {...register('spellName')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Szkoła i krąg"
          size="small"
          fullWidth
          {...register('spellLevel')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Czas rzucania"
          size="small"
          fullWidth
          {...register('spellCastTime')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Zasięg"
          size="small"
          fullWidth
          {...register('spellRange')}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <RadioGroup row {...register('rangeUnit')}>
            <FormControlLabel value="m" control={<Radio />} label="Metry" />
            <FormControlLabel value="f" control={<Radio />} label="Stopy" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Komponenty</InputLabel>
          <Select
            multiple
            value={selectedComponents}
            onChange={handleComponentsChange}
            input={<OutlinedInput label="Komponenty" />}
            size="small"
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
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Czas trwania"
          size="small"
          fullWidth
          {...register('spellDuration')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Opis"
          multiline
          fullWidth
          minRows={10}
          {...register('spellDescription')}
        />
      </Grid>
    </>
  );
};

export default FormInputs;
