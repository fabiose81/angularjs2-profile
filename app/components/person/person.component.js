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
var person_service_1 = require('../../services/person.service');
var person_model_1 = require('../../models/person.model');
var address_model_1 = require('../../models/address.model');
var log_model_1 = require('../../models/log.model');
var PersonComponent = (function () {
    function PersonComponent(_personService) {
        this._personService = _personService;
        this.person = new person_model_1.Person();
        this.personEdit = new person_model_1.Person();
        this.address = new address_model_1.Address();
        this.logModel = new log_model_1.LogModel();
    }
    PersonComponent.prototype.ngOnInit = function () {
        this.getAll();
    };
    PersonComponent.prototype.setObjects = function (_value) {
        if (_value != undefined) {
            this.person = new person_model_1.Person();
            var address = [];
            this.person.address = address;
        }
        this.logModel = new log_model_1.LogModel();
        this.alert = undefined;
        this.action = undefined;
        this.msg = undefined;
    };
    PersonComponent.prototype.getAll = function () {
        var _this = this;
        this._personService.getAll()
            .subscribe(function (persons) { return _this.persons = persons; }, function (err) {
            _this.logModel.id = 0;
            _this.logModel.body = (err == 'Response with status: 0  for URL: null') ? 'Serviço REST fora do ar.' : err._body;
            _this.alert = 'alert-danger';
        });
    };
    PersonComponent.prototype.save = function (event) {
        var _this = this;
        event.preventDefault();
        this.setObjects(undefined);
        var id = this.person.id;
        this._personService.save(this.person)
            .subscribe(function (person) {
            _this.person = JSON.parse(JSON.stringify(person));
            if (id == undefined) {
                _this.persons.push(_this.person);
                _this.msg = 'Pessoa cadastrada com sucesso.';
                _this.action = 'save';
            }
            else {
                for (var i = 0; i < _this.persons.length; i++)
                    if (_this.person.id == _this.persons[i].id)
                        _this.persons[i] = _this.person;
                _this.msg = 'Pessoa alterada com sucesso.';
                _this.action = 'update';
            }
            _this.person = person;
            _this.alert = 'alert-success';
        }, function (err) {
            _this.logModel.id = 1;
            _this.logModel.body = err._body;
            _this.alert = 'alert-danger';
        });
    };
    PersonComponent.prototype.load = function (person) {
        this.personEdit = JSON.parse(JSON.stringify(person));
    };
    PersonComponent.prototype.update = function () {
        event.preventDefault();
        this._personService.update(this.personEdit)
            .subscribe(function (person) {
            console.log(person);
        });
    };
    PersonComponent.prototype.delete = function (_person) {
        var _this = this;
        this._personService.remove(_person)
            .subscribe(function (person) {
            _this.removePerson(_person);
            _this.person = _person;
            _this.alert = 'alert-success';
            _this.action = 'delete';
            _this.msg = 'Pessoa removida com sucesso.';
        }, function (err) {
            _this.logModel.id = 1;
            _this.logModel.body = err._body;
            _this.alert = 'alert-danger';
        });
    };
    PersonComponent.prototype.removePerson = function (_person) {
        var index = this.persons.indexOf(_person);
        var auxPerson = [];
        for (var i = 0; i < this.persons.length; i++) {
            if (index != i)
                auxPerson.push(this.persons[i]);
        }
        this.persons = auxPerson;
    };
    PersonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'person',
            templateUrl: 'person.component.html',
            providers: [person_service_1.PersonService]
        }), 
        __metadata('design:paramtypes', [person_service_1.PersonService])
    ], PersonComponent);
    return PersonComponent;
}());
exports.PersonComponent = PersonComponent;
//# sourceMappingURL=person.component.js.map