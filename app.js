const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("images"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res) {
  var firstname = req.body.firstName;
  var lastname = req.body.lastName;
  var emailid = req.body.emailAddress;
  var data = {
    members: [
      {
        email_address: emailid,
        status: "subscribed",
        merge_fields:
        {
          Fname: firstname,
          Lname: lastname,
        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);
  const url= "https://us20.api.mailchimp.com/3.0/lists/9879ba72e9";
  const options = {
     method: 'POST',
     auth: "sharib:ecd390569cac4b98947f1a3ebfe380a7-us20",
  };

  const request= https.request(url , options, function(response){
       if (response.statusCode===200){
         res.sendFile(__dirname + "/success.html");
       } else {
         res.sendFile(__dirname + "/failure.html");
       };


         response.on("data", function(data){
           console.log(JSON.parse(data));


         });

  });

  request.write(jsonData);
  request.end();


});

app.post("/failure", function(req,res){
  res.redirect("/");
});








app.listen(process.env.PORT, function() {



});
