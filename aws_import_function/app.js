const CONF = require("./super_secure_conf.json"),
      AWS = require("aws-sdk");
var lambda = {};

function handleResponseFromLambda(err, response) {
  if (err) {
    console.log("problem");
    console.dir(err);
    return;
  }
  console.dir(response.Payload);
}

function runAFunctionOnLambda(fn_str) {
  var settings = {
    FunctionName: fn_str
  };
  lambda.invoke(settings, handleResponseFromLambda);
}

function init() {
  AWS.config = new AWS.Config({
    accessKeyId: CONF.AWS_ACCESS_KEY_ID,
    secretAccessKey: CONF.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2"
  });
  lambda = new AWS.Lambda();
  runAFunctionOnLambda("mysqlGetElementsTest");
}
init();