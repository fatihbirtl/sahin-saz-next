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

import { FaqItemType, MenuItemTypes } from "@/types"
import { AlertModal } from "@/components/modals/alert-modal"
import { useSelectedFaq } from "@/hooks/use-selected-faq"

interface FaqItemsProps {
  elements: FaqItemType[]
  setIsUpdating: (value: boolean) => void
}

type MinimalTreeItemData = {
  id: string
  title: string
  children?: MinimalTreeItemData[]
  depth: number // Track depth in the tree
}

const FaqItems: React.FC<FaqItemsProps> = ({ elements, setIsUpdating }) => {
  const [items, setItems] = useState<MinimalTreeItemData[]>([])
  const [mounted, setMounted] = useState(false)
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [faqId, setFaqId] = useState("")
  const setSelectedItem = useSelectedFaq((state) => state.setSelectedItem)
  const selectedItem = useSelectedFaq((state) => state.selectedItem)
  // Create a structured tree that respects the depth limitation
  const createTreeStructure = (
    items: FaqItemType[],
    parentDepth: number = 0
  ): MinimalTreeItemData[] => {
    const itemMap: { [key: string]: MinimalTreeItemData } = {}

    items.forEach((item) => {
      itemMap[item.id] = { ...item, depth: parentDepth + 1 }
    })

    const rootItems: MinimalTreeItemData[] = []
    items.forEach((item) => {
      rootItems.push(itemMap[item.id])
    })

    return rootItems
  }

  useEffect(() => {
    const hierarchicalItems = createTreeStructure(elements)
    setItems(hierarchicalItems)
  }, [elements])

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/faq/${params.faqId}/items/${id}`)
      router.refresh()
      toast.success("Faq item Deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setOpen(false)
    }
  }

  const handleItemsChanged = (newItems: MinimalTreeItemData[]) => {
    // Prevent exceeding the maximum depth by validating the whole tree
    if (!validateDepth(newItems, 1)) {
      toast.error("Cannot add more than 1 levels of faqitems")
      return
    }
    setItems(newItems)
    onReorder(newItems)
  }

  const onReorder = async (updatedItems: MinimalTreeItemData[]) => {
    try {
      const reorderData = flattenItems(updatedItems)
      await axios.put(`/api/faq/${params.faqId}/items/reorder`, {
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
        {props.item.title}
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
            setFaqId(props.item.id)
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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(faqId)}
      />
      <SortableTree
        items={items}
        onItemsChanged={handleItemsChanged}
        TreeItemComponent={MinimalTreeItemComponent}
      />
    </>
  )
}

export { FaqItems }
