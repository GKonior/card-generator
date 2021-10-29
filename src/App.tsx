import React, { useEffect, useState, useRef, Component } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getBackgroundColor } from './helpers';
import SpellCard from './components/SpellCard';
import { useReactToPrint } from 'react-to-print';
import Grid from '@mui/material/Grid';
import { defaultValues } from './constants/defaultValues';
import { FormInputsTypes } from './types/FormInputsTypes';
import FormInputs from './components/Form/FormInputs';
import Button from './components/Button';

function App() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const { register, watch, handleSubmit, setValue } = useForm<FormInputsTypes>({
    defaultValues,
  });
  const [cardClass, setCardClass] = useState('');

  const handleClassChange = (event: SelectChangeEvent) => {
    setCardClass(event.target.value as string);
  };

  const cardColor = getBackgroundColor(cardClass);

  const spellName = watch('spellName');
  const spellLevel = watch('spellLevel');
  const spellCastTime = watch('spellCastTime');
  const spellRange = watch('spellRange');
  const spellComponents = watch('spellComponents');
  const spellDuration = watch('spellDuration');
  const rangeUnit = watch('rangeUnit');
  const spellDescription = watch('spellDescription');

  console.log(spellName);

  const onSubmit: SubmitHandler<FormInputsTypes> = data => console.log(data);

  const handleComponentsChange = (
    event: SelectChangeEvent<typeof selectedComponents>,
  ) => {
    const {
      target: { value },
    } = event;
    const components = typeof value === 'string' ? value.split(',') : value;
    setSelectedComponents(components.map(component => component.split('')[0]));
  };

  useEffect(() => {
    setValue('spellComponents', selectedComponents);
    setValue('cardClass', cardClass);
  }, [selectedComponents, cardClass]);

  const ref = useRef<Component>(null);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

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
            <FormInputs
              register={register}
              cardClass={cardClass}
              handleClassChange={handleClassChange}
              selectedComponents={selectedComponents}
              handleComponentsChange={handleComponentsChange}
            />
            <Grid item xs={6}>
              <Button onClick={handlePrint} variant="contained">
                Drukuj kartę
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined">Zapisz kartę</Button>
            </Grid>
          </Grid>
        </Box>
        <Box ref={ref}>
          <SpellCard
            cardColor={cardColor}
            spellName={spellName || 'FAŁSZYWE ŻYCIE'}
            spellLevel={spellLevel || 'Nekromancja, 1 krąg'}
            spellCastTime={spellCastTime || '1 akcja'}
            spellRange={spellRange || 'na siebie'}
            spellComponents={
              spellComponents.length === 0 ? ['W, S, M'] : spellComponents
            }
            rangeUnit={rangeUnit}
            spellDuration={spellDuration || '1 godzina'}
            spellDescription={
              spellDescription ||
              'Komponenty materialne: niewielka ilość alkoholu lub spirytusu. Wspomagając się nekromantyczną namiastką życia, zyskujesz 1k4+4 tymczasowych PW na czas trwania czaru.'
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
