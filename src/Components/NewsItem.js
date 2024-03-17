import React, { Component } from "react";

export class NewsItem extends Component {
	render() {
		let { title, description, imageUrl,newsUrl, author, date} = this.props;
		return (
			<div className="my-3">
				<div className="card">
					<img src={!imageUrl?"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg":imageUrl} className="card-img-top" alt="newsImage" />

					<div className="card-body">
						<h5 className="card-title">{title}...</h5>
						<p className="card-text">{description}...</p>
						<p className="card-text fw-bold"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
						<a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
							Read More
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default NewsItem;
