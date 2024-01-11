import React from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        //  prop passed from the App Component
        const { onNameChange } = this.props;
        return onNameChange(event.target.value);
    }

    render() {
        //  props passed from the App Component
        const { playlistName, playlistTracks, onRemoveTrack, onSavePlaylist } = this.props;
        const jsx = (
            <div className="Playlist">
                <input
                    defaultValue={playlistName}
                    onChange={this.handleNameChange} />
                <TrackList
                    tracks={playlistTracks}
                    onRemoveTrack={onRemoveTrack}
                    isRemoval={true} />
                <button className="Playlist-save" onClick={onSavePlaylist}>Save to Spotify &nbsp;<i className="fab fa-spotify"></i>
                </button>
            </div>
        );
        return jsx;
    }
}

export default Playlist;