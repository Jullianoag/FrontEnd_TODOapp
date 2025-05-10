import { Component, OnInit } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL : string;

constructor(private http: HttpClient) {
  this.apiURL = 'https://backend-todoapp-5kl8.onrender.com';
  this.arrayDeTarefas = [];
}
  
ngOnInit(): void {
  this.arrayDeTarefas = [];
  this.READ_tarefas(); // será chamado no refresh
}

CREATE_tarefa(descricaoNovaTarefa: string) {
  var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
  this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
    resultado => { console.log(resultado); this.READ_tarefas(); });
  }

  carregando = true;
erroCarregamento = false;

READ_tarefas() {
  this.carregando = true;
  this.erroCarregamento = false;

  this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
    resultado => {
      this.arrayDeTarefas = resultado;
      this.carregando = false;
    },
    erro => {
      console.error('Erro ao buscar tarefas:', erro);
      this.erroCarregamento = true;
      this.carregando = false;
    }
  );
}
DELETE_tarefa(tarefaAserRemovida : Tarefa) {
  var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
 var id = this.arrayDeTarefas[indice]._id;
 this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
 resultado => { console.log(resultado); this.READ_tarefas(); });
 }

 UPDATE_tarefa(tarefaAserModificada: Tarefa) {
  var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
  var id = this.arrayDeTarefas[indice]._id;
  this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
  tarefaAserModificada).subscribe(
  resultado => { console.log(resultado); this.READ_tarefas(); });
 }
 

}
