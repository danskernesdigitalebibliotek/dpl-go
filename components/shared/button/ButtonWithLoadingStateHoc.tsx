"use client"

import { ReactNode, useState } from "react"

import Icon from "../icon/Icon"
import { Button } from "./Button"

const ButtonWithLoadingStateHoc = <TProps extends Record<string, unknown>>(
  Component: React.FC<TProps & { isLoading: boolean; onClick?: () => void }>,
  {
    className,
    size,
  }: {
    className?: string
    size: "sm" | "lg"
  }
) => {
  return function WrappedComponent(props: TProps & { onClick?: () => void }) {
    const [buttonWasClicked, setbuttonWasClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { onClick } = props

    const handleClick = () => {
      if (buttonWasClicked) {
        return
      }
      setbuttonWasClicked(true)
      setIsLoading(true)
      if (onClick) {
        onClick()
      }
    }

    if (isLoading) {
      return (
        <Button size={size} className={className} disabled>
          <Icon
            name="go-spinner"
            ariaLabel="Indlæser"
            className="animate-spin-reverse mx-6 h-[15px] w-[15px]"
          />
        </Button>
      )
    }
    return (
      <Component
        {...(props as TProps & {
          children: ReactNode
          isLoading: boolean
          onClick: typeof handleClick
        })}
        isLoading={isLoading}
        onClick={handleClick}
      />
    )
  }
}

export default ButtonWithLoadingStateHoc
