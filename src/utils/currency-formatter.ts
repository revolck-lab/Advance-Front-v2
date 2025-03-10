/**
 * Utilitário para formatação e manipulação de valores monetários
 * Suporta diferentes moedas e formatos
 */
export const currencyFormatter = {
  /**
   * Formata um valor para exibição em BRL (Real Brasileiro)
   * @param value Valor a ser formatado
   * @param options Opções de formatação
   * @returns String formatada (ex: R$ 1.234,56)
   */
  formatBRL(
    value: number | string,
    options: {
      showSymbol?: boolean;
      decimalPlaces?: number;
      showZeroDecimal?: boolean;
    } = {},
  ): string {
    // Configurações padrão
    const defaults = {
      showSymbol: true,
      decimalPlaces: 2,
      showZeroDecimal: true,
    };

    // Mescla opções com padrões
    const config = { ...defaults, ...options };

    // Normaliza o valor para número
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    // Se não for um número válido, retorna string vazia
    if (isNaN(numValue)) return "";

    try {
      // Formata usando o Intl.NumberFormat
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: config.showSymbol ? "currency" : "decimal",
        currency: "BRL",
        minimumFractionDigits: config.showZeroDecimal
          ? config.decimalPlaces
          : 0,
        maximumFractionDigits: config.decimalPlaces,
      });

      return formatter.format(numValue);
    } catch (error) {
      console.error("Erro ao formatar moeda:", error);
      return "";
    }
  },

  /**
   * Formata um valor para exibição em USD (Dólar Americano)
   * @param value Valor a ser formatado
   * @param options Opções de formatação
   * @returns String formatada (ex: $ 1,234.56)
   */
  formatUSD(
    value: number | string,
    options: {
      showSymbol?: boolean;
      decimalPlaces?: number;
      showZeroDecimal?: boolean;
    } = {},
  ): string {
    const defaults = {
      showSymbol: true,
      decimalPlaces: 2,
      showZeroDecimal: true,
    };

    const config = { ...defaults, ...options };
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) return "";

    try {
      const formatter = new Intl.NumberFormat("en-US", {
        style: config.showSymbol ? "currency" : "decimal",
        currency: "USD",
        minimumFractionDigits: config.showZeroDecimal
          ? config.decimalPlaces
          : 0,
        maximumFractionDigits: config.decimalPlaces,
      });

      return formatter.format(numValue);
    } catch (error) {
      console.error("Erro ao formatar moeda:", error);
      return "";
    }
  },

  /**
   * Formata um valor para exibição em EUR (Euro)
   * @param value Valor a ser formatado
   * @param options Opções de formatação
   * @returns String formatada (ex: € 1.234,56)
   */
  formatEUR(
    value: number | string,
    options: {
      showSymbol?: boolean;
      decimalPlaces?: number;
      showZeroDecimal?: boolean;
    } = {},
  ): string {
    const defaults = {
      showSymbol: true,
      decimalPlaces: 2,
      showZeroDecimal: true,
    };

    const config = { ...defaults, ...options };
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) return "";

    try {
      const formatter = new Intl.NumberFormat("de-DE", {
        style: config.showSymbol ? "currency" : "decimal",
        currency: "EUR",
        minimumFractionDigits: config.showZeroDecimal
          ? config.decimalPlaces
          : 0,
        maximumFractionDigits: config.decimalPlaces,
      });

      return formatter.format(numValue);
    } catch (error) {
      console.error("Erro ao formatar moeda:", error);
      return "";
    }
  },

  /**
   * Formata um valor para qualquer moeda com código ISO
   * @param value Valor a ser formatado
   * @param currencyCode Código ISO da moeda (ex: 'BRL', 'USD', 'EUR')
   * @param locale Locale para formatação (ex: 'pt-BR', 'en-US')
   * @param options Opções de formatação
   * @returns String formatada
   */
  formatCurrency(
    value: number | string,
    currencyCode: string = "BRL",
    locale: string = "pt-BR",
    options: {
      showSymbol?: boolean;
      decimalPlaces?: number;
      showZeroDecimal?: boolean;
    } = {},
  ): string {
    const defaults = {
      showSymbol: true,
      decimalPlaces: 2,
      showZeroDecimal: true,
    };

    const config = { ...defaults, ...options };
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) return "";

    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: config.showSymbol ? "currency" : "decimal",
        currency: currencyCode,
        minimumFractionDigits: config.showZeroDecimal
          ? config.decimalPlaces
          : 0,
        maximumFractionDigits: config.decimalPlaces,
      });

      return formatter.format(numValue);
    } catch (error) {
      console.error("Erro ao formatar moeda:", error);
      return "";
    }
  },

  /**
   * Formata um número com separadores
   * @param value Valor a ser formatado
   * @param decimalPlaces Casas decimais
   * @param locale Locale para formatação
   * @returns String formatada apenas como número
   */
  formatNumber(
    value: number | string,
    decimalPlaces: number = 2,
    locale: string = "pt-BR",
  ): string {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numValue)) return "";

    try {
      const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });

      return formatter.format(numValue);
    } catch (error) {
      console.error("Erro ao formatar número:", error);
      return "";
    }
  },

  /**
   * Converte string formatada em número
   * @param formattedValue String formatada com símbolos monetários
   * @returns Número ou NaN se inválido
   */
  parseCurrency(formattedValue: string): number {
    if (!formattedValue) return NaN;

    try {
      // Remove qualquer símbolo de moeda e espaços
      const cleaned = formattedValue
        .replace(/[^\d,.-]/g, "")
        // Substitui vírgula por ponto para ambientes que usam vírgula como decimal
        .replace(",", ".");

      return parseFloat(cleaned);
    } catch (error) {
      console.error("Erro ao converter string para número:", error);
      return NaN;
    }
  },

  /**
   * Calcula desconto percentual
   * @param originalPrice Preço original
   * @param salePrice Preço de venda
   * @returns Percentual de desconto ou NaN se preços inválidos
   */
  calculateDiscount(originalPrice: number, salePrice: number): number {
    if (originalPrice <= 0 || salePrice < 0) return NaN;

    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return parseFloat(discount.toFixed(2));
  },

  /**
   * Formata um valor com ícone de trend (positivo/negativo)
   * @param value Valor a ser formatado
   * @param options Opções de formatação
   * @returns String formatada com prefixo de tendência
   */
  formatTrend(
    value: number,
    options: {
      decimalPlaces?: number;
      showPlus?: boolean;
      currency?: string;
      locale?: string;
    } = {},
  ): string {
    const defaults = {
      decimalPlaces: 2,
      showPlus: true,
      currency: "",
      locale: "pt-BR",
    };

    const config = { ...defaults, ...options };

    try {
      const sign = value > 0 && config.showPlus ? "+" : "";

      let formatted = value.toFixed(config.decimalPlaces);

      if (config.currency) {
        formatted = this.formatCurrency(value, config.currency, config.locale, {
          decimalPlaces: config.decimalPlaces,
        });

        // Se já tem sinal, não adiciona o sinal de mais
        return value > 0 && config.showPlus && !formatted.includes("+")
          ? `+${formatted}`
          : formatted;
      }

      return `${sign}${formatted}`;
    } catch (error) {
      console.error("Erro ao formatar tendência:", error);
      return "";
    }
  },

  /**
   * Formata um valor para exibição em um input
   * @param value Valor a ser formatado
   * @returns String formatada adequada para inputs
   */
  formatForInput(value: number | string): string {
    const numValue =
      typeof value === "string" ? this.parseCurrency(value) : value;

    if (isNaN(numValue)) return "";

    // Formata mantendo sempre 2 casas decimais
    return numValue.toFixed(2);
  },
};
