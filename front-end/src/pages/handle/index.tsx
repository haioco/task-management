import React, {useContext} from 'react';
import {AbilityContext} from "../../layouts/components/acl/Can";

const Handle = () => {
  const ability = useContext(AbilityContext)
  
return (
    <div>
      {ability?.can('manage', 'handle-page') ? (
        <h1>test</h1>
      ): (
        <div>
          <h1>no</h1>
        </div>
      )}
    </div>
  )
}
Handle.acl = {
  action: 'manage',
  subject: 'handle-page'
}


export default Handle;
