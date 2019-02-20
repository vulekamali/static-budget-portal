import React from 'react';
import ResourceList from '../../components/ResourceList';


const ResourcesList = ({ resources }) => {
  return <ResourceList {...{ resources }} />;
}


export default ResourcesList;