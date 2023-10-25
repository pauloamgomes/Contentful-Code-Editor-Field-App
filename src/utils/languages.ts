interface ILanguage {
  name: string;
  enabled: boolean;
}

export interface ILanguages {
  [key: string]: ILanguage;
}

export const languages: ILanguages = {
  bash: { name: "Bash", enabled: true },
  c: { name: "C", enabled: true },
  csharp: { name: "C#", enabled: true },
  cpp: { name: "C++", enabled: true },
  css: { name: "CSS", enabled: true },
  docker: { name: "Docker", enabled: true },
  fsharp: { name: "F#", enabled: true },
  go: { name: "Go", enabled: true },
  graphql: { name: "GraphQL", enabled: true },
  html: { name: "HTML", enabled: true },
  ini: { name: "INI", enabled: true },
  java: { name: "Java", enabled: true },
  javascript: { name: "JavaScript", enabled: true },
  json: { name: "JSON", enabled: true },
  kotlin: { name: "Kotlin", enabled: true },
  less: { name: "LESS", enabled: true },
  lua: { name: "Lua", enabled: true },
  markdown: { name: "Markdown", enabled: true },
  msdax: { name: "MSDAX", enabled: true },
  mysql: { name: "MySQL", enabled: true },
  'objective-c': { name: "Objective-C", enabled: true },
  pascal: { name: "Pascal", enabled: true },
  perl: { name: "Perl", enabled: true },
  pgsql: { name: "PGSQL", enabled: true },
  php: { name: "PHP", enabled: true },
  plaintext: { name: "Plain Text", enabled: true },
  postiats: { name: "Postiats", enabled: true },
  powerquery: { name: "Power Query", enabled: true },
  powershell: { name: "PowerShell", enabled: true },
  pug: { name: "Pug", enabled: true },
  python: { name: "Python", enabled: true },
  r: { name: "R", enabled: true },
  razor: { name: "Razor", enabled: true },
  redis: { name: "Redis", enabled: true },
  redshift: { name: "Redshift", enabled: true },
  ruby: { name: "Ruby", enabled: true },
  rust: { name: "Rust", enabled: true },
  sb: { name: "SB", enabled: true },
  scss: { name: "SCSS", enabled: true },
  sol: { name: "SOL", enabled: true },
  sql: { name: "SQL", enabled: true },
  st: { name: "ST", enabled: true },
  swift: { name: "Swift", enabled: true },
  typescript: { name: "TypeScript", enabled: true },
  vb: { name: "VB", enabled: true },
  xml: { name: "XML", enabled: true },
  yaml: { name: "YAML", enabled: true },
};
