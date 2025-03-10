import { config } from "dotenv";
import fs from "fs";
import path from "path";

// Carregar variáveis de ambiente
const result = config();

if (result.error) {
  console.error("❌ Erro ao carregar o arquivo .env:", result.error);
  process.exit(1);
}

// Variáveis de ambiente obrigatórias
const requiredVars = [
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_APP_NAME",
  "NEXT_PUBLIC_API_VERSION",
];

// Verificar variáveis de ambiente obrigatórias
const missingVars = requiredVars.filter(
  (envVar) => !process.env[envVar] || process.env[envVar].trim() === ""
);

if (missingVars.length > 0) {
  console.error(
    "❌ As seguintes variáveis de ambiente são obrigatórias mas estão ausentes:"
  );
  missingVars.forEach((envVar) => {
    console.error(`   - ${envVar}`);
  });
  console.error(
    "\n⚠️ Verifique seu arquivo .env ou variáveis de ambiente do sistema"
  );
  process.exit(1);
}

console.log(
  "✅ Todas as variáveis de ambiente obrigatórias estão configuradas"
);

// Verificar consistência entre ambientes
const envFiles = [
  ".env.development",
  ".env.production",
  ".env.staging",
  ".env.test",
].filter((file) => fs.existsSync(path.resolve(file)));

// Conjunto para armazenar todas as variáveis públicas encontradas
const allPublicVars = new Set();

// Coletar todas as variáveis públicas de todos os arquivos
envFiles.forEach((file) => {
  const content = fs.readFileSync(path.resolve(file), "utf8");
  const lines = content.split("\n");

  lines.forEach((line) => {
    // Ignora comentários e linhas vazias
    if (!line.trim() || line.trim().startsWith("#")) return;

    const match = line.match(/^NEXT_PUBLIC_([A-Z0-9_]+)=/);
    if (match) {
      allPublicVars.add(match[0].split("=")[0]);
    }
  });
});

// Verificar se todas as variáveis públicas estão definidas em todos os arquivos
envFiles.forEach((file) => {
  const content = fs.readFileSync(path.resolve(file), "utf8");
  const missingInFile = [];

  allPublicVars.forEach((variable) => {
    if (!content.includes(variable + "=")) {
      missingInFile.push(variable);
    }
  });

  if (missingInFile.length > 0) {
    console.warn(`⚠️ Variáveis ausentes em ${file}:`);
    missingInFile.forEach((v) => console.warn(`   - ${v}`));
  }
});

console.log("✅ Verificação de variáveis de ambiente concluída");
