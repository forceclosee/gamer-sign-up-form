import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/_layout/_auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/_auth/sign-up"!</div>
}
