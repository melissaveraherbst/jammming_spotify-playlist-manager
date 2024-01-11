import React from "react";

class Message extends React.Component {
    // constructor(props) {
    //     super(props);
        
    // }

    render() {
        const jsx = (
            <>  
            {this.props.isConnected ?
            <p>Connected</p> : <p>Not Connected</p>}
            </>
        );
        return jsx;
    }
}

export default Message;