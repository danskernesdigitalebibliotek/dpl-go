"use client"

import React, { useContext } from "react"

import { DplCmsConfigContext } from "@/lib/providers/DplCmsConfigContextProvider"
import { sheetStore } from "@/store/sheet.store"

import Icon from "../icon/Icon"
import LoginButton from "./LoginButton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./Sheet"

function LoginSheet({ open }: { open: boolean }) {
  const dplCmsConfig = useContext(DplCmsConfigContext)
  const loginUrlAdgangsplatformen = dplCmsConfig?.loginUrls?.adgangsplatformen
  const { closeSheet } = sheetStore.trigger

  return (
    <Sheet open={open} onOpenChange={(open: boolean) => (open ? null : closeSheet())}>
      <SheetContent className="grid grid-rows-[min-content_1fr]">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-typo-heading-3">Log ind</SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="flex h-full flex-col justify-center space-y-8">
            <div className="bg-background-overlay flex min-h-[300px] flex-col items-center justify-center rounded-sm p-8">
              <div className="text-typo-heading-4 text-foreground mb-4 text-center">
                Log ind med UNI•Login
              </div>
              <div>
                <LoginButton url="/auth/login/unilogin" />
              </div>
            </div>

            <>
              <hr className="mx-auto" />
              <div className="bg-background-overlay flex min-h-[300px] flex-col items-center justify-center rounded-sm p-8">
                <div className="mb-4">
                  <Icon name="adgangsplatformen" />
                </div>
                <div className="text-typo-heading-4 text-foreground mb-4 text-center">
                  Login via Bibliotekernes fælles loginside
                </div>
                <div>
                  {loginUrlAdgangsplatformen && <LoginButton url={loginUrlAdgangsplatformen} />}
                </div>
              </div>
            </>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default LoginSheet
