import { Link } from 'react-router-dom';

type Props = {
  title: string;
  isBack?: boolean;
  titleBack?: string;
};

const TitleComponent = (props: Props) => {
  const { title, titleBack, isBack } = props;
  return (
    <>
      <h1 className='py-3 text-center'>
        {isBack && (
          <Link to={linkConstant}>
            <button>back</button>
          </Link>
        )}
        {}
      </h1>
    </>
  );
};

export default TitleComponent;
