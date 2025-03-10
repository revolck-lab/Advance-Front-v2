export const env = {
    // Informações da aplicação
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'Advancemais',
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'suporte@advancemais.com.br',
    
    // API
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
    apiTimeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 15000),
    apiVersion: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
    
    // Autenticação
    tokenExpiration: Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRATION || 3600000),
    refreshTokenEnabled: process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENABLED === 'true',
    sessionStorageKey: process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY || 'advancemais:session',
    
    // Interface
    defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light',
    enableAnimations: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS === 'true',
    paginationSize: Number(process.env.NEXT_PUBLIC_PAGINATION_SIZE || 10),
    maxUploadSize: Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE || 5242880),
    
    // Performance
    staleTime: Number(process.env.NEXT_PUBLIC_STALE_TIME || 60000),
    cacheTime: Number(process.env.NEXT_PUBLIC_CACHE_TIME || 300000),
    revalidateTime: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME || 3600),
    imageOptimization: process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION === 'true',
    
    // Feature flags
    features: {
      darkMode: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE === 'true',
      blog: process.env.NEXT_PUBLIC_FEATURE_BLOG === 'true',
      notification: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATION === 'true',
      chat: process.env.NEXT_PUBLIC_FEATURE_CHAT === 'true',
    },
    
    // Monitoramento
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
    errorTracking: process.env.NEXT_PUBLIC_ERROR_TRACKING === 'true',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'error',
    performanceMonitoring: process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING === 'true',
    
    // Desenvolvimento
    debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
    mockApi: process.env.NEXT_PUBLIC_MOCK_API === 'true',
    showDeprecationWarnings: process.env.NEXT_PUBLIC_SHOW_DEPRECATION_WARNINGS === 'true',
    
    // Integrações
    mapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
    recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    
    // Helpers
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  };