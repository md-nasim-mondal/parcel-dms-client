import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple"
    collapsible?: boolean
    defaultValue?: string
    onValueChange?: (value: string) => void
  }
>(({ className, children, ...props }, ref) => {
  const [value, setValue] = React.useState<string>(props.defaultValue || "")

  const handleValueChange = (newValue: string) => {
    setValue(newValue === value && props.collapsible ? "" : newValue)
    props.onValueChange?.(newValue)
  }

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b", className)}
    data-value={value}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {

  return (
      <AccordionTriggerInner className={className} onClick={onClick} ref={ref} {...props}>
          {children}
      </AccordionTriggerInner>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

// Helper to access Item value
const AccordionItemContext = React.createContext<{ value: string }>({ value: "" })

const AccordionItemWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} {...props} >
            {children}
        </div>
    </AccordionItemContext.Provider>
))
AccordionItemWrapper.displayName = "AccordionItem"


const AccordionTriggerInner = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(AccordionContext)
  const { value: itemValue } = React.useContext(AccordionItemContext)
  const isOpen = selectedValue === itemValue

  return (
    <div className="flex">
      <button
        ref={ref}
        onClick={(e) => {
             onClick?.(e)
             onValueChange?.(itemValue)
        }}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  )
})

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value: selectedValue } = React.useContext(AccordionContext)
  const { value: itemValue } = React.useContext(AccordionItemContext)
  const isOpen = selectedValue === itemValue

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }
