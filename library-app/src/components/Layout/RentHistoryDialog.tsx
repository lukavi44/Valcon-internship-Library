import { MouseEventHandler } from 'react'
import { BookDetailsRequest } from '../../models/bookData.model'

interface RentDialogProps {
  book: BookDetailsRequest
  closeRentHistoryDialog: MouseEventHandler<HTMLButtonElement>
}

export const RentDialog = ({ book, closeRentHistoryDialog }: RentDialogProps) => {

    return (
     <div>
      <h2>
        History of rentals
      </h2>
        <table>
          <tr>
            <th></th>
          </tr>
          <tr>
            <td></td>
          </tr>
      </table>
    </div>
)
}

export default RentDialog