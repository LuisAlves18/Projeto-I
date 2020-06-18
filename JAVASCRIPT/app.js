import UserView from '../JAVASCRIPT/view/UserView.js'
import UserViewLogin from '../JAVASCRIPT/view/UserViewLogin.js'
import UserViewRegisto from '../JAVASCRIPT/view/UserViewRegisto.js'
import UserViewLogout from '../JAVASCRIPT/view/UserViewLogout.js'
import UserInfoView from '../JAVASCRIPT/view/UserInfoView.js'
import TrainingView from './view/TrainingView.js'
import EventsView from './view/EventsView.js'
import EventsInfoView from './view/Events-infoView.js'
import TeamsView from './view/TeamsView.js'
import RunningDataView from './view/RunningDataView.js'
import EquipmentDataView from './view/EquipmentDataView.js'
import TeamsInfoView from './view/TeamsInfoView.js'
import CreateTeamView from './view/CreateTeamView.js'
import AdminView from './view/AdminView.js'



class App {
    constructor() {
        this.routes = {
            '': [
                UserView,
                UserViewLogin,
                UserViewRegisto,
                UserViewLogout
            ],
            'registo': [
                UserViewRegisto
            ],
            'login': [
                UserViewLogin
            ],
            'index': [
                UserViewLogout
            ],
            'edit': [
                UserInfoView,
                UserViewLogout
            ],
            'training': [
                TrainingView,
                UserViewLogout
            ],
            'events': [
                EventsView,
                UserViewLogout
            ],
            'events-info': [
                EventsInfoView,
                UserViewLogout
            ],
            'teams': [
                TeamsView,
                UserViewLogout
            ],
            'teams-info': [
                TeamsInfoView,
                UserViewLogout

            ],
            'running-data': [
                RunningDataView,
                UserViewLogout
            ],
            'equipment-data': [
                EquipmentDataView,
                UserViewLogout
            ],
            'create-team': [
                CreateTeamView,
                UserViewLogout
            ],
            'manage-users': [
                UserViewLogout,
                AdminView
            ],
            'manage-teams': [
                UserViewLogout,
                AdminView
            ],
            'manage-events': [
                UserViewLogout,
                AdminView
            ]




        };

        // import dummy data for testing purposes
        this._importDataFixtures();

        // instantiate the views mapped in the routes object
        this._instantiateViews();
    }

    _instantiateViews() {
        const path = window.location.pathname //http://127.0.0.1:5501/HTML/registo.html
        const file = path.substr(path.lastIndexOf('/') + 1); //registo.html
        const route = file.split('.')[0]; // registo

        const views = this._getViews(route);

        for (const view of views) {
            new view();
        }
    }

    _getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    _importDataFixtures() {
        const users = [{
            id: 1,
            username: 'admin',
            fullname: 'Admin Default',
            password: 'admin',
            email: 'admin@myStep.com',
            birth: '22/06/2000',
            image: 'OUTROS/download.png',
            admin: 'true',
            stride: 'none',
            distance: 'none',
            eventType: 'none',
            shirt: 'none',
            shorts: 'none',
            shoes: 'none',
            status: 'available'

        }];
        const events = [{
                id: 1,
                name: 'prova0 ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho 17h',
                tipos: ['walk'],
                distancias: ['10K', '21k'],
                capacidade: '3500',
                ocupacao: '100',
                preco: ['10'],
                participantes: []

            },
            {
                id: 2,
                name: 'prova1 ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho, 17h',
                tipos: ['run', 'walk'],
                distancias: ['10K'],
                capacidade: '3500',
                ocupacao: '100',
                preco: ['10'],
                participantes: []

            },
            {
                id: 3,
                name: 'prova2 ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho 17h',
                tipos: ['run', ],
                distancias: ['10K', '21k'],
                capacidade: '3500',
                ocupacao: '100',
                preco: ['10'],
                participantes: []
            }, {
                id: 4,
                name: 'prova3 ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho 17h',
                tipos: ['run', ],
                distancias: ['10K', '21k'],
                capacidade: '3500',
                ocupacao: '100',
                preco: ['10'],
                participantes: []

            }
        ];
        /*const teams = [{
            id: 1,
            name: 'Os reis ',
            localidade: "Porto",
            camisola: "OUTROS/download.png",
            total_atletas: "3",
            membros: ["joao", "luis", "antonio", "tiago"],
            logo: "OUTROS/download.png",
            owner: "luis"

        }, {
            id: 2,
            name: 'TSIW ',
            localidade: "Porto",
            camisola: "OUTROS/download.png",
            total_atletas: "3",
            membros: ["ze", "luis", "manel", "tiago"],
            logo: "OUTROS/download.png",
            owner: "luis"

        }, {
            id: 3,
            name: 'TSIW1 ',
            localidade: "Porto",
            camisola: "OUTROS/download.png",
            total_atletas: "3",
            membros: ["ze", "luis", "manel", "tiago"],
            logo: "OUTROS/download.png",
            owner: "luis"

        }]*/
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.events) {
            localStorage.setItem('events', JSON.stringify(events));
        }
        /*if (!localStorage.teams) {
            localStorage.setItem('teams', JSON.stringify(teams));
        }*/
    }
}

new App();