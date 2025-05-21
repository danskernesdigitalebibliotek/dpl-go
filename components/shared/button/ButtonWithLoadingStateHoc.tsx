"use client"

import { useState } from "react"

import Icon from "../icon/Icon"
import { Button, ButtonProps } from "./Button"

const ButtonWithLoadingStateHoc = <TProps extends ButtonProps>(
  Component: React.FC<TProps & { isLoading: boolean; onClick?: () => void }>,
  {
    className,
    size,
    theme,
  }: {
    className?: string
    size?: "sm" | "lg"
    theme?: "primary" | "secondary"
  }
) => {
  return function WrappedComponent(props: TProps & { onClick?: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const { onClick } = props

    const handleClick = () => {
      if (isLoading) {
        return
      }

      setIsLoading(true)
      if (onClick) {
        onClick()
      }
    }

    if (isLoading) {
      return (
        <Button size={size} className={className} theme={theme} disabled>
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
