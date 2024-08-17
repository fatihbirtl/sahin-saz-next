import { useOrigin } from "@/hooks/use-origin"
import { ApiAlert } from "./api-alert"

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const origin = useOrigin()

  return (
    <>
      <ApiAlert
        title="GET"
        description={`${origin}/api/${entityName}`}
        variant="public"
      />

      <ApiAlert
        title="POST"
        description={`${origin}/api/${entityName}`}
        variant="admin"
      />

      <ApiAlert
        title="GET"
        description={`${origin}/api/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  )
}
