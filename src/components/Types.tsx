type _nestedObj = {[index: string]: any};
type _vaultTypes = object|string|number;

interface _ComponentProps {
  order: Array<string>,
  fields: {[index: string]: string}
};


export type ComponentProps = _ComponentProps;
export type vaultTypes = _vaultTypes;
export type nestedObj = _nestedObj;
