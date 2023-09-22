import { Box, TextField, Button, Grid, Slider } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { MuiColorInput } from 'mui-color-input';
import { useContext } from 'react';
import { MemeContext } from '../contexts/MemeContext';

export default function Controls() {
  const { state, dispatch } = useContext(MemeContext);

  const textTopEl = document.getElementById('textTop');
  const textMiddleEl = document.getElementById('textMiddle');
  const textBottomEl = document.getElementById('textBottom');

  const fileName = state.file
    ? `${state.file.name}-${state.textTop}`
    : `${state.memeArr[state.randomMeme]?.name}-${state.textTop}`;

  const handleInput = ({ target }) => {
    dispatch({
      type: 'text/inputted',
      payload: { field: target.id, text: target.value },
    });
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.target.value = '';
      e.target.blur();
    }
  };

  const randomize = () => {
    textTopEl.value = '';
    textMiddleEl.value = '';
    textBottomEl.value = '';
    dispatch({ type: 'memes/randomized' });
  };

  const handleFileInput = (newFile) => {
    textTopEl.value = '';
    textMiddleEl.value = '';
    textBottomEl.value = '';
    dispatch({ type: 'file/inputted', payload: newFile });
  };

  const download = () => {
    domtoimage.toBlob(document.getElementById('meme')).then(function (blob) {
      saveAs(blob, `${fileName}.png`);
    });
  };

  const handleSlider = ({ target }) => {
    dispatch({
      type: 'text/positioned',
      payload: { slider: target.name, value: target.value },
    });
  };

  const handleColorChange = (color, field) => {
    dispatch({ type: 'text/colorized', payload: { field, color } });
  };

  const handlePrevious = () => {
    dispatch({ type: 'memes/prev' });
  };
  const handleNext = () => {
    dispatch({ type: 'memes/next' });
  };

  return (
    <Grid container direction={'column'} gap={3}>
      <Grid item>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'>
          <Grid container marginBottom={5}>
            <Grid item>
              <TextField
                label='Text Top'
                id='textTop'
                onChange={handleInput}
                // multiline
                maxRows={4}
                onKeyDown={handleKeydown}
                color='success'
              />
            </Grid>
            <Grid item width={100}>
              <Slider
                label='size'
                aria-label='Temperature'
                value={state.topTextSize}
                // getAriaValueText="something"
                color='success'
                id='topTextSize'
                name='topTextSize'
                onChange={handleSlider}
              />
              <Slider
                label='Position-X'
                aria-label='Temperature'
                value={state.ttx}
                // getAriaValueText="something"
                color='warning'
                id='ttx'
                name='ttx'
                onChange={handleSlider}
              />
            </Grid>
            <Grid item>
              <Slider
                label='Position-Y'
                sx={{
                  '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                  },
                }}
                orientation='vertical'
                // defaultValue={tty}
                value={state.tty}
                aria-label='Temperature'
                // valueLabelDisplay="auto"
                color='error'
                id='tty'
                name='tty'
                onChange={handleSlider}
                max={95}
              />
            </Grid>
            <Grid item>
              <MuiColorInput
                id='color-top'
                value={state.colorTop}
                onChange={(color) => handleColorChange(color, 'colorTop')}
                // onChange={(color) => setColorTop(color)}
              />
            </Grid>
          </Grid>

          <Grid container marginBottom={5}>
            <Grid item>
              <TextField
                label='Text Middle'
                id='textMiddle'
                onChange={handleInput}
                // multiline
                maxRows={4}
                onKeyDown={handleKeydown}
                color='secondary'
              />
            </Grid>
            <Grid item width={100}>
              <Slider
                label='size'
                aria-label='Temperature'
                value={state.middleTextSize}
                // getAriaValueText="something"
                color='secondary'
                id='middleTextSize'
                name='middleTextSize'
                onChange={handleSlider}
              />
              <Slider
                label='Position-X'
                aria-label='Temperature'
                value={state.tmx}
                // getAriaValueText="something"
                color='warning'
                id='tmx'
                name='tmx'
                onChange={handleSlider}
              />
            </Grid>
            <Grid item>
              <Slider
                label='Position-Y'
                sx={{
                  '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                  },
                }}
                orientation='vertical'
                // defaultValue={tty}
                value={state.tmy}
                aria-label='Temperature'
                // valueLabelDisplay="auto"
                color='error'
                id='tmy'
                name='tmy'
                onChange={handleSlider}
                max={95}
              />
            </Grid>
            <Grid item>
              <MuiColorInput
                id='color-middle'
                value={state.colorMiddle}
                onChange={(color) => handleColorChange(color, 'colorMiddle')}
                // onChange={(color) => setColorMiddle(color)}
              />
            </Grid>
          </Grid>

          <Grid container marginBottom={5}>
            <Grid item>
              <TextField
                label='Text Bottom'
                id='textBottom'
                onChange={handleInput}
                // multiline
                maxRows={4}
                onKeyDown={handleKeydown}
              />
            </Grid>
            <Grid item width={100}>
              <Slider
                aria-label='Temperature'
                value={state.bottomTextSize}
                // getAriaValueText="something"
                // color="secondary"
                id='bottomTextSize'
                name='bottomTextSize'
                onChange={handleSlider}
              />
              <Slider
                label='Position-X'
                aria-label='Temperature'
                value={state.tbx}
                // getAriaValueText="something"
                color='warning'
                id='tbx'
                name='tbx'
                onChange={handleSlider}
              />
            </Grid>
            <Grid item>
              <Slider
                label='Position-Y'
                sx={{
                  '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                  },
                }}
                orientation='vertical'
                value={state.tby}
                aria-label='Temperature'
                valueLabelDisplay='auto'
                color='error'
                id='tby'
                name='tby'
                onChange={handleSlider}
                max={95}
                // onKeyDown={preventHorizontalKeyboardNavigation}
              />
            </Grid>
            <Grid item>
              <MuiColorInput
                id='color-bottom'
                value={state.colorBottom}
                onChange={(color) => handleColorChange(color, 'colorBottom')}
                // onChange={(color) => setColorBottom(color)}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* <Grid container flexWrap={true}> */}
      <Grid item>
        <MuiFileInput
          value={state.file}
          onChange={handleFileInput}
          label='Upload'
          placeholder='your pic'
          id='upload'
          sx={{ width: 220, transform: 'translateX(10px)' }}
        />
      </Grid>
      <Grid container flexWrap={true}>
        <Grid item>
          <Button
            onClick={randomize}
            variant='contained'
            color='warning'
            sx={{ width: 220, transform: 'translateX(10px)' }}>
            Random Meme
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={download}
            variant='outlined'
            color='success'
            sx={{ width: 220, transform: 'translateX(10px)' }}>
            Download Meme
          </Button>
        </Grid>
        <Grid container flexWrap={true}>
          <Grid item>
            <Button
              onClick={handlePrevious}
              variant='outlined'
              color='success'
              sx={{ width: 220, transform: 'translateX(10px)' }}>
              previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleNext}
              variant='outlined'
              color='success'
              sx={{ width: 220, transform: 'translateX(10px)' }}>
              next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
