import ConfettiExplosion from 'react-confetti-explosion';

const Explosion=({isExploding}) => {
  
  return <>{isExploding && <ConfettiExplosion particleCount={200} particleSize={8} width={1000} height={900} duration={3000} />}</>;
}

export default Explosion