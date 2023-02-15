const LoadingComponent = () => (
  <div className='custom__loading'>
    <div className='spinner-border text-light' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>

    <div className='loading__overlay' />
  </div>
);

export default LoadingComponent;
