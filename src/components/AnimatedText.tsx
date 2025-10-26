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
            const totalDelay = (wordIndex * 5 + letterIndex) * 0.03;
            return (
              <span
                key={letterIndex}
                className="vamtam-letter"
                style={{
                  animationDelay: `${totalDelay}s`
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
