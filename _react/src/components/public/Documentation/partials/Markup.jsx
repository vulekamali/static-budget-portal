import React from 'react';
import ReactMarkdown from 'react-markdown';


export default function Markup({ markdown }) {
  return <ReactMarkdown source={markdown}></ReactMarkdown>;
}