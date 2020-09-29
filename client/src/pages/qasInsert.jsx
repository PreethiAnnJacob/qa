/*import React, {Component} from 'react'
import Utils from 'axios'

class GenericController extends React.Component {
    constructor(props) {
        super(props);

        this.getPage = this.getPage.bind(this);
    }

    async getPage() {
        const pageList = await Utils.http.get('http://demo5369936.mockable.io/pages');
        console.log(pageList.data);
        const possiblePages = Object.keys(pageList.data);

        if (possiblePages.indexOf(window.location.pathname) !== -1) {
            return pageList.data[window.location.pathname];
        } else {
            return (
                <div>
                    <h1 className="subpage">404 - Page not fpund!</h1>
                    <p className="subpage">The page you are looking for is not found. Please contact support if you thing this is wrong!</p>
                </div>
            );
        }
    }

    render() {
        return (
            <section className="not-found-controller">
                { this.getPage }
            </section>
        );
    }
}

export default GenericController;
*/