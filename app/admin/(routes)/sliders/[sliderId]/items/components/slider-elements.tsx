"use client"
import { SliderItem } from "@prisma/client"
import { SliderElement } from "./slider-element"
import { Button } from "@/components/ui/button"
import { useSelectedItem } from "@/hooks/use-selected-item"
import { useEffect, useState } from "react"

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import { Grip } from "lucide-react"

interface SliderElementsProps {
  elements: SliderItem[]
  isUpdating: boolean

  onReorder: (updateData: { id: string; position: number }[]) => void
  onEdit: (id: string) => void
}
const SliderElements: React.FC<SliderElementsProps> = ({
  elements,
  onReorder,
  onEdit,
  isUpdating,
}) => {
  const selectedItem = useSelectedItem((state) => state.selectedItem)
  const setSelectedItem = useSelectedItem((state) => state.setSelectedItem)

  const [isMounted, setIsMounted] = useState(false)
  const [items, setItems] = useState(elements)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setItems(elements)
  }, [elements])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const elements = Array.from(items)
    const [reorderedItem] = elements.splice(result.source.index, 1)
    elements.splice(result.destination.index, 0, reorderedItem)

    // Update positions for all items
    const updatedItems = elements.map((element, index) => ({
      id: element.id,
      position: index, // Update position based on the new order
    }))
    setSelectedItem(result.destination.index)

    setItems(elements)
    onReorder(updatedItems)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" direction="horizontal">
          {(provided) => (
            <div
              className="flex gap-x-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((element, index) => (
                <Draggable
                  key={element.id}
                  draggableId={element.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        isUpdating ? "pointer-events-none opacity-50" : ""
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className="border h-10 w-10 mb-1 rounded-md bg-white flex items-center justify-center"
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      <Button
                        variant={selectedItem === index ? "default" : "outline"}
                        size="icon"
                        onClick={() => {
                          setSelectedItem(index)
                        }}
                      >
                        {index + 1}
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <div className="flex items-center gap-x-1">
        {elements.map((_, index) => (
          <Button
            key={index}
            variant={selectedItem === index ? "default" : "outline"}
            size="icon"
            onClick={() => {
              setSelectedItem(index)
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div> */}
      <div>
        {elements.map((element, index) => (
          <SliderElement
            className={selectedItem !== index ? "hidden" : ""}
            key={element.id}
            item={element}
          />
        ))}
      </div>
    </div>
  )
}

export { SliderElements }
