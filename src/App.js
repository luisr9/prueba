import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import { SocialIcon } from 'react-social-icons';
import logo from './logo.png';
import './App.css';

///LROA React code exercise.

class App extends Component {


  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      dataSource:[],
      error:null,
	  txtSearch: '',
	  txtUISearch:'',
	  txtSession:115,
	  txtChamber:'senate',
    }
    this.arrayholder = [];
  }
     
  
	
  
  componentDidMount() {
      const session = this.state.txtSession // 115th congressional session
      const chamber = this.state.txtChamber // or 'house'
      const url = `https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`
      // sample API call
	  fetch(url, {
      headers: new Headers({
        'X-API-Key': 'W9rr5HYNpRIhAE9Sn3UjpTmkCzBBwz8TvCiBP5qn',
      }),
    })
    .then((res) => res.json())
    .then((json) => 
     {
       this.setState({
          isLoading: false,
          dataSource: json.results[0].members,
		  txtSearch: '',		  
        }, function(){

        });

       this.arrayholder = json.results[0].members; 
    })        
    .catch(error => {        
     this.setState({ error, loading: false });      
   });
  }
  
  reloadData(event){
	  this.setState({txtSession: event.target.value.substr(0,20)});	  
	  const session = event.target.value.substr(0,20); // 115th congressional session
      const chamber = this.state.txtChamber; // or 'house'
      const url = `https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`;
      // sample API call
	  fetch(url, {
      headers: new Headers({
        'X-API-Key': 'W9rr5HYNpRIhAE9Sn3UjpTmkCzBBwz8TvCiBP5qn',
      }),
    })
    .then((res) => res.json())
    .then((json) => 
     {
       this.setState({
          isLoading: false,
          dataSource: json.results[0].members,
		  txtSearch: '',		  
        }, function(){

        });

       this.arrayholder = json.results[0].members; 
    })        
    .catch(error => {        
     this.setState({ error, loading: false });      
   });	  
  }
  
    reloadData2(event){
	  this.setState({txtChamber: event.target.value.substr(0,20)});	  
	  const session = this.state.txtSession; // 115th congressional session
      const chamber = event.target.value.substr(0,20); // or 'house'
      const url = `https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`;
      // sample API call
	  fetch(url, {
      headers: new Headers({
        'X-API-Key': 'W9rr5HYNpRIhAE9Sn3UjpTmkCzBBwz8TvCiBP5qn',
      }),
    })
    .then((res) => res.json())
    .then((json) => 
     {
       this.setState({
          isLoading: false,
          dataSource: json.results[0].members,
		  txtSearch: '',		  
        }, function(){

        });

       this.arrayholder = json.results[0].members; 
    })        
    .catch(error => {        
     this.setState({ error, loading: false });      
   });	  
  }
  
FlatListItemSeparator =()=> {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
} 
  
  updateUISearch(event){
	  this.setState({txtUISearch: event.target.value.substr(0,20)});
	  const newData = this.arrayholder.filter( 
	  (item) => { 
	  const itemData = `${item.gender} ${item.party} ${item.next_election}
		${item.office}${item.date_of_birth}${item.state}`;
	  const textData = event.target.value.substr(0,20)
	  return itemData.toUpperCase().indexOf(textData.toUpperCase()) > -1; 
	  });
	  this.setState({ dataSource: newData });  
  }
  
  updateSearch(event){
	  this.setState({txtSearch: event.target.value.substr(0,20)});
	  const newData = this.arrayholder.filter( 
	  (item) => { 
	  const itemData = `${item.first_name} ${item.last_name}`;	  
	  const textData = event.target.value.substr(0,20)
	  return itemData.toUpperCase().indexOf(textData.toUpperCase()) > -1; 
	  });
	  this.setState({ dataSource: newData });  
  }
  
  render() {	  
	  
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
       )
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Programming Exercise</h1>	
		  <div>
		  Session<input type="text" 
		  value={this.state.txtSession}
			placeholder="Session" onChange={this.reloadData.bind(this)}
			/>
			Chamber<input type="text" 
		  value={this.state.txtChamber}
			placeholder="Chamber" onChange={this.reloadData2.bind(this)}
			/>			
		  </div>			
		  <div>
		  Filters<input type="text" 
		  value={this.state.txtSearch}
			placeholder="By Name" onChange={this.updateSearch.bind(this)}
			/>
			<input type="text" 
		  value={this.state.txtUISearch}
			placeholder="Others" onChange={this.updateUISearch.bind(this)}
			/>			
			</div>			
        </header>
        <section className="container">
          {			
			<FlatList
              data={this.state.dataSource}
              renderItem={ ({item}) => 
              <View>
			  <Text className="flatList_itemsB"> 
			  {item.first_name} {item.last_name}</Text>			  
			  <Text className="flatList_items">
			  Party:{item.party}, State: {item.state}, Next Election: {item.next_election}
			  </Text>
			  <Text className="flatList_items"> 
			  <SocialIcon url={`https://www.facebook.com/${item.facebook_account}`} style={{ height: 22, width: 22 }}/> 
			  <SocialIcon url={`https://www.twitter.com/${item.twitter_account}`} style={{ height: 22, width: 22 }}/>
			  <SocialIcon url={`https://www.youtube.com/${item.youtube_account}`} style={{ height: 22, width: 22 }}/>
			  </Text>			  			  
			  </View>
			  }
			  ItemSeparatorComponent = {this.FlatListItemSeparator}
              keyExtractor={({id}, index) => id}
            />
          }
        </section>
      </div>
    );
  }
}

export default App;
