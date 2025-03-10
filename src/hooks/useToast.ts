/**
 * Hook para exibir notificações tipo toast
 * Esta é uma implementação simplificada que pode ser expandida ou
 * substituída por uma biblioteca como react-hot-toast ou react-toastify
 */
export function useToast() {
  // Implementação básica que utiliza console.log
  // Em uma aplicação real, seria substituída por uma biblioteca de toasts

  const success = (message: string) => {
    console.log(`%c✅ ${message}`, 'color: green; font-weight: bold;');
    // Aqui você integraria sua biblioteca de toast preferida
  };

  const error = (message: string) => {
    console.log(`%c❌ ${message}`, 'color: red; font-weight: bold;');
    // Aqui você integraria sua biblioteca de toast preferida
  };

  const info = (message: string) => {
    console.log(`%cℹ️ ${message}`, 'color: blue; font-weight: bold;');
    // Aqui você integraria sua biblioteca de toast preferida
  };

  const warning = (message: string) => {
    console.log(`%c⚠️ ${message}`, 'color: orange; font-weight: bold;');
    // Aqui você integraria sua biblioteca de toast preferida
  };

  return {
    success,
    error,
    info,
    warning,
  };
}
