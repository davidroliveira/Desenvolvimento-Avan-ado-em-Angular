import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'RXJS';

  minhaPromise(nome: string): Promise<string>{
    return new Promise((resolve, rejeect) => {
      if (nome === 'David') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome)
        }, 5000);        
      }
      else {
        rejeect('Ops você não é o David');
      }
    })
  }

  minhaObervable(nome: string): Observable<string>{
    return new Observable(subscriber => {
      if (nome === 'David') {
        subscriber.next('Olá! ' + nome);
        subscriber.next('Olá de novo! ' + nome);
        setTimeout(() => {
          subscriber.next('Resposta com delay! ' + nome);
        }, 5000);
        subscriber.complete(); /*<<<NÃO ESPERA O setTimeout, JA ENCERRA O OBERVABLE*/ 
      }
      else {
        subscriber.error('Ops deu erro!');
      }
    })
  }

  usuarioObervable(nome: string, email: string): Observable<Usuario>{
    return new Observable(subscriber => {
      if (nome === 'Admin') {
        
        let usuario = new Usuario(nome, email)

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);
                
        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);
                
        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);
                
        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);
                
        setTimeout(() => {
          subscriber.next(usuario);
          subscriber.complete(); 
        }, 5000);              
        
      }
      else {
        subscriber.error('Ops deu erro!');
      }
    })
  }

  ngOnInit(): void {
    
    console.clear();

    // this.minhaPromise('David')
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error));

/*
    this.minhaPromise('José')
      .then(result => console.log(result))
      .catch(error => console.log(error));
*/
/*
    this.minhaObervable('David')
      .subscribe(
        result => {
          console.log(result);
        },
        erro => {
          console.log(erro);
        },
        () => {
          console.log('Fim!')
        }
      );
*/

    const observer = {
      next: (valor: any)  => {
        console.log('Next: ', valor);
      },
      error: (erro: any)  => {
        console.log('Erro: ', erro);
      },
      complete: () => {
        console.log('FIM!');
      }
    }

/*
    const observable = this.minhaObervable('David');
    observable.subscribe(observer);
*/    
    const observable = this.usuarioObervable('Admin', 'admin@teste.com');
    const subscription = observable.subscribe(observer);

    setTimeout(() => {
      console.log('unsubscribe');
      subscription.unsubscribe(); //Não chama o complete() do oberver
      console.log('Conexão fechada: ' + subscription.closed);
    }, 3500);    

  }

  escrever(texto: string): void {
    console.log(texto);
  }
}

export class Usuario {

  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;      
  }

}