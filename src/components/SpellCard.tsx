import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SpellCardTypes } from '../types/SpellCardTypes';

const SpellCard = ({
  spellName,
  spellLevel,
  spellCastTime,
  spellRange,
  spellComponents,
  spellDuration,
  cardColor,
  spellDescription,
}: SpellCardTypes) => {
  return (
    <Box
      sx={{
        bgcolor: cardColor,
        width: 'calc(6.7cm - 20px )',
        maxWidth: '6.7cm',
        height: 'calc(9.1cm - 20px )',
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
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>{spellName}</Typography>
        <Box sx={{ bgcolor: cardColor }}>
          <Typography sx={{ color: '#fff', fontSize: '10px' }}>
            {spellLevel}
          </Typography>
        </Box>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              borderBottom: `2px solid ${cardColor}`,
              borderRight: `2px solid ${cardColor}`,
            }}
          >
            <Typography
              sx={{
                color: cardColor,
                fontWeight: 700,
                fontSize: '11px',
              }}
            >
              CZAS RZUCANIA
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>{spellCastTime}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ borderBottom: `2px solid ${cardColor}` }}>
            <Typography
              sx={{
                color: cardColor,
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              ZASIĘG
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>{spellRange}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              borderBottom: `10px solid ${cardColor}`,
              borderRight: `2px solid ${cardColor}`,
            }}
          >
            <Typography
              sx={{
                color: cardColor,
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              KOMPONENTY
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>{spellComponents}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ borderBottom: `10px solid ${cardColor}` }}>
            <Typography
              sx={{
                color: cardColor,
                fontWeight: 700,
                fontSize: '11px',
              }}
            >
              CZAS TRWANIA
            </Typography>
            <Typography sx={{ fontSize: '11px' }}>{spellDuration}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ p: 1, textAlign: 'left' }}>
            <Typography sx={{ fontSize: '10px' }}>
              {spellDescription}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SpellCard;
