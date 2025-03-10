/**
 * Utilitário para validação de dados
 * Contém funções para validar diferentes tipos de dados
 */
export const validation = {
  /**
   * Valida um endereço de e-mail
   * @param email Email a ser validado
   * @returns Boolean indicando se o email é válido
   */
  isValidEmail(email: string): boolean {
    if (!email) return false;

    // Expressão regular para validação de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  /**
   * Valida um número de telefone brasileiro
   * @param phone Telefone a ser validado
   * @returns Boolean indicando se o telefone é válido
   */
  isValidPhone(phone: string): boolean {
    if (!phone) return false;

    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, "");

    // Telefone brasileiro válido: 10 ou 11 dígitos (com 9 para celular)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  },

  /**
   * Valida um CPF
   * @param cpf CPF a ser validado
   * @returns Boolean indicando se o CPF é válido
   */
  isValidCPF(cpf: string): boolean {
    if (!cpf) return false;

    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, "");

    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (CPF inválido, mas passaria na validação matemática)
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    // Algoritmo de validação do CPF
    let sum = 0;
    let remainder;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

    // Segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

    return true;
  },

  /**
   * Valida um CNPJ
   * @param cnpj CNPJ a ser validado
   * @returns Boolean indicando se o CNPJ é válido
   */
  isValidCNPJ(cnpj: string): boolean {
    if (!cnpj) return false;

    // Remove caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, "");

    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) return false;

    // Verifica se todos os dígitos são iguais (CNPJ inválido, mas passaria na validação matemática)
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

    // Algoritmo de validação do CNPJ
    let tamanho = cleanCNPJ.length - 2;
    let numeros = cleanCNPJ.substring(0, tamanho);
    const digitos = cleanCNPJ.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    // Primeiro dígito verificador
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    // Segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cleanCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  },

  /**
   * Valida um CEP brasileiro
   * @param cep CEP a ser validado
   * @returns Boolean indicando se o CEP é válido
   */
  isValidCEP(cep: string): boolean {
    if (!cep) return false;

    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, "");

    // CEP brasileiro tem 8 dígitos
    return cleanCEP.length === 8;
  },

  /**
   * Valida uma data no formato DD/MM/YYYY
   * @param date Data a ser validada
   * @returns Boolean indicando se a data é válida
   */
  isValidDate(date: string): boolean {
    if (!date) return false;

    // Verifica o formato DD/MM/YYYY
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const matches = date.match(dateRegex);

    if (!matches) return false;

    // Extrai os componentes da data
    const day = parseInt(matches[1], 10);
    const month = parseInt(matches[2], 10) - 1; // Mês em JS é 0-11
    const year = parseInt(matches[3], 10);

    // Cria o objeto Date e verifica se os componentes correspondem
    const dateObj = new Date(year, month, day);

    return (
      dateObj.getDate() === day &&
      dateObj.getMonth() === month &&
      dateObj.getFullYear() === year
    );
  },

  /**
   * Valida uma senha forte
   * @param password Senha a ser validada
   * @param options Opções de validação
   * @returns Boolean indicando se a senha é forte
   */
  isStrongPassword(
    password: string,
    options: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumbers?: boolean;
      requireSpecialChars?: boolean;
    } = {},
  ): boolean {
    if (!password) return false;

    // Configurações padrão
    const config = {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      ...options,
    };

    // Verifica comprimento mínimo
    if (password.length < config.minLength) return false;

    // Verifica requisitos de caracteres
    if (config.requireUppercase && !/[A-Z]/.test(password)) return false;
    if (config.requireLowercase && !/[a-z]/.test(password)) return false;
    if (config.requireNumbers && !/[0-9]/.test(password)) return false;
    if (
      config.requireSpecialChars &&
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    )
      return false;

    return true;
  },

  /**
   * Verifica se uma string tem o tamanho mínimo
   * @param str String a ser verificada
   * @param minLength Tamanho mínimo
   * @returns Boolean indicando se a string tem o tamanho mínimo
   */
  hasMinLength(str: string, minLength: number): boolean {
    if (!str) return false;
    return str.length >= minLength;
  },

  /**
   * Verifica se uma string tem o tamanho máximo
   * @param str String a ser verificada
   * @param maxLength Tamanho máximo
   * @returns Boolean indicando se a string não excede o tamanho máximo
   */
  hasMaxLength(str: string, maxLength: number): boolean {
    if (!str) return true; // String vazia sempre tem comprimento menor que o máximo
    return str.length <= maxLength;
  },

  /**
   * Verifica se um número está dentro de um intervalo
   * @param value Número a ser verificado
   * @param min Valor mínimo (inclusive)
   * @param max Valor máximo (inclusive)
   * @returns Boolean indicando se o número está no intervalo
   */
  isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  },

  /**
   * Verifica se um valor está em uma lista de valores permitidos
   * @param value Valor a ser verificado
   * @param allowedValues Lista de valores permitidos
   * @returns Boolean indicando se o valor é permitido
   */
  isInAllowedValues<T>(value: T, allowedValues: T[]): boolean {
    return allowedValues.includes(value);
  },

  /**
   * Verifica se um objeto tem todas as propriedades necessárias
   * @param obj Objeto a ser verificado
   * @param requiredProps Lista de propriedades necessárias
   * @returns Boolean indicando se o objeto tem todas as propriedades
   */
  hasRequiredProperties(
    obj: Record<string, any>,
    requiredProps: string[],
  ): boolean {
    if (!obj) return false;

    return requiredProps.every(
      (prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop) &&
        obj[prop] !== null &&
        obj[prop] !== undefined,
    );
  },

  /**
   * Aplica várias validações e retorna o primeiro erro encontrado
   * @param value Valor a ser validado
   * @param validations Lista de validações a serem aplicadas
   * @returns String de erro ou null se não houver erros
   */
  validate<T>(
    value: T,
    validations: Array<{
      validator: (val: T) => boolean;
      message: string;
    }>,
  ): string | null {
    for (const validation of validations) {
      if (!validation.validator(value)) {
        return validation.message;
      }
    }

    return null;
  },

  /**
   * Formata um CPF com máscara
   * @param cpf CPF a ser formatado
   * @returns CPF formatado (ex: 123.456.789-00)
   */
  formatCPF(cpf: string): string {
    if (!cpf) return "";

    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, "");

    // Aplica a máscara
    return cleanCPF
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  },

  /**
   * Formata um CNPJ com máscara
   * @param cnpj CNPJ a ser formatado
   * @returns CNPJ formatado (ex: 12.345.678/0001-90)
   */
  formatCNPJ(cnpj: string): string {
    if (!cnpj) return "";

    // Remove caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, "");

    // Aplica a máscara
    return cleanCNPJ
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  },

  /**
   * Formata um CEP com máscara
   * @param cep CEP a ser formatado
   * @returns CEP formatado (ex: 12345-678)
   */
  formatCEP(cep: string): string {
    if (!cep) return "";

    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, "");

    // Aplica a máscara
    return cleanCEP.replace(/(\d{5})(\d{3})$/, "$1-$2");
  },

  /**
   * Formata um telefone com máscara
   * @param phone Telefone a ser formatado
   * @returns Telefone formatado (ex: (11) 98765-4321)
   */
  formatPhone(phone: string): string {
    if (!phone) return "";

    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, "");

    // Aplica a máscara de acordo com o tamanho
    if (cleanPhone.length === 11) {
      return cleanPhone
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2");
    } else if (cleanPhone.length === 10) {
      return cleanPhone
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d{4})$/, "$1-$2");
    }

    return cleanPhone; // Retorna sem formatação se não seguir padrão
  },
};
