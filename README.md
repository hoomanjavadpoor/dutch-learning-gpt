# Dutch Learning GPT

A practical Dutch A0–A2 website for words and everyday sentences with English and Persian translations.

## Features
- Separate Words and Sentences sections with Dutch, English, and Persian text
- Topic categories and level filters
- Search, pronunciation, and independent progress tracking in both sections

## Hosting
To publish the website, open **Settings → Pages** and choose **Deploy from a branch**, `main`, `/(root)` after adding the site files.

The site is a practical learning aid; A0 is an informal beginner label rather than an official CEFR level.

## Pronunciation audio

The speaker buttons play MP3s generated with Piper's Nathalie voice, a native
female Belgian Dutch voice. The audio is served with the site.

To regenerate the clips after editing `words.js` or `sentences.js`, install FFmpeg and
`piper-tts==1.8.0` in a Python virtual environment. Download and extract the
[Nathalie voice bundle](https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-nl-nathalie-x-low.tar.gz).
Keep the ONNX model and its JSON configuration together, then run:

```sh
python scripts/generate_audio.py /path/to/nl-nathalie-x-low.onnx --section words
python scripts/generate_audio.py /path/to/nl-nathalie-x-low.onnx --section sentences
```

Nathalie's [training dataset](https://github.com/rhasspy/dataset-voice-nathalie)
is published under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
