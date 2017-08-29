import React from 'react';
import Auth from './Auth.jsx';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.Auth = new Auth;
        this.state = {username: '', password: ''};
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(event) {
        this.setState({username: event.target.value});
    }
    handlePassword(event){
        this.setState({password: event.target.value})
    }
    handleSubmit(event) {
        event.preventDefault();
        this.Auth.login(this.state.username, this.state.password, (reply) => {
            this.props.fetch();
        })
        this.setState({username: '', password: ''});
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit = {this.handleSubmit}>
                <div>
                    <label >Username:

                        <input type="text" value={this.state.username} onChange={this.handleUsername} />

                    </label>
                </div>
                <div>
                    <label>Password:
                        <input type="text" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
                </form>
             
            </div>
        );
    }
}

export default Login;