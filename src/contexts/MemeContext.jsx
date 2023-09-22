/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';
import { fetchData } from '../client';

export const MemeContext = createContext();

const defaultVals = {
  textSize: 30,
  x: 50,
  topY: 85,
  bottomY: 5,
  middleY: 50,
  color: 'rgb(255, 255, 255)',
};

const initialState = {
  memeArr: [],
  randomMeme: 0,
  randomizeMeme: false,
  textTop: '',
  textMiddle: '',
  textBottom: '',
  topTextSize: defaultVals.textSize,
  middleTextSize: defaultVals.textSize,
  bottomTextSize: defaultVals.textSize,
  file: null,
  imageURL: null,
  ttx: defaultVals.x,
  tty: defaultVals.topY,
  tmx: defaultVals.x,
  tmy: defaultVals.middleY,
  tbx: defaultVals.x,
  tby: defaultVals.bottomY,
  colorTop: defaultVals.color,
  colorMiddle: defaultVals.color,
  colorBottom: defaultVals.color,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'memes/memesLoaded': {
      const randomIndex = Math.floor(Math.random() * action.payload.length);
      return {
        ...state,
        memeArr: action.payload,
        randomMeme: randomIndex,
      };
    }
    case 'memes/randomSelected': {
      const randomIndex = Math.floor(Math.random() * state.memeArr.length);
      return {
        ...state,
        randomMeme: randomIndex,
        randomizeMeme: false,
      };
    }
    case 'text/inputted': {
      const { field, text } = action.payload;
      return {
        ...state,
        [field]: text,
      };
    }
    case 'memes/randomized': {
      const randomIndex = Math.floor(Math.random() * state.memeArr.length);
      const memes = state.memeArr;
      return {
        ...initialState,
        memeArr: memes,
        randomMeme: randomIndex,
      };
    }
    case 'file/inputted': {
      const memes = state.memeArr;
      if (!action.payload) {
        const randomIndex = Math.floor(Math.random() * state.memeArr.length);
        return {
          ...initialState,
          memeArr: memes,
          randomMeme: randomIndex,
        };
      }
      const newImgURL = URL.createObjectURL(action.payload);
      return {
        ...initialState,
        file: action.payload,
        imageURL: newImgURL,
        memeArr: memes,
      };
    }
    case 'text/positioned': {
      const { slider, value } = action.payload;
      return {
        ...state,
        [slider]: value,
      };
    }
    case 'memes/prev': {
      const prev = state.randomMeme === 0 ? 99 : state.randomMeme - 1;
      return {
        ...state,
        randomMeme: prev,
      };
    }
    case 'memes/next': {
      const next = state.randomMeme === 99 ? 0 : state.randomMeme + 1;
      return {
        ...state,
        randomMeme: next,
      };
    }
    case 'text/colorized': {
      const { field, color } = action.payload;
      return {
        ...state,
        [field]: color,
      };
    }
  }
};

export default function MemeContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadNewMemes = () => {
    fetchData('https://api.imgflip.com/get_memes')
      .then((data) => {
        if (data.success) {
          dispatch({ type: 'memes/memesLoaded', payload: data.data.memes });
          dispatch({ type: 'memes/randomSelected' });
        }
        if (!data.success) throw new Error('no success');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadNewMemes();
  }, []);

  return (
    <MemeContext.Provider value={{ state, dispatch }}>
      {children}
    </MemeContext.Provider>
  );
}
