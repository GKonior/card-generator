import React, { useEffect, useState, useRef, Component } from 'react';
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
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import SpellCard from './components/SpellCard';
import { useReactToPrint } from 'react-to-print';
import Grid from '@mui/material/Grid';

type Inputs = {
  cardClass: string;
  spellName: string;
  spellLevel: string;
  spellCastTime: string;
  spellRange: string;
  rangeUnit: string;
  spellComponents: string[];
  spellDuration: string;
  spellDescription: string;
};

const defaultValues = {
  cardClass: '',
  spellName: '',
  spellLevel: '',
  spellCastTime: '',
  spellRange: '',
  rangeUnit: 'm',
  spellComponents: [],
  spellDuration: '',
  spellDescription: '',
};

function App() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const { register, watch, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues,
  });
  const [cardClass, setCardClass] = useState<string>('');
  const cardColor = getBackgroundColor(cardClass);

  const spellName = watch('spellName');
  const spellLevel = watch('spellLevel');
  const spellCastTime = watch('spellCastTime');
  const spellRange = watch('spellRange');
  const spellComponents = watch('spellComponents');
  const spellDuration = watch('spellDuration');
  const rangeUnit = watch('rangeUnit');
  const spellDescription = watch('spellDescription');

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedComponents>,
  ) => {
    const {
      target: { value },
    } = event;
    const components = typeof value === 'string' ? value.split(',') : value;
    setSelectedComponents(components.map(component => component.split('')[0]));
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    setCardClass(event.target.value as string);
  };

  const ref = useRef<Component>(null);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  useEffect(() => {
    setValue('spellComponents', selectedComponents);
    setValue('cardClass', cardClass);
  }, [selectedComponents, cardClass]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          border: '1px solid #d6bb82',
          borderRadius: '10px',
          width: '95%',
          padding: 6,
          display: 'flex',
        }}
      >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '500px' },
            display: 'flex',
            flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
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
                  <FormControlLabel
                    value="m"
                    control={<Radio />}
                    label="Metry"
                  />
                  <FormControlLabel
                    value="ft"
                    control={<Radio />}
                    label="Stopy"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Komponenty</InputLabel>
                <Select
                  multiple
                  value={selectedComponents}
                  onChange={handleChange}
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
            <Grid item xs={6}>
              <Button
                onClick={handlePrint}
                fullWidth
                variant="contained"
                color="primary"
              >
                Drukuj kartę
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                type="submit"
              >
                Zapisz kartę
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SpellCard
            cardColor={cardColor}
            spellName={spellName}
            spellLevel={spellLevel}
            spellCastTime={spellCastTime}
            spellRange={spellRange}
            spellComponents={spellComponents}
            rangeUnit={rangeUnit}
            spellDuration={spellDuration}
            spellDescription={spellDescription}
            ref={ref}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
