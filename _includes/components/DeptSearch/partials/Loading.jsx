import { h } from 'preact';


export default function Loading({ loading, children, placeholder }) {
  return loading ? placeholder : children;
}
