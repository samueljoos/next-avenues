import { Component } from 'react';

class B extends Component {
    render() {
        return <div>
            <h1>B {this.props.route.params.lang}</h1>
        </div>;
    }
}

export default B;
