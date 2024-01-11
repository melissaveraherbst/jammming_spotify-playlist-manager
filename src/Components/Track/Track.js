import React from "react";
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    
    addTrack() {
        //  prop passed from the TrackList Component
        const { track } = this.props;
        return this.props.onAddTrack(track);
    }
    
    removeTrack() {
        //  prop passed from the TrackList Component
        const { track } = this.props;
        return this.props.onRemoveTrack(track);
    }

    renderButtonAction() {
        const addButton = <button className="Track-action" onClick={this.addTrack}>+</button>;
        const removeButton = <button className="Track-action" onClick={this.removeTrack}>-</button>;
        if (this.props.isRemoval) {
            return removeButton;
        } else {
            return addButton;
        }
    }

    render() {
        //  props passed from the TrackList Component
        const { name, artist, album } = this.props.track;
        const jsx = (
            <div className="Track">
                <div className="Track-information">
                    <h3>
                        {name}
                    </h3>
                    <p>
                        {`${artist} | ${album}`}
                    </p>
                </div>
                {this.renderButtonAction()}
            </div>
        );
        return jsx;
    }
}

export default Track;