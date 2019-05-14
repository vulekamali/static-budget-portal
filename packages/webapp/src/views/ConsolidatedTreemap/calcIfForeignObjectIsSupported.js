const calcIfForeignObjectIsSupported = () => {
  if (document.createElementNS) {
    return true;
  }

  const toStringFnc = {}.toString;
  const createForeignObject = toStringFnc.call(
    document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject'),
  );
  return /SVGForeignObject/.test(createForeignObject);
};

export default calcIfForeignObjectIsSupported;
