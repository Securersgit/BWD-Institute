  // ===== Helpers =====
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => [...el.querySelectorAll(s)];

  // ===== Modal control =====
  const modal = qs('#modal');
  const openModalBtn = qs('#openModal');
  const closeModalBtn = qs('#closeModal');
  const cancelBtn = qs('#cancelModal');

  function openModal(){ modal.style.display='grid'; qs('#gTitle').focus(); }
  function closeModal(){ modal.style.display='none'; }

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=> { if(e.target===modal) closeModal(); });

  // ===== Goal Management =====
  const form = qs('#goalForm');
  const activeSection = qs('#activeSection');
  const completedSection = qs('.completed-wrap');

  // Load goals from localStorage
  function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('academicGoals')) || { active: [], completed: [] };
    
    // Clear existing content
    const activeCards = qsa('.goal-card', activeSection);
    activeCards.forEach(card => card.remove());
    
    const completedItems = qsa('.completed-item', completedSection);
    completedItems.forEach(item => item.remove());
    
    // Show/hide empty states
    const noActiveGoals = qs('#noActiveGoals');
    const noCompletedGoals = qs('#noCompletedGoals');
    noActiveGoals.style.display = goals.active.length === 0 ? 'block' : 'none';
    noCompletedGoals.style.display = goals.completed.length === 0 ? 'block' : 'none';
    
    // Render active goals
    goals.active.forEach(goal => createGoalCard(goal));
    
    // Render completed goals
    goals.completed.forEach(goal => createCompletedGoal(goal));
  }

  // Save goals to localStorage
  function saveGoals(goals) {
    localStorage.setItem('academicGoals', JSON.stringify(goals));
  }

  // Create goal card
  function createGoalCard(goal) {
    const card = document.createElement('article');
    card.className = 'goal-card';
    card.dataset.current = goal.current;
    card.dataset.target = goal.target;
    card.dataset.id = goal.id;

    card.innerHTML = `
      <div class="goal-top">
        <div>
          <div class="goal-title">
            <span class="dot"></span>
            ${escapeHtml(goal.title)}
            <span class="pill">${escapeHtml(goal.priority)}</span>
          </div>
          <p class="desc">${escapeHtml(goal.description)}</p>
        </div>
        <button class="more" aria-label="More" onclick="deleteGoal('${goal.id}')">×</button>
      </div>

      <div class="bar-wrap">
        <div class="bar-label">Progress</div>
        <div class="bar">
          <span></span>
          <div class="bar-right"><b class="pc">${goal.current}%</b> of <b class="tgt">${goal.target}%</b></div>
        </div>
      </div>

      <div class="meta">
        <div>Due: <b>${escapeHtml(goal.due)}</b></div>
        <span class="sep">|</span>
        <div>${escapeHtml(goal.category)}</div>
        <div class="actions">
          <a class="action-link update" onclick="updateProgress('${goal.id}')">Update</a>
          <a class="action-link edit" onclick="editGoal('${goal.id}')">Edit</a>
          <a class="action-link" onclick="completeGoal('${goal.id}')" style="color:#0a4bd9;">Complete</a>
        </div>
      </div>
    `;

    activeSection.appendChild(card);
    updateProgressBar(card);
    const noActiveGoals = qs('#noActiveGoals');
    noActiveGoals.style.display = 'none';
  }

  // Create completed goal
  function createCompletedGoal(goal) {
    const item = document.createElement('div');
    item.className = 'completed-item';
    item.dataset.id = goal.id;

    item.innerHTML = `
      <div class="done-left">
        <div class="tick">✓</div>
        <div>
          <p class="done-title">${escapeHtml(goal.title)}</p>
          <p class="done-sub">${escapeHtml(goal.description)}</p>
          <p class="done-date">Completed on ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div class="trophy">🏆</div>
    `;

    completedSection.appendChild(item);
    const noCompletedGoals = qs('#noCompletedGoals');
    noCompletedGoals.style.display = 'none';
  }

  // Update progress bar
  function updateProgressBar(card) {
    const cur = parseInt(card.dataset.current || '0', 10);
    const tgt = parseInt(card.dataset.target || '100', 10);
    const fill = Math.max(0, Math.min(100, cur / Math.max(1,tgt) * 100));
    const span = qs('.bar > span', card);
    const pc = qs('.pc', card);
    const tgtEl = qs('.tgt', card);
    
    if (span) {
      setTimeout(() => {
        span.style.width = fill + '%';
      }, 100);
    }
    if (pc) pc.textContent = cur + '%';
    if (tgtEl) tgtEl.textContent = tgt + '%';
  }

  // Add new goal
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = qs('#gTitle').value.trim();
    const priority = qs('#gPriority').value;
    const description = qs('#gDesc').value.trim() || '—';
    const current = parseInt(qs('#gCurrent').value,10);
    const target = parseInt(qs('#gTarget').value,10);
    const due = qs('#gDue').value || '—';
    const category = qs('#gCategory').value.trim() || 'General';

    const goals = JSON.parse(localStorage.getItem('academicGoals')) || { active: [], completed: [] };
    
    const newGoal = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      current,
      target,
      due,
      category
    };
    
    goals.active.push(newGoal);
    saveGoals(goals);
    createGoalCard(newGoal);
    closeModal();
    form.reset();
  });

  // Update progress
  function updateProgress(goalId) {
    const goals = JSON.parse(localStorage.getItem('academicGoals')) || { active: [], completed: [] };
    const goal = goals.active.find(g => g.id === goalId);
    if (goal) {
      const newProgress = prompt('Update progress (%)', goal.current);
      if (newProgress !== null) {
        const progress = Math.max(0, Math.min(100, parseInt(newProgress, 10) || 0));
        goal.current = progress;
        saveGoals(goals);
        loadGoals();
      }
    }
  }

  // Complete goal
  function completeGoal(goalId) {
    const goals = JSON.parse(localStorage.getItem('academicGoals')) || { active: [], completed: [] };
    const goalIndex = goals.active.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
      const goal = goals.active.splice(goalIndex, 1)[0];
      goals.completed.push(goal);
      saveGoals(goals);
      loadGoals();
    }
  }

  // Delete goal
  function deleteGoal(goalId) {
    const goals = JSON.parse(localStorage.getItem('academicGoals')) || { active: [], completed: [] };
    goals.active = goals.active.filter(g => g.id !== goalId);
    saveGoals(goals);
    loadGoals();
  }

  // Edit goal
  function editGoal(goalId) {
    const goals = JSON.parse(localStorage.getItem('academicGoals')) || { active: [], completed: [] };
    const goal = goals.active.find(g => g.id === goalId);
    if (goal) {
      qs('#gTitle').value = goal.title;
      qs('#gPriority').value = goal.priority;
      qs('#gDesc').value = goal.description;
      qs('#gCurrent').value = goal.current;
      qs('#gTarget').value = goal.target;
      qs('#gDue').value = goal.due;
      qs('#gCategory').value = goal.category;
      openModal();
    }
  }

  // Escape HTML
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'<','>':'>','"':'"',"'":'&#39;'}[m]));
  }

  // Initialize
  loadGoals();