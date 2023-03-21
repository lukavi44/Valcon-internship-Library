import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { getMostRentedBooks } from '../../services/RentalServices.services';
import { useEffect, useState } from 'react';
import { MostRentedBooks } from '../../models/bookData.model';
import styles from './BookCarousel.module.css'
import { convertDateToString } from '../../helpers/convertDate.helpers';
import { useNavigate } from 'react-router-dom';

const BookCarousel = () => {
    const [mostRentedBooks, setMostRentedBooks] = useState<MostRentedBooks[]>([])
    const navigate = useNavigate()
    
    console.log(mostRentedBooks)
    useEffect(() => {
        getMostRentedBooks(10).then((response) => {
            setMostRentedBooks(response.data)
        }) 
   }, []) 
    return (
        <Carousel
            className={styles['carousel-root']}>
                {mostRentedBooks.map((book) =>
                    <div key={book.Id} className={styles['book-holder']} >
                        <img className={styles['book-cover']} src={`data:image/png;base64, ${book.Cover}`} />
                        <div>
                            <h3>{book.Title}</h3>
                            <label>Publish Date</label>
                            <p>{convertDateToString(book.PublishDate, 'dd.MM.yyyy') }</p>
                            <button onClick={() => navigate(`/BookDetails/${book.Id}`)}>Click for more details</button>
                            {/* <p>Most Rented books</p> */}
                            
                            <p>this book was rented {  book.RentCount } times</p>
                        </div>
                    </div>
            )}
            </Carousel>
        );
    }

export default BookCarousel