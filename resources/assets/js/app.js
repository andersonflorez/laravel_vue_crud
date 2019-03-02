window.Vue =  require('vue');
import axios from 'axios';

new Vue({
    el: '#crud',
    data: {
        keeps: [],
        newKeep: '',
        errors: [],
        fillKeep: {'id': '', 'keep':''}
    },
    created(){
        this.getKeeps();
    },
    methods: {
        getKeeps() {
            var urlKeeps = 'tasks';
            axios.get(urlKeeps).then(response=>{
                this.keeps = response.data.tasks.data;
            });
        }, 
        deleteKeep(keep){
            var url = 'tasks/'+keep.id;
            axios.delete(url).then(response=>{
                this.getKeeps();
                toastr.success('Eliminado Corectamente');
            });
        },
        createKeep(){
            var url = 'tasks'
            axios.post(url, {
                keep: this.newKeep
            }).then(response => {
                this.getKeeps();
                this.newKeep = '';
                this.errors = [];
                $("#create").modal('hide');
                toastr.success('Nueva tarea creada con exito');
            }).catch(error => {
                this.errors = error.response.data.errors;
            });
        },
        editKeep(keep){
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;
            $("#edit").modal('show');
        },
        updateKeep(id){
            var url = 'tasks/'+id;
            axios.put(url,this.fillKeep).then(response => {
                this.getKeeps();
                this.fillKeep = {'id': '', 'keep':''};
                this.errors = [];
                $("#edit").modal('hide');
                toastr.success('Tarea actualizada con exito');
            }).catch(error => {
                this.errors = error.response.data.errors;
            });
            
        }
    },
});