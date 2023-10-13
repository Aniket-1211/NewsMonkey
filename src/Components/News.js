import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:10,
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number
    }
    constructor(props){
                super(props);
                console.log('Hello i m constructor from news component');
                this.state={  
                        articles:[],
                        loading:true,
                        page:1,
                        totalResults:0
                    }
                document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewMonkey`;
        };

    capitalizeFirstLetter=(string)=> {
         return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async componentDidMount(){
        // console.log('comonent did mount');
        this.updateNews();
    };
    handlePrevCLick=async ()=>{
        this.setState({page:this.state.page-1});
        this.updateNews();
    }
    handleNextCLick=async ()=>{
            this.setState({page:this.state.page+1});
            this.updateNews();
    }
    async updateNews(){
                this.props.setProgress(10);
                // let url=`https://newsapi.org/v2/top-headlines?from=2023-08-25&sortBy=publishedAt&apiKey=78ae157d997e405d90f699e99fa2d5fe&country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
                let url=`https://newsapi.org/v2/top-headlines?from=2023-09-12&sortBy=publishedAt&apiKey=a7ad182c0f34432fa631ec998acd1a8f&country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
                this.setState({loading:true})
                let data=await fetch(url);
                this.props.setProgress(30);
                let parsedData=await data.json();
                this.props.setProgress(70);
                console.log(parsedData);
                this.setState({
                    articles:parsedData.articles,
                    loading:false,
                    totalResults:parsedData.totalResults,
                });
                this.props.setProgress(100);
    }
    fetchMoreData =async () => {
        // let url=`https://newsapi.org/v2/top-headlines?from=2023-08-25&sortBy=publishedAt&apiKey=78ae157d997e405d90f699e99fa2d5fe&country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let url=`https://newsapi.org/v2/top-headlines?from=2023-09-12&sortBy=publishedAt&apiKey=a7ad182c0f34432fa631ec998acd1a8f&country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({page:this.state.page+1});
                let data=await fetch(url);
                let parsedData=await data.json();
                console.log(parsedData);
                this.setState({
                    articles:this.state.articles.concat(parsedData.articles),
                    totalResults:parsedData.totalResults,
                });
                console.log(this.state.articles);
    };
  render() {
    //   console.log('render');
    return (
      <>
            <h1 className="text-center" style={{margin:'35px 0px' , marginTop:'85px'}} >NewsMokey- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner/>}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length < this.state.totalResults}
                loader={<Spinner/>}
            >
            <div className="container">
                <div className="row">
                    {this.state.articles.map((element)=>{
                            // console.log(element)
                        return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://img.etimg.com/thumb/msid-103707446,width-1070,height-580,overlay-economictimes/photo.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}></NewsItem>
                                </div>
                            }
                        )
                    }
                </div>
            </div>
            </InfiniteScroll>
      </>
    )
  }
}

export default News
