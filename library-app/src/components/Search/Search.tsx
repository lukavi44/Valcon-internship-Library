import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.css'
import search from '../../assets/icons/search.png'
import sort from '../../assets/icons/sort.png'

interface SearchProps {
  setSearchTermValue: any
}

const Search = ({ setSearchTermValue }: SearchProps) => {
  const debouncedChangeHandler = useCallback(debounce(handleInputChange, 1000), [])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTermValue(event.target.value)
  }

  return (
    <div className={styles['search-wrapp']}>
      <button className={styles['search-btn']}>
        <img src={search} alt='' className={styles['search-img']} />
      </button>
      <input
        className={styles.input}
        type='search'
        name='search'
        id='search'
        onChange={debouncedChangeHandler}
      />
      <button className={styles.sort}>
        <img src={sort} alt='' />
      </button>
    </div>
  )
}

export default Search
