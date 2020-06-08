export default class eventModel {
    constructor() {
        this.events = localStorage.events ? JSON.parse(localStorage.events) : [];
    }

    getAll() {
        return this.events;
    }
    create(name, localidade, poster, tshirt, medalha, descricao, data_hora, tipo, distacia, capacidade, percurso, preco) {
        const event = {
            id: this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1,
            name: name,
            localidade: localidade,
            poster: poster,
            tshirt: tshirt,
            medalha: medalha,
            descricao: descricao,
            data_hora: data_hora,
            tipo: tipo,
            distacia: distacia,
            capacidade: capacidade,
            descricao: descricao,
            preco: preco
        }
        this.events.push(event);
        this._persist();
    }
    remove(event) {
        this.events = this.events.filter(name => event.name != name)
        this._persist()
    }
    setCurrentEvent(id) {
        localStorage.setItem("current_event", id);
    }
    getCurrentEvent() {
        return this.events.find(event => event.id === +localStorage.current_event)
    }
    _persist() {
        localStorage.setItem('events', JSON.stringify(this.events));
    }
}