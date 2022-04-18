import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import OutlinedInput from '@mui/material/OutlinedInput';
import { componentsOptions, cardClassesOptions } from '../../constants';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

type FormInputsProps = {
  cardClass: string;
  rangeUnit: string;
  selectedComponents: string[];
  onChange: any;
};

const FormInputs = ({
  cardClass,
  rangeUnit,
  selectedComponents,
  onChange,
}: FormInputsProps) => {
  const { handleChange, handleComponentsChange, handleSpellRangeChange } =
    onChange;

  return (
    <>
      <Grid item xs={6}>
        <FormControl size="small" fullWidth color="primary">
          <InputLabel>Klasa</InputLabel>
          <Select
            label="Klasa"
            value={cardClass}
            onChange={e => handleChange(e.target.value, 'cardClass')}
            size="small"
          >
            {cardClassesOptions.map(card => (
              <MenuItem value={card.value} key={card.value}>
                {card.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Nazwa czaru"
          onChange={e => handleChange(e.target.value, 'spellName')}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Szkoła i krąg"
          onChange={e => handleChange(e.target.value, 'spellLevel')}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Czas rzucania"
          onChange={e => handleChange(e.target.value, 'spellCastTime')}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Zasięg"
          onChange={e => handleChange(e.target.value, 'spellRange')}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            onChange={e => handleChange(e.target.value, 'rangeUnit')}
            value={rangeUnit}
          >
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
            input={<OutlinedInput label="Komponenty" />}
            size="small"
            renderValue={selected => selected.join(', ').toUpperCase()}
            onChange={handleComponentsChange}
          >
            {componentsOptions.map(component => (
              <MenuItem key={component.value} value={component.value}>
                <Checkbox
                  checked={selectedComponents.includes(component.value)}
                />
                <ListItemText primary={component.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Czas trwania"
          onChange={e => handleChange(e.target.value, 'spellDuration')}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Opis"
          onChange={e => handleChange(e.target.value, 'spellDescription')}
          multiline
          fullWidth
          minRows={10}
        />
      </Grid>
    </>
  );
};

export default FormInputs;
