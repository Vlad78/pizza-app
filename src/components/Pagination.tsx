import ReactPaginate from 'react-paginate'
import { useAppDispatch } from '../redux/hooks'
import { setPageCount } from '../redux/slices/filterSlice'
import style from './Sass/Pagination.module.scss'

const Pagination = ({ currentPage }: { currentPage: number }) => {
  const dispatch = useAppDispatch()

  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setPageCount(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      //   renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
