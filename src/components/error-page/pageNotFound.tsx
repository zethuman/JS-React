import React, { ReactElement } from 'react'
import classes from './pageNotFound.module.css'
interface Props {

}

export default function PageNotFound({ }: Props): ReactElement {


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
