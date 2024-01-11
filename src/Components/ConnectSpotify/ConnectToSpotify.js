import React from 'react';
import './ConnectToSpotify.css';
import Spotify from '../../util/Spotify';

class ConnectToSpotify extends React.Component {
  constructor(props) {
    super(props);

    this.handleConnectToSpotifyClick = this.handleConnectToSpotifyClick.bind(this);
  }

  async handleConnectToSpotifyClick() {
    await Spotify.connectToSpotify();
    const token = await Spotify.getAccessToken();
    if (token) {
      this.props.onConnect();
    }
  };

  render() {
    const { isConnected } = this.props;
    const jsx = (
      <div className='ConnectToSpotify'>
        <button className='ConnectButton' onClick={this.handleConnectToSpotifyClick}>
          Connect to Spotify &nbsp;<i className="fab fa-spotify"></i>
        </button>
        <p>{isConnected ? 'Connected' : 'Not Connected'}{console.log(isConnected)}</p>
      </div>
    );
    return jsx;
  }
}

export default ConnectToSpotify;

// NOTE
/*
In modern React development, binding functions in the constructor for class components is no longer required due to the introduction of class properties or arrow function class properties.

Using arrow functions as class properties automatically binds this to the instance of the component, so there's no need to manually bind the handleConnectToSpotifyClick method in the constructor. This approach makes the code cleaner and more concise.

Here's how you can use the arrow function syntax to define handleConnectToSpotifyClick without the need for explicit binding:

ConnectToSpotify.js file:
import React, { Component } from 'react';
import queryString from 'query-string';

class ConnectToSpotify extends Component {
  handleConnectToSpotifyClick = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const scopes = ['user-read-private', 'user-read-email']; // Add necessary scopes

    const queryParams = queryString.stringify({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      response_type: 'token',
    });

    const authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    window.location.href = authUrl;
  };

  render() {
    return (
      <button onClick={this.handleConnectToSpotifyClick}>
        Log In to Spotify
      </button>
    );
  }
}

export default ConnectToSpotify;

Using arrow function class properties like handleConnectToSpotifyClick avoids the need for explicit binding in the constructor, providing a more concise and cleaner syntax. This method ensures that this within handleConnectToSpotifyClick refers to the component instance without needing to manually bind it.

*/