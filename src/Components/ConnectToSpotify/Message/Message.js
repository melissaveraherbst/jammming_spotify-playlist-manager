import React from "react";

class Message extends React.Component {
    render() {
        const jsx = (
            <>
                {this.props.isConnectedToSpotify ?
                    <p>Connected</p> : <p>Not Connected</p>}
            </>
        );
        return jsx;
    }
}

export default Message;