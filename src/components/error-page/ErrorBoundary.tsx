import React, { Component, ErrorInfo } from 'react';
import classes from './pageNotFound.module.css';
interface Props {

}
interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    state = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error: ", error);
        console.log("Stack Trace: ", errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // return <PageNotFound />
            return (
                <div id={classes.notfound}>
                    <div className={classes.notfound}>
                        <div className={classes.notfound_404}>
                            <h3>Oops! Page not found</h3>
                            <h1><span>4</span><span>0</span><span>4</span></h1>
                        </div>
                        <h2>we are sorry, but the page you requested was not found</h2>
                    </div>
                </div>
            )

        }
        return this.props.children;
    }
}

