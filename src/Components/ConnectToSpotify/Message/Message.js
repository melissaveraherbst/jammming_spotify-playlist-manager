import React from "react";
import './Message.css'

class Message extends React.Component {
    render() {
        const jsx = (
            <div className="ConnectedStatus">
                {this.props.isConnectedToSpotify ?
                    <p className="ConnectedStatusTrue">Connected</p> : <p className="ConnectedStatusFalse">Not Connected</p>}
            </div>
        );
        return jsx;
    }
}

export default Message;