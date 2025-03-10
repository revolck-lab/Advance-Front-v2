import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sliderService } from "@/services/api-client/cms/slider";
import { Slider, CreateSliderDTO, UpdateSliderDTO } from "@/types/cms/slider";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useToast } from "@/hooks/useToast";

export function useSliders() {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query para listar sliders
  const {
    data: sliders = [],
    isLoading: isLoadingSliders,
    error: slidersError,
    refetch: refetchSliders,
  } = useQuery({
    queryKey: [QUERY_KEYS.CMS.SLIDERS],
    queryFn: async () => {
      const response = await sliderService.listSliders();
      return response.data || [];
    },
  });

  // Query para obter um slider específico
  const getSlider = (id: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.CMS.SLIDERS, id],
      queryFn: async () => {
        const response = await sliderService.getSliderById(id);
        return response.data;
      },
      enabled: !!id,
    });
  };

  // Mutation para criar slider
  const createSliderMutation = useMutation({
    mutationFn: async ({
      data,
      imageFile,
    }: {
      data: CreateSliderDTO;
      imageFile: File;
    }) => {
      return await sliderService.createSlider(data, imageFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.SLIDERS] });
      toast.success("Slider criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar slider: ${error.message}`);
    },
  });

  // Mutation para atualizar slider
  const updateSliderMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      imageFile,
    }: {
      id: number;
      data: UpdateSliderDTO;
      imageFile?: File;
    }) => {
      return await sliderService.updateSlider(id, data, imageFile);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.SLIDERS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CMS.SLIDERS, variables.id],
      });
      toast.success("Slider atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar slider: ${error.message}`);
    },
  });

  // Mutation para deletar slider
  const deleteSliderMutation = useMutation({
    mutationFn: async (id: number) => {
      return await sliderService.deleteSlider(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CMS.SLIDERS] });
      toast.success("Slider removido com sucesso!");
    },
    onError: (error: any) => {
      toast.error(`Erro ao remover slider: ${error.message}`);
    },
  });

  return {
    // Queries
    sliders,
    isLoadingSliders,
    slidersError,
    refetchSliders,
    getSlider,

    // Mutations
    createSlider: createSliderMutation.mutate,
    isCreatingSlider: createSliderMutation.isPending,
    updateSlider: updateSliderMutation.mutate,
    isUpdatingSlider: updateSliderMutation.isPending,
    deleteSlider: deleteSliderMutation.mutate,
    isDeletingSlider: deleteSliderMutation.isPending,
  };
}
