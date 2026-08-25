const SKILLS = {
  creativo:      { icon:'💡', name:'Pensamiento creativo', desc:'Se te ocurren ideas distintas a las obvias y encuentras formas nuevas de resolver un problema.' },
  resolucion:    { icon:'🧩', name:'Resolución de problemas', desc:'Cuando algo falla, no te frustras: investigas la causa y pruebas soluciones hasta lograrlo.' },
  organizacion:  { icon:'🗂️', name:'Organización', desc:'Mantienes claro qué falta, qué está listo y en qué orden se debe hacer cada cosa.' },
  comunicacion:  { icon:'🗣️', name:'Comunicación', desc:'Explicas tus ideas de forma clara y te aseguras de que los demás las entiendan.' },
  equipo:        { icon:'🤝', name:'Trabajo en equipo', desc:'Escuchas a tus compañeros, colaboras y ayudas a que el grupo avance junto.' },
  liderazgo:     { icon:'🚩', name:'Liderazgo', desc:'Tomas decisiones, guías al equipo y ayudas a mantener el rumbo del proyecto.' },
};

const QUESTIONS = [
  { text: "Cuando el equipo se trababa en una idea, tú normalmente…",
    options: [
      { text: "Proponía una idea distinta que nadie había pensado", skill: "creativo" },
      { text: "Buscaba dónde estaba el error exacto y lo arreglaba", skill: "resolucion" },
      { text: "Organizaba lo que ya teníamos para no perder el hilo", skill: "organizacion" },
      { text: "Preguntaba a los demás qué opinaban antes de decidir", skill: "equipo" },
    ]},
  { text: "En las reuniones de equipo, tu rol más natural era…",
    options: [
      { text: "Explicar las ideas para que todos entendieran lo mismo", skill: "comunicacion" },
      { text: "Proponer el siguiente paso y mantener al equipo enfocado", skill: "liderazgo" },
      { text: "Anotar los acuerdos y repartir tareas", skill: "organizacion" },
      { text: "Aportar ideas nuevas cuando el equipo se quedaba sin opciones", skill: "creativo" },
    ]},
  { text: "Cuando algo en la app no funcionaba como querían…",
    options: [
      { text: "Probaba distintas soluciones hasta encontrar la que sirviera", skill: "resolucion" },
      { text: "Buscaba ayuda y coordinaba quién podía resolverlo", skill: "liderazgo" },
      { text: "Investigaba por qué pasaba antes de tocar nada", skill: "resolucion" },
      { text: "Seguía trabajando en otra parte mientras alguien más lo resolvía", skill: "organizacion" },
    ]},
  { text: "Si tenías que explicarle la app a alguien que no sabía nada del proyecto…",
    options: [
      { text: "Usaba ejemplos sencillos para que se entendiera rápido", skill: "comunicacion" },
      { text: "Le mostraba paso a paso cómo se usa", skill: "organizacion" },
      { text: "Le contaba una historia de alguien usándola", skill: "creativo" },
      { text: "Le preguntaba qué parte no entendía y ajustaba la explicación", skill: "comunicacion" },
    ]},
  { text: "Cuando el equipo no se ponía de acuerdo…",
    options: [
      { text: "Escuchaba a todos y proponía un punto medio", skill: "equipo" },
      { text: "Tomaba la decisión para que el equipo pudiera avanzar", skill: "liderazgo" },
      { text: "Buscaba datos o ejemplos para decidir con argumentos", skill: "resolucion" },
      { text: "Proponía probar las dos ideas y ver cuál funcionaba mejor", skill: "creativo" },
    ]},
  { text: "Tu forma de trabajar con las tareas del proyecto era…",
    options: [
      { text: "Tener todo anotado: qué falta, qué está listo, qué sigue", skill: "organizacion" },
      { text: "Ir resolviendo lo urgente a medida que aparecía", skill: "resolucion" },
      { text: "Apoyar a los compañeros en lo que necesitaran", skill: "equipo" },
      { text: "Buscar siempre una forma distinta o mejor de hacer las cosas", skill: "creativo" },
    ]},
  { text: "En los momentos de estrés o de poco tiempo, tú…",
    options: [
      { text: "Repartías las tareas para que todos avanzaran a la vez", skill: "liderazgo" },
      { text: "Te enfocabas en lo esencial y dejabas lo demás para después", skill: "organizacion" },
      { text: "Mantenías al equipo con ánimo y comunicado", skill: "comunicacion" },
      { text: "Buscabas ayuda de inmediato para no atrasarte", skill: "equipo" },
    ]},
  { text: "Lo que más disfrutaste del proyecto fue…",
    options: [
      { text: "Inventar cómo resolver algo que no sabíamos hacer", skill: "creativo" },
      { text: "Ver que el equipo funcionara bien en conjunto", skill: "equipo" },
      { text: "Que las cosas quedaran bien organizadas y a tiempo", skill: "organizacion" },
      { text: "Guiar al equipo hacia la meta", skill: "liderazgo" },
    ]},
];

let current = 0;
let scores = {};

function startQuiz(){
  current = 0;
  scores = { creativo:0, resolucion:0, organizacion:0, comunicacion:0, equipo:0, liderazgo:0 };
  showScreen('question');
  renderQuestion();
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo(0,0);
}

function renderQuestion(){
  const q = QUESTIONS[current];
  document.getElementById('q-label').textContent = 'Pregunta ' + (current + 1);
  document.getElementById('progress-label').textContent = 'Pregunta ' + (current + 1) + ' de ' + QUESTIONS.length;
  document.getElementById('progress-fill').style.width = ((current + 1) / QUESTIONS.length * 100) + '%';
  document.getElementById('question-text').textContent = q.text;

  const letters = ['A','B','C','D'];
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = '<span class="letter">' + letters[i] + '</span>' + opt.text;
    btn.onclick = () => answer(opt.skill);
    container.appendChild(btn);
  });
}

function answer(skill){
  scores[skill] = (scores[skill] || 0) + 1;
  current++;
  if (current < QUESTIONS.length){
    renderQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult(){
  let topSkill = null, topScore = -1;
  for (const key in scores){
    if (scores[key] > topScore){
      topScore = scores[key];
      topSkill = key;
    }
  }
  const s = SKILLS[topSkill];
  document.getElementById('res-icon').textContent = s.icon;
  document.getElementById('res-name').textContent = s.name;
  document.getElementById('res-desc').textContent = s.desc;
  showScreen('result');
}
