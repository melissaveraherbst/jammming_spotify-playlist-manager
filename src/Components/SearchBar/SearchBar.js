import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
    }

    handleTermChange(event) {
        return this.setState({ term: event.target.value });
    }

    search() {
        // prop passed from the App Component
        const { onSearch } = this.props;
        return onSearch(this.state.term);
    }

    render() {
        const jsx = (
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search}><i className="fas fa-search"></i></button>
            </div>
        );
        return jsx;
    }
}

export default SearchBar;