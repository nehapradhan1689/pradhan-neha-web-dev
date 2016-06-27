/**
 * Created by Neha Pradhan on 6/20/2016.
 */
// var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>";
// parseString(xml, function (err, result) {
//     console.dir(result);
// });
function test($http) {
    var url="https://www.goodreads.com/book/title.xml?author=Arthur+Conan+Doyle&key=dH3J2SipApkh608b1AooQ&title=Hound+of+the+Baskervilles";
    var result=$http.get(url);
    console.log(result);
}
