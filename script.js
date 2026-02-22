let tasks = JSON.parse(localStorage.getItem('dashboard_tasks')) || [];

const taskForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');

renderTasks();

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTask = {
        id: Date.now(),
        title: document.getElementById('task-input').value,
        deadline: document.getElementById('task-deadline').value || "--:--",
        completed: false,
        completedAt: null
    };

    tasks.push(newTask);
    save();
    taskForm.reset();
});

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            const isCompleting = !task.completed;
            return {
                ...task,
                completed: isCompleting,
                completedAt: isCompleting ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : null
            };
        }
        return task;
    });
    save();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
}

function save() {
    localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = tasks.length === 0 ? '<p style="text-align:center; color:#999;">Nenhuma tarefa pendente.</p>' : '';

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        div.innerHTML = `
            <div class="task-info">
                <span class="task-title">
                    <span class="status-badge">${task.completed ? 'CONCLUÍDO' : 'PENDENTE'}</span>
                    ${task.title}
                </span>
                <span class="task-time">
                    ⏱️ Previsto: ${task.deadline} 
                    ${task.completedAt ? `| ✅ Concluído em: ${task.completedAt}` : ''}
                </span>
            </div>
            <div class="actions">
                <button onclick="toggleTask(${task.id})" style="background:var(--success)">check</button>
                <button onclick="deleteTask(${task.id})" style="background:#ff7675">del</button>
            </div>
        `;
        taskList.appendChild(div);
    });
}