"use strict";
var router_1 = require('@angular/router');
var person_detail_component_1 = require('./components/person/person-detail.component');
var person_component_1 = require('./components/person/person.component');
var routes = [
    { path: '', component: person_component_1.PersonComponent },
    { path: 'detail/:id', component: person_detail_component_1.PersonDetailComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map