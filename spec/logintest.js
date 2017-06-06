/**
 * Created by dev on 2017-06-06.
 */

var request = require("request");
var server = require("../app.js")

var base_url = "http://localhost:3000/"

describe("Login Test", function() {
    describe("POST /", function() {
        it("returns status code 200", function() {
            request.post(base_url+'/login',{username:'sdfsdf',password:'sfasdf'}, function(error, response, body) {
                expect(response.data.items.status).toBe(403);
                done();
            });
        });
    });
});

describe("Login Test", function() {
    describe("GET /", function() {
        it("returns status code 200", function() {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});