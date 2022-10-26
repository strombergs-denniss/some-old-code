import { AiOutlineSearch } from 'react-icons/ai'
import TextField from '@component/core/text-field/text-field.component'

const Search = () => {
    return (
        <div
            className="Search"
        >
            <TextField
                name="search"
                placeholder="Search"
                label="Search"
                icon={ AiOutlineSearch }
            />
        </div>

    )
}

export default Search
