var db = firebase.firestore();


function main(){
    $("body").append(`<a href="index.html" > Back </a>`)
    let arr = []
    let arr2 = []
    let arr3 = new Array(40).fill(0);
    let i = 0;
   // $("body").append(`hewwo I work`)
    db.collection("scores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           // console.log(`${doc.id} => ${doc.data().score}`);
         //  console.log(`${doc.data().score}`)

           console.log(doc.data().score)
            //arr3[0] = doc.data().score
            arr.push({"Name": doc.data().username, "Score": 0})
            arr2.push(doc.data().score)
            arr3[i] = doc.data().score
            i+=1

        });
    });
    /*
    arr.sort(function(b, a){
        return a.score - b.score;
    });
    */
    console.log(arr)
    console.log(arr2[0])
    console.log(arr3)
   arr2.forEach(element => console.log(element));

    for(var j=0;j<arr.length;j++){
        $("body").append(`hewwo I work`)

        $("body").append(`<h3> User: ${arr[j].username} Score: ${arr[j].score}</h3>`)
    }
}

var hr = []

function as(v){
   // console.log(v)
    hr.push(v)

    //console.log(hr[0])
    return hr
}
var t;
function hi(){
    console.log(hr[0])
}

function main2(){
    let h = []
    var s;
    let arr = []
    db.collection("scores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            arr.push({"Name": doc.data().username, "Score": doc.data().score})

           // $("body").append(`<h4>${doc.data().score}</h4>`)
            s = doc.data().score;
            h.push(s)
            t= as(doc.data().score)
        });
        console.log(arr[0])
        for(var i=0;i<arr.length;i++){
            $("body").append(`<h4>${arr[i].score}</h4>`)
        }

    });
    console.log(s +"HI")
    console.log(h)
    console.log(h.length)
    hi()
   
}

function showData() {
    var jobRef = db.collection("scores");
  
  
    return jobRef.get().then(function(querySnapshot) {
  
      let allDocData = [];
      querySnapshot.forEach(function(doc) {
          allDocData.push(doc.data());
      });
  
      return allDocData;
  
    });
  }
  
  showData().then(function(dataValues) {

    dataValues2 = []
    for(var i=0;i<dataValues.length;i++){
        console.log(dataValues[i].score===NaN)
        console.log(dataValues[i].score)
        if(!Number.isNaN(dataValues[i].score))
            dataValues2.push(dataValues[i])
            console.log(dataValues[i].score===NaN)
    }
    dataValues2.sort(function(b, a){
        return a.score - b.score;
    });

    for(var i=0;i<10;i++){
        $("body").append(`<h4> ${i+1}. ${Math.round(dataValues2[i].score*100)/100}      ${dataValues2[i].username}</h4>`)

    }
      console.log(dataValues);
  });


$(function() {
    showData()
  });