"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
var PersonService = (function () {
    function PersonService(_http) {
        this._http = _http;
    }
    PersonService.prototype.getAll = function () {
        return this._http.get('http://localhost:8080/person').map(function (res) { return res.json(); });
    };
    PersonService.prototype.findById = function (id) {
        return this._http.get('http://localhost:8080/person/' + id).map(function (res) { return res.json(); });
    };
    PersonService.prototype.save = function (person) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:8080/person', person, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PersonService.prototype.update = function (person) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('http://localhost:8080/person', person, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PersonService.prototype.remove = function (person) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:8080/person/remove', person, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PersonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PersonService);
    return PersonService;
}());
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map