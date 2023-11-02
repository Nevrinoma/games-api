const vue = Vue.createApp({
    data() {
        return {
            gameInModal: {name:null},
            games: [],
            isSortedAscending: true  
        }
    },
    async created(){
        this.games = await (await fetch('http://localhost:8080/games')).json();
    },
    methods: {
        getGame: async function (id) {
            this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json()
            let gameInfoModal = new bootstrap.Modal(document.getElementById('gameInfoModal'), {})
            gameInfoModal.show()
        },
        sortGamesByPrice: function() {
            if (this.isSortedAscending) {
                
                this.games.sort((a, b) => b.price - a.price);
            } else {
                
                this.games.sort((a, b) => a.price - b.price);
            }
            this.isSortedAscending = !this.isSortedAscending; 
        }
    }
}).mount('#app')
