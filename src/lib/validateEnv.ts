// // src/validateEnv.ts
// import { z } from "zod";
// import packageJson from "../../package.json";
// import { execSync } from "child_process";

// // Obtém a branch atual do repositório
// function getCurrentBranch(): string {
//   try {
//     return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
//   } catch {
//     return "N/A"; // Retorna 'N/A' se não estiver em um repositório Git
//   }
// }

// // Obtém o hash do commit atual, com aviso se não estiver na branch 'main'
// function getCurrentCommit(): string {
//   try {
//     const branch = getCurrentBranch();
//     if (branch !== "main") {
//       console.warn(
//         `⚠️ Atenção: Você está na branch '${branch}', não na 'main'.`
//       );
//     }
//     return execSync("git rev-parse --short HEAD").toString().trim();
//   } catch {
//     return "N/A";
//   }
// }

// // Esquema de validação com Zod para as variáveis de ambiente do projeto
// const envSchema = z.object({
//   NEXT_PUBLIC_API_URL: z.string().url(), // URL da API
//   NEXT_PUBLIC_APP_NAME: z.string(), // Nome da aplicação
//   NEXT_PUBLIC_APP_URL: z.string().url(), // URL da aplicação
// });

// // Função para validar e exibir informações do projeto
// export function validateEnv() {
//   const parsedEnv = envSchema.safeParse(process.env);

//   if (!parsedEnv.success) {
//     console.error("❌ Erro ao validar variáveis de ambiente:");
//     parsedEnv.error.issues.forEach((issue) => {
//       console.error(`- ${issue.path[0]}: ${issue.message}`);
//     });
//     process.exit(1); // Encerra o processo se a validação falhar
//   }

//   // Exibe as informações do projeto apenas uma vez
//   if (!process.env.__LOGGED_ENV__) {
//     process.env.__LOGGED_ENV__ = "true"; // Marca que o log já foi exibido
//     const commitHash = getCurrentCommit();
//     const envFile =
//       process.env.NODE_ENV === "production"
//         ? ".env.production"
//         : ".env.development";

//     console.log("\n============================");
//     console.log(`🚀 ${process.env.NEXT_PUBLIC_APP_NAME}`);
//     console.log(`📌 Versão: ${packageJson.version}`);
//     console.log(`🏢 Empresa: Revolck`); // Ajuste conforme necessário
//     console.log(`🌍 Site: www.integresocial.com.br`); // Ajuste conforme necessário
//     console.log(`🔄 Commit: ${commitHash}`);
//     console.log(`🛠️ Ambiente carregado: ${envFile}`);
//     console.log("============================\n");
//   }

//   return parsedEnv.data; // Retorna as variáveis validadas
// }
