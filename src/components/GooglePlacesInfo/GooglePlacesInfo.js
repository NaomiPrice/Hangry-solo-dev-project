import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class GooglePlcesInfo extends Component {
    state = {
        loading: false,
        response: null,
        userLat: null,
        userLng: null,
    }

    getGoogleData = ()=>{
        //if currently loading or response is populated we don't need to make google api call
        if(this.state.loading || this.state.response){
            return
        }
        //begin by changing local loading state to ture to indicate loading has begun
        this.setState({
            loading: true,
        })
        const placesId = this.props.reduxState.singleRestaurant.google_places_id;
        Axios({
            method: 'GET',
            url: `/api/restaurant/google/${placesId}`,
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                //when Google data gets back, set local loading state back to false 
                //and fill response with data frojm Google
                loading: false,
                response: response.data,
            })
        }).catch((error)=>{
            console.log('error getting data from google', error)
        })
    }

    geolocate = ()=> {
        //get geolocation as supplied by brwoser's navigator.geolocation object
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
              //set current geolocation to local state to use in calculations
            this.setState({
                userLat: position.coords.latitude,
                userLng: position.coords.longitude,
            })  
          });
        }
    }

    getMyDistance = (lat1, lon1, lat2, lon2, unit)=> {
        if(!lat1 || !lon1 || !lat2 || !lon2){
            return '0';
        }
        //calculate distance distance between two points with latitudet and longitude
        const radlat1 = Math.PI * lat1/180
        const radlat2 = Math.PI * lat2/180
        const theta = lon1-lon2
        const radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit==="K") { dist = dist * 1.609344 }
        if (unit==="N") { dist = dist * 0.8684 }
        return dist
    }

    displayPriceLevel = ()=>{
        switch(this.state.response.price_level){
            case 1:
                return '$'
            case 2:
                return '$$'
            case 3:
                return '$$$'
            case 4:
                return '$$$$'
            case 5:
                return '$$$$$'
            default:
                return '--'
        }
    }

    componentDidMount = ()=>{
        this.getGoogleData();
        this.geolocate();
    }

    render(){
        if(this.state.loading || !this.state.response){
           return <p>loading...</p>
        }
        let placeLat = this.state.response.geometry.location.lat;
        let placeLng = this.state.response.geometry.location.lng;
        const distance = this.getMyDistance(placeLat, placeLng, this.state.userLat, this.state.userLng, "M")
        let address = this.state.response.address_components;
        return(
            
           <div className="googleData">
               <div className="addressDiv">
                <p>{address[0].short_name} {address[1].short_name},</p>
                <p>{address[2].short_name}, {address[4].short_name} {address[6].short_name}</p>
               </div>
               <div className="detailDiv">
                <p>{this.displayPriceLevel()}</p>
                <p>{Math.round(distance * 10)/10} miles away</p>
               </div>
            
           </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(GooglePlcesInfo);