import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { superAdminService } from "@/services/api-client/cms/super_admin";
import {
  CreateSmtpConfigDTO,
  UpdateSmtpConfigDTO,
  CreateSiteInfoDTO,
  UpdateSiteInfoDTO,
} from "@/types/cms/super_admin";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useToast } from "@/hooks/useToast";

export function useSuperAdmin() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query para obter configuração SMTP
  const getSmtpConfig = (id: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CMS.SMTP, id],
      queryFn: async () => {
        const response = await superAdminService.getSmtpServer(id);
        return response.data;
      },
      enabled: !!id,
    });
  };

  // Query para obter informações do site
  const getSiteInfo = (id: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CMS.SITE_INFO, id],
      queryFn: async () => {
        const response = await superAdminService.getSiteInformation(id);
        return response.data;
      },
      enabled: !!id,
    });
  };

  // Mutation para criar SMTP
  const createSmtpMutation = useMutation({
    mutationFn: async (data: CreateSmtpConfigDTO) => {
      return await superAdminService.createSmtpServer(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.SMTP] });
      toast.success("Configuração SMTP criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar configuração SMTP: ${error.message}`);
    },
  });

  // Mutation para atualizar SMTP
  const updateSmtpMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateSmtpConfigDTO;
    }) => {
      return await superAdminService.updateSmtpServer(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CMS.SMTP, variables.id],
      });
      toast.success("Configuração SMTP atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar configuração SMTP: ${error.message}`);
    },
  });

  // Mutation para criar informações do site
  const createSiteInfoMutation = useMutation({
    mutationFn: async ({
      data,
      faviconFile,
    }: {
      data: CreateSiteInfoDTO;
      faviconFile: File;
    }) => {
      return await superAdminService.createSiteInformation(data, faviconFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.SITE_INFO] });
      toast.success("Informações do site criadas com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar informações do site: ${error.message}`);
    },
  });

  // Mutation para atualizar informações do site
  const updateSiteInfoMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      faviconFile,
    }: {
      id: number;
      data: UpdateSiteInfoDTO;
      faviconFile?: File;
    }) => {
      return await superAdminService.updateSiteInformation(
        id,
        data,
        faviconFile,
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CMS.SITE_INFO, variables.id],
      });
      toast.success("Informações do site atualizadas com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar informações do site: ${error.message}`);
    },
  });

  return {
    // Queries
    getSmtpConfig,
    getSiteInfo,

    // SMTP Mutations
    createSmtp: createSmtpMutation.mutate,
    isCreatingSmtp: createSmtpMutation.isPending,
    updateSmtp: updateSmtpMutation.mutate,
    isUpdatingSmtp: updateSmtpMutation.isPending,

    // Site Info Mutations
    createSiteInfo: createSiteInfoMutation.mutate,
    isCreatingSiteInfo: createSiteInfoMutation.isPending,
    updateSiteInfo: updateSiteInfoMutation.mutate,
    isUpdatingSiteInfo: updateSiteInfoMutation.isPending,
  };
}
