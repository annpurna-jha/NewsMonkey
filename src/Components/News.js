import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
	static defaultProps ={
		country:'in',
		pageSize: 8,
		category:'general'
	}
	static propTypes ={
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	}

	capitalizeFirstLetter = (string)=>{
		return string.charAt(0).toUpperCase()+string.slice(1);
	}

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: true,
			page: 1,
			totalResults: 0

		};
		document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
	}

	async updateNews(){
		const url =
			`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c765ac17c3c48d892dfbbde9f998b11&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		this.setState({loading:true});
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({ 
			articles: parsedData.articles, 
			totalResults: parsedData.totalResults,
			loading: false,
		})

	}

	async componentDidMount() {
		this.updateNews();
	}

	handelPrevClick= async()=>{
		this.setState({page:this.state.page-1});
		this.updateNews();
	}

	 handleNextClick= async()=>{
		this.setState({page: this.state.page+1});
		this.updateNews();
	}
 	fetchMoreData = async() => {
		this.setState({page:this.state.page + 1})
	
		const url =
			`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c765ac17c3c48d892dfbbde9f998b11&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({ 
			articles: this.state.articles.concat(parsedData.articles),  
			totalResults: parsedData.totalResults
		})
	  };

	render() {
		return (
			<div className="container my-3">
				<h1 className="text-center" >NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
				{this.state.loading && <Spinner/>}

				<InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
			<div className="container">
				<div className="row">
					{this.state.articles.map((element) => {
						return (
							<div className="col-md-4" key={element.url}>
								<NewsItem
									title={element.title?element.title.slice(0,40): ""}
									description={element.description?element.description.slice(0,250): ""}
									imageUrl={element.urlToImage}
									newsUrl={element.url} author ={element.author} date={element.publishedAt}
								/>
							</div>
						);
					})}
				</div>

			</div>
			</InfiniteScroll>
			</div>
		);
	}
}

export default News;
