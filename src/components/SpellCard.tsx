import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

type SpellCardProps = {
  spellName: string;
  spellLevel: string;
  spellCastTime: string;
  spellRange: string;
  rangeUnit: string;
  spellComponents: string[];
  spellDuration: string;
  cardColor: string;
  spellDescription: string;
  ref: any;
};

const SpellCard = ({
  spellName,
  spellLevel,
  spellCastTime,
  spellRange,
  spellComponents,
  spellDuration,
  cardColor,
  rangeUnit,
  spellDescription,
  ref,
}: SpellCardProps) => {
  return (
    <Box
      ref={ref}
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
          <Grid item xs={12}>
            <Typography>{spellDescription}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SpellCard;
