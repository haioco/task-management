import React, {useContext} from 'react';
import {AbilityContext} from "../../layouts/components/acl/Can";

const Create = () => {
  const ability = useContext(AbilityContext)
  
return (
    <div>
      {ability?.can('read', 'create-page') ? (
        <div>
          <h1>create</h1>
        </div>
      ): (
        <div>
          <h1> not create</h1>
        </div>
      )}
    </div>
  );
};

Create.acl = {
  action: 'read',
  subject: 'create-page'
}

export default Create;
