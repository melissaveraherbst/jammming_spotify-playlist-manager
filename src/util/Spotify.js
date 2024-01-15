import queryString from "query-string";

const { REACT_APP_SPOTIFY_CLIENT_ID: clientId, REACT_APP_SPOTIFY_REDIRECT_URI: redirectUri } = process.env;

// const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
// const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const Spotify = {
    _accessToken: '',

    async connectToSpotify() {
        if (this.getAccessToken()) {
            return;
        } else {
            try {
                const scopes = ['playlist-modify-public', 'playlist-modify-private']; // Add necessary scopes

                const queryParams = queryString.stringify({
                    client_id: clientId,
                    scope: scopes.join(' '),
                    response_type: 'token',
                    redirect_uri: redirectUri,
                });

                const authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
                window.location.href = authUrl;
                // a successful access token return means that the user is authorised/connected
                return this.getAccessToken();
            } catch (error) {
                console.error('Error refreshing token:', error);
                return false;
            }
        }
    },

    getAccessToken() {
        if (this.accessToken) {
            return this.accessToken;
        }

        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const token = urlParams.get('access_token');
        const expiresIn = urlParams.get('expires_in');

        if (token && expiresIn) {
            this.accessToken = token;
            const expiresInMs = Number(expiresIn) * 1000;

            setTimeout(() => {
                this.accessToken = '';
            }, expiresInMs);

            window.history.pushState('Access Token', null, '/');
            return this.accessToken;
        } else {
            try {
                const scopes = ['playlist-modify-public', 'playlist-modify-private'];

                const queryParams = queryString.stringify({
                    client_id: clientId,
                    redirect_uri: redirectUri,
                    scope: scopes.join(' '),
                    response_type: 'token',
                });

                const authUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
                window.location.href = authUrl;
            } catch (error) {
                console.error('Error refreshing token:', error);
                return;
            }
        }
    },

    async getUserProfile() {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Unable to fetch user profile');
            }

            const userProfile = await response.json();

            return userProfile;
        } catch (error) {
            console.log(error);
            return;
        }
    },

    async search(term) {
        try {
            const accessToken = await this.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from Spotify API');
            }

            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                // ********** new content **********
                album_cover: track.album.images[0].url,
                // ********** new content **********
                uri: track.uri
            }));
        } catch (error) {
            console.error('Error searching tracks:', error);
            return []; // Return empty array on error
        }
    },

    async savePlaylist(name, trackUris) {
        try {
            if (!name || !trackUris.length) {
                throw new Error('Invalid playlist name or track URIs');
            }

            const accessToken = await this.getAccessToken();
            const userProfile = await this.getUserProfile();

            const userID = userProfile.id;

            // POST method to add playlist to user's playlists
            // 1. Create and save a new playlist
            const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    public: false,
                    description: 'This is a new playlist created via the Spotify API with Jammming!',
                }),
            });

            if (!createPlaylistResponse.ok) {
                throw new Error('Failed to create playlist', createPlaylistResponse.statusText);
            }

            const playlist = await createPlaylistResponse.json();

            // 2. Save the tracks to the new playlist
            const playlistId = playlist.id;

            await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uris: trackUris })
            });

            return true; // Return true on successful playlist creation
        } catch (error) {
            console.error('Failed to create playlist:', error);
            return false; // Return false on error
        }
    }
};

export default Spotify;
