import React from 'react'
import UserAction from './UserAction'
import { Grid } from '@mui/material'

const DashboardMain = () => {
  return (
    <div>
      <style jsx>
        {`
          .bg-grad {
            background-color: #0c4bc6 !important;
          }
        `}
      </style>
      <UserAction />
    </div>
  )
}

export default DashboardMain
