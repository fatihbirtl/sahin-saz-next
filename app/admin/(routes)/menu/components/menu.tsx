"use client"
import React, { useEffect, useState } from "react"
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from "dnd-kit-sortable-tree"

export const Menu = () => {
  const [items, setItems] = useState(initialViableMinimalData)

  useEffect(() => {
    console.log(items)
  }, [items])

  return (
    <>
      <SortableTree
        indicator
        items={items}
        onItemsChanged={setItems}
        TreeItemComponent={MinimalTreeItemComponent}
      />
    </>
  )
}

type MinimalTreeItemData = {
  value: string
}

const MinimalTreeItemComponent = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => (
  <SimpleTreeItemWrapper {...props} ref={ref}>
    <div>{props.item.value}</div>
  </SimpleTreeItemWrapper>
))

// DisplayName ekleme
MinimalTreeItemComponent.displayName = "MinimalTreeItemComponent"

const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
  {
    id: "1",
    value: "Jane",
    children: [
      { id: "4", value: "John" },
      { id: "5", value: "Sally" },
    ],
  },
  { id: "2", value: "Fred", children: [{ id: "6", value: "Eugene" }] },
  { id: "3", value: "Helen", canHaveChildren: false },
]
