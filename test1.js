

//api.openweathermap.org/data/2.5/weather?q={Raleigh},{NC}&appid={3af313365da13c96b5e0308f2ddbd458}
//const axios = require('axios');
/*
axios.get("http://api.openweathermap.org/data/2.5/weather?q=Raleigh&APPID=3af313365da13c96b5e0308f2ddbd458").then(resp => {

    console.log(resp);
});
*/
/*
async function fn1() {
    const result = await axios({
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Raleigh&APPID=3af313365da13c96b5e0308f2ddbd458',
        params:{units: 'imperial'},
      });
      console.log(result)
    return result;
};
*/


var firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain:  keys.authDomain,
  projectId:  keys.projectId,
  storageBucket:  keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId:  keys.appId,
  measurementId:  keys.measurementId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

async function fn1() {
    const result = await axios({
        method: 'get',
        url: 'api.openweathermap.org/data/2.5/weather?lat=30&lon=139&appid=3af313365da13c96b5e0308f2ddbd458',
        params:{units: 'imperial'},
      });
      console.log(result)
    return result.data;
};

async function fn2(n) {
    const result = await axios({
        method: 'get',
        url: 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=off',
        params: {offset: n,
                totalCount: 7},
      });
    //console.log(result.data.data[4])
    return result.data.data;
};

async function fn3() {
  const result = await axios({
      method: 'get',
      url: 'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff',
    });
    console.log(result.data)
  return result.data;
};


async function fn5() {
    const result = await axios({
        method: 'get',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Balkh&APPID=3af313365da13c96b5e0308f2ddbd458',
        params:{units: 'imperial'},
      });
      console.log(result)
    return result;
};

async function fn6(city) {
  try{
  const result = await axios({
      method: 'get',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=3af313365da13c96b5e0308f2ddbd458',
      params:{units: 'imperial'},
    });
  
    //console.log(result)
  return result;

}catch(error){
  return false;
}
}

async function fn7() {
  const result = await axios({
      method: 'get',
      url: 'https://api.ipify.org?format=json',
    });
  
    //console.log(result)
  return result;


}

async function fn8() {
  let ip = await fn7()
  ip = ip.data.ip
  console.log(ip)
  const result = await axios({
      method: 'get',
      url: 'https://ipapi.co/'+ip+'/json/',
    });
  
    console.log(result)
  return result.data.city;


}



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function makeBox(info,i){
  return `<div class="box"> <h2>${info.city_name} , ${info.country_name}</h2> 
          <h3> ${info.latitude}° , ${info.longitude}° </h3>

          <h4> Pressure: ${info.pressure}</h4>
          <h4> Humidity: ${info.humidity}</h4>
          <input id=${i}> </input>
  </div>`
}



let notDone3 = true;


var main_arr = []
async function main(){
  console.log("I loaded Once"+$( "div" ).length)
  let notDone = true;
  let notDone2 = true;
  if(notDone3){
    notDone3=false
  main_arr = []

  $("body").append(`<button type="logout"> Logout </button>`)
  $("body").append(`<a class="button" href="leaderboard.html" > LeaderBoard </a>`)
  $("body").append(`<a class="button" href="tutorial.html" > How to play </a>`)
  let weather = await fn8();
  let weather2 = await fn6(weather);
  console.log(weather+" "+weather2)
  if(weather2){
  $("body").append(`<h4> Weather where you are (${weather}): ${weather2.data.main.temp}</h4>`)
  }
  else{
    $("body").append(`<h4> Can not find weather where you are (${weather})</h4>`)
  }
  $(document).on('click', 'button[type="logout"]', function(event){
    firebase.auth().signOut();
    location.reload()


  });
    while(main_arr.length<3){
      let arr = await fn2(getRandomInt(4000))
      //console.log(arr.length)
      for(var i=0;i<5;i++){
        let arr2 = await fn6(arr[i].name)
        //console.log(arr[i])
        console.log(arr2)
        if(arr2!=false){
        /*
          var temp_arr = {'city_name': arr[i].name, 'country_name': arr[i].country, 'latitude': arr[i].latitude, 'longitude': arr[i].longitude,
            'temp': arr2.data.main.temp, 'pressure': arr2.data.main.pressure,
            'humidity': arr2.data.main.humidity}
            */
            var temp_arr = {'city_name': arr[i].name, 'country_name': arr[i].country, 'latitude': arr[i].latitude, 'longitude': arr[i].longitude,
            'temp': arr2.data.main.temp, 'pressure': arr2.data.main.pressure,
            'humidity': arr2.data.main.humidity}
            main_arr.push(temp_arr)
        }
          //console.log(arr2)
      }
    }
    console.log(main_arr)
    let load = 0
    console.log($(".box").length);
    //$("body").append(`<div><h1>${main_arr[2].temp}</h1></div>`)
    if(load<4){
      console.log(notDone2)
      console.log(load)
      for(var i=0;i<3;i++){
        notDone2 = false

          $("body").append(makeBox(main_arr[i],i))
          load+=1
        
      }
      console.log(load)

    }
    $("body").append(`<button type="submit"> Submit</button>`)
    var sum = 100
    $(document).on('click', 'button[type="submit"]', function(event){
      if(notDone){
        notDone = false
      //console.log($( 'input[name="tweet-box"').val())
      let h = [$('#0').val(),$('#1').val(),$('#2').val()]
      sum = sum - Math.abs(main_arr[0].temp - $('#0').val()) -  Math.abs(main_arr[1].temp - $('#1').val()) - Math.abs(main_arr[2].temp - $('#2').val())
      $('#1').val()
      $('#2').val()
      console.log( sum)
      
      db.collection("scores").add({
        username: username,
        score: sum
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
   //$("body").empty()
      $('.box').remove()
      
      for(var j=0;j<3;j++){
        $("body").append(`<h2 class="answer">Answer: ${main_arr[j].temp} Your Guess: ${h[j]}</h2>`)
      }
      $("body").append(`<h2 class="score">Final Score: ${sum}</h2>`)
      $('button[type="submit"]').replaceWith('<button type="play"> Play Again </button>')
    }
  })
  $(document).on('click', 'button[type="play"]', function(event){
    event.preventDefault();
    playAgain();


  })
}
}

function playAgain(){
  $(`.answer`).remove()

$(`.score`).remove()
$('button[type="play"]').remove()
 $("body").empty()
 notDone3=true
main_arr = []
$(function() {
  main()
});
}

var username;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

   /// alert("Hi!")

    var user = firebase.auth().currentUser;

    if(user != null){

      username = user.email;
      $(function() {
        main()
      });

    }

  } else {
    

    // No user is signed in.
    $("body").append(`<input id="us" type="username"> Username </input>`)
    $("body").append(`<input id="pw" type="password"> Password </input>`)
    $("body").append(`<button id="su" type="signup"> Sign Up</button>`)
    $("body").append(`<button id="si" type="signin"> Sign In</button>`)
    $(document).on('click', 'button[type="signup"]', function(event){
     // alert($(`#us`).val())
    signUp($(`#us`).val(), $(`#pw`).val())
    });
    $(document).on('click', 'button[type="signin"]', function(event){
      //alert($(`#us`).val())
    signIn($(`#us`).val(), $(`#pw`).val())
    });
    //alert("Hiiiii")
  }
});


function signUp(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $(`#us`).remove()
    $(`#pw`).remove()
    $(`#su`).remove()
    $("body").empty()

    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

function signIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $(`#us`).remove()
    $(`#pw`).remove()
    $(`#su`).remove()
    $("body").empty()

    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

//console.log(fn2())
//console.log(fn1())