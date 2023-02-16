import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  isBack?: boolean;
};

const TitleComponent = (props: Props) => {
  const { title, isBack } = props;

  const navigate = useNavigate();

  return (
    <div className='title__container'>
      <h1>{title}</h1>

      {isBack && (
        <button type='button' onClick={() => navigate(-1)} className='btn btn-secondary'>
          &#8592; Back
        </button>
      )}
    </div>
  );
};

export default TitleComponent;
