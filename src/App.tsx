import React, { useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Box, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { componentsTypes } from './constants';
import { getBackgroundColor } from './helpers';
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

type Inputs = {
  cardClass: string;
  spellName: string;
  spellLevel: string;
  spellCastTime: string;
  spellRange: string;
  rangeUnit: string;
  spellComponents: string[];
  spellDuration: string;
};

const defaultValues = {
  cardClass: '',
  spellName: '',
  spellLevel: '',
  spellCastTime: '',
  spellRange: '',
  rangeUnit: 'm',
  spellComponents: [],
  spellDuration: ''
};

function App() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const { register, watch, handleSubmit, setValue } = useForm<Inputs>({
      defaultValues
  });
  const [cardClass, setCardClass] = useState<string>('');
  const cardColor = getBackgroundColor(cardClass);

  const spellName = watch('spellName');
  const spellLevel = watch('spellLevel');
  const spellCastTime = watch('spellCastTime');
  const spellRange = watch('spellRange');
  const spellComponents = watch('spellComponents');
  const spellDuration = watch('spellDuration');


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
        <FormControl component="fieldset">
          <RadioGroup {...register('rangeUnit')}>
              <FormControlLabel value="m" control={<Radio />} label="Metry" />
              <FormControlLabel value="ft" control={<Radio />} label="Stopy" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Komponenty</InputLabel>
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
        <TextField label="Czas trwania"  {...register('spellDuration')}/>
        <Button type="submit">Zapisz kartę</Button>
      </Box>
      <Box
        sx={{
          bgcolor: cardColor,
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
            textAlign: 'center'
          }}
        >
            <Typography sx={{ fontWeight: 700 }}>{spellName}</Typography>
            <Box sx={{ bgcolor: cardColor }}>
                <Typography sx={{color: '#fff', fontSize: '10px' }}>{spellLevel}</Typography>
            </Box>
            <Grid container>
                <Grid item xs={6} sx={{ borderBottom: `2px solid ${cardColor}`, borderRight: `2px solid ${cardColor}` }}>
                    <Typography sx={{color: cardColor, fontWeight: 700, fontSize: '12px' }}>CZAS RZUCANIA</Typography>
                    <Typography sx={{fontSize: '12px' }}>{spellCastTime}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ borderBottom: `2px solid ${cardColor}` }}>
                    <Typography sx={{color: cardColor, fontWeight: 700, fontSize: '12px' }}>ZASIĘG</Typography>
                    <Typography sx={{fontSize: '12px' }}>{spellRange}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ borderBottom: `10px solid ${cardColor}`, borderRight: `2px solid ${cardColor}` }}>
                    <Typography sx={{color: cardColor, fontWeight: 700, fontSize: '12px' }}>KOMPONENTY</Typography>
                    <Typography sx={{fontSize: '12px' }}>{spellComponents}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ borderBottom: `10px solid ${cardColor}` }}>
                    <Typography sx={{color: cardColor, fontWeight: 700, fontSize: '12px' }}>CZAS TRWANIA</Typography>
                    <Typography sx={{fontSize: '12px' }}>{spellDuration}</Typography>
                </Grid>
            </Grid>
        </Box>
      </Box>
    </>
  );
}

export default App;
