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
                        <div className={styles['book-about']}>
                            <h3>{book.Title}</h3>
                            <div className={styles['date-holder']}>
                            <label>Publish Date</label>
                            <p>{convertDateToString(book.PublishDate, 'dd.MM.yyyy') }</p>
                            </div>
                            <div className={styles['btn-holder']}>
                            <button onClick={() => navigate(`/BookDetails/${book.Id}`)} className={styles['book-details-btn']}> More details</button>
                            </div>
                            <p className={styles['rent-counter']}><span className={styles.bold}>{book.Title}</span> was rented <span className={styles.bold}>{ book.RentCount } </span> times</p>
                        </div>
                    </div>
            )}
            </Carousel>
        );
    }

export default BookCarousel