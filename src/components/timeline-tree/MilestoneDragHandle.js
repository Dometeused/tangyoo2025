import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import MilestoneForm from "./MilestoneForm";
import React from "react";

// Drag Handle Icon
const DragHandle = SortableHandle(() => (
  <span className="cursor-move pr-2 text-xl opacity-50">☰</span>
));

// Sortable Item
const SortableItem = SortableElement(({ value, onChange, onDelete, showDelete }) => (
  <div className="flex items-center">
    <DragHandle />
    <MilestoneForm value={value} onChange={onChange} onDelete={onDelete} showDelete={showDelete} />
  </div>
));

// Sortable List
const SortableList = SortableContainer(({ milestones, setMilestones }) => (
  <div>
    {milestones.map((ms, idx) => (
      <SortableItem
        key={`item-${idx}`}
        index={idx}
        value={ms}
        onChange={val => {
          const newArr = milestones.map((m, i) => (i === idx ? val : m));
          setMilestones(newArr);
        }}
        onDelete={() => setMilestones(milestones.filter((_, i) => i !== idx))}
        showDelete={milestones.length > 1}
      />
    ))}
  </div>
));

export default function MilestoneList({ milestones, setMilestones }) {
  return (
    <SortableList
      milestones={milestones}
      setMilestones={setMilestones}
      axis="y"
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) =>
        setMilestones(arrayMove(milestones, oldIndex, newIndex))
      }
    />
  );
}
