import React from 'react';
import './App.css';
import Header from '../Header/Header';
import ConnectToSpotify from '../ConnectToSpotify/ConnectToSpotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Footer from '../Footer/Footer';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    const isAdded = this.state.playlistTracks.find((playlistTrack) => {
      return playlistTrack.id === track.id;
    });

    if (isAdded) {
      return;
    } else {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id)
    });
  }

  savePlaylist() {
    // Spotify uses a track property named 'uri' to reference tracks in the Spotify library.
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    const { playlistName } = this.state;

    Spotify.savePlaylist(playlistName, trackURIs);

    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  render() {
    const jsx = (
      <div>
        <Header />
        <ConnectToSpotify />
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAddTrack={this.addTrack} />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName}
            onRemoveTrack={this.removeTrack}
            onSavePlaylist={this.savePlaylist} />
        </div>
        <Footer />
      </div>
    );
    return jsx;
  }
}

export default App;
