"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import {
  SortableTree,
  TreeItemComponentProps,
  SimpleTreeItemWrapper,
} from "dnd-kit-sortable-tree"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { useSelectedItem } from "@/hooks/use-selected-item"
import { cn } from "@/lib/utils"
import { MenuItemTypes } from "@/types"
import { useSelectedMenu } from "@/hooks/use-selected-menu"
import { AlertModal } from "@/components/modals/alert-modal"

interface MenuItemsProps {
  elements: MenuItemTypes[]
  setIsUpdating: (value: boolean) => void
}

type MinimalTreeItemData = {
  id: string
  value: string
  children?: MinimalTreeItemData[]
  depth: number // Track depth in the tree
}

const MenuItems: React.FC<MenuItemsProps> = ({ elements, setIsUpdating }) => {
  const [items, setItems] = useState<MinimalTreeItemData[]>([])
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [menuId, setMenuId] = useState("")
  const setSelectedItem = useSelectedMenu((state) => state.setSelectedItem)
  const selectedItem = useSelectedMenu((state) => state.selectedItem)
  // Create a structured tree that respects the depth limitation
  const createTreeStructure = (
    items: MenuItemTypes[],
    parentDepth: number = 0
  ): MinimalTreeItemData[] => {
    const itemMap: { [key: string]: MinimalTreeItemData } = {}

    items.forEach((item) => {
      itemMap[item.id] = { ...item, children: [], depth: parentDepth + 1 }
    })

    const rootItems: MinimalTreeItemData[] = []
    items.forEach((item) => {
      if (item.parentId && itemMap[item.parentId]) {
        if (itemMap[item.parentId].depth < 3) {
          // Ensure we don't go deeper than 3 levels
          itemMap[item.parentId].children!.push(itemMap[item.id])
        }
      } else {
        rootItems.push(itemMap[item.id])
      }
    })

    return rootItems
  }

  useEffect(() => {
    const hierarchicalItems = createTreeStructure(elements)
    setItems(hierarchicalItems)
  }, [elements])

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/menu/${params.menuId}/items/${id}`)
      router.refresh()
      toast.success("Menu item Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setOpen(false)
    }
  }

  const handleItemsChanged = (newItems: MinimalTreeItemData[]) => {
    // Prevent exceeding the maximum depth by validating the whole tree
    if (!validateDepth(newItems, 3)) {
      toast.error("Cannot add more than 3 levels of submenus")
      return
    }
    setItems(newItems)
    onReorder(newItems)
  }

  const onReorder = async (updatedItems: MinimalTreeItemData[]) => {
    try {
      const reorderData = flattenItems(updatedItems)
      await axios.put(`/api/menu/${params.menuId}/items/reorder`, {
        list: reorderData,
      })
      router.refresh()
      toast.success("Menu items reordered successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const flattenItems = (
    items: MinimalTreeItemData[],
    parentId: string | null = null
  ): any[] => {
    return items.reduce<any[]>((acc, item) => {
      acc.push({
        id: item.id,
        parentId: parentId,
        position: acc.length,
      })
      if (item.children) {
        acc = acc.concat(flattenItems(item.children, item.id))
      }
      return acc
    }, [])
  }

  const validateDepth = (
    items: MinimalTreeItemData[],
    maxDepth: number
  ): boolean => {
    // This helper function checks if any part of the subtree exceeds the allowed depth.
    const checkDepth = (
      items: MinimalTreeItemData[],
      depth: number
    ): boolean => {
      if (depth > maxDepth) return false // Depth exceeds the maximum allowed depth
      return items.every((item) => checkDepth(item.children || [], depth + 1)) // Check each child
    }
    return checkDepth(items, 0) // Start checking from depth 1 (root level)
  }

  const MinimalTreeItemComponent = React.forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<MinimalTreeItemData>
  >((props, ref) => (
    <SimpleTreeItemWrapper
      hideCollapseButton
      disableCollapseOnItemClick
      {...props}
      ref={ref}
    >
      <div className="flex items-center gap-x-3 w-full">
        {props.item.value}
        <Button
          size="icon"
          onClick={() => {
            setSelectedItem(props.item.id)
            setIsUpdating(true)
          }}
          className="p-0 h-8 w-8 ml-auto"
          variant={props.item.id === selectedItem ? "default" : "outline"}
        >
          <Pencil size={14} />
        </Button>
        <Button
          size="icon"
          onClick={() => {
            setMenuId(props.item.id)
            setOpen(true)
          }}
          className="p-0 h-8 w-8"
          variant="destructive"
        >
          <Trash size={14} />
        </Button>
      </div>
    </SimpleTreeItemWrapper>
  ))
  MinimalTreeItemComponent.displayName = "MinimalTreeItemComponent"

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(menuId)}
      />
      <SortableTree
        items={items}
        onItemsChanged={handleItemsChanged}
        TreeItemComponent={MinimalTreeItemComponent}
      />
    </>
  )
}

export { MenuItems }
