import {
  format,
  parse,
  isValid,
  formatDistance,
  formatRelative,
  formatDistanceToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Utilitário para formatação e manipulação de datas
 * Usa date-fns para facilitar o trabalho com datas de forma consistente
 */
export const dateFormatter = {
  /**
   * Formata uma data para exibição
   * @param date Data a ser formatada (string, Date ou timestamp)
   * @param formatStr String de formato (padrão: dd/MM/yyyy)
   * @returns String formatada ou string vazia se inválida
   */
  format(date: string | Date | number, formatStr = 'dd/MM/yyyy'): string {
    // Se for string, tenta converter para objeto Date
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    try {
      if (!isValid(dateObj)) return '';
      return format(dateObj, formatStr, { locale: ptBR });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  },

  /**
   * Formata uma data para hora
   * @param date Data a ser formatada (string, Date ou timestamp)
   * @returns String formatada (HH:mm) ou string vazia se inválida
   */
  formatTime(date: string | Date | number): string {
    return this.format(date, 'HH:mm');
  },

  /**
   * Formata uma data completa com hora
   * @param date Data a ser formatada
   * @returns String formatada (dd/MM/yyyy HH:mm) ou string vazia
   */
  formatDateTime(date: string | Date | number): string {
    return this.format(date, 'dd/MM/yyyy HH:mm');
  },

  /**
   * Formata uma data para exibição em formato ISO
   * @param date Data a ser formatada
   * @returns String formatada (yyyy-MM-dd) ou string vazia
   */
  formatISO(date: string | Date | number): string {
    return this.format(date, 'yyyy-MM-dd');
  },

  /**
   * Formata uma data completa com hora em formato ISO
   * @param date Data a ser formatada
   * @returns String formatada (yyyy-MM-ddTHH:mm:ss) ou string vazia
   */
  formatISODateTime(date: string | Date | number): string {
    return this.format(date, "yyyy-MM-dd'T'HH:mm:ss");
  },

  /**
   * Converte string de data para objeto Date
   * @param dateStr String de data (ex: "31/12/2023")
   * @param formatStr Formato da string (padrão: dd/MM/yyyy)
   * @returns Objeto Date ou null se inválido
   */
  parseDate(dateStr: string, formatStr = 'dd/MM/yyyy'): Date | null {
    try {
      const parsedDate = parse(dateStr, formatStr, new Date());
      return isValid(parsedDate) ? parsedDate : null;
    } catch (error) {
      console.error('Erro ao converter string para data:', error);
      return null;
    }
  },

  /**
   * Formata a distância entre duas datas (ex: "há 2 dias")
   * @param date Data a ser comparada
   * @param baseDate Data base para comparação (padrão: agora)
   * @returns String representando a distância
   */
  formatDistanceToNow(date: Date | number | string, addSuffix = true): string {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (!isValid(dateObj)) return '';

      return formatDistanceToNow(dateObj, {
        addSuffix,
        locale: ptBR,
      });
    } catch (error) {
      console.error('Erro ao calcular distância:', error);
      return '';
    }
  },

  /**
   * Formata uma data relativamente a outra
   * @param date Data a ser formatada
   * @param baseDate Data base para comparação
   * @returns String formatada relativamente
   */
  formatRelative(date: Date | number | string, baseDate: Date | number = new Date()): string {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (!isValid(dateObj)) return '';

      return formatRelative(dateObj, baseDate, { locale: ptBR });
    } catch (error) {
      console.error('Erro ao formatar data relativa:', error);
      return '';
    }
  },

  /**
   * Verifica se uma data é válida
   * @param date Data a ser verificada
   * @returns Boolean indicando se é válida
   */
  isValid(date: any): boolean {
    if (!date) return false;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isValid(dateObj);
  },

  /**
   * Formata data para exibição inteligente baseada na proximidade
   * - Para hoje: "Hoje às HH:mm"
   * - Para ontem: "Ontem às HH:mm"
   * - Para datas recentes: "há X dias/semanas"
   * - Para datas antigas: "dd/MM/yyyy"
   * @param date Data a ser formatada
   * @returns String formatada de acordo com a proximidade
   */
  formatSmart(date: Date | number | string): string {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (!isValid(dateObj)) return '';

      const now = new Date();
      const dateObjAsDate = typeof dateObj === 'number' ? new Date(dateObj) : dateObj;
      const diffInDays = Math.floor(
        (now.getTime() - dateObjAsDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffInDays === 0) {
        return `Hoje às ${this.formatTime(dateObj)}`;
      } else if (diffInDays === 1) {
        return `Ontem às ${this.formatTime(dateObj)}`;
      } else if (diffInDays < 7) {
        return this.formatDistanceToNow(dateObj);
      } else {
        return this.format(dateObj);
      }
    } catch (error) {
      console.error('Erro ao formatar data de forma inteligente:', error);
      return '';
    }
  },
};
