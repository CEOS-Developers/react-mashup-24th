import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMatchPreset,
  deleteMatchPreset,
  getMatchPresets,
  toFilterState,
} from '../apis/matchPreset';
import type { FilterPreset, FilterState } from '../types/filter';

const PRESET_QUERY_KEY = ['matchPresets'] as const;

export function useMatchPresets() {
  const queryClient = useQueryClient();

  const { data: presets = [] } = useQuery({
    queryKey: PRESET_QUERY_KEY,
    queryFn: getMatchPresets,
    select: (result) =>
      result.map((preset): FilterPreset => ({
        id: String(preset.presetId),
        name: preset.title,
        filter: toFilterState(preset.filters),
      })),
  });

  const refreshPresets = () => queryClient.invalidateQueries({ queryKey: PRESET_QUERY_KEY });

  const addMutation = useMutation({
    mutationFn: ({ name, filter }: { name: string; filter: FilterState }) =>
      createMatchPreset(name, filter),
    onSuccess: refreshPresets,
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => deleteMatchPreset(Number(id)),
    onSuccess: refreshPresets,
  });

  const addPreset = (name: string, filter: FilterState) => addMutation.mutate({ name, filter });
  const removePreset = (id: string) => removeMutation.mutate(id);

  return {
    presets,
    addPreset,
    removePreset,
    isPresetPending: addMutation.isPending || removeMutation.isPending,
    presetError: addMutation.error ?? removeMutation.error,
  };
}
