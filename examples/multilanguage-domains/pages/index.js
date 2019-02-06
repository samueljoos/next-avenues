import { Component } from 'react';

class Index extends Component {
    render() {
        return <div>
            <h1>Index {this.props.route.data.lang}</h1>
        </div>;
    }
}

export default Index;
