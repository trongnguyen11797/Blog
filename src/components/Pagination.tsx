import { BlogListType } from 'src/models/blog.model';

type Props = {
  currentPage: number;
  data: BlogListType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = (props: Props) => {
  const { currentPage, data, setPage } = props;

  return (
    <nav aria-label='...'>
      <ul className='pagination w-100 justify-content-center mt-4'>
        {data.map((item, idx) => (
          <li className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`} key={item.id}>
            <button type='button' className='page-link' onClick={() => setPage(idx + 1)}>{idx + 1}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
