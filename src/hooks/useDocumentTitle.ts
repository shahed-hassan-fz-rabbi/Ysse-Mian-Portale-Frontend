import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | YSSE`
      : 'Y SSE | Youth School for Social Entrepreneurs'
  }, [title])
}
