import { convertDateToString } from '../../helpers/convertDate.helpers'
import { BookDetailsRequest } from '../../models/bookData.model'
import { RentBookHistory } from '../../models/rent.model'
import styles from './RentHistoryDialog.module.css'
interface RentDialogProps {
  book: BookDetailsRequest
  rentalHistoryData: RentBookHistory[]
  returnBook: (id: number) => void
  sortIsReturned: () => void
}

export const RentDialog = ({ book, rentalHistoryData, sortIsReturned, returnBook }: RentDialogProps) => {

  return (
     <div className={styles['table-wrapper']}>
        <h2 style={{textAlign: 'center'}}>History of {book.Title} rents</h2>
      <table className={styles.table} border={1}>
        <thead>
          <tr>
            <th className={styles['first-name']}>First Name</th>
            <th>Last Name</th>
            <th> <button onClick={sortIsReturned}>Is returned</button></th>
            <th>Rent Date </th>
            <th>User Email</th>
          </tr>
          </thead>
        <tbody>
          {rentalHistoryData.map(( item ) => {
          return (
            <tr key={item.Id}>
              <td className={styles['first-name']}>{item.User.FirstName} {item.User.LastName}</td>
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