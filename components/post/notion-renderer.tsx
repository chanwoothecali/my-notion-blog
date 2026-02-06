"use client"

import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface NotionRendererProps {
  blocks: BlockObjectResponse[]
}

// Rich Text 렌더링
function RichText({ richText }: { richText: RichTextItemResponse[] }) {
  return (
    <>
      {richText.map((text, index) => {
        const { annotations, plain_text, href } = text

        let element = <span key={index}>{plain_text}</span>

        if (annotations.bold) {
          element = <strong key={index}>{element}</strong>
        }
        if (annotations.italic) {
          element = <em key={index}>{element}</em>
        }
        if (annotations.strikethrough) {
          element = <s key={index}>{element}</s>
        }
        if (annotations.underline) {
          element = <u key={index}>{element}</u>
        }
        if (annotations.code) {
          element = (
            <code key={index} className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              {plain_text}
            </code>
          )
        }

        if (href) {
          element = (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              {element}
            </a>
          )
        }

        return element
      })}
    </>
  )
}

// 개별 블록 렌더링
function Block({ block }: { block: BlockObjectResponse }) {
  const { type } = block

  // @ts-expect-error - 하위 블록
  const children = block.children as BlockObjectResponse[] | undefined

  switch (type) {
    case "paragraph": {
      const { paragraph } = block
      if (paragraph.rich_text.length === 0) {
        return <div className="h-4" />
      }
      return (
        <p className="mb-4 leading-7">
          <RichText richText={paragraph.rich_text} />
        </p>
      )
    }

    case "heading_1": {
      const { heading_1 } = block
      return (
        <h1 className="mb-4 mt-8 scroll-m-20 text-3xl font-bold tracking-tight">
          <RichText richText={heading_1.rich_text} />
        </h1>
      )
    }

    case "heading_2": {
      const { heading_2 } = block
      return (
        <h2 className="mb-3 mt-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          <RichText richText={heading_2.rich_text} />
        </h2>
      )
    }

    case "heading_3": {
      const { heading_3 } = block
      return (
        <h3 className="mb-2 mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
          <RichText richText={heading_3.rich_text} />
        </h3>
      )
    }

    case "bulleted_list_item": {
      const { bulleted_list_item } = block
      return (
        <li className="ml-6 list-disc">
          <RichText richText={bulleted_list_item.rich_text} />
          {children && (
            <ul className="mt-2">
              {children.map((child) => (
                <Block key={child.id} block={child} />
              ))}
            </ul>
          )}
        </li>
      )
    }

    case "numbered_list_item": {
      const { numbered_list_item } = block
      return (
        <li className="ml-6 list-decimal">
          <RichText richText={numbered_list_item.rich_text} />
          {children && (
            <ol className="mt-2">
              {children.map((child) => (
                <Block key={child.id} block={child} />
              ))}
            </ol>
          )}
        </li>
      )
    }

    case "to_do": {
      const { to_do } = block
      return (
        <div className="mb-2 flex items-start gap-2">
          <input
            type="checkbox"
            checked={to_do.checked}
            readOnly
            className="mt-1"
          />
          <span className={cn(to_do.checked && "text-muted-foreground line-through")}>
            <RichText richText={to_do.rich_text} />
          </span>
        </div>
      )
    }

    case "toggle": {
      const { toggle } = block
      return (
        <details className="mb-4">
          <summary className="cursor-pointer font-medium">
            <RichText richText={toggle.rich_text} />
          </summary>
          {children && (
            <div className="ml-4 mt-2">
              {children.map((child) => (
                <Block key={child.id} block={child} />
              ))}
            </div>
          )}
        </details>
      )
    }

    case "code": {
      const { code } = block
      const language = code.language || "plaintext"
      return (
        <div className="mb-4">
          <div className="flex items-center justify-between rounded-t-lg bg-muted px-4 py-2">
            <span className="text-xs text-muted-foreground">{language}</span>
          </div>
          <pre className="overflow-x-auto rounded-b-lg bg-muted p-4">
            <code className="text-sm">
              <RichText richText={code.rich_text} />
            </code>
          </pre>
          {code.caption.length > 0 && (
            <p className="mt-1 text-center text-sm text-muted-foreground">
              <RichText richText={code.caption} />
            </p>
          )}
        </div>
      )
    }

    case "image": {
      const { image } = block
      const src = image.type === "external" ? image.external.url : image.file.url
      const caption = image.caption.length > 0
        ? image.caption.map((c) => c.plain_text).join("")
        : "이미지"

      return (
        <figure className="mb-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={caption}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {image.caption.length > 0 && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              <RichText richText={image.caption} />
            </figcaption>
          )}
        </figure>
      )
    }

    case "quote": {
      const { quote } = block
      return (
        <blockquote className="mb-4 border-l-4 border-primary pl-4 italic">
          <RichText richText={quote.rich_text} />
        </blockquote>
      )
    }

    case "callout": {
      const { callout } = block
      const emoji = callout.icon?.type === "emoji" ? callout.icon.emoji : "💡"
      return (
        <div className="mb-4 flex gap-3 rounded-lg bg-muted p-4">
          <span className="text-xl">{emoji}</span>
          <div>
            <RichText richText={callout.rich_text} />
          </div>
        </div>
      )
    }

    case "divider":
      return <hr className="my-6 border-t" />

    case "bookmark": {
      const { bookmark } = block
      return (
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 block rounded-lg border p-4 hover:bg-muted"
        >
          <span className="text-primary underline">{bookmark.url}</span>
          {bookmark.caption.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              <RichText richText={bookmark.caption} />
            </p>
          )}
        </a>
      )
    }

    case "table": {
      return (
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {children?.map((row) => (
                <Block key={row.id} block={row} />
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    case "table_row": {
      const { table_row } = block
      return (
        <tr className="border-b">
          {table_row.cells.map((cell, index) => (
            <td key={index} className="border px-4 py-2">
              <RichText richText={cell} />
            </td>
          ))}
        </tr>
      )
    }

    default:
      return null
  }
}

// 목록 그룹화 헬퍼
function groupListItems(blocks: BlockObjectResponse[]) {
  const grouped: (BlockObjectResponse | { type: "bulleted_list" | "numbered_list"; items: BlockObjectResponse[] })[] = []
  let currentList: { type: "bulleted_list" | "numbered_list"; items: BlockObjectResponse[] } | null = null

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      if (currentList?.type === "bulleted_list") {
        currentList.items.push(block)
      } else {
        if (currentList) grouped.push(currentList)
        currentList = { type: "bulleted_list", items: [block] }
      }
    } else if (block.type === "numbered_list_item") {
      if (currentList?.type === "numbered_list") {
        currentList.items.push(block)
      } else {
        if (currentList) grouped.push(currentList)
        currentList = { type: "numbered_list", items: [block] }
      }
    } else {
      if (currentList) {
        grouped.push(currentList)
        currentList = null
      }
      grouped.push(block)
    }
  }

  if (currentList) grouped.push(currentList)
  return grouped
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  const groupedBlocks = groupListItems(blocks)

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {groupedBlocks.map((item, index) => {
        if ("items" in item) {
          if (item.type === "bulleted_list") {
            return (
              <ul key={index} className="mb-4">
                {item.items.map((block) => (
                  <Block key={block.id} block={block} />
                ))}
              </ul>
            )
          } else {
            return (
              <ol key={index} className="mb-4">
                {item.items.map((block) => (
                  <Block key={block.id} block={block} />
                ))}
              </ol>
            )
          }
        }
        return <Block key={item.id} block={item} />
      })}
    </div>
  )
}
