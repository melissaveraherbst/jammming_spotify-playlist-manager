import React from 'react';
import queryString from 'query-string';
import './ConnectSpotify.css';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

class ConnectSpotify extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
    try {
      const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']; // Add necessary scopes

      const queryParams = queryString.stringify({
        client_id: clientId,
        scope: scopes.join(' '),
        response_type: 'token',
        redirect_uri: redirectUri,
      });

      const authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  render() {
    const jsx = (
      <div className='ConnectSpotify'>
        <button className='ConnectButton' onClick={this.handleLogin}>
          Connect to Spotify &nbsp;<i class="fab fa-spotify"></i>
        </button>
      </div>
    );
    return jsx;
  }
}

export default ConnectSpotify;

// NOTE
/*
In modern React development, binding functions in the constructor for class components is no longer required due to the introduction of class properties or arrow function class properties.

Using arrow functions as class properties automatically binds this to the instance of the component, so there's no need to manually bind the handleLogin method in the constructor. This approach makes the code cleaner and more concise.

Here's how you can use the arrow function syntax to define handleLogin without the need for explicit binding:

ConnectSpotify.js file:
import React, { Component } from 'react';
import queryString from 'query-string';

class ConnectSpotify extends Component {
  handleLogin = () => {
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
      <button onClick={this.handleLogin}>
        Log In to Spotify
      </button>
    );
  }
}

export default ConnectSpotify;

Using arrow function class properties like handleLogin avoids the need for explicit binding in the constructor, providing a more concise and cleaner syntax. This method ensures that this within handleLogin refers to the component instance without needing to manually bind it.

*/