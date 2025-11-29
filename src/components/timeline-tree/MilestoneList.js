import React from "react";
import MilestoneForm from "./MilestoneForm";

export default function MilestoneList({ milestones, setMilestones }) {
  // เพิ่ม milestone เปล่า
  const handleAdd = () => {
    setMilestones([...milestones, { year: "", text: "", image: "", emoji: "" }]);
  };

  // ลบ milestone ที่ index i
  const handleDelete = (i) => {
    setMilestones(milestones.filter((_, idx) => idx !== i));
  };

  // แก้ไข milestone
  const handleChange = (i, newValue) => {
    setMilestones(milestones.map((ms, idx) => (idx === i ? newValue : ms)));
  };

  return (
    <div>
      {milestones.map((ms, i) => (
        <MilestoneForm
          key={i}
          value={ms}
          onChange={val => handleChange(i, val)}
          onDelete={() => handleDelete(i)}
          showDelete={milestones.length > 1}
        />
      ))}
      <button
        className="mt-2 px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium shadow"
        onClick={handleAdd}
        type="button"
      >
        + เพิ่มเหตุการณ์
      </button>
    </div>
  );
}
