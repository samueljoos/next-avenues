import { Component } from 'react';

class A extends Component {
    render() {
        return <div>
            <h1>A {this.props.route.params.lang}</h1>
        </div>;
    }
}

export default A;
