import { useParams } from 'react-router-dom';

const Proyect = () => {
  const { id } = useParams();

  return <div>Proyect: {id}</div>;
};

export default Proyect;
