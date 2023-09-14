import { useState, useEffect } from "react";

const startTimeMinutes = convertToMinutes("08.00");
const endTimeMinutes = convertToMinutes("17.00");

const Slot = ({ details }) => {
  const startMinutes  = convertToMinutes(details.start);
  const endMinutes = convertToMinutes(details.end);

  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    const tableElement = document.querySelector(".timetable");
    if (tableElement) {
      const height = tableElement.getBoundingClientRect().height;
      setTableHeight(height);
    }
  }, []);

  const style = {
    backgroundColor: `var(--color-${details.lab == 1 ? 1 : details.lab + 1})`,
    gridColumn: details.lab + 1,
    gridRow: getGridRow(startMinutes),
    height: `${getHeight(startMinutes, endMinutes, tableHeight)}px`,
    transform: `translateY(${getRowOffset(startMinutes, tableHeight)}px)`,
  };

  return (
    <div className="slot" style={style}>
      <h3 className="name">{details.name}</h3>
      <p>{details.start + " - " + details.end}</p>
    </div>
  );
};

function getHeight(start, end , tableHeight )  {
  return ((end - start) / (endTimeMinutes - startTimeMinutes)) * tableHeight;
}

const getGridRow = (start )  => {
  return Math.floor((start - startTimeMinutes) / 60) + 1;
};

const getRowOffset = (start, tableHeight )  => {
  return (((start - startTimeMinutes) % 60) * tableHeight) / (60 * 9);
};

function convertToMinutes(time)  {
  const [hours, minutes] = time.split(".").map(Number);
  return hours * 60 + minutes;
}

export default Slot;