import React, { useRef, Component } from 'react';
import { Box } from '@mui/material';
import { getBackgroundColor } from './helpers';
import SpellCard from './components/SpellCard';
import { useReactToPrint } from 'react-to-print';
import Grid from '@mui/material/Grid';
import FormInputs from './components/Form/FormInputs';
import Button from './components/Button';
import useCardData from './hooks/useCardData';

function App() {
  const { values, handlers } = useCardData();
  const {
    cardClass,
    spellName,
    spellLevel,
    spellCastTime,
    spellRange,
    spellComponents,
    spellDuration,
    rangeUnit,
    spellDescription,
  } = values;
  const cardColor = getBackgroundColor(cardClass);

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
          maxWidth: 700,
        }}
      >
        <Grid container spacing={2}>
          <FormInputs
            cardClass={cardClass}
            rangeUnit={rangeUnit}
            onChange={handlers}
            selectedComponents={spellComponents}
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
      <Box ref={ref} ml={6}>
        <SpellCard
          cardColor={cardColor}
          spellName={spellName || 'FAŁSZYWE ŻYCIE'}
          spellLevel={spellLevel || 'Nekromancja, 1 krąg'}
          spellCastTime={spellCastTime || '1 akcja'}
          spellRange={spellRange || 'na siebie'}
          spellComponents={spellComponents}
          rangeUnit={rangeUnit}
          spellDuration={spellDuration || '1 godzina'}
          spellDescription={
            spellDescription ||
            'Komponenty materialne: niewielka ilość alkoholu lub spirytusu. Wspomagając się nekromantyczną namiastką życia, zyskujesz 1k4+4 tymczasowych PW na czas trwania czaru.'
          }
        />
      </Box>
    </Box>
  );
}

export default App;
