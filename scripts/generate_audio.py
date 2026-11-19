"""Generate the site's pronunciation MP3s with a local Piper model."""

import argparse
import base64
import io
import json
from pathlib import Path
import subprocess
import wave

from piper import PiperVoice, SynthesisConfig


ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("model", type=Path, help="Piper ONNX model with its adjacent config")
    args = parser.parse_args()

    vocabulary = (ROOT / "words.js").read_text(encoding="utf-8")
    entries = json.loads(vocabulary.strip().removeprefix("const WORDS = ").removesuffix(";"))
    output = ROOT / "audio"
    output.mkdir(exist_ok=True)
    voice = PiperVoice.load(args.model)
    config = SynthesisConfig(length_scale=1.12, volume=0.85)

    for word in dict.fromkeys(entry[0] for entry in entries):
        stem = base64.urlsafe_b64encode(word.encode("utf-8")).decode("ascii").rstrip("=")
        wav_data = io.BytesIO()
        with wave.open(wav_data, "wb") as wav_file:
            voice.synthesize_wav(word, wav_file, config)

        subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
             "-i", "pipe:0", "-codec:a", "libmp3lame", "-b:a", "40k",
             str(output / f"{stem}.mp3")],
            input=wav_data.getvalue(),
            check=True,
        )


if __name__ == "__main__":
    main()
