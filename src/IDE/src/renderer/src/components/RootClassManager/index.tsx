// RootClassManager.js is a functional React component designed to manage CSS class names on the root element of the application. 
// It serves as a utility component for dynamically adding or removing CSS classes to the root div (typically with the id 'root') of the React app.
// This component is particularly useful for applying global styling changes or theming dynamically at runtime.
// The component:
// - Accepts 'classNames', an array of CSS class names as a prop.
// - Uses the useEffect hook to perform side-effects after rendering.
// - On mounting (or when 'classNames' changes), it adds the specified classes to the root div.
// - On unmounting, it cleans up by removing the specified classes from the root div.
// - Renders its children without altering them, acting as a wrapper component.

import React, { useEffect } from 'react'

interface RootClassManagerProps {
  classNames: string[]
}

const RootClassManager: React.FC<RootClassManagerProps> = ({ classNames, children }) => {
  useEffect(() => {
    const rootDiv = document.getElementById('root')

    if (rootDiv) {
      // Adiciona todas as classes
      classNames.forEach((className) => {
        rootDiv.classList.add(className)
      })
    }

    return () => {
      if (rootDiv) {
        classNames.forEach((className) => {
          rootDiv.classList.remove(className)
        })
      }
    }
  }, [classNames])

  return <>{children}</>
}

export default RootClassManager
