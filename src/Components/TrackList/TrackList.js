import React from "react";
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        //  prop passed from the Playlist Component
        const { tracks, onRemoveTrack } = this.props;
        //  prop passed from the SearchResults Component
        const { onAddTrack, isRemoval } = this.props;
        const jsx = (
            <div className="TrackList">
                {tracks.map((track) => {
                    return <Track
                        key={track.id}
                        track={track}
                        onAddTrack={onAddTrack}
                        onRemoveTrack={onRemoveTrack}
                        isRemoval={isRemoval} />;
                })}
            </div>
        );
        return jsx;
    }
}

export default TrackList;