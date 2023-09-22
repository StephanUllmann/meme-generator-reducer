import { useContext } from 'react';
import { MemeContext } from '../contexts/MemeContext';
import { Card, CardMedia, Typography } from '@mui/material';

export default function Meme() {
  const { state } = useContext(MemeContext);

  const url = state.imageURL || state.memeArr[state.randomMeme]?.url;
  const name = state.file?.name || state.memeArr[state.randomMeme]?.name;
  const imgWidth = state.imageURL
    ? 500
    : state.memeArr[state.randomMeme]?.width;
  const imgHeight = state.imageURL
    ? 500
    : state.memeArr[state.randomMeme]?.height;

  const textBordersThick =
    '1.25px 1.25px 0 black, -1.25px 1.25px 0 black, -1.25px -1.25px 0 black, 1.25px -1.25px 0 black';
  const textBordersThin =
    '0.5px 0.5px 0 black, -0.5px 0.5px 0 black, -0.5px -0.5px 0 black, 0.5px -0.5px 0 black';

  if (state.memeArr.length === 0) return null;

  return (
    <Card sx={{ position: 'relative' }} id='meme'>
      <CardMedia
        sx={{
          alignSelf: 'center',
          width: 400,
          display: 'block',
          aspectRatio: `${imgWidth} / ${imgHeight}`,
        }}
        image={url}
        title={name}
      />
      <Typography
        sx={{
          position: 'absolute',
          bottom: `${state.tty}%`,
          textTransform: 'uppercase',
          color: state.colorTop,
          textShadow:
            state.colorTop === 'rgb(255, 255, 255)'
              ? textBordersThick
              : textBordersThin,
          left: `${state.ttx}%`,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontSize: state.topTextSize,

          maxWidth: 485,
        }}
        variant='h2'
        fontFamily={'Oswald'}>
        {state.textTop}
      </Typography>

      <Typography
        sx={{
          position: 'absolute',
          bottom: `${state.tmy}%`,
          textTransform: 'uppercase',
          color: state.colorMiddle,
          textShadow:
            state.colorMiddle === 'rgb(255, 255, 255)'
              ? textBordersThick
              : textBordersThin,
          left: `${state.tmx}%`,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontSize: state.middleTextSize,
          maxWidth: 485,
        }}
        variant='h2'
        fontFamily={'Oswald'}>
        {state.textMiddle}
      </Typography>

      <Typography
        sx={{
          position: 'absolute',
          bottom: `${state.tby}%`,

          textTransform: 'uppercase',
          color: state.colorBottom,
          textShadow:
            state.colorBottom === 'rgb(255, 255, 255)'
              ? textBordersThick
              : textBordersThin,
          left: `${state.tbx}%`,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontSize: state.bottomTextSize,
          maxWidth: 485,
        }}
        variant='h2'
        fontFamily={'Oswald'}>
        {state.textBottom}
      </Typography>
    </Card>
  );
}
