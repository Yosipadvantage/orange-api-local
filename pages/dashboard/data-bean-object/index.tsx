import React from 'react';
import DataBeanObject from '../../../core/api-data-bean-object/DataBeanObject';
import { ModuleLayout } from '../../../layouts';

const index = () => {
  return (
    <>
      <ModuleLayout title='Api - Data BeanObject' />
      <DataBeanObject />
    </>

  )
}

export default index