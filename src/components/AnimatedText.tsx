interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText = ({ text, className = "", style = {} }: AnimatedTextProps) => {
  const words = text.split(' ');
  
  return (
    <h1 className={className} style={style}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="vamtam-word inline-block">
          {word.split('').map((letter, letterIndex) => {
            // First letter of each word gets a slight delay, rest start immediately
            const delay = letterIndex === 0 && wordIndex > 0 ? 0.2 : 0;
            return (
              <span
                key={letterIndex}
                className="vamtam-letter"
                style={{
                  animation: `1.3s ease-in ${delay}s 1 normal forwards running vamtam-blurred-letters`
                }}
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedText;
