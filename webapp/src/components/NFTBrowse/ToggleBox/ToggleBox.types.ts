export type Item = {
  title: string
  description: string
  active?: boolean
  onClick: (item: Item, index: number) => unknown
}

export type Props = {
  header: string
  className?: string
  items: Item[]
}
