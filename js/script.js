// Array para armazenar todas as tarefas
let tarefas = [{
    id: 1,
    concluida: false
}];
console.log(tarefas);

// Array para armazenar tarefas filtradas
let tarefasExibidas = [];
const formulario = document.getElementById('task-form');
const inputTarefa = document.getElementById('task-input');
const listaTarefas = document.getElementById('tasks');
 
// Função para exibir tarefas
function exibirTarefas() {
    listaTarefas.innerHTML = ''; // Limpa a lista antes de exibir novamente
    tarefasExibidas.forEach(tarefa => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (tarefa.concluida) {
            li.classList.add('completed');
        }
 
        li.innerHTML = `
            <div class="task-content">
                <span>${tarefa.titulo}</span>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="concluirTarefa(${tarefa.id})">Concluir</button>
                <button class="delete-btn" onclick="deletarTarefa(${tarefa.id})">Deletar</button>
            </div>
        `;
 
        listaTarefas.appendChild(li);
    });
}
 
// Função para adicionar tarefa
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário e o recarregamento da página
    const tituloTarefa = inputTarefa.value.trim();
 
    if (tituloTarefa !== '') {
        // Cria uma nova tarefa e adiciona ao array
        const novaTarefa = criarTarefa(tituloTarefa);
 
        // Limpar o campo de entrada
        inputTarefa.value = '';
        inputTarefa.focus();
       
        // Exibe a lista de tarefas atualizada
        exibirTarefas();
       
        // Exibe o alerta
        alert('Tarefa adicionada com sucesso!');
    }
});
 
// Função para criar tarefa
function criarTarefa(titulo, concluida = false) {
    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        concluida: concluida
    };
   
    tarefas.push(novaTarefa); // Adiciona a tarefa ao array
    tarefasExibidas = tarefas; // Atualiza a lista exibida para mostrar todas as tarefas
    return novaTarefa;
}

// Função para concluir tarefa
function concluirTarefa(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return { ...tarefa, concluida: true };
        }
        return tarefa;
    });
 
    // Atualiza a lista exibida
    tarefasExibidas = tarefas;
    exibirTarefas();
}

// Função para deletar tarefa
function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
   
    // Atualiza a lista exibida
    tarefasExibidas = tarefas;
    exibirTarefas();
}

// Função para exibir apenas tarefas pendentes
document.getElementById('pending-tasks-btn').addEventListener('click', function() {
    tarefasExibidas = tarefas.filter(tarefa => !tarefa.concluida);
    exibirTarefas();
});
 
// Função para exibir todas as tarefas
document.getElementById('all-tasks-btn').addEventListener('click', function() {
    tarefasExibidas = tarefas; // Exibe todas as tarefas
    exibirTarefas();
});
 
// Função para exibir apenas tarefas concluídas
document.getElementById('completed-tasks-btn').addEventListener('click', function() {
    tarefasExibidas = tarefas.filter(tarefa => tarefa.concluida);
    exibirTarefas();
});

// Função para adicionar múltiplas tarefas
function adicionarTarefas(...tarefasParam) {
    for (let tarefa of tarefasParam) {
        // Adiciona cada tarefa ao array 'tarefas'
        tarefas.push(tarefa);
    }
   
    // Atualiza a lista exibida
    tarefasExibidas = tarefas;
    exibirTarefas();
}