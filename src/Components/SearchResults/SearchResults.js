import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        //  prop passed from the App Component
        const { searchResults, onAddTrack } = this.props;
        const jsx = (
            <div className="SearchResults">
                <h2>Results</h2>
                <div>
                    <TrackList
                        tracks={searchResults}
                        onAddTrack={onAddTrack}
                        isRemoval={false} />
                </div>
            </div>
        );
        return jsx;
    }
}

export default SearchResults;