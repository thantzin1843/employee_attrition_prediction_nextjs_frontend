'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormInputProps {
  label: string
  name: string
  type?: 'text' | 'number' | 'select'
  value: string | number
  onChange: (name: string, value: string | number) => void
  options?: { label: string; value: string }[]
  placeholder?: string
  min?: number
  max?: number
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options,
  placeholder,
  min,
  max,
}: FormInputProps) {
  if (type === 'select' && options) {
    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <Select
          value={String(value)}
          onValueChange={(val) => onChange(name, val)}
        >
          <SelectTrigger id={name} className="bg-card">
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="bg-card"
      />
    </div>
  )
}
