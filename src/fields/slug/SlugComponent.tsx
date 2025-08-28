'use client'
import React, { useCallback } from 'react'
import { TextFieldClientProps } from 'payload'

import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from '@payloadcms/ui'

import { formatSlug } from './formatSlug'
import './index.scss'

type SlugComponentProps = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path: path || field.name })

  const { dispatchFields, getDataByPath } = useForm()

  const isLocked = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  // Subscribe to the title field value
  const titleValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  // Generate slug only when the main page title field loses focus
  React.useEffect(() => {
    // Use a more specific selector to target only the main page title field
    // This avoids interfering with title fields in blocks
    const titleInput = document.querySelector(
      `[data-path="${fieldToUse}"] input, input[name="${fieldToUse}"]:not([data-path*="."])`,
    )
    if (!titleInput) return

    const handleBlur = () => {
      if (!isLocked) {
        const inputEl = titleInput as HTMLInputElement
        const formattedSlug = formatSlug(inputEl.value || '')
        if (value !== formattedSlug) setValue(formattedSlug)
      }
    }

    titleInput.addEventListener('blur', handleBlur)
    return () => {
      titleInput.removeEventListener('blur', handleBlur)
    }
  }, [isLocked, setValue, value, fieldToUse])

  const handleGenerate = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()
      const targetFieldValue = getDataByPath(fieldToUse) as string
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue)
        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    },
    [setValue, value, fieldToUse, getDataByPath],
  )

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !isLocked,
      })
    },
    [isLocked, checkboxFieldPath, dispatchFields],
  )

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        {!isLocked && (
          <Button className="lock-button" buttonStyle="none" onClick={handleGenerate}>
            Generate
          </Button>
        )}
        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {isLocked ? 'Unlock' : 'Lock'}
        </Button>
      </div>
      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnlyFromProps || isLocked)}
      />
    </div>
  )
}
