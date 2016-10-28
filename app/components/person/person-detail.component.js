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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var person_service_1 = require('../../services/person.service');
var person_model_1 = require('../../models/person.model');
var address_model_1 = require('../../models/address.model');
var log_model_1 = require('../../models/log.model');
var PersonDetailComponent = (function () {
    function PersonDetailComponent(_personService, _route) {
        this._personService = _personService;
        this._route = _route;
        this.person = new person_model_1.Person();
        this.address = new address_model_1.Address();
        this.logModel = new log_model_1.LogModel();
    }
    PersonDetailComponent.prototype.ngOnInit = function () {
        this.findById();
    };
    PersonDetailComponent.prototype.setObjects = function () {
        this.address = new address_model_1.Address();
    };
    PersonDetailComponent.prototype.findById = function () {
        var _this = this;
        this._route.params.map(function (params) { return params['id']; })
            .subscribe(function (id) {
            _this._personService.findById(id)
                .subscribe(function (person) { return _this.person = person; }, function (err) {
                _this.logModel.id = 0;
                _this.logModel.body = (err == 'Response with status: 0  for URL: null') ? 'Serviço REST fora do ar.' : err._body;
                _this.alert = 'alert-danger';
            });
        });
    };
    PersonDetailComponent.prototype.load = function (address) {
        this.address = address;
    };
    PersonDetailComponent.prototype.addAddress = function () {
        if (this.address.id == undefined)
            this.person.address.push(this.address);
        var button = document.getElementById('button_dissmiss');
        button.click();
    };
    PersonDetailComponent.prototype.update = function () {
        var _this = this;
        this._personService.update(this.person)
            .subscribe(function (person) {
            _this.msg = 'Pessoa alterada com sucesso.';
            _this.action = 'update';
            _this.person = person;
            _this.alert = 'alert-success';
        }, function (err) {
            _this.logModel.id = 1;
            _this.logModel.body = err._body;
            _this.alert = 'alert-danger';
        });
    };
    PersonDetailComponent.prototype.removeAddress = function (address) {
        var index = this.person.address.indexOf(address);
        var auxAddress = [];
        for (var i = 0; i < this.person.address.length; i++) {
            if (index != i) {
                auxAddress.push(this.person.address[i]);
            }
        }
        this.person.address = auxAddress;
    };
    PersonDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'person-detail',
            templateUrl: 'person-detail.component.html',
            providers: [person_service_1.PersonService]
        }), 
        __metadata('design:paramtypes', [person_service_1.PersonService, router_1.ActivatedRoute])
    ], PersonDetailComponent);
    return PersonDetailComponent;
}());
exports.PersonDetailComponent = PersonDetailComponent;
//# sourceMappingURL=person-detail.component.js.map