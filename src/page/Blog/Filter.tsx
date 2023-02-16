const FilterComponent = () => {
  const test = 5;
  console.log('🚀 ~ file: Filter.tsx:3 ~ FilterComponent ~ test', test);

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input type='email' className='form-control' id='title' placeholder='Input title' />
      </div>
      <div className='form-group'>
        <label htmlFor='exampleFormControlSelect1'>Example select</label>
        <select className='form-control' id='exampleFormControlSelect1'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </form>
  );
};

export default FilterComponent;
