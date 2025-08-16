import { Project } from "@/types/project.types"

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const ProjectComponent = ({ project, styles }: { project: Project, styles: {[key: string]: string} }) => {
  return (
    <div key={project.id} className={styles.projectCard}>
      <div className={styles.projectHeader}>
        <h2>
          <a 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            {project.name}
          </a>
        </h2>

        {project.homepage && (
          <a 
            href={project.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.demoLink}
          >
            Демо
          </a>
        )}

        {project.is_template && (
          <span className={styles.demoLink}> 
            Шаблон
          </span>
        )}

      </div>
      
      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}
      
      <div className={styles.meta}>
        {project.language && (
          <span className={styles.language}>{project.language}</span>
        )}
        <span className={styles.stars}>
          ⭐ {project.stargazers_count}
        </span>
        <span className={styles.forks}>
          🍴 {project.forks_count}
        </span>
      </div>
      
      <div className={styles.footer}>
        Обновлено: {formatDate(project.updated_at)}
      </div>
    </div>
  )
}