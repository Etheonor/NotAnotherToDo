/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

const DraggableTasks = (props: {
  list: { id: string; name: string }[];
  setList: (arg0: any[]) => void;
}): JSX.Element => {
  const handleOnDragEnd = (result: any) => {
    const items = [...props.list];
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
    }

    props.setList(items);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided: DroppableProvided) => (
          <ul
            className="flex flex-col"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {props.list.map(({ id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={id}
                      className="border border-primary list-none text-center mb-5 bg-base-300 text-base-content">
                      <p className="m-auto p-5 text-center">{name}</p>
                    </li>
                  )}
                </Draggable>
              );
            })}
            <div className="list-none">{provided.placeholder}</div>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTasks;
