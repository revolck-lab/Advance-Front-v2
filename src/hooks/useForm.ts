import { useState, useCallback, ChangeEvent, FormEvent } from "react";

type ValidationFn<T> = (
  value: T,
  formData?: Record<string, any>,
) => string | null;

type FieldValidators<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationFn<T[K]>;
};

interface FormOptions<T extends Record<string, any>> {
  initialValues: T;
  validators?: FieldValidators<T>;
  onSubmit?: (values: T, isValid: boolean) => void | Promise<void>;
}

interface FieldError {
  error: string | null;
  touched: boolean;
}

type FormErrors<T> = {
  [K in keyof T]?: FieldError;
};

/**
 * Hook personalizado para gerenciar formulários
 * Fornece gerenciamento de estado, validação e submissão de formulários
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validators = {},
  onSubmit,
}: FormOptions<T>) {
  // Estado para os valores do formulário
  const [values, setValues] = useState<T>(initialValues);

  // Estado para erros de validação
  const [errors, setErrors] = useState<FormErrors<T>>(() => {
    const initialErrors: FormErrors<T> = {};

    // Inicializa erros para todos os campos com validadores
    Object.keys(validators).forEach((key) => {
      initialErrors[key as keyof T] = { error: null, touched: false };
    });

    return initialErrors;
  });

  // Estado para indicar se o formulário foi submetido
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Estado para indicar se o formulário está sendo submetido
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Valida um campo específico
   */
  const validateField = useCallback(
    (name: keyof T, value: any) => {
      const validator = validators[name];

      if (!validator) return null;

      return validator(value, values);
    },
    [validators, values],
  );

  /**
   * Valida todo o formulário
   */
  const validateForm = useCallback(() => {
    const newErrors: FormErrors<T> = {};
    let isValid = true;

    Object.keys(validators).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);

      newErrors[fieldName] = {
        error,
        touched: errors[fieldName]?.touched || false,
      };

      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  }, [validators, values, errors, validateField]);

  /**
   * Manipula mudanças em inputs
   */
  const handleChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value, type } = event.target;

      // Lida com diferentes tipos de input
      let processedValue: any = value;

      if (type === "checkbox") {
        processedValue = (event.target as HTMLInputElement).checked;
      } else if (type === "number") {
        processedValue = value === "" ? "" : Number(value);
      }

      setValues((prev) => ({
        ...prev,
        [name]: processedValue,
      }));

      // Valida campo se já foi tocado ou se o formulário já foi submetido
      if (isSubmitted || errors[name as keyof T]?.touched) {
        const error = validateField(name as keyof T, processedValue);

        setErrors((prev) => ({
          ...prev,
          [name]: { error, touched: true },
        }));
      }
    },
    [errors, isSubmitted, validateField],
  );

  /**
   * Manipula blur em inputs (quando o campo perde foco)
   */
  const handleBlur = useCallback(
    (
      event: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = event.target;

      const error = validateField(name as keyof T, value);

      setErrors((prev) => ({
        ...prev,
        [name]: { error, touched: true },
      }));
    },
    [validateField],
  );

  /**
   * Define o valor de um campo programaticamente
   */
  const setFieldValue = useCallback(
    (name: keyof T, value: any) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Valida campo se já foi tocado ou se o formulário já foi submetido
      if (isSubmitted || errors[name]?.touched) {
        const error = validateField(name, value);

        setErrors((prev) => ({
          ...prev,
          [name]: { error, touched: true },
        }));
      }
    },
    [errors, isSubmitted, validateField],
  );

  /**
   * Define vários valores de campos programaticamente
   */
  const setFieldValues = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => ({
        ...prev,
        ...newValues,
      }));

      // Valida os campos alterados
      if (isSubmitted) {
        const newErrors = { ...errors };

        Object.keys(newValues).forEach((key) => {
          const fieldName = key as keyof T;
          const error = validateField(fieldName, newValues[fieldName]);

          newErrors[fieldName] = {
            error,
            touched: true,
          };
        });

        setErrors(newErrors);
      }
    },
    [errors, isSubmitted, validateField],
  );

  /**
   * Define o erro de um campo programaticamente
   */
  const setFieldError = useCallback((name: keyof T, error: string | null) => {
    setErrors((prev) => ({
      ...prev,
      [name]: { error, touched: true },
    }));
  }, []);

  /**
   * Limpa os erros de um campo
   */
  const clearFieldError = useCallback((name: keyof T) => {
    setErrors((prev) => ({
      ...prev,
      [name]: { error: null, touched: false },
    }));
  }, []);

  /**
   * Manipula submissão do formulário
   */
  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      setIsSubmitted(true);
      const isValid = validateForm();

      if (onSubmit) {
        setIsSubmitting(true);

        try {
          await onSubmit(values, isValid);
        } catch (error) {
          console.error("Erro ao submeter formulário:", error);
        } finally {
          setIsSubmitting(false);
        }
      }

      return isValid;
    },
    [validateForm, onSubmit, values],
  );

  /**
   * Reseta o formulário para os valores iniciais
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitted(false);
  }, [initialValues]);

  /**
   * Verifica se o formulário é válido
   */
  const isFormValid = useCallback(() => {
    return !Object.values(errors).some((error) => error?.error !== null);
  }, [errors]);

  /**
   * Obtém propriedades para um campo de formulário
   */
  const getFieldProps = useCallback(
    (name: keyof T) => ({
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors[name]?.error || null,
      touched: errors[name]?.touched || false,
    }),
    [values, handleChange, handleBlur, errors],
  );

  /**
   * Expõe uma API unificada para manipulação do formulário
   */
  return {
    // Estado do formulário
    values,
    errors,
    isSubmitted,
    isSubmitting,
    isValid: isFormValid(),

    // Manipuladores de eventos
    handleChange,
    handleBlur,
    handleSubmit,

    // Métodos para manipulação de campos
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    getFieldProps,

    // Métodos para manipulação do formulário
    resetForm,
    validateForm,
  };
}
