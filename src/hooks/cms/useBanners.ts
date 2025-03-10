import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bannerService } from "@/services/api-client/cms/banner";
import { Banner, CreateBannerDTO, UpdateBannerDTO } from "@/types/cms/banner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useToast } from "@/hooks/useToast";

export function useBanners() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query para listar banners
  const {
    data: banners = [],
    isLoading: isLoadingBanners,
    error: bannersError,
    refetch: refetchBanners,
  } = useQuery({
    queryKey: [QUERY_KEYS.CMS.BANNERS],
    queryFn: async () => {
      const response = await bannerService.listBanners();
      return response.data || [];
    },
  });

  // Query para obter um banner específico
  const getBanner = (id: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CMS.BANNERS, id],
      queryFn: async () => {
        const response = await bannerService.getBannerById(id);
        return response.data;
      },
      enabled: !!id, // Só executa se o ID for fornecido
    });
  };

  // Mutation para criar banner
  const createBannerMutation = useMutation({
    mutationFn: async ({
      data,
      imageFile,
    }: {
      data: CreateBannerDTO;
      imageFile: File;
    }) => {
      return await bannerService.createBanner(data, imageFile);
    },
    onSuccess: () => {
      // Invalida a query de listagem para forçar refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.BANNERS] });
      toast.success("Banner criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar banner: ${error.message}`);
    },
  });

  // Mutation para atualizar banner
  const updateBannerMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      imageFile,
    }: {
      id: number;
      data: UpdateBannerDTO;
      imageFile?: File;
    }) => {
      return await bannerService.updateBanner(id, data, imageFile);
    },
    onSuccess: (_, variables) => {
      // Invalida queries específicas
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.BANNERS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CMS.BANNERS, variables.id],
      });
      toast.success("Banner atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar banner: ${error.message}`);
    },
  });

  // Mutation para deletar banner
  const deleteBannerMutation = useMutation({
    mutationFn: async (id: number) => {
      return await bannerService.deleteBanner(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.BANNERS] });
      toast.success("Banner removido com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao remover banner: ${error.message}`);
    },
  });

  return {
    // Queries
    banners,
    isLoadingBanners,
    bannersError,
    refetchBanners,
    getBanner,

    // Mutations
    createBanner: createBannerMutation.mutate,
    isCreatingBanner: createBannerMutation.isPending,
    updateBanner: updateBannerMutation.mutate,
    isUpdatingBanner: updateBannerMutation.isPending,
    deleteBanner: deleteBannerMutation.mutate,
    isDeletingBanner: deleteBannerMutation.isPending,
  };
}
