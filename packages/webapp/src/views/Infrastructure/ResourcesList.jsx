import React from 'react';
import ResourceList from '../../components/ResourceList';


const ResourcesList = ({ resources }) => {
  console.log(resources)
  return <ResourceList {...{ resources }} />;
}


export default ResourcesList;