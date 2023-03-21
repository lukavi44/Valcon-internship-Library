import { convertDateToString } from '../../helpers/convertDate.helpers'
import { BookDetailsRequest } from '../../models/bookData.model'
import { RentBookHistory } from '../../models/rent.model'
import styles from './RentHistoryDialog.module.css'

interface RentDialogProps {
  book: BookDetailsRequest
  rentalHistoryData: RentBookHistory[]
  returnBook: (id: number) => void
}

export const RentDialog = ({ book, rentalHistoryData, returnBook }: RentDialogProps) => {

  return (
     <div className={styles['table-wrapper']}>
        <h2 style={{textAlign: 'center'}}>History of {book.Title} rents</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Is returned</th>
            <th>Rent Date </th>
            <th>User Email</th>
          </tr>
          </thead>
        <tbody>
          {rentalHistoryData.map(( item ) => {
          return (
            <tr key={item.Id}>
              <td>{item.User.FirstName}</td>
              <td>{item.User.LastName}</td>
              <td>{item.IsReturned ? 'yes' : <button className={styles['return-btn']} onClick={() => returnBook(item.Id)}>Return</button>}</td>
              <td>{convertDateToString(item.RentDate, 'dd.MM.yyyy')}</td>
              <td>{item.User.Email }</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
)
}

export default RentDialog