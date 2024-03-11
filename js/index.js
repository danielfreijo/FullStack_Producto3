function createProjectCard(project) {
  return `
    <div class="card">
      ${project.name}
    </div>
  `;
}

function showRecentProjects(projects) {
  const recentProjects = $('#recentProjects');
  recentProjects.empty();

  projects.forEach(project => {
    const cardHTML = createProjectCard(project);
    recentProjects.append(cardHTML);
  });
}

function showAllProjects(projects) {
  const allProjects = $('#allProjects');
  allProjects.empty();

  projects.forEach(project => {
    const cardHTML = createProjectCard(project);
    allProjects.append(cardHTML);
  });
}

$(document).ready(function() {
  showRecentProjects(projects);
});