import { toast } from '@zerodevx/svelte-toast'

export const success_toast = m => toast.push(m, {
  theme: {
    '--toastBackground': '#48BB78',
    '--toastColor': 'white',
    '--toastBarBackground': '#2F855A'
  }
})


export const error_toast = m => toast.push(m, {
    theme: {
      '--toastBackground': '#F56565',
      '--toastColor': 'white',
      '--toastBarBackground': '#C53030'
    }
  })


  export const warning_toast = m => toast.push(m, {
    theme: {
      '--toastBackground': '#ffff1a',
      '--toastColor': 'black',
      '--toastBarBackground': '#ffd700'
    }
  })