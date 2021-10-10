import React, {Component} from 'react';
import './AddRestaurant.css';
import axios from 'axios';
import CustomizedDialogs from '../../components/Dialog/Dialog';
import PopUp from '../../components/Popup/Popup';

export default class AddRestaurant extends Component {
    constructor(){
        super();
        this.state = {
            provienceForSelectedContry: this.countryAndProvince[0].states,
            restaurantName: '',
            restaurantLocation: '',
            restaurantCity: '',
            restaurantCountry: 'US',
            restaurantProvience: 'AL',
            restaurantPincode: '',
            restaurantDescription: '',
            errorMessage: '',
            menuItems: [],
            dishName: '',
            dishPrice: '',
            dishIngredients: '',
            mealType: 'Brakfast',
            dishCategory: 'Todays Offer',
            dishType:'Veg',
            open: false,
            errorMessageOnMenu: '',
            dishDescription:'',
            uploadedFile: '',
            openConfirmation: false,
            message: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.validateBasicFromDetail = this.validateBasicFromDetail.bind(this);
    }

    toggleModal(){
        this.setState({open: !this.state.open})
    }

    componentDidMount(){
        this.loadBasicDetails();
        this.loadMenuItems();
    }

     loadBasicDetails(){
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
              }
          }
        axios.get('http://localhost:3001/basicDetail', headerConfig).then(res=>{
            if(res.data){
                this.setState({restaurantName:res.data.name, restaurantLocation: res.data.city, restaurantCity: res.data.city, restaurantCountry: res.data.country, restaurantProvience: res.data.provience, restaurantPincode: res.data.pincode, restaurantDescription: res.data.description});
            }
        })    
    }

    async loadMenuItems(){
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
              }
          }
        const menuItems = await axios.get(`http://localhost:3001/menuDetails`, headerConfig);
        this.setState({menuItems: menuItems.data});
    }

    countryAndProvince = [
                {
                    "name": "United States",
                    "abbreviation": "US",
                    "states": [
                        {
                            "name": "Alabama",
                            "abbreviation": "AL"
                        },
                        {
                            "name": "Alaska",
                            "abbreviation": "AK"
                        },
                        {
                            "name": "American Samoa",
                            "abbreviation": "AS"
                        },
                        {
                            "name": "Arizona",
                            "abbreviation": "AZ"
                        },
                        {
                            "name": "Arkansas",
                            "abbreviation": "AR"
                        },
                        {
                            "name": "California",
                            "abbreviation": "CA"
                        },
                        {
                            "name": "Colorado",
                            "abbreviation": "CO"
                        },
                        {
                            "name": "Connecticut",
                            "abbreviation": "CT"
                        },
                        {
                            "name": "Delaware",
                            "abbreviation": "DE"
                        },
                        {
                            "name": "District Of Columbia",
                            "abbreviation": "DC"
                        },
                        {
                            "name": "Federated States Of Micronesia",
                            "abbreviation": "FM"
                        },
                        {
                            "name": "Florida",
                            "abbreviation": "FL"
                        },
                        {
                            "name": "Georgia",
                            "abbreviation": "GA"
                        },
                        {
                            "name": "Guam",
                            "abbreviation": "GU"
                        },
                        {
                            "name": "Hawaii",
                            "abbreviation": "HI"
                        },
                        {
                            "name": "Idaho",
                            "abbreviation": "ID"
                        },
                        {
                            "name": "Illinois",
                            "abbreviation": "IL"
                        },
                        {
                            "name": "Indiana",
                            "abbreviation": "IN"
                        },
                        {
                            "name": "Iowa",
                            "abbreviation": "IA"
                        },
                        {
                            "name": "Kansas",
                            "abbreviation": "KS"
                        },
                        {
                            "name": "Kentucky",
                            "abbreviation": "KY"
                        },
                        {
                            "name": "Louisiana",
                            "abbreviation": "LA"
                        },
                        {
                            "name": "Maine",
                            "abbreviation": "ME"
                        },
                        {
                            "name": "Marshall Islands",
                            "abbreviation": "MH"
                        },
                        {
                            "name": "Maryland",
                            "abbreviation": "MD"
                        },
                        {
                            "name": "Massachusetts",
                            "abbreviation": "MA"
                        },
                        {
                            "name": "Michigan",
                            "abbreviation": "MI"
                        },
                        {
                            "name": "Minnesota",
                            "abbreviation": "MN"
                        },
                        {
                            "name": "Mississippi",
                            "abbreviation": "MS"
                        },
                        {
                            "name": "Missouri",
                            "abbreviation": "MO"
                        },
                        {
                            "name": "Montana",
                            "abbreviation": "MT"
                        },
                        {
                            "name": "Nebraska",
                            "abbreviation": "NE"
                        },
                        {
                            "name": "Nevada",
                            "abbreviation": "NV"
                        },
                        {
                            "name": "New Hampshire",
                            "abbreviation": "NH"
                        },
                        {
                            "name": "New Jersey",
                            "abbreviation": "NJ"
                        },
                        {
                            "name": "New Mexico",
                            "abbreviation": "NM"
                        },
                        {
                            "name": "New York",
                            "abbreviation": "NY"
                        },
                        {
                            "name": "North Carolina",
                            "abbreviation": "NC"
                        },
                        {
                            "name": "North Dakota",
                            "abbreviation": "ND"
                        },
                        {
                            "name": "Northern Mariana Islands",
                            "abbreviation": "MP"
                        },
                        {
                            "name": "Ohio",
                            "abbreviation": "OH"
                        },
                        {
                            "name": "Oklahoma",
                            "abbreviation": "OK"
                        },
                        {
                            "name": "Oregon",
                            "abbreviation": "OR"
                        },
                        {
                            "name": "Palau",
                            "abbreviation": "PW"
                        },
                        {
                            "name": "Pennsylvania",
                            "abbreviation": "PA"
                        },
                        {
                            "name": "Puerto Rico",
                            "abbreviation": "PR"
                        },
                        {
                            "name": "Rhode Island",
                            "abbreviation": "RI"
                        },
                        {
                            "name": "South Carolina",
                            "abbreviation": "SC"
                        },
                        {
                            "name": "South Dakota",
                            "abbreviation": "SD"
                        },
                        {
                            "name": "Tennessee",
                            "abbreviation": "TN"
                        },
                        {
                            "name": "Texas",
                            "abbreviation": "TX"
                        },
                        {
                            "name": "Utah",
                            "abbreviation": "UT"
                        },
                        {
                            "name": "Vermont",
                            "abbreviation": "VT"
                        },
                        {
                            "name": "Virgin Islands",
                            "abbreviation": "VI"
                        },
                        {
                            "name": "Virginia",
                            "abbreviation": "VA"
                        },
                        {
                            "name": "Washington",
                            "abbreviation": "WA"
                        },
                        {
                            "name": "West Virginia",
                            "abbreviation": "WV"
                        },
                        {
                            "name": "Wisconsin",
                            "abbreviation": "WI"
                        },
                        {
                            "name": "Wyoming",
                            "abbreviation": "WY"
                        }
                    ]
                },
                {
                    "name": "Canada",
                    "abbreviation": "CA",
                    "states": [
                        {
                            "name": "Alberta",
                            "abbreviation": "AB"
                        },
                        {
                            "name": "British Columbia",
                            "abbreviation": "BC"
                        },
                        {
                            "name": "Manitoba",
                            "abbreviation": "MB"
                        },
                        {
                            "name": "New Brunswick",
                            "abbreviation": "NB"
                        },
                        {
                            "name": "Newfoundland and Labrador",
                            "abbreviation": "NL"
                        },
                        {
                            "name": "Northwest Territories",
                            "abbreviation": "NT"
                        },
                        {
                            "name": "Nova Scotia",
                            "abbreviation": "NS"
                        },
                        {
                            "name": "Nunavut",
                            "abbreviation": "NU"
                        },
                        {
                            "name": "Ontario",
                            "abbreviation": "ON"
                        },
                        {
                            "name": "Prince Edward Island",
                            "abbreviation": "PE"
                        },
                        {
                            "name": "Quebec",
                            "abbreviation": "QC"
                        },
                        {
                            "name": "Saskatchewan",
                            "abbreviation": "SK"
                        },
                        {
                            "name": "Yukon Territory",
                            "abbreviation": "YT"
                        }
                    ]
                }
            ]

    validateMenuForm() {
        if(this.state.dishName.length < 1){
            this.setState({errorMessageOnMenu: 'Enter valid Dish name'})
            return false;
        }
        return true;
    }

    handleDishName(e) {
        this.setState({dishName: e.target.value});
    }

    handleDishPrice(e) {
        this.setState({dishPrice: e.target.value});
    }

    handleDishIngredients(e) {
        this.setState({dishIngredients: e.target.value});
    }

    handleMealType(e) {
        this.setState({mealType: e.target.value});
    }

    handleDishCategory(e) {
        this.setState({dishCategory: e.target.value});
    }

    handleDishType(e) {
        this.setState({dishType: e.target.value});
    }
    
    handleDishDescription(e){
        this.setState({dishDescription : e.target.value});
    }

    removeExstingMenuItem(id){
        console.log(id);
        axios.get(`http://localhost:3001/removeItem/${id}`)
        const menuItems = [...this.state.menuItems];
        const index = menuItems.findIndex((menu)=>{
            return id == menu.id
        });
        menuItems.splice(index, 1);
        this.setState({menuItems: menuItems})
    }

    generateMenuList(data){
        console.log(data);
        return <div style={{borderBottom: '1px solid black', padding: '10px'}}>
        <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
            <span>{data.dishName}</span> 
            <span>{data.dishPrice}</span>
            <span>{data.mainIngredients}</span>
            <span>{data.dishTag}</span>
            <span>{data.dishType}</span>
            <span>{data.dishCategory}</span>
            <a class="link" onClick={()=>this.removeExstingMenuItem(data.dishId)}>Remove</a>
        </div>
    </div>
    }

    removeDishForm(id){
        let dishForm = [...this.state.dishForm];
        let dishFormData = [...this.state.dishFormData];
        dishForm.splice(id - 1, 1);
        dishFormData.splice(id - 1, 1)
        this.setState({dishForm: dishForm, dishFormData: dishFormData})

    }

    handleCountryChange(e){
        const selectedCountry = e.target.value;
        this.setState({restaurantCountry: selectedCountry})
        if(selectedCountry == 'US') {
            this.setState({provienceForSelectedContry : this.countryAndProvince[0].states})
            this.setState({restaurantProvience: 'AL'})
        }
        if(selectedCountry == 'CA') {
            this.setState({provienceForSelectedContry : this.countryAndProvince[1].states})
            this.setState({restaurantProvience: 'AB'})
        }
    }

    restaurantNameHandler(e){
        this.setState({restaurantName: e.target.value})
    }
    restaurantLocationHandler(e){
        this.setState({restaurantLocation: e.target.value})
    }

    restaurantPincodeHandler(e){
        this.setState({restaurantPincode: e.target.value})
    }

    handleProvinceChange(e){
        this.setState({restaurantProvience: e.target.value})
    }

    restaurantDescriptionHandler(e){
        this.setState({restaurantDescription: e.target.value})
    }

    validateBasicFromDetail(){
        if(this.state.restaurantName == null || this.state.restaurantName?.length < 1) {
            this.setState({errorMessage: 'Enter a valid restaurant name'})
            return false;
        }if(this.state.restaurantLocation == null || this.state.restaurantLocation?.length < 1) {
            this.setState({errorMessage: 'Enter a valid location'})
            return false;
        }if(this.state.restaurantPincode == null || this.state.restaurantPincode?.length < 5) {
            this.setState({errorMessage: 'Enter a valid pin code'})
            return false;
        }if(this.state.restaurantDescription == null || this.state.restaurantDescription?.length < 1) {
            this.setState({errorMessage: 'Enter a valid description'})
            return false;
        }else{
            this.setState({errorMessage: ''})
            return true;
        }
    }


    saveMenu(){
        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token'),
              }
          }
        if(this.validateBasicFromDetail() == false || this.validateMenuForm() == false) return;
        const body = {
            dishName: this.state.dishName,
            dishDescription: this.state.dishDescription,
            dishPrice: this.state.dishPrice,
            dishIngredients: this.state.dishIngredients,
            mealType: this.state.mealType,
            dishCategory: this.state.dishCategory,
            dishType: this.state.dishType,
            restaurantMobileNumber: localStorage.getItem("restaurantMobileNumber"),
            image: this.state.uploadedFile
        }
         axios.post('http://localhost:3001/addRestaurantMenu', body, headerConfig).then(response=>{ 
            let menuItems = [...this.state.menuItems];
            menuItems.push(body);
            this.setState({menuItems});
            this.setState({openConfirmation: true, message: 'Dish has been added!'})
            setTimeout(() => {
               this.setState({openConfirmation: false, message: ''})
            }, 2000);
            this.toggleModal();
        })
        
    }

    uploadImage(e){
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const formData = new FormData();
        formData.append('myImage', e.target.files[0]);
        axios.post("http://localhost:3001/upload",formData,config)
            .then((res) => {
               this.setState({uploadedFile: res.data.fileName});
            }).catch((error) => {
        });
    }


    saveRestaurantData(){
        if(this.validateBasicFromDetail() === false) return;
        const basicDetails= {
                restaurantName: this.state.restaurantName,
                restaurantAddress: this.state.restaurantAddress,
                restaurantCity: this.state.restaurantLocation,
                restaurantProvience: this.state.restaurantProvience || 'US',
                restaurantCountry: this.state.restaurantCountry || 'AL',
                restaurantPincode: this.state.restaurantPincode,
                restaurantDescription: this.state.restaurantDescription
        }

        const headerConfig = {
            headers: {
                'x-authentication-header': localStorage.getItem('token')
              }
          }
         axios.post('http://localhost:3001/addRestaurantBasicDetail', basicDetails, headerConfig).then(res=>{
            this.setState({openConfirmation: true, message: 'Basic details has been saved!'})
            setTimeout(() => {
               this.setState({openConfirmation: false, message: ''})
            }, 2000);
        });
    }

    render(){
        return (
          <div class="container" >
            <h5>Basic Details</h5>
            <span class="mandatory">* All Fields are mandatory</span>
            <p class="error">{this.state.errorMessage}</p>
            <div class="d-flex justify-content-around">
              <input
                type="text"
                placeholder="Resturant's Name"
                value={this.state.restaurantName}
                onChange={this.restaurantNameHandler.bind(this)}
              />
              <input
                type="text"
                placeholder="Resturant's Location"
                value={this.state.restaurantLocation}
                onChange={this.restaurantLocationHandler.bind(this)}
              />
            </div>

            <div class="d-flex justify-content-around">
              <select
                placeholder="Select Country"
                value={this.state.restaurantCountry}
                onChange={this.handleCountryChange.bind(this)}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>

              <select
                placeholder="Select Province"
                value={this.state.restaurantProvience}
                onChange={this.handleProvinceChange.bind(this)}
              >
                {this.state.provienceForSelectedContry.map((provience) => {
                  return (
                    <option value={provience.abbreviation}>
                      {provience.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div class="d-flex justify-content-around">
              <input
                type="number"
                placeholder="Resturant's Pincode"
                value={this.state.restaurantPincode}
                onChange={this.restaurantPincodeHandler.bind(this)}
              />
              <input
                type="text"
                placeholder="Resturant's Description"
                value={this.state.restaurantDescription}
                onChange={this.restaurantDescriptionHandler.bind(this)}
              />
            </div>

            <div class="d-flex justify-content-evenly">
                    <button class="btn btn-success" onClick={this.saveRestaurantData.bind(this)}>Save Basic Details</button>

            </div>

            <h5>Menu Details</h5>
            <button
              class="btn btn-primary mt-3"
              onClick={this.toggleModal}
            >
              Add +
            </button>

            {this.state.menuItems.map((list) => {
              return this.generateMenuList(list);
            })}
 

            <CustomizedDialogs open={this.state.open} closeCart={this.toggleModal} action={this.saveMenu.bind(this)} actionLabel="Save Dish" title="Add Menu">
              <div class="menuForm">
                <span class="mandatory">* All Fields are mandatory</span>
                <p class="error">{this.state.errorMessageOnMenu}</p>
                <div class="d-flex justify-content-between">
                  <input
                    type="text"
                    placeholder="Dish name"
                    onChange={
                      this.handleDishName.bind(this)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Dish Price"
                    onChange={
                      this.handleDishPrice.bind(this)
                    }
                  />
                  </div>
                  <div class="d-flex justify-content-between">
                  <input
                    type="text"
                    placeholder="Ingredients (Use comma to seperate)"
                    onChange={
                      this.handleDishIngredients.bind(this)
                    }
                  />
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={this.uploadImage.bind(this)}
                  />
                </div>

                <div class="d-flex justify-content-between">
                  <select
                    onChange={
                      this.handleMealType.bind(this)
                    }
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                  </select>

                  <select
                    onChange={
                      this.handleDishCategory.bind(this)
                    }
                  >
                    <option value="Todays Offer">Todays Offer</option>
                    <option value="Trending Now">Trending Now</option>
                    <option value="Healthy Eating">Healthy Eating</option>
                    <option value="Easy on Pocket">Easy on Pocket</option>
                  </select>
                </div>

                <div class="d-flex justify-content-between">
                  <select
                    onChange={
                      this.handleDishType.bind(this)
                    }
                  >
                    <option value="Veg">Veg</option>
                    <option value="Nonveg">NonVeg</option>
                  </select>
                </div>

                <div class="d-flex justify-content-between">
                  <textarea
                    type="text"
                    row="5"
                    cols="80"
                    placeholder="Dish Description"
                    onChange={
                      this.handleDishDescription.bind(this)
                    }
                  />
                </div>
              </div>
            </CustomizedDialogs>
            <PopUp open={this.state.openConfirmation} message={this.state.message}/>
          </div>
        );
    }
}