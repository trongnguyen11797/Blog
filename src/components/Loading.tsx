type Props = {
  isInside?: boolean;
};

const LoadingComponent = (props: Props) => {
  const { isInside } = props;

  return (
    <div className={`loading__container ${isInside ? 'inside' : ''}`}>
      <div className='wrapper'>
        <div className='spinner-border text-light' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>

        <div className='loading__overlay' />
      </div>
    </div>
  );
};

export default LoadingComponent;
