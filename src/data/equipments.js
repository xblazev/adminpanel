const baseEquipment = {
  created: 0,
  favorite: 0,
  elv: 0,
  slv: 0,
  potential: 0,
  is_complete_auto_potential_composite: 0,
  auto_potential_composite: 0,
  awaked: 0,
  is_awake: 0,
  endAwakeCount: 0,
  endAwakeRemain: 0,
  end_remain: 0,
  start_remain: 0,
  evolve_start_time: 0,
}

export const equipments = Array.from({ length: 18 }, (_, index) => ({
  ...baseEquipment,
  equipment_id: `AD_ARM${String(index + 1).padStart(3, '0')}`,
  mst_equipment_id: 3325982510 + index,
  favorite: index % 4 === 0 ? 1 : 0,
  elv: index % 12,
  slv: index % 8,
  potential: index % 5,
  awaked: index % 3,
  is_awake: index % 2,
  _id: `69f99a6ab45de554ac10e9${String(index).padStart(2, '0')}`,
}))
