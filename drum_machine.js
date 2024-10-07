const { useState, useEffect } = React;

// Audio clips data
const drumPads = [
  { key: 'Q', id: 'Heater-1', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
];

function DrumPad({ pad, handlePlay }) {
  const playSound = () => {
    const audio = document.getElementById(pad.key);
    audio.currentTime = 0;
    audio.play();
    handlePlay(pad.id);
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === pad.key) {
      playSound();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="drum-pad" id={pad.id} onClick={playSound}>
      {pad.key}
      <audio className="clip" id={pad.key} src={pad.sound}></audio>
    </div>
  );
}

function DrumMachine() {
  const [currentSound, setCurrentSound] = useState('');

  const handlePlay = (soundId) => {
    setCurrentSound(soundId);
  };

  return (
    <div id="drum-machine">
      <div id="display">{currentSound}</div>
      <div className="pads">
        {drumPads.map((pad) => (
          <DrumPad key={pad.key} pad={pad} handlePlay={handlePlay} />
        ))}
      </div>
    </div>
  );
}

// React 18's new root rendering method
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DrumMachine />);
