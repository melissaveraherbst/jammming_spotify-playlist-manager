<div align=center>

<img src="./public/images/jammming_logo_full.png" width=300px>
    
![Static Badge](https://img.shields.io/badge/HTML5-grey?style=flat-square&logo=html5)
![Static Badge](https://img.shields.io/badge/CSS3-grey?style=flat-square&logo=css3)
![Static Badge](https://img.shields.io/badge/JavaScript-grey?style=flat-square&logo=JavaScript)
![Static Badge](https://img.shields.io/badge/React-grey?style=flat-square&logo=react)
![Static Badge](https://img.shields.io/badge/Spotify%20API-grey?style=flat-square&logo=spotify)
![Static Badge](https://img.shields.io/badge/Codecademy%20Project-grey?style=flat-square&logo=codecademy)

**A Codecademy Pro Project for the [Create a Front-End App with React](https://www.codecademy.com/learn/paths/build-web-apps-with-react) Course**

</div>

Jammming is a React web application that enables users to create and add playlists to their Spotify account. It does this by utilizing the Spotify API to connect and authenticate to a user's account, and to search for Tracks, Artists or Albums. The results are then presented in a list where individual tracks can easily be added to or removed from a new playlist. Once the playlist has been assembled, it can be given a name and then saved to the user's Spotify account with the click of a button.

> 📝 The UI and styling of my projects may appear different from what is provided by the online course material. While it's the same course project, I've personalized the UI and styling to my preferences. 😉

![jammming screenshot](https://github.com/melissaveraherbst/jammming_spotify-playlist-manager/assets/84316275/78d3d348-4f1b-4bf5-b813-500b3aacd05c)

## 🧩 Features

- User authentication through Spotify account
- Search functionality for songs, albums, and artists
- Create and manage custom playlists
- Add tracks to created playlists
- Remove tracks from playlists
- View and play saved playlists on Spotify

## 🕹️ How to Use

To use this application locally, follow these steps:

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/melissaveraherbst/jammming_spotify-playlist-manager.git
   ```

2. Navigate to the project directory

3. Install the required npm packages:

   ```bash
   npm install
   ```

### Configuration
Before running the application, you'll need to create a Spotify Developer Account and Register Your App:
Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and create a new app. Obtain the client ID for your app.
Create a .env file in the root directory of the project and add the following:

```plaintext
REACT_APP_SPOTIFY_CLIENT_ID=your-client-id
REACT_APP_SPOTIFY_REDIRECT_URI=your-redirect-uri
```

Replace `your-client-id` and `your-redirect-uri` with your actual Spotify API client ID and redirect URI.

### Usage

After installing the necessary packages and doing the necessary configurations listed above, you can start the application by running:

```bash
npm start
```

This command starts the development server. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🔓 Security Note

As per the original course instructions, this application currently uses the Spotify [Implicit Grant Flow](https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow) for authentication. Please note that the implicit grant flow has major security flaws, such as exposing access tokens in the URL and lacking token refresh capabilities, which could potentially lead to security vulnerabilities. It's important to be aware of these risks, especially if you plan to use this application in a production environment.

### Alternatives

If you're concerned about the security implications of the Implicit Grant Flow, here are some alternatives you might consider implementing:

- **Authorization Code Flow**: Consider refactoring the authentication process to use the Spotify Authorization Code Flow, which provides a more secure way of handling authentication by exchanging an authorization code for tokens on the server-side.

- **OAuth 2.0 Libraries**: Utilize OAuth 2.0 libraries or SDKs provided by Spotify or other reputable sources to implement secure authentication and authorization mechanisms.

Please note that while these alternatives offer improved security, implementing them might require significant changes to the authentication logic of the application.

---
Made with 💚 by Melissa V. Herbst
