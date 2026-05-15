import { useCallback, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { PartyPokemon } from '../../types/pokemon';

interface TrainerCardProps {
  gender: string;
  party: (PartyPokemon | null)[];
  selectedSlot: number | null;
  onSlotClick: (index: number) => void;
  onGenderChange: (gender: string) => void;
  onSwapSlots: (from: number, to: number) => void;
}
interface SlotButtonProps {
  index: number;
  pokemon: PartyPokemon | null;
  isSelected: boolean;
  position: string;
  onSlotClick: (index: number) => void;
}
const SLOT_POSITIONS = [
  'top-[35%] left-[4%]',
  'top-[35%] left-[25%]',
  'top-[35%] left-[46%]',
  'top-[54%] left-[4%]',
  'top-[54%] left-[25%]',
  'top-[54%] left-[46%]',
];

//=======dnd-kit 적용 전 원본 슬롯 버튼==============
// {SLOT_POSITIONS.map((pos, i) => {
//   const pokemon = party[i];
//   const isSelected = selectedSlot === i;
//   return (
//     <button
//       key={i}
//       type="button"
//       onClick={() => onSlotClick(i)}
//       className={`slot absolute w-1/5 h-[17%] ${pos} transition-all rounded-lg backdrop-blur-sm
//         ${pokemon ? 'bg-white/20' : 'bg-white/10 border-2 border-dashed border-gray-300'}
//         hover:bg-white/40 hover:border-teal-400
//         ${isSelected ? 'ring-2 ring-teal-400 ring-offset-2' : ''}`}
//       data-index={i}
//     >
//       {pokemon ? (
//         <img
//           src={
//             pokemon.sprites?.other?.['official-artwork']?.front_default ??
//             pokemon.sprites?.front_default ??
//             ''
//           }
//           alt={pokemon.name}
//           className="absolute inset-0 h-full w-full object-contain p-2 pointer-events-none"
//         />
//       ) : (
//         <span className="absolute inset-0 flex items-center justify-center text-3xl text-gray-400 pointer-events-none">
//           +
//         </span>
//       )}
//     </button>
//   );
// })}
// =============================

const SlotButton = ({ index, pokemon, isSelected, position, onSlotClick }: SlotButtonProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: `slot-${index}`,
    disabled: !pokemon,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `slot-${index}`,
  });

  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      setDraggableRef(node);
      setDroppableRef(node);
    },
    [setDraggableRef, setDroppableRef]
  );

  const img =
    pokemon?.sprites?.other?.['official-artwork']?.front_default ??
    pokemon?.sprites?.front_default ??
    '';

  return (
    <button
      ref={setRef}
      type="button"
      onClick={() => onSlotClick(index)}
      {...attributes}
      {...listeners}
      className={`slot absolute w-1/5 h-[17%] ${position} transition-all rounded-lg backdrop-blur-sm
        ${isDragging ? 'opacity-30' : ''}
        ${isOver ? 'bg-teal-300/50 border-2 border-teal-400' : pokemon ? 'bg-white/20' : 'bg-white/10 border-2 border-dashed border-gray-300'}
        hover:bg-white/40 hover:border-teal-400
        ${isSelected ? 'ring-2 ring-teal-400 ring-offset-2' : ''}`}
      data-index={index}
    >
      {pokemon ? (
        <img
          src={img}
          alt={pokemon.name}
          className="absolute inset-0 h-full w-full object-contain p-2 pointer-events-none"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-3xl text-gray-400 pointer-events-none">
          +
        </span>
      )}
    </button>
  );
};

const TrainerCard = ({
  gender,
  party,
  selectedSlot,
  onSlotClick,
  onGenderChange,
  onSwapSlots,
}: TrainerCardProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const img = gender === 'woman' ? '/assets/trianercard_woman.png' : '/assets/trianercard_man.png';

  const activePokemon = activeIndex !== null ? party[activeIndex] : null;
  const activeImg =
    activePokemon?.sprites?.other?.['official-artwork']?.front_default ??
    activePokemon?.sprites?.front_default ??
    '';

  function handleDragStart(event: DragStartEvent) {
    const index = parseInt(event.active.id.toString().replace('slot-', ''));
    setActiveIndex(index);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveIndex(null);
    if (!over || active.id === over.id) return;
    const from = parseInt(active.id.toString().replace('slot-', ''));
    const to = parseInt(over.id.toString().replace('slot-', ''));
    onSwapSlots(from, to);
  }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-3">
        <select
          value={gender}
          onChange={(e) => onGenderChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm outline-none"
        >
          <option value="man">남자 트레이너</option>
          <option value="woman">여자 트레이너</option>
        </select>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="relative w-full rounded-lg overflow-hidden">
          <img src={img} className="block w-full h-auto select-none" alt="trainer" />

          {SLOT_POSITIONS.map((pos, i) => (
            <SlotButton
              key={i}
              index={i}
              pokemon={party[i]}
              isSelected={selectedSlot === i}
              position={pos}
              onSlotClick={onSlotClick}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activePokemon && activeImg ? (
            <img
              src={activeImg}
              alt={activePokemon.name}
              className="w-16 h-16 object-contain drop-shadow-xl opacity-90"
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TrainerCard;
