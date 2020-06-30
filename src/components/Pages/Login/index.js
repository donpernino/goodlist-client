import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import app from '../../../base';
import { AuthContext } from '../../../context/authContext';

function Login({ history }) {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history])

    const { currentUser } = useContext(AuthContext);

    if (currentUser){
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1 className="flex items-center text-3xl text-white font-semibold mb-4 lg:mb-6">Login</h1>
            <form
                className="lg:w-2/5 flex flex-col overflow-hidden bg-secondary-dark rounded-lg shadow-xl px-4 md:px-6 py-4"
                onSubmit={handleLogin}
            >
                <div className="flex flex-col text-lg font-semibold text-white mb-6">
                    <label className="mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="bg-gray-400 font-semibold shadow-xl text-base text-white border-2 border-gray-400 focus:outline-none focus:border-primary placeholder-gray-700 text-secondary-blue rounded-lg h-12 py-4 px-4 block w-full appearance-none leading-normal transition duration-150"
                    />
                </div>
                <div className="flex flex-col text-lg font-semibold text-white mb-10">
                    <label className="mb-2" htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="bg-gray-400 font-semibold shadow-xl text-base text-white border-2 border-gray-400 focus:outline-none focus:border-primary placeholder-gray-700 text-secondary-blue rounded-lg h-12 py-4 px-4 block w-full appearance-none leading-normal transition duration-150"
                    />
                </div>
                <button
                    className="bg-primary text-black flex items-center w-2/3 justify-center py-2 px-3 rounded-full text-base font-semibold hover:bg-primarydarken transition duration-200 h-12 mb-4 font-bold"
                    type="submit"
                >Login</button>
            </form>
        </div>
    )
}

export default withRouter(Login);
